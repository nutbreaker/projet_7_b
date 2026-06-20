import styles from './button.module.css';

type ButtonProps = {
    disabled?: boolean;
    children: React.ReactNode;
    isPending?: boolean;
};

export default function Button({
    disabled = false,
    children,
    isPending = false,
}: ButtonProps) {

    return (
        <button
            className={`body-m-neutral-white ${styles.button} ${isPending && styles['button-waiting']} `}
            disabled={disabled}>{children}</button>
    );
}