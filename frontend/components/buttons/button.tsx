import styles from './button.module.css';

type ButtonProps = {
    className?: string
    disabled?: boolean;
    children: React.ReactNode;
    isPending?: boolean;
};

export default function Button({
    className ='',
    disabled = false,
    children,
    isPending = false,
}: ButtonProps) {

    return (
        <button
            className={`body-m-neutral-white ${styles.button} ${isPending && styles['button-waiting']} ${className}`}
            disabled={disabled}>{children}</button>
    );
}