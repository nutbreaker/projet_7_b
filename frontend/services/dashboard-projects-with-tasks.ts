// https://nextjs.org/docs/app/getting-started/fetching-data#sharing-data-with-context-and-reactcache
import { cache } from 'react';
import { apiClient } from './api-client';
import type { Projects } from '@/types/api.types';

export const dashboardProjectsWithTasks = cache((token: string) => {
    return apiClient<Projects>('/dashboard/projects-with-tasks', {
        method: 'GET',
        token
    });
});