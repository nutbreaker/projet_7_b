// https://nextjs.org/docs/app/guides/caching-without-cache-components#route-segment-config
// export const dynamic = 'force-dynamic'; // Meh ...

import { deleteSessionCookie } from '@/services/session';
import { NextResponse } from 'next/server';

// https://nextjs.org/docs/app/getting-started/route-handlers

export async function GET(request: Request) {
    await deleteSessionCookie();

    const redirectUrl = new URL('/signin', request.url);

    return NextResponse.redirect(redirectUrl);
}