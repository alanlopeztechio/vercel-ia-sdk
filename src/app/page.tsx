'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { obtenerRespuestaIA } from './actions'; // Importamos la acción

const schema = z.object({
  texto: z.string().min(1, 'El texto es obligatorio'),
});

type FormValues = z.infer<typeof schema>;

export default function Home() {
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { texto: '' },
  });

  const onSubmit = async (data: FormValues) => {
    setCargando(true);

    const response = await obtenerRespuestaIA(data.texto);

    if (response.success) {
      setResultado(response.text || '');
    } else {
      alert(response.error);
    }

    setCargando(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4 text-gray-800">
          Gemini + Vercel SDK
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('texto')}
            placeholder="Escribe algo para la IA..."
            className="w-full border rounded px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.texto && (
            <p className="text-red-500 text-xs">{errors.texto.message}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {cargando ? 'Pensando...' : 'Generar Texto'}
          </button>
        </form>

        {resultado && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded text-gray-800">
            <h2 className="font-semibold mb-1">Respuesta:</h2>
            <p>{resultado}</p>
          </div>
        )}
      </div>
    </main>
  );
}
