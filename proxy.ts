import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/edit') && (req.cookies.get('auth')?.value !== process.env.WEBEDITOR_PASSWORD)) {
    return NextResponse.redirect(new URL('/editor-login', req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/edit/:path*'],
}