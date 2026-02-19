// src/app/actions.ts
'use server';

import { generateObject, generateText, Output, stepCountIs, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { Doc, Id } from '../../convex/_generated/dataModel';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { api } from '../../convex/_generated/api';

export async function obtenerRespuestaIA(promptUsuario: string) {
  try {
    const { text } = await generateText({
      model: 'meta/llama-3.2-1b',
      // tools: {
      //   weather: tool({
      //     description: 'Get the weather in a location',
      //     inputSchema: z.object({
      //       location: z
      //         .string()
      //         .describe('The location to get the weather for'),
      //     }),
      //     execute: async ({ location }) => ({
      //       location,
      //       temperature: 72 + Math.floor(Math.random() * 21) - 10,
      //     }),
      //   }),
      // },
      prompt: `Genera un texto basado en el siguiente input: ${promptUsuario} solo dame el texto sin explicaciones`,
    });

    return { success: true, text };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al conectar con Gemini' };
  }
}

export async function obtenerComentarios(users: any) {
  try {
    const { output } = await generateText({
      model: google('gemini-3-flash-preview'),
      output: Output.object({
        schema: z.object({
          comments: z.array(z.string()),
        }),
      }),
      prompt: `Necesito que redactes una carta formal dirigida al padre de familia basada en la siguiente información del alumno.
      Datos: ${JSON.stringify(users)}
      La carta debe:

      1. Ser formal y profesional.
      2. Explicar el estatus actual del alumno respecto a sus inasistencias.
      3. Mencionar el número de faltas y la(s) fecha(s).
      4. Indicar posibles consecuencias académicas si aplica.
      5. Invitar al padre a comunicarse con la institución.
      6. Tener un tono respetuoso y orientado a la colaboración.
      7. Incluir un cierre institucional adecuado.

      Genera la carta completa lista para imprimir.`,
    });

    return {
      success: true,
      comments: output.comments,
    };
  } catch (error) {
    console.error(error);
    return { success: false, comments: [] };
  }
}

export async function createReports() {
  console.log('Iniciando generación de reportes...');
  try {
    const { text, steps, response } = await generateText({
      model: google('gemini-2.5-flash'),
      tools: {
        getClaims: tool({
          description: 'Obtiene los reclamos de la base de datos',
          inputSchema: z.object({}),
          execute: async () => {
            try {
              console.log('Obteniendo reclamos de la base de datos...');
              const users = await fetchQuery(api.complaint.getComplaint);
              console.log('Reclamos obtenidos:', users);
              return users;
            } catch (error) {
              console.error('Error al obtener reclamos:', error);
              return [];
            }
          },
        }),
        createReport: tool({
          description:
            'Guarda una respuesta generada por la IA en la base de datos, asociada a un reclamo específico',
          inputSchema: z.object({
            reports: z
              .array(
                z.object({
                  response: z.string().describe('La respuesta formal generada'),
                  _id: z.string().describe('El ID del reclamo'),
                  idPurchase: z.string().describe('El ID de la compra'),
                }),
              )
              .describe('Lista de reportes a guardar'),
          }),
          execute: async ({ reports }) => {
            console.log('Guardando reportes en la base de datos...');
            console.log('Datos recibidos para guardar:', reports);

            Promise.all(
              reports.map(async (item) => {
                console.log('Guardando reporte para reclamo:', item._id);
                await fetchMutation(api.reports.createReport, {
                  idComplaint: item._id as Id<'complaints'>,
                  idPurchase: item.idPurchase as Id<'purchases'>,
                  solution: item.response,
                });
              }),
            );
          },
        }),
      },
      stopWhen: stepCountIs(5),
      prompt: `Actúa como un agente de atención al cliente experto.
                Tus instrucciones son:
                1. Usa la herramienta 'getClaims' para obtener los reclamos de los usuarios.
                2. Para CADA reclamo obtenido:
                    - Analiza el problema.
                    - Redacta una respuesta formal, empática y profesional.
                3. Una vez tengas todas las respuestas listas, usa la herramienta 'createReport'.
                    - Debes enviar todos los reportes juntos en una lista.
                    - Asegúrate estrictamente de usar el campo '_id' (guion bajo id) para el identificador del reclamo y 'idPurchase' para la compra.`,
    });

    return {
      success: true,
      text,
      steps: steps.length,
      response: response.messages[0].content,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al crear reportes' };
  }
}
