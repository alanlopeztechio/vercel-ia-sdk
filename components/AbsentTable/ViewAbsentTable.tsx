import React, { useState } from 'react';
import HeaderAbsentTable from './HeaderAbsentTable';
import AbsentTable from './AbsentTable';
import FooterAbsentTable from './FooterAbsentTable';
import { Doc } from '../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Report from './Report';

const ViewAbsentTable = () => {
  const [datos, setDatos] = useState<string[] | null>(null);
  const results = useQuery(api.padres.getUserTable);
  return (
    <div className="w-full h-full bg-gradient-to-br px-4 py-5">
      <HeaderAbsentTable />
      <AbsentTable users={results || []} />
      <FooterAbsentTable
        onChange={(value) => setDatos(value)}
        users={results || []}
      />
      <Report datos={datos!} />
    </div>
  );
};

export default ViewAbsentTable;
