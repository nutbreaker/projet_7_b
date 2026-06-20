'use client';

import { useActionState } from 'react';
import { handleProfile } from './actions';
import styles from './profile.module.css';
import Error from '@/components/error/error';
import Button from '@/components/buttons/button';

type ProfileFormProps = {
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
    };
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [state, formAction, isPending] = useActionState(handleProfile, null);

    // api inconsistency
    // https://github.com/OpenClassrooms-Student-Center/dev-react-P10/blob/fe5fa162ce72cecee6584d0b87c23c7c15f8a69c/src/controllers/authController.ts#L320-L388
    const {
        email,
        name = '',
        password = ''
    } = user;
    const [firstName, lastName] = name.split(' '); // meh...

    return (
        <form className={styles['profile-form']} action={formAction}>

            <div className={styles['form-header']}>
                <h1 className={`${styles['profile-title']} headings-h5-neutral-grey-800 `}>Mon compte</h1>
                <h2 className={`${styles['profile-subtitle']} body-m-neutral-grey-600`}>{name}</h2>
            </div>

            <div className={styles['form-body']}>
                <label className='body-s-black' htmlFor="last-name">
                    Nom
                    <input className='body-xs-neutral-grey-600' type="text" name="last-name" id="last-name" defaultValue={lastName} />
                </label>
                <label className='body-s-black' htmlFor="first-name">
                    Prénom
                    <input className='body-xs-neutral-grey-600' type="text" name="first-name" id="first-name" defaultValue={firstName} />
                </label>
                <label className='body-s-black' htmlFor="email">
                    Email
                    <input className='body-xs-neutral-grey-600' type="text" name="email" id="email" defaultValue={email} />
                </label>
                <label className='body-s-black' htmlFor="password">
                    Mote de passe
                    <input className='body-xs-neutral-grey-600' type="password" name="password" id="password" placeholder='●●●●●●●●●●●' defaultValue={password} />
                </label>
            </div>

            <Error success={state?.success} message={state?.message} data={state?.data} />

            <div className={styles['form-footer']}>
                <Button isPending={isPending} disabled={isPending}>Modifier les informations</Button>
            </div>
        </form>
    );
}