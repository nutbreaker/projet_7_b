'use client';

import OpenModalButton from "./open-modal-button";

import styles from './open-modal-project-task-button.module.css';

export default function OpenModalProjectTaskButton({ modalId, label, className }: { className?: string, modalId: string, label: string }) {

    return (<OpenModalButton
        modalId={modalId}
        className={`${styles['project-task-button']} body-l-black ${className || ''}`}
        label={label} />)
}