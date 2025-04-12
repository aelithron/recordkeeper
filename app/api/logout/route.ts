import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('auth', '', { path: '/', expires: new Date(0) });
  return res;
}