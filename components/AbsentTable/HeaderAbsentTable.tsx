import React from "react";

const HeaderAbsentTable = () => {
  return (
    <div className="flex justify-around items-center">
      <div className="text-start ml-5 p-5">
        <h3 className="block text-xl font-medium text-slate-300">
          Registro de ausencias
        </h3>
      </div>
      <div className="align-middle justify-center" id="search-father">
        <label
          htmlFor="father'filter"
          className="tracking-wide text-slate-300 text-lg font-medium mx-2"
        >
          Filtrar por padre
        </label>
        <input
          className="w-3xs rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-3 mx-2 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500"
          type="search"
          name="search-student"
          id="searchFather"
          placeholder="Ingresa el nombre del padre"
        />
      </div>
      <div className="mr-5" id="filters-father">
        <div className="flex flex-row gap-4 items-center" id="filter-status">
          <label
            htmlFor="filter-status-label"
            className="block tracking-wide text-slate-300"
          >
            <h3 className="text-lg font-medium">Grado</h3>
          </label>
          <select
            id="grade"
            className="w-min rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
          >
            <option value="">Selecciona un grado</option>
            <option value="1">Primero</option>
            <option value="2">Segundo</option>
            <option value="3">Tercero</option>
            <option value="4">Cuarto</option>
            <option value="5">Quinto</option>
            <option value="6">Sexto</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HeaderAbsentTable;
