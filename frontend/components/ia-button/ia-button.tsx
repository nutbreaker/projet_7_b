import styles from './ia-button.module.css';

export default function AIButton({
    ariaLabel = '',
    className ='',
    disabled = false,
    children,
    isPending = false,
    onClickHandler
}) {
    return (<button className={` ${className || ''} ${styles['ia-button']}`} aria-label={ariaLabel || undefined}>{children}</button>)
}