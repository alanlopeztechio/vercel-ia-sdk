import React from "react";

const HeaderUserTable = () => {
  return (
    <div className="flex justify-around items-center">
      <div className="text-start p-5">
        <h3 className="block text-xl font-medium text-slate-300">
          Registro de usuarios
        </h3>
      </div>
      <div className="align-middle justify-center" id="div-search-user">
        <label
          htmlFor="searchUser"
          className="tracking-wide text-slate-300 text-lg font-medium mr-3"
        >
          Filtrar por usuario
        </label>
        <input
          className="w-3xs rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-3 ml-3 text-sm text-slate-100 shadow-inner outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 placeholder:text-slate-500"
          type="search"
          name="search-user"
          id="searchUser"
          placeholder="Ingresa el usuario"
        />
      </div>
    </div>
  );
};

export default HeaderUserTable;
