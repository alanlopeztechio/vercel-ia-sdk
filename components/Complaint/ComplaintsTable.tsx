'use client';

import { useState } from 'react';
import { Doc, Id } from '../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import BtnCreateSolution from './BtnCreateSolution';

interface ComplaintsTableProps {
  complaints: Doc<'complaints'>[];
}

const ComplaintsTable = ({ complaints }: ComplaintsTableProps) => {
  const updateComplaint = useMutation(api.complaint.updateComplaint);
  const deleteComplaint = useMutation(api.complaint.deleteComplaint);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState('');
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const startEdit = (id: string, currentComment: string) => {
    setEditingId(id);
    setEditingComment(currentComment);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingComment('');
  };

  const handleSave = async (id: string) => {
    if (!editingComment.trim()) return;
    await updateComplaint({
      id: id as Id<'complaints'>,
      comment: editingComment,
    });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar este reclamo?')) return;
    setIsDeletingId(id);
    try {
      await deleteComplaint({ id: id as Id<'complaints'> });
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col p-5 m-3 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="border-b border-gray-700 p-3 text-left text-slate-300">
                Título
              </th>
              <th className="border-b border-gray-700 p-3 text-left text-slate-300">
                Comentario
              </th>
              <th className="border-b border-gray-700 p-3 text-left text-slate-300">
                Id Compra
              </th>
              <th className="border-b border-gray-700 p-3 text-left text-slate-300">
                Id Usuario
              </th>
              <th className="border-b border-gray-700 p-3 text-center text-slate-300">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {complaints && complaints.length > 0 ? (
              complaints.map((item) => {
                const rowId = item._id.toString();
                const isEditing = editingId === rowId;
                return (
                  <tr key={rowId} className="text-center">
                    <td className="text-blue-100 p-3 border-b border-gray-800 text-left">
                      {item.title}
                    </td>
                    <td className="text-blue-100 p-3 border-b border-gray-800 text-left">
                      {isEditing ? (
                        <textarea
                          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-2 py-1 text-xs text-slate-100 shadow-inner outline-none ring-0 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                          rows={3}
                          value={editingComment}
                          onChange={(e) => setEditingComment(e.target.value)}
                        />
                      ) : (
                        item.comment
                      )}
                    </td>
                    <td className="text-blue-100 p-3 border-b border-gray-800 text-left">
                      {item.idPurchase}
                    </td>
                    <td className="text-blue-100 p-3 border-b border-gray-800 text-left">
                      {item.idUser}
                    </td>
                    <td className="text-blue-100 p-3 border-b border-gray-800">
                      {isEditing ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleSave(rowId)}
                            className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-500"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-lg border border-slate-600 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(rowId, item.comment)}
                            className="rounded-lg border border-purple-500/60 px-3 py-1 text-xs font-medium text-purple-200 hover:bg-purple-900/40"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(rowId)}
                            disabled={isDeletingId === rowId}
                            className="rounded-lg border border-red-500/60 px-3 py-1 text-xs font-medium text-red-300 hover:bg-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isDeletingId === rowId
                              ? 'Eliminando...'
                              : 'Eliminar'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-gray-500 border-b border-gray-800"
                >
                  No hay reclamos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintsTable;
