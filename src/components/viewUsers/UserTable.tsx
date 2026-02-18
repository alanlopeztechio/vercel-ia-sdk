import { Doc } from "../../../convex/_generated/dataModel";
import React, { useState } from "react";
import BtnEditUser from "@/app/user/edit/page";
import { toast } from "sonner";
import BtnDeleteUser from "@/app/user/delete/page";

interface UserTableProps {
  users: Doc<"users">[]; // Ejemplo de prop para recibir datos de usuario
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [exitoso, setExitoso] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl" />
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Usuario
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Email
                </span>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Acciones
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {users && users.length > 0 ? (
              users.map((item) => (
                <tr
                  key={item._id}
                  className="transition hover:bg-slate-800/30 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                        <span className="text-sm font-semibold text-white">
                          {item.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <span className="font-medium text-slate-50 group-hover:text-purple-300 transition">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition">
                      {item.email}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <BtnEditUser
                        user={item}
                        onChange={(exitoso) => {
                          setExitoso(exitoso);
                          toast("Usuario actualizado", {
                            position: "top-center",
                            description:
                              "El usuario se ha actualizado correctamente",
                            action: {
                              label: "Ocultar",
                              onClick: () => {},
                            },
                          });
                        }}
                      />
                      <BtnDeleteUser
                        user={item}
                        onChange={(exitoso) => {
                          setExitoso(exitoso);
                          toast("Usuario Eliminado", {
                            position: "top-center",
                            description:
                              "El usuario se ha eliminado correctamente",
                            action: {
                              label: "Ocultar",
                              onClick: () => {},
                            },
                          });
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="h-12 w-12 text-slate-600 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646M9 9H3v10a6 6 0 006 6h6a6 6 0 006-6V9h-6a4 4 0 00-4-4H9z"
                      />
                    </svg>
                    <p className="text-sm font-medium text-slate-400">
                      No hay registros de usuarios
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
