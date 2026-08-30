// https://nextjs.org/docs/app/getting-started/fetching-data#sharing-data-with-context-and-reactcache
import { cache } from 'react';
import { apiClient } from './api-client';
import type { UserData } from '@/types/api.types';

export const authProfile = cache((token: string) => {
    return apiClient<UserData>('/auth/profile', {
        method: 'GET',
        token
    });
});

export const updateAuthProfile = cache((token: string, payload: { name: string, email: string, password?: string }) => {
    return apiClient<UserData>('/auth/profile', {
        method: 'PUT',
        token,
        body: JSON.stringify(payload)
    });
});