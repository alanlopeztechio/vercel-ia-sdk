'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Link from 'next/link';

const schema = z.object({
  name: z
    .string()
    .min(2, 'El nombre del padre debe ser mayor a 2 caracteres')
    .max(50, 'El nombre del padre no puede ser mayor a 50 caracteres'),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'La contraseña debe tener minimo 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe tener al menos 1 mayuscula')
    .regex(/[1-9]/, 'La contraseña debe tener al menos 1 numero'),
});

type FormValues = z.infer<typeof schema>;

export default function CrearRegistro() {
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);
  const createUser = useMutation(api.users.createtUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setCargando(true);
    try {
      await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setResultado('✓ Registro guardado exitosamente');
      reset(); // reiniciar los campos del formulario
      setTimeout(() => setResultado(''), 3000); // simular asincronia
    } catch (error) {
      setResultado('✗ Error al guardar el registro');
    }
    setCargando(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Card Formulario */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl" />
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
              Nuevo Registro de usuario
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-50">
              Registrar usuario
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Completa todos los campos para registrar un usuario
            </p>
          </header>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nombre del usuario */}
            <div className="space-y-1.5">
              <label
                htmlFor="nameUser"
                className="block text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Nombre del Usuario
              </label>
              <input
                id="nameUser"
                type="text"
                {...register('name')}
                placeholder="Ej. slash3d"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500"
              />
              {errors.name && (
                <p className="text-xs font-medium mt-1 text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* email user*/}
            <div className="space-y-1.5">
              <label
                htmlFor="emailUser"
                className="block text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                email
              </label>
              <input
                id="emailUser"
                type="text"
                {...register('email')}
                placeholder="Ej. hola@ejemplo.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500"
              />
              {errors.email && (
                <p className="text-xs font-medium mt-1 text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* password */}
            <div className="space-y-1.5">
              <label
                htmlFor="passwordUser"
                className="block text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Contraseña
              </label>
              <input
                id="passwordUser"
                type="password"
                {...register('password')}
                placeholder="Ingresa tu contraseña"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500"
              />
              {errors.password && (
                <p className="text-xs font-medium mt-1 text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Mensaje de Resultado */}
            {resultado && (
              <div
                className={`rounded-xl px-3.5 py-2.5 text-sm font-medium ${
                  resultado.includes('✓')
                    ? 'border border-green-500/30 bg-green-500/10 text-green-400'
                    : 'border border-red-500/30 bg-red-500/10 text-red-400'
                }`}
              >
                {resultado}
              </div>
            )}
            {/* Botones */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={cargando}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:from-purple-400 hover:to-pink-500 hover:shadow-purple-400/40 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700 disabled:shadow-none"
              >
                {cargando ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
                    Guardando...
                  </span>
                ) : (
                  'Guardar Registro'
                )}
              </button>
              <Link href="/">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-lg transition hover:border-slate-600 hover:bg-slate-800/60"
                >
                  Volver
                </button>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
