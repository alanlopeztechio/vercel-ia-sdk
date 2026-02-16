'use client';

import UsersComments from '@/../components/UsersComments';

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-4 py-8">
      <UsersComments />
    </main>
  );
}
