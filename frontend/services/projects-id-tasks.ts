// https://nextjs.org/docs/app/getting-started/fetching-data#sharing-data-with-context-and-reactcache
import { cache } from 'react';
import { apiClient } from './api-client';
import type { Project, Tasks } from '@/types/api.types';

/**
 * Get the tasks that belong to a project
 */
export const projectsIdTasks = cache((token: string, id: string) => {
    return apiClient<Tasks>(`/projects/${id}/tasks`, {
        method: 'GET',
        token
    });
});

/**
 * Get project by id
 */
export const projectById = cache((token: string, id: string) => {
    return apiClient<{project: Project}>(`/projects/${id}`, {
        method: 'GET',
        token
    });
});