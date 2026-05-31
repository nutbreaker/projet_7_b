import Link from 'next/link';
import Image from 'next/image';

type MenuItemProps = {
    textContent: string;
    href: string;
    imgSrc: string;
    imgAlt: string;
    isPathActive: boolean;
}

export default function MenuItem({ textContent, href, imgSrc, imgAlt, isPathActive }: MenuItemProps) {
    return (
        <Link className={`group flex place-items-center place-content-center gap-[16px] w-[248px] h-[78px] rounded-[10px]  text-(--brand-dark-orange) hover:text-(--neutral-white)
        ${isPathActive
            ? 'bg-(--neutral-grey-950) text-(--neutral-white)'
            : 'bg-(--neutral-white) hover:bg-(--neutral-grey-950)'
        }
        `} href={href}>
            <Image className={`group-hover:invert group-hover:brightness-0 ${isPathActive ? 'invert brightness-0' : ''}`} src={imgSrc} alt={imgAlt} width={24} height={24} />
            {textContent}
        </Link>
    )
}