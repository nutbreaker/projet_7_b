import Image from 'next/image';

export default function Footer() {

    return (
        <footer>
            <div className="flex justify-between place-items-center max-w-[1440px] h-[68px] mx-auto pl-[30px] pr-[54px] bg-(--neutral-white)">
            <Image src="/assets/logo-black.svg" alt="Abricot logo noir" width={101} height={12.86} />
            Abricot 2025
            </div>
        </footer>
    )

}