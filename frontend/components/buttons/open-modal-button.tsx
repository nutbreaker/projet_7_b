'use client';

import Button from "./button";

export default function OpenModaltButton({ className, label, modalId }: { className ?: string, label: string, modalId: string }) {
    const open = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const createProjectModal = document.getElementById(modalId) as HTMLDialogElement | null;

        createProjectModal?.showModal();
    };

    return <Button className={className} onClickHandler={open}>{label}</Button>
}