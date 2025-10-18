import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Match /projects/<id> where <id> is numeric, redirect to slug
  const match = pathname.match(/^\/projects\/(\d+)(\/?)(.*)$/);
  if (match) {
    const id = match[1];
    try {
      const apiUrl = new URL(`/api/projects/${id}`, url.origin).toString();
      const res = await fetch(apiUrl, { headers: { accept: 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        const title: string = data?.data?.title || '';
        const slug = title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
        if (slug) {
          const dest = new URL(`/projects/${slug}`, url.origin);
          return NextResponse.redirect(dest, 308);
        }
      }
    } catch {}
    // Fallthrough: if not found, continue to regular handling
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/projects/:path*'],
};

