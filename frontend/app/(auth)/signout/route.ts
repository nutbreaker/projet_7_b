// https://nextjs.org/docs/app/guides/caching-without-cache-components#route-segment-config
// export const dynamic = 'force-dynamic'; // Meh ...

import { deleteSessionCookie } from '@/services/session';
import { redirect } from 'next/navigation';

// https://nextjs.org/docs/app/getting-started/route-handlers

export async function GET() {
    await deleteSessionCookie();

    redirect('/signin');
}