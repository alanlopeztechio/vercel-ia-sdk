import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";

interface DataTableComplaintsProps {
  data: Doc<"complaints">;
  key: string;
}

const DataTableComplaints: React.FC<DataTableComplaintsProps> = ({ data }) => {
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
          <button className="rounded-md border border-purple-500/50 px-3 py-1 text-xs font-semibold text-purple-300 hover:bg-purple-500/10">
            Editar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DataTableComplaints;
