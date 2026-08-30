'use server';

import { getSessionToken } from '@/services/session';
import { redirect } from 'next/navigation';


import { deleteProjectsTask, postComment, postTask, updateProjects, updateProjectTask } from "@/services/projects";
import { Project, Task, TaskAssigneeIds, TaskStatus } from '@/types/api.types';


export async function handleAddComment(prevState: unknown, formData: FormData) {
    const projectId = formData.get('project-id') as string;
    const taskId = formData.get('task-id') as string;
    const content = formData.get('comment-content') as string;
    const redirectUrl = formData.get('redirect-url') as string;

    try {
        const token = await getSessionToken() || '';
        const postedComment = await postComment(token, {
            projectId,
            taskId,
            content,
        });

        if (!postedComment.success) {
            return {
                error: postedComment.message || `Une erreur est survenue lors de l'ajout du commentaire.`,
                details: postedComment?.data?.errors || [],
                fields: {
                    projectId,
                    taskId,
                    content,
                }
            };
        }
    } catch { }

    redirect(redirectUrl);
}

export async function handleUpdateProjectTask(prevState: unknown, formData: FormData) {

    const projectId = formData.get('project-id') as string;
    const id = formData.get('task-id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dueDate = formData.get('due-date') as string;
    const status = formData.get('task-status') as TaskStatus;
    const assigneeIds = formData.getAll('assignees') as unknown as TaskAssigneeIds;

    try {
        const token = await getSessionToken() || '';

        const updatedTask = await updateProjectTask(token, {
            id,
            projectId,
            title,
            description,
            dueDate,
            status,
            assigneeIds,
        } as Task);

        console.log(updatedTask);

        if (!updatedTask.success) {
            return {
                error: updatedTask.message || 'Une erreur est survenue lors de la mise à jour de la tâche.',
                details: updatedTask?.data?.errors || [],
                fields: {
                    title,
                    description,
                    dueDate,
                    assigneeIds,
                    status
                }
            };
        }
    } catch {

    }


    redirect(`/projects/${projectId}`);
}

export async function handleDeleteProjectTask(prevState: unknown, formData: FormData) {
    const projectId = formData.get('project-id') as string;
    const id = formData.get('task-id') as string;

    try {
        const token = await getSessionToken() || '';

        const deletedProject = await deleteProjectsTask(token, {
            id,
            projectId
        } as Task);

        if (!deletedProject.success) {
            return {
                error: deletedProject.message || 'Une erreur est survenue lors de la suppression de la tâche.',
                details: deletedProject?.data?.errors || [],
                fields: {
                    id,
                    projectId,
                }
            };
        }
    } catch {
        return {
            error: 'Une erreur imprévue s\'est produite veuillez réessayer.',
            details: [],
            fields: {
                id,
                projectId,
            }
        }
    }


    redirect(`/projects/${projectId}`);
}
export async function handleUpdateProject(prevState: unknown, formData: FormData) {
    const id = formData.get('project-id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    // FIXME fix backend to allow contributors update
    // api inconsistency
    // https://github.com/OpenClassrooms-Student-Center/dev-react-P10/blob/fe5fa162ce72cecee6584d0b87c23c7c15f8a69c/src/controllers/projectController.ts#L416-L419
    const contributors = formData.getAll('contributors') as unknown as TaskAssigneeIds;

    try {
        const token = await getSessionToken() || '';

        const updatedProject = await updateProjects(token, {
            id,
            name,
            description,
        } as Project);

        if (!updatedProject.success) {
            return {
                error: updatedProject.message || 'Une erreur est survenue lors de la mise à jour du projet.',
                details: updatedProject?.data?.errors || [],
                fields: {
                    name,
                    description,
                    contributors
                }
            };
        }
    } catch {
        return {
            error: 'Une erreur imprévue s\'est produite veuillez réessayer.',
            details: [],
            fields: {
                name,
                description,
                contributors
            }
        }
    }

    redirect(`/projects/${id}`);
}

export async function handleCreateTask(prevState: unknown, formData: FormData) {
    const projectId = formData.get('project-id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dueDate = formData.get('due-date') as string;
    // FIXME fix backend to allow setting the task status
    // api inconsistency
    // https://github.com/OpenClassrooms-Student-Center/dev-react-P10/blob/fe5fa162ce72cecee6584d0b87c23c7c15f8a69c/src/controllers/taskController.ts#L41-L47
    const status = formData.get('task-status') as TaskStatus;
    const assigneeIds = formData.getAll('assignees') as unknown as TaskAssigneeIds;

    try {
        const token = await getSessionToken() || '';

        // TODO extract this into its own service
        const newTask = await postTask(token, {
            projectId,
            title,
            description,
            dueDate,
            status,
            assigneeIds
        });

        if (!newTask.success) {

            return {
                error: newTask.message || 'Une erreur est survenue lors de la création de la tâche.',
                details: newTask?.data?.errors || [],
                fields: {
                    projectId,
                    title,
                    description,
                    dueDate,
                    status,
                    assigneeIds
                }
            };
        }
    } catch {
        return {
            error: 'Une erreur imprévue s\'est produite veuillez réessayer.',
            details: [],
            fields: {
                projectId,
                title,
                description,
                dueDate,
                status,
                assigneeIds
            }
        }
    }

    redirect(`/projects/${projectId}`);
}

