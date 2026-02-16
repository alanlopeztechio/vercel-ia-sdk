import React from 'react';
import { Doc } from '../../convex/_generated/dataModel';

interface ReportProps {
  datos: string[];
}

const Report: React.FC<ReportProps> = ({ datos }) => {
  return (
    <div>
      {datos &&
        datos.map((item, index) => (
          <div
            key={index}
            className="mt-4 mx-8 p-4 border rounded-lg bg-indigo-950 text-indigo-200"
          >
            <h3 className="text-lg font-medium mb-2">Reporte {index + 1}</h3>
            <p>{item}</p>
          </div>
        ))}
    </div>
  );
};

export default Report;
