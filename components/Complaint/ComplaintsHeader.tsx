import Link from 'next/link';

const ComplaintsHeader = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-start p-5">
        <h3 className="block text-xl font-medium text-slate-300">
          Registro de reclamos
        </h3>
        <p className="text-sm text-slate-400">
          Gestiona los reclamos asociados a usuarios y compras.
        </p>
      </div>
      <div className="flex items-center gap-4 pr-6">
        <Link href="/" className="text-sm text-slate-300 hover:text-purple-300">
          Volver a usuarios
        </Link>
        <Link href="/complaints/create">
          <button className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:from-purple-400 hover:to-pink-500 hover:shadow-purple-400/40">
            Nuevo reclamo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComplaintsHeader;
