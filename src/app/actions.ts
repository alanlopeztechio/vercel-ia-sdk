// src/app/actions.ts
'use server';

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

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
