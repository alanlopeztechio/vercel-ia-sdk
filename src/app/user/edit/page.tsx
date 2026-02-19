"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";

interface BtnEditUserProps {
  user: Doc<"users">;
  onChange: (exitoso: boolean) => void;
}

const editSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede ser mayor a 50 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener al menos 1 mayuscula")
    .regex(/[1-9]/, "La contraseña debe tener al menos 1 numero")
    .optional(),
});

type FormValues = z.infer<typeof editSchema>;

const BtnEditUser: React.FC<BtnEditUserProps> = ({ user, onChange }) => {
  const [open, setOpen] = useState(false);
  const updateUser = useMutation(api.users.updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      password: user.password ?? "",
    },
  });
  const onSubmit = async (data: FormValues) => {
    try {
      const payload: {
        // cargamos los campos editados
        id: Id<"users">;
        name: string;
        email: string;
        password?: string;
      } = { id: user._id, name: data.name, email: data.email };
      if (data.password) payload.password = data.password;
      await updateUser(payload);
      // limpiar contraseña en el formulario
      reset({ ...data });
      onChange(true);
      setOpen(false);
    } catch (e) {
      onChange(false);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-300 border border-blue-500/30 transition hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-200"
            variant="outline"
            title="Editar usuario"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Editar usuario</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-3">
                Nombre
              </label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-xs text-red-400 mt-3">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-3">
                Email
              </label>
              <Input {...register("email")} />
              {errors.email && (
                <p className="text-xs text-red-400 mt-3">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-3">
                Contraseña (opcional)
              </label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <p className="text-xs text-red-400 mt-3">
                  {errors.password.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    reset({
                      name: user.name,
                      email: user.email,
                      password: user.password,
                    });
                  }}
                  variant="outline"
                  className="mr-2 hover:bg-red-700"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="hover:bg-green-700"
                type="submit"
                variant="outline"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BtnEditUser;
