import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import DataTableComplaints from "./DataTableComplaints";
import NoContentTable from "../NoContentTable";

interface ComplaintTableProps {
  complaints: Doc<"complaints">[];
  searchQuery: string;
}

const ComplaintTable: React.FC<ComplaintTableProps> = ({
  complaints,
  searchQuery,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl" />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Título
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Comentario
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  ID Usuario
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  ID Compra
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
            {complaints.length > 0 ? (
              searchQuery.length > 0 ? (
                complaints
                  .filter(
                    (item) =>
                      item.title
                        .toLocaleLowerCase()
                        .includes(searchQuery.toLocaleLowerCase()) ||
                      item.comment
                        .toLocaleLowerCase()
                        .includes(searchQuery.toLocaleLowerCase()),
                  )
                  .map((item) => (
                    <DataTableComplaints key={item._id} data={item} />
                  ))
              ) : (
                complaints.map((item) => (
                  <DataTableComplaints key={item._id} data={item} />
                ))
              )
            ) : (
              <NoContentTable columns={5} message="Sin registro de reclamos" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintTable;
