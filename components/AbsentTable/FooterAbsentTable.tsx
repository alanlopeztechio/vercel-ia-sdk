import React, { useTransition } from 'react';
import { Doc } from '../../convex/_generated/dataModel';
import { obtenerComentarios } from '@/app/actions';

interface FooterAbsentTableProps {
  onChange: (value: string[]) => void;
  users: Doc<'padres'>[];
}

const FooterAbsentTable: React.FC<FooterAbsentTableProps> = ({
  onChange,
  users,
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-end mr-8">
      <div className="border rounded-xl border-purple-700 bg-purple-800 hover:bg-purple-950 text-purple-200 hover:text-purple-300">
        <button
          className="p-3"
          onClick={() => {
            startTransition(async () => {
              const results = await obtenerComentarios(users);

              onChange(results.comments);
            });
          }}
        >
          Crear reporte
        </button>
      </div>
    </div>
  );
};

export default FooterAbsentTable;
