'use client';

import { obtenerComentarios } from '@/app/actions';
import { MoreHorizontal, Phone } from 'lucide-react';

const UsersComments = () => {
  // const [resultados, setResultados] = React.useState<string[]>([]);

  // const onSubmit = async (event: React) => {
  //   event.preventDefault();

  //   const payload = {
  //     commentarios: users?.map((u) => u.comments) || [],
  //   };

  //   const resultadosBack = await obtenerComentarios(payload);

  //   if (resultadosBack.success) {
  //     setResultados(resultadosBack.comments.map((c) => c.commentarios));
  //   }
  // };

  // const users = useQuery(api.users.getComments);

  return (
    <div className="flex h-full w-full max-w-xl flex-col rounded-2xl border border-slate-800 bg-slate-950/60 pt-3">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex flex-row gap-5 flex-1">
          <div className="flex flex-row gap-5 w-full ">
            <div className="h-15 w-15 rounded-full bg-slate-700" />
            <div className="">
              <h2 className="text-xl text-bold ">Edwind Jhonson</h2>
              <p>1-Bedrooom Apartment, 45m </p>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center ">
            <Phone
              className="bg-gray-500 p-2 h-10 w-10 rounded-lg"
              color="black"
            />
            <MoreHorizontal
              className="bg-gray-500 p-2 h-10 w-10  rounded-lg"
              color="black"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 border">Este es el chat</div>
    </div>
  );
  // return (
  //   <div className="flex h-full flex-col gap-3">
  //     <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/60 p-3 space-y-3">
  //       {users && users.length > 0 ? (
  //         users.map((user) => (
  //           <div key={user._id} className="flex items-start gap-2">
  //             <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-slate-700 text-[10px] font-semibold uppercase text-slate-100 flex items-center justify-center">
  //               {user.name?.[0] ?? 'U'}
  //             </div>
  //             <div className="max-w-[80%] rounded-2xl bg-slate-800 px-3 py-2 text-xs text-slate-100 shadow">
  //               <p className="text-[11px] font-medium text-slate-300">
  //                 {user.name}
  //               </p>
  //               <p className="mt-0.5 leading-relaxed text-slate-100 whitespace-pre-line">
  //                 {user.comments}
  //               </p>
  //             </div>
  //           </div>
  //         ))
  //       ) : (
  //         <p className="text-xs text-slate-500">
  //           Todavía no hay mensajes en el chat.
  //         </p>
  //       )}
  //       {resultados.length > 0 && (
  //         <>
  //           {resultados.map((comentario, index) => (
  //             <div key={index} className="flex justify-end">
  //               <div className="max-w-[80%] rounded-2xl bg-cyan-500 px-3 py-2 text-xs text-slate-950 shadow">
  //                 <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-50/80">
  //                   IA
  //                 </p>
  //                 <p className="mt-0.5 leading-relaxed whitespace-pre-line">
  //                   {comentario}
  //                 </p>
  //               </div>
  //             </div>
  //           ))}
  //         </>
  //       )}
  //     </div>
  //     <form className="mt-1" onSubmit={onSubmit}>
  //       <button
  //         type="submit"
  //         className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-400/40"
  //       >
  //         Generar respuestas de IA
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default UsersComments;
