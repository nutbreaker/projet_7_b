import styles from '@/components/modal/modal.module.css';

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