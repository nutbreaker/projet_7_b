// https://nextjs.org/docs/app/getting-started/fetching-data#sharing-data-with-context-and-reactcache
import { cache } from 'react';
import { apiClient } from './api-client';
import type { Tasks } from '@/types/api.types';

export const dashboardAssignedTasks = cache((token: string) => {
    return apiClient<Tasks>('/dashboard/assigned-tasks', {
        method: 'GET',
        token
    });
})