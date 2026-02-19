import { fetchQuery } from 'convex/nextjs';
import { NextResponse } from 'next/server';
import { api } from '../../../../convex/_generated/api';

export async function GET(request: Request) {
  const results = await fetchQuery(api.complaint.getComplaint);
  return NextResponse.json({ message: 'Hello from the users API!', results });
}
