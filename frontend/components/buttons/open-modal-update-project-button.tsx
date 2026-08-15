'use client';

import OpenModalButton from "./open-modal-button";

import styles from './open-modal-update-project-button.module.css';

export default function OpenModalUpdateProjectButton({ className, modalId }: { className?: string, modalId: string }) {

    return (<OpenModalButton
        modalId={modalId}
        className={`${styles['update-project-button']} body-s-dark-orange ${className || ''}`}
        label={'Modifier'} />)
}