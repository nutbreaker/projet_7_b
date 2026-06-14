// Without this line it will throw: importing a module that depends on `usePathname` into a React Server Component module
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuItem from '@/components/header/menu-item';
import styles from './menu.module.css';

export default function Menu() {
    // https://nextjs.org/docs/app/api-reference/functions/use-pathname
    const pathname = usePathname();
    const isPathActive = (href: string) => pathname === href;


    return (
        <nav className={styles.menu} aria-label="Menu principal">
            <ul>
                <li className={styles['item-left']}>
                    <MenuItem textContent="Tableau de bord" href="/dashboard" imgSrc="/assets/dashboard-icon.svg" imgAlt="Icône Tableau de bord" isPathActive={isPathActive('/dashboard')} />
                </li>
                <li className={styles['item-right']}>
                    <MenuItem textContent="Projets" href="/project" imgSrc="/assets/projects-icon.svg" imgAlt="Icône projets" isPathActive={isPathActive('/project')} />
                </li>
                <li>
                    <Link href="/profile"
                        className={`
                            ${styles['profile-link']}
                            ${
                                isPathActive('/profile') && styles['profile-link-active']
                            }`}>AD</Link>
                </li>
            </ul>
        </nav>
    );
}