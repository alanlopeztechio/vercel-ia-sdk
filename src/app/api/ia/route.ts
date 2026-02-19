import { NextResponse } from 'next/server';
import { createReports } from '@/app/actions';

export async function GET() {
  try {
    // Log the steps taken by the model
    const response = await createReports();
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
