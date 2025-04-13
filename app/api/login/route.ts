import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
  if (process.env.WEBEDITOR !== 'true') {
    return NextResponse.json({ error: 'Web editor is disabled!' }, { status: 403 });
  }
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
    console.log(`[auth] Successful login attempt at ${Date.now().toString()} from IP`, ip);
    return res;
  }
  console.log(`[auth] Failed login attempt at ${Date.now().toString()} from IP`, ip);
  return NextResponse.json({ success: false }, { status: 401 });
}