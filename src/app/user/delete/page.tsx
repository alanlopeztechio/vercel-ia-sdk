import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { useMutation } from "convex/react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { ConvexError } from "convex/values";

interface BtnDeleteUserProps {
  user: Doc<"users">;
  onChange: (exitoso: boolean) => void;
}

const BtnDeleteUser: React.FC<BtnDeleteUserProps> = ({ user, onChange }) => {
  const deleteUser = useMutation(api.users.deleteUser);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteUser({ id: user._id });
    } catch (err) {
      throw new ConvexError(`Ocurrio un error al eliminar el usuario: ${err}`);
    }
    onChange(true);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 border border-red-500/30 transition hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-200"
            title="Eliminar usuario"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Eliminar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Eliminar usuario</DialogTitle>
            <DialogDescription>
              {`¿Estás seguro de eliminar el usuario '${user.name}'? Esta accion es irreversible`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <DialogFooter className="sm:justify-around">
              <DialogClose asChild>
                <Button className="hover:bg-green-800" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="hover:bg-red-700"
                type="submit"
                variant="outline"
              >
                Eliminar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BtnDeleteUser;
