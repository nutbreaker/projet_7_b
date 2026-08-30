import 'react';

import styles from '@/components/modal/modal.module.css';

// fix the TS missing properties when building the project
declare module 'react' {
    interface ButtonHTMLAttributes<T> {
        commandfor?: string;
        command?: string;
    }
}

type ModalProps = {
    id: string,
    className?: string,
    children: React.ReactNode,
    onClose?: React.ReactEventHandler<HTMLDialogElement> | undefined,
    open?: boolean
};

export default function Modal({ id, className = '', children, onClose, open = false }: ModalProps) {
    return (
        <dialog id={id} className={`${styles['modal']} ${className}`} open={open} onClose={onClose}>
            <button
                className={`${styles['modal-close-button']}`}
                commandfor={id}
                command={'close'}
                aria-label="Fermer" />
            {children}
        </dialog>
    )
}