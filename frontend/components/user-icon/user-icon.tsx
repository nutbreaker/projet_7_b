import Link from 'next/link';
import { nameFormatter } from '@/utils/name.formatter';

import styles from './user-icon.module.css';

type UserIconProps = {
    href: string,
    userName: string,
    isActive: boolean
}

export default function UserIcon({
    href,
    userName,
    isActive = false
}: UserIconProps) {
    const userNameInitials = nameFormatter(userName);
    const linkActiveClass = isActive && styles['user-icon-link-active'] || '';

    return (
        <Link href={href}
            className={`
                 ${styles['user-icon-link']}
                 ${linkActiveClass}`}>{userNameInitials}</Link>
    );
}