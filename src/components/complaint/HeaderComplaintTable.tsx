import React from "react";

interface HeaderComplaintTableProps {
  onChange: (searchQuery: string) => void;
}

const HeaderComplaintTable = ({ onChange }: HeaderComplaintTableProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur mb-6">
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl" />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-2">
            Administración
          </p>
          <h2 className="text-2xl font-semibold text-slate-50">
            Registro de reclamos
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Gestiona y supervisa todos los reclamos registrados
          </p>
        </div>
        <div className="flex flex-col gap-2 md:min-w-sm">
          <label
            htmlFor="searchComplaint"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
          >
            Filtrar por reclamo
          </label>
          <div className="relative">
            <input
              type="search"
              id="searchComplaint"
              name="search-complaint"
              onChange={handleSearch}
              placeholder="Busca por título o comentario..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 pl-10 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500 hover:border-slate-600"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComplaintTable;
