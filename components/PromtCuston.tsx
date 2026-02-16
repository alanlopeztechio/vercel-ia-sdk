import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { useQuery } from 'convex/react';
import { obtenerRespuestaIA } from '@/app/actions';
import UsersComments from './UsersComments';

const schema = z.object({
  texto: z.string().min(1, 'El texto es obligatorio'),
});

type FormValues = z.infer<typeof schema>;

const PromtCuston = () => {
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
    <div>
      <div className="w-full max-w-4xl grid gap-6 md:grid-cols-2">
        {/* Card IA */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-gradient-to-b from-cyan-500/20 to-transparent blur-3xl" />

          <header className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              IA Assistant
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-50">
              Gemini + Vercel SDK
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Escribe una instrucción y genera una respuesta usando Gemini.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="texto"
                className="block text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Prompt
              </label>
              <textarea
                id="texto"
                rows={4}
                {...register('texto')}
                placeholder="Ej. Escribe una descripción creativa para mi proyecto de IA..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 placeholder:text-slate-500"
              />
              {errors.texto && (
                <p className="text-xs font-medium text-red-400">
                  {errors.texto.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-400/40 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700 disabled:shadow-none"
            >
              {cargando ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
                  Pensando...
                </span>
              ) : (
                'Generar texto'
              )}
            </button>
          </form>

          {resultado && (
            <div className="mt-6 space-y-3 rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-100 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Respuesta generada
              </div>
              <p className="leading-relaxed text-slate-100 whitespace-pre-line">
                {resultado}
              </p>
            </div>
          )}
        </section>

        {/* Card Usuarios */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <header className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">Usuarios</h2>
              <p className="text-xs text-slate-400">
                Comentarios generados por la IA para tus usuarios.
              </p>
            </div>
          </header>
        </section>
      </div>
    </div>
  );
};

export default PromtCuston;
