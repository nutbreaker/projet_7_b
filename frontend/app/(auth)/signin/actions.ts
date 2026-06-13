'use server';

import { setSessionCookie } from '@/services/session';
import { redirect } from 'next/navigation';

// https://nextjs.org/docs/app/guides/forms

export async function handleSignin(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            // throw new Error(json.message || 'Une erreur est survenue lors de la connexion.');

            return {
                error: json.message || 'Une erreur est survenue lors de la connexion.',
                fields: { email }
            };
        }

        await setSessionCookie(json?.data?.token);
    } catch (error: any) {
        console.error('Erreur handleSignin:', error);
        // throw error;

        return {
            error: error.message || 'Une erreur imprévue s\'est produite veuillez réessayer.',
            fields: { email }
        };
    }

    redirect('/dashboard');
}