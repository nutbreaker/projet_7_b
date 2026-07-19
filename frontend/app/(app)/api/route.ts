import { getSessionToken } from '@/services/session';
import { userSearch } from '@/services/user-search';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // https://nextjs.org/docs/app/api-reference/file-conventions/route#url-query-parameters
    const query = request.nextUrl.searchParams.get('query') || '';
    const token = await getSessionToken() || '';
    const result = await userSearch(token, query.toLowerCase());

    if (!result.success) Response.json([]);

    return Response.json(result?.data?.users);
}
