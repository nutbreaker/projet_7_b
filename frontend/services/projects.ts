// https://nextjs.org/docs/app/getting-started/fetching-data#sharing-data-with-context-and-reactcache
import { cache } from 'react';
import { apiClient } from './api-client';
import type { Projects, Project, PostProject, PostTask, Task, Comment, ProjectData } from '@/types/api.types';

export const projects = cache((token: string) => {
    return apiClient<Projects>('/projects', {
        method: 'GET',
        token
    });
});

export const postProjects = cache((token: string, project: PostProject) => {
    return apiClient<ProjectData>('/projects', {
        method: 'POST',
        token,
        body: JSON.stringify(project)
    });
});

export const updateProjects = cache((token: string, project: Project) => {
    return apiClient<Project>(`/projects/${project.id}`, {
        method: 'PUT',
        token,
        body: JSON.stringify(project)
    });
});

export const updateProjectTask = cache((token: string, task: Task) => {
    return apiClient<Task>(`/projects/${task.projectId}/tasks/${task.id}`, {
        method: 'PUT',
        token,
        body: JSON.stringify(task)
    });
});

export const deleteProjectsTask = cache((token: string, task: Task) => {
    return apiClient<Task>(`/projects/${task.projectId}/tasks/${task.id}`, {
        method: 'DELETE',
        token,
        body: JSON.stringify(task)
    });
});

export const postTask = cache((token: string, task: PostTask) => {
    return apiClient<Task>(`/projects/${task.projectId}/tasks`, {
        method: 'POST',
        token,
        body: JSON.stringify(task)
    });
});

export const postComment = cache((token: string, { projectId, taskId, content }: { projectId: string, taskId: string, content: string }) => {
    return apiClient<Comment>(`/projects/${projectId}/tasks/${taskId}/comments`, {
        method: 'POST',
        token,
        body: JSON.stringify({ content: content })
    });
});