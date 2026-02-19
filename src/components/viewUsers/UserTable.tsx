import { Doc } from "../../../convex/_generated/dataModel";
import React from "react";
import NoContentTable from "../NoContentTable";
import DataTableUsers from "./DataTableUsers";

interface UserTableProps {
  users: Doc<"users">[]; // Ejemplo de prop para recibir datos de usuario
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
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
              users.map((item) => <DataTableUsers key={item._id} user={item} />)
            ) : (
              <NoContentTable
                columns={3}
                message="No hay registros de usuarios"
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
