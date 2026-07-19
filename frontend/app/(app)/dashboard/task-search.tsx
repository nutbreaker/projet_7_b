'use client';

import Input from '@/components/form-element/input';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

import styles from './page.module.css';

export default function TaskSearch({ defaultValue }: { defaultValue: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        // https://react.dev/reference/react/useTransition
        // avoid blocking render, maybe add debouncing to avoid blasting the server?
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <Input
            id='task-search'
            type='text'
            defaultValue={defaultValue}
            inputChangeHandler={handleChangeSearch}
            className={styles['search']}
            placeholder='Rechercher une tâche'
        />
    );
}