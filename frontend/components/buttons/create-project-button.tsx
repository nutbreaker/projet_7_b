'use client';

import Button from "./button";

export default function CreateProjectButton({ modalId }: { modalId: string }) {
    const open = (e) => {
        e.preventDefault();

        const createProjectModal = document.getElementById(modalId) as HTMLDialogElement | null;

        createProjectModal?.showModal();
    };

    return <Button onClickHandler={open}>+ Créer un projet</Button>
}