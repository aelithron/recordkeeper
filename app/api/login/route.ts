import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
  }
  const { password } = await req.json();
  if (password === process.env.WEBEDITOR_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set('auth', password, {
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}