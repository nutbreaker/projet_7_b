// https://nextjs.org/docs/app/getting-started/fetching-data#sharing-data-with-context-and-reactcache
import { cache } from 'react';
import { apiClient } from './api-client';
import type { Projects, Project, PostProject } from '@/types/api.types';

export const projects = cache((token: string) => {
    return apiClient<Projects>('/projects', {
        method: 'GET',
        token
    });
});

export const postProjects = cache((token: string, project: PostProject) => {
    return apiClient<Project>('/projects', {
        method: 'POST',
        token,
        body: JSON.stringify(project)
    });
});