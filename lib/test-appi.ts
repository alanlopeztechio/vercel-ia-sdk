import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';
import { obtenerComentarios } from '@/app/actions';

async function main() {
  const convexUrl = 'https://tangible-blackbird-943.convex.cloud';

  if (!convexUrl) {
    console.error(
      '❌ ERROR: No se encontró la variable NEXT_PUBLIC_CONVEX_URL.',
    );
    console.error(
      "   Asegúrate de que el archivo '.env.local' existe en la raíz.",
    );
    process.exit(1);
  }
  console.log(`✅ Conectando a: ${convexUrl}`);
  const client = new ConvexHttpClient(convexUrl);

  try {
    console.log('🔍 Ejecutando query...');
    const users = await client.query(api.padres.getFathers);
    console.log(`🎉 ¡Éxito! Se encontraron ${users.length} usuarios.`);
    const response = await obtenerComentarios(users);
    console.log('📄 Respuesta de la IA:', response);
  } catch (error) {
    console.error('🔥 Error ejecutando la query:', error);
  }
}

main();
