// https://nextjs.org/docs/app/getting-started/fetching-data#sharing-data-with-context-and-reactcache
import { cache } from 'react';
import { apiClient } from './api-client';
import type { Tasks } from '@/types/api.types';

export const userSearch = cache((token: string, query: string) => {
    const url = new URL('/users/search');

    url.searchParams.append('query', query);

    return apiClient<Tasks>(url, {
        method: 'GET',
        token
    });
});