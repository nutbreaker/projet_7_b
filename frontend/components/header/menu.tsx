// Without this line it will throw: importing a module that depends on `usePathname` into a React Server Component module
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuItem from '@/components/header/menu-item';

export default function Menu() {
    // https://nextjs.org/docs/app/api-reference/functions/use-pathname
    const pathname = usePathname();
    const isPathActive = (href: string) => pathname === href;


    return (
        <nav className="grow" aria-label="Menu principal">
            <ul className="flex place-items-center gap-[16px]">
                <li className="ml-auto">
                    <MenuItem textContent="Tableau de bord" href="/dashboard" imgSrc="/assets/dashboard-icon.svg" imgAlt="Icône Tableau de bord" isPathActive={isPathActive('/dashboard')} />
                </li>
                <li className="mr-auto">
                    <MenuItem textContent="Projets" href="/project" imgSrc="/assets/projects-icon.svg" imgAlt="Icône projets" isPathActive={isPathActive('/project')} />
                </li>
                <li>
                    <Link href="/profile" className={`flex place-items-center place-content-center w-[65px] h-[65px] rounded-full text-(--neutral-grey-950) hover:text-(--neutral-white)
                        ${isPathActive('/profile')
                            ? 'bg-(--brand-dark-orange) text-(--neutral-white)'
                            : 'bg-(--brand-light-orange) hover:bg-(--brand-dark-orange)'
                        }`}>AD</Link>
                </li>
            </ul>
        </nav>
    );
}