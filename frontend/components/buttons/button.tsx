import styles from './button.module.css';

type ButtonProps = {
    className?: string
    disabled?: boolean;
    children: React.ReactNode;
    isPending?: boolean;
    onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
    className ='',
    disabled = false,
    children,
    isPending = false,
    onClickHandler
}: ButtonProps) {

    return (
        <button
            className={`body-m-neutral-white ${styles.button} ${isPending && styles['button-waiting']} ${className}`}
            disabled={disabled} onClick={onClickHandler}>{children}</button>
    );
}