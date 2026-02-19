'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import ComplaintsHeader from './ComplaintsHeader';
import ComplaintsTable from './ComplaintsTable';
import BtnCreateSolution from './BtnCreateSolution';

const ComplaintsView = () => {
  const complaints = useQuery(api.complaint.getComplaint);

  return (
    <div className="w-full h-full bg-gradient-to-br px-4 py-5 from-slate-900 via-slate-950 to-slate-900">
      <ComplaintsHeader />
      <ComplaintsTable complaints={complaints || []} />
      <BtnCreateSolution />
    </div>
  );
};

export default ComplaintsView;
