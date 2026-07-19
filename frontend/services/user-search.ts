// https://nextjs.org/docs/app/getting-started/fetching-data#sharing-data-with-context-and-reactcache
import { cache } from 'react';
import { apiClient } from './api-client';
import type { Users } from '@/types/api.types';

export const userSearch = cache((token: string, query: string) => {
    return apiClient<Users>(`/users/search?query=${query}`, {
        method: 'GET',
        token
    });
});