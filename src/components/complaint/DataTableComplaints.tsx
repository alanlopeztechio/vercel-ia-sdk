import React, { useState } from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import BtnDeleteComplaint from "@/app/complaint/delete/page";
import { toast } from "sonner";
import BtnEditComplaint from "@/app/complaint/edit/page";

interface DataTableComplaintsProps {
  data: Doc<"complaints">;
  key: string;
}

const DataTableComplaints: React.FC<DataTableComplaintsProps> = ({ data }) => {
  const [exitoso, setExitoso] = useState(false);
  return (
    <tr key={data._id} className="transition hover:bg-slate-800/30 group">
      <td className="px-6 py-4">
        <span className="font-medium text-slate-50 group-hover:text-purple-300 transition">
          {data.title}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-400 group-hover:text-slate-200 transition">
          {data.comment}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-400 group-hover:text-slate-200 transition">
          {data.idUser}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-400 group-hover:text-slate-200 transition">
          {data.idPurchase}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <BtnEditComplaint
            complaint={data}
            onChange={(exitoso) => {
              setExitoso(exitoso);
              toast("Reclamo actualizado", {
                position: "top-center",
                description: "El usuario se ha actualizado correctamente",
                action: {
                  label: "Ocultar",
                  onClick: () => {},
                },
              });
            }}
          />
          <BtnDeleteComplaint
            complaint={data}
            onChange={(exitoso) => {
              setExitoso(exitoso);
              toast("Reckamo Eliminado", {
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

export default DataTableComplaints;
