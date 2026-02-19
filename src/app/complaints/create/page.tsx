'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Link from 'next/link';
import { Doc, Id } from '../../../../convex/_generated/dataModel';

const schema = z.object({
  title: z
    .string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede ser mayor a 100 caracteres'),
  comment: z
    .string()
    .min(5, 'El comentario debe tener al menos 5 caracteres')
    .max(500, 'El comentario no puede ser mayor a 500 caracteres'),
  idUser: z.string().min(1, 'Debes seleccionar un usuario'),
  idPurchase: z.string().min(1, 'Debes seleccionar una compra'),
});

type FormValues = z.infer<typeof schema>;

export default function CrearReclamo() {
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);

  const users = useQuery(api.users.getUsers) as Doc<'users'>[] | undefined;
  const purchases = useQuery(api.purchases.getPurchase) as
    | Doc<'purchases'>[]
    | undefined;

  const createComplaint = useMutation(api.complaint.createComplaint);

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
      await createComplaint({
        title: data.title,
        comments: data.comment,
        idUser: data.idUser as Id<'users'>,
        idPurchase: data.idPurchase as Id<'purchases'>,
      });
      setResultado('✓ Reclamo creado exitosamente');

      setTimeout(() => setResultado(''), 3000);
    } catch (error) {
      setResultado('✗ Error al crear el reclamo');
    } finally {
      reset();
    }
    setCargando(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-4 py-8">
      <div className="w-full max-w-3xl">
        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl" />
          <header className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
                Nuevo reclamo
              </p>
              <h1 className="mt-1 text-3xl font-semibold text-slate-50">
                Crear reclamo
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Completa los campos para registrar un reclamo asociado a un
                usuario y una compra.
              </p>
            </div>
            <Link href="/complaints">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-xs font-semibold text-slate-100 shadow-lg transition hover:border-slate-600 hover:bg-slate-800/60"
              >
                Volver a reclamos
              </button>
            </Link>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="titleComplaint"
                className="block text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Título del reclamo
              </label>
              <input
                id="titleComplaint"
                type="text"
                {...register('title')}
                placeholder="Ej. Producto defectuoso"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500"
              />
              {errors.title && (
                <p className="text-xs font-medium mt-1 text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="commentComplaint"
                className="block text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Comentario
              </label>
              <textarea
                id="commentComplaint"
                {...register('comment')}
                placeholder="Describe el problema o reclamo"
                rows={4}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500"
              />
              {errors.comment && (
                <p className="text-xs font-medium mt-1 text-red-400">
                  {errors.comment.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="userSelect"
                  className="block text-xs font-medium uppercase tracking-wide text-slate-300"
                >
                  Usuario
                </label>
                <select
                  id="userSelect"
                  {...register('idUser')}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-slate-900">
                    Selecciona un usuario
                  </option>
                  {users?.map((user) => (
                    <option
                      key={user._id.toString()}
                      value={user._id.toString()}
                      className="bg-slate-900"
                    >
                      {user.name} - {user.email}
                    </option>
                  ))}
                </select>
                {errors.idUser && (
                  <p className="text-xs font-medium mt-1 text-red-400">
                    {errors.idUser.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="purchaseSelect"
                  className="block text-xs font-medium uppercase tracking-wide text-slate-300"
                >
                  Compra
                </label>
                <select
                  id="purchaseSelect"
                  {...register('idPurchase')}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-slate-900">
                    Selecciona una compra
                  </option>
                  {purchases?.map((purchase) => (
                    <option
                      key={purchase._id.toString()}
                      value={purchase._id.toString()}
                      className="bg-slate-900"
                    >
                      {purchase.product} - Monto: {purchase.amount}
                    </option>
                  ))}
                </select>
                {errors.idPurchase && (
                  <p className="text-xs font-medium mt-1 text-red-400">
                    {errors.idPurchase.message}
                  </p>
                )}
              </div>
            </div>

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
                  'Guardar reclamo'
                )}
              </button>
              <Link href="/complaints">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-lg transition hover:border-slate-600 hover:bg-slate-800/60"
                >
                  Cancelar
                </button>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
