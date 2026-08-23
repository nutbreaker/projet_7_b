'use server';

import { postProjects } from '@/services/projects';
import { getSessionToken } from '@/services/session';
import { User } from '@/types/api.types';
import { redirect } from 'next/navigation';

// https://nextjs.org/docs/app/guides/forms

export async function handleCreateProject(prevState: unknown, formData: FormData) {
    let newProjectId: string | undefined = undefined;

    try {
        const token = await getSessionToken() || '';
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const contributors = formData.getAll('contributors') as unknown as User[];

        const newProject = await postProjects(token, {
            name,
            description,
            contributors
        });

        if (!newProject.success) {
            return {
                error: newProject.message || 'Une erreur est survenue lors de la création du projet.',
                details: newProject?.data?.errors || [],
                fields: {
                    name,
                    description,
                    contributors
                }
            };
        }

        newProjectId = newProject.data.project.id;

    } catch (error: unknown) {
        const err = error as { message?: string; fields?: [] };
        // https://nextjs.org/docs/app/api-reference/file-conventions/error
        return {
            error: err.message || 'Une erreur imprévue s\'est produite veuillez réessayer.',
            fields: err.fields
        };
    }

    if (newProjectId) {
        redirect(`/projects/${newProjectId}`);
    } else {
        redirect('/dashboard');
    }
}