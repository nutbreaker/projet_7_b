import styles from './ia-button.module.css';

export default function AIButton({
    ariaLabel = '',
    className = '',
    children,
}:
    {
        ariaLabel?: string,
        className?: string,
        children?: React.ReactNode
    }
) {
    return (<button className={` ${className || ''} ${styles['ia-button']}`} aria-label={ariaLabel || undefined}>{children}</button>)
}