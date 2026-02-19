'use client';

import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { ConvexError } from 'convex/values';
import { Id } from '../../../../convex/_generated/dataModel';

/**
 * tengo que tomar el titulo, contenido, usuarioId y compraId del select
 * tengo que validar los datos, usar useForm para que zod los valide
 * crear la funcion onSubmit para tener el handler del form, resetear los campos una vez hecho un reclamo
 * mandar los datos y usar useMutation para guardar el reclamo en la base de datos,
 * mostrar un mensaje de exito o error dependiendo del resultado
 */

const formSchema = z.object({
  comment: z.string().min(4, 'Comentario muy corto'),
  purchaseId: z.string(),
  userId: z.string(),
  title: z.string().min(2, 'El titulo muy corto, ingresa uno mas largo'),
});

type formValues = z.infer<typeof formSchema>;

const CreateComplaint = () => {
  const users = useQuery(api.users.getUsers);
  const purchases = useQuery(api.purchases.getPurchase);
  const createComplaint = useMutation(api.complaint.createComplaint);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formValues>({
    resolver: zodResolver(formSchema),
  });
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);

  const onSubmit = async (data: formValues) => {
    setCargando(true);
    if (data.userId === 'defaultValue') {
      setResultado('Primero elige al usuario');
      setCargando(false);
      setTimeout(() => setResultado(''), 3000);
    } else if (data.purchaseId === 'defaultValue') {
      setResultado('Primero elige la compra');
      setCargando(false);
      setTimeout(() => setResultado(''), 3000);
    } else {
      try {
        await createComplaint({
          comments: data.comment,
          idPurchase: data.purchaseId as Id<'purchases'>,
          idUser: data.userId as Id<'users'>,
          title: data.title,
        });
        setCargando(false);
        setResultado('Reclamo creado');
        setTimeout(() => setResultado(''), 3000);
        reset();
      } catch (error) {
        setCargando(false);
        throw new ConvexError(`Error al crear el reclamo, error: ${error}`);
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Card Formulario */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl" />
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
              Nuevo Reclamo
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-50">
              Registrar Reclamo
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Completa todos los campos para registrar un reclamo
            </p>
          </header>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Título del Reclamo */}
            <div className="space-y-1.5">
              <label
                htmlFor="titulo"
                className="block text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Título del Reclamo
              </label>
              <input
                id="titulo"
                type="text"
                {...register('title')}
                placeholder="Ej. Producto defectuoso"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500"
                required
              />
              {errors.title && (
                <p className="text-xs font-medium mt-1 text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>
            {/* Contenido del Reclamo */}
            <div className="space-y-1.5">
              <label
                htmlFor="contenido"
                className="block text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Contenido del Reclamo
              </label>
              <textarea
                id="contenido"
                {...register('comment')}
                rows={5}
                placeholder="Describe detalladamente tu reclamo..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500"
                required
              />
              {errors.comment && (
                <p className="text-xs font-medium mt-1 text-red-400">
                  {errors.comment.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Select Usuario */}
              <div className="space-y-1.5">
                <label
                  htmlFor="usuario"
                  className="block text-xs font-medium uppercase tracking-wide text-slate-300"
                >
                  Usuario
                </label>
                <select
                  id="usuario"
                  {...register('userId')}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                  defaultValue={'defaultValue'}
                  required
                >
                  <option value="defaultValue">Elige un usuario</option>
                  {users?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Select Compra */}
              <div className="space-y-1.5">
                <label
                  htmlFor="compra"
                  className="block text-xs font-medium uppercase tracking-wide text-slate-300"
                >
                  Compra Relacionada
                </label>
                <select
                  id="compra"
                  {...register('purchaseId')}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                  defaultValue={'defaultValue'}
                  required
                >
                  <option value="defaultValue">Elige la compra</option>
                  {purchases?.map((purchase) => (
                    <option key={purchase._id} value={purchase._id}>
                      {purchase.product}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Mensaje de Resultado */}
            {resultado && (
              <div
                className={`rounded-xl px-3.5 py-2.5 text-sm font-medium ${
                  resultado.includes('creado')
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
                    Enviando...
                  </span>
                ) : (
                  'Enviar Reclamo'
                )}
              </button>
              <Link href="/complaint">
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
};

export default CreateComplaint;
