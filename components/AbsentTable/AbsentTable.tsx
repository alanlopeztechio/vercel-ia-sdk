import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const AbsentTable = () => {
  const results = useQuery(api.padres.getUserTable);

  return (
    <div className="flex flex-col p-5 m-3">
      <table>
        <thead>
          <tr className="">
            <th className="border-b border-gray-400 p-3">Padre</th>
            <th className="border-b border-gray-400 p-3">Estudiante</th>
            <th className="border-b border-gray-400 p-3">Grado</th>
            <th className="border-b border-gray-400 p-3">
              Dias de inasistencia
            </th>
            <th className="border-b border-gray-400 p-3">
              Fecha de inasistencia
            </th>
          </tr>
        </thead>
        <tbody>
          {results && results.length > 0 ? (
            results.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="text-blue-100 p-3 border-b border-gray-400">
                  {item.nameFather}
                </td>
                <td className="text-blue-100 p-3 border-b border-gray-400">
                  {item.nameStudent}
                </td>
                <td className="text-blue-100 p-3 border-b border-gray-400">
                  {item.grade}
                </td>
                <td className="text-blue-100 p-3 border-b border-gray-400">
                  {item.absentDays}
                </td>
                <td className="text-blue-100 p-3 border-b border-gray-400">
                  {new Date(item.dateAbsent).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AbsentTable;
