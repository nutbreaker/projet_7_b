import Link from 'next/link';
import styles from './chip.module.css';

type ChipProps = {
    type: 'tasks' | 'kanban' | 'projects';
    href?: string;
    className?: string;
    children: React.ReactNode;
};

export default function Chip({type, href, className ='', children}: ChipProps){

    const hrefValue = href || `?${type}`;
    const classValue = styles[`chip-${type}`];

    return (<Link className={`${styles['chip']} body-s-dark-orange ${classValue} ${className}`} href={hrefValue}>{children}</Link>)
}