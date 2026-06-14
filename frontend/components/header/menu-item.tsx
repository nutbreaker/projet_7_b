import Link from 'next/link';
import Image from 'next/image';
import styles from './menu-item.module.css';

type MenuItemProps = {
    textContent: string;
    href: string;
    imgSrc: string;
    imgAlt: string;
    isPathActive: boolean;
}

export default function MenuItem({ textContent, href, imgSrc, imgAlt, isPathActive }: MenuItemProps) {
    return (
        <Link
            className={`
                ${styles['menu-link']}
                ${isPathActive && styles['menu-link-active']}
            `}
            href={href}>
            <Image src={imgSrc} alt={imgAlt} width={24} height={24} />
            {textContent}
        </Link>
    );
}