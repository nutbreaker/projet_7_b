'use client';

import OpenModalButton from "./open-modal-button";

import styles from './ia-button.module.css';

export default function OpenModalIAButton({ className, modalId }: { className?: string, modalId: string }) {

    return (<OpenModalButton
        modalId={modalId}
        className={`${styles['ia-button']} ${className || ''} `}
        label={'IA'} />)
}