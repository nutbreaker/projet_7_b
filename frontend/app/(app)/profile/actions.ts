'use server';

import { getSessionToken } from '@/services/session';
import { revalidatePath } from 'next/cache';
import { updateAuthProfile } from '@/services/auth-profile';

// FIXME fix backend to allow user's password update
// api inconsistency
// https://github.com/OpenClassrooms-Student-Center/dev-react-P10/blob/fe5fa162ce72cecee6584d0b87c23c7c15f8a69c/src/controllers/authController.ts#L320-L388

export async function handleProfile(prevState: unknown, formData: FormData) {
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const token = (await getSessionToken()) || '';

    try {
        const response = await updateAuthProfile(token, {
            name: `${firstName} ${lastName}`,
            email,
            password
        });

        if (!response.success) {
            return {
                ...response,
                message: response.message || 'Impossible de mettre à jour le profil'
            };
        }

        revalidatePath('/profile');

        return response;
    } catch {
        return {
            success: false as const,
            message: 'Une erreur imprévue s\'est produite veuillez réessayer.',
            error: 'UnexpectedError'
        };
    }
}