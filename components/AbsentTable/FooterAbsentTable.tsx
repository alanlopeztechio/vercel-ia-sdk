import React from "react";

const FooterAbsentTable = () => {
  return (
    <div className="flex justify-end mr-8">
      <div className="border rounded-xl border-purple-700 bg-purple-800 hover:bg-purple-950 text-purple-200 hover:text-purple-300">
        <button
          className="p-3"
          onClick={() => {
            alert("");
          }}
        >
          Crear reporte
        </button>
      </div>
    </div>
  );
};

export default FooterAbsentTable;
