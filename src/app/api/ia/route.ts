import { google } from '@ai-sdk/google';
import { generateText, Output, stepCountIs, tool } from 'ai';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { NextResponse } from 'next/server';
import z from 'zod';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export async function GET() {
  // try {
  //   // Log the steps taken by the model
  //   console.log('Steps taken by the model:', steps);
  //   return NextResponse.json({
  //     success: true,
  //     text,
  //     steps: steps.length,
  //     response: response.messages[0].content,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json({ success: false });
  // }

  return NextResponse.json({
    hola: 'mundo',
  });
}
