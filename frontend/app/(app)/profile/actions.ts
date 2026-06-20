'use server';

import { getSessionToken } from '@/services/session';
import { revalidatePath } from 'next/cache';

// https://github.com/OpenClassrooms-Student-Center/dev-react-P10/blob/fe5fa162ce72cecee6584d0b87c23c7c15f8a69c/src/controllers/authController.ts#L320-L388

export async function handleProfile(prevState: any, formData: FormData) {
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const email = formData.get('email');
    const password = formData.get('password');

    const token = await getSessionToken();
    // TODO extract this into its own service
    try {
        const response = await fetch('http://localhost:8000/auth/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: `${firstName} ${lastName}`,
                email,
                password
            }),
        });

        const json = await response.json();

        if (!response.ok) {
            console.log('ERROR', JSON.stringify(json));
            return {
                message: json.message || 'Impossible de mettre à jour le profil',
                ...json
            };
        }

        revalidatePath('/profile');

    } catch (error) {
        return { error: 'Une erreur imprévue s\'est produite veuillez réessayer.' }
    }
}