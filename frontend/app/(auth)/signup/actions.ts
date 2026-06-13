'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// https://nextjs.org/docs/app/guides/forms

export async function handleSignup(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            const { message, data: {
                errors: [{ message: fieldMessage }] = [{}]
            } = {} } = json;
            return {
                error: `${message}. ${fieldMessage}` || 'Une erreur est survenue lors de l\'inscription.',
                fields: { email }
            };
        }

        const cookieStore = await cookies();
        cookieStore.set('session_token', json.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

    } catch (error: any) {
        console.error('Erreur handleSignup:', error);
        // throw error;

        return {
            error: error.message || 'Une erreur imprévue s\'est produite veuillez réessayer.',
            fields: { email }
        };
    }

    redirect('/dashboard');
}