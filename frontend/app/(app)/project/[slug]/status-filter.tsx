'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

import styles from './page.module.css';

export default function StatusFilter({ defaultValue }: { defaultValue: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const handleChangeSearch = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set('status', value);
        } else {
            params.delete('status');
        }

        // https://react.dev/reference/react/useTransition
        // avoid blocking render, maybe add debouncing to avoid blasting the server?
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <select
            name="status"
            id="status"
            className={styles['status']}
            defaultValue={defaultValue}
            onChange={handleChangeSearch}
        >
            <option value="">Statut</option>
            <option value="TODO">A faire</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="DONE">Terminée</option>
            <option value="CANCELLED">Annulée</option>
        </select>
    );
}