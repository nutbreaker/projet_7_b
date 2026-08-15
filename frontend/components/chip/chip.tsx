import Link from 'next/link';
import styles from './chip.module.css';

type ChipProps = {
    type: 'tasks' | 'kanban' | 'projects' | 'calendar';
    href?: string;
    isActive?: boolean;
    className?: string;
    children: React.ReactNode;
};

export default function Chip({type, href, isActive = false, className ='', children}: ChipProps){

    const hrefValue = href || `?${type}`;
    const classValue = styles[`chip-${type}`];
    const classActive = isActive ? styles['chip-active'] : '';

    return (<Link className={`${styles['chip']} ${classActive} body-s-dark-orange ${classValue} ${className}`} href={hrefValue}>{children}</Link>)
}