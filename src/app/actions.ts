// src/app/actions.ts
"use server";

import { generateObject, generateText } from "ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { z } from "zod";
import { Doc } from "../../convex/_generated/dataModel";

export async function obtenerRespuestaIA(promptUsuario: string) {
  try {
    const { text } = await generateText({
      model: "meta/llama-3.2-1b",
      prompt: `Genera un texto basado en el siguiente input: ${promptUsuario} solo dame el texto sin explicaciones`,
    });

    return { success: true, text };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al conectar con Gemini" };
  }
}

export async function obtenerComentarios(users: Doc<"padres">[]) {
  try {
    const { object } = await generateObject({
      model: google("gemini-3-flash-preview"),
      output: "array",
      schema: z.string(),
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
      comments: object,
    };
  } catch (error) {
    console.error(error);
    return { success: false, comments: [] };
  }
}
