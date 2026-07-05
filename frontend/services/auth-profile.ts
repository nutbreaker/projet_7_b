// https://nextjs.org/docs/app/getting-started/fetching-data#sharing-data-with-context-and-reactcache
import { cache } from 'react';
import { apiClient } from './api-client';
import type { User } from '@/types/api.types';

export const authProfile = cache((token: string) => {
    return apiClient<User>('/auth/profile', {
        method: 'GET',
        token
    });
});