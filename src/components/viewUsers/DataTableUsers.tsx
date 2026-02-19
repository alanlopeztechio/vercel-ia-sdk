import BtnDeleteUser from "@/app/user/delete/page";
import BtnEditUser from "@/app/user/edit/page";
import React, { useState } from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { toast } from "sonner";

interface DataTableUsersProps {
  user: Doc<"users">;
  key: string;
}

const DataTableUsers: React.FC<DataTableUsersProps> = ({ user }) => {
  const [exitoso, setExitoso] = useState(false);
  return (
    <tr key={user._id} className="transition hover:bg-slate-800/30 group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
            <span className="text-sm font-semibold text-white">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <span className="font-medium text-slate-50 group-hover:text-purple-300 transition">
            {user.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-400 group-hover:text-slate-200 transition">
          {user.email}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <BtnEditUser
            user={user}
            onChange={(exitoso) => {
              setExitoso(exitoso);
              toast("Usuario actualizado", {
                position: "top-center",
                description: "El usuario se ha actualizado correctamente",
                action: {
                  label: "Ocultar",
                  onClick: () => {},
                },
              });
            }}
          />
          <BtnDeleteUser
            user={user}
            onChange={(exitoso) => {
              setExitoso(exitoso);
              toast("Usuario Eliminado", {
                position: "top-center",
                description: "El usuario se ha eliminado correctamente",
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
  );
};

export default DataTableUsers;
