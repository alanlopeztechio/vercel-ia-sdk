// src/app/actions.ts
'use server';

import { generateObject, generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

const schemaComments = z.object({
  commentarios: z.array(z.string()).min(1, 'Debe haber al menos un comentario'),
});
type FormDate = z.infer<typeof schemaComments>;

export async function obtenerRespuestaIA(promptUsuario: string) {
  try {
    const { text } = await generateText({
      model: google('gemini-3-flash-preview'),
      prompt: `Genera un texto basado en el siguiente input: ${promptUsuario} solo dame el texto sin explicaciones`,
    });

    return { success: true, text };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al conectar con Gemini' };
  }
}

export async function obtenerComentarios(_formData: FormDate) {
  try {
    const { object } = await generateObject({
      model: google('gemini-3-flash-preview'),
      output: 'array',
      schema: z.object({
        commentarios: z.string(),
      }),
      prompt: `Genera un carta para cada comentario basado en el siguiente input: ${_formData.commentarios}`,
    });

    return {
      success: true,
      comments: object as Array<{ commentarios: string }>,
    };
  } catch (error) {
    console.error(error);
    return { success: false, comments: [] };
  }
}
