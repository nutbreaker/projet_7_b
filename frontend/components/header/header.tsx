import Link from 'next/link';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Menu from '@/components/header/menu';


export default async function Header() {
    // https://nextjs.org/docs/pages/guides/authentication#optimistic-checks-with-proxy-optional
    const isLoggedIn = (await cookies()).has('authToken');

    // at this stage there is no login
    if (false && !isLoggedIn) return null;

    return (
        <header>
            <div className="flex place-items-center max-w-[1440px] h-[94px] mx-auto px-[100px] bg-(--neutral-white)">

                <h1>
                    <Link href="/">
                        {/* https://nextjs.org/docs/app/api-reference/file-conventions/public-folder */}
                        <Image src="/assets/logo-orange.svg" alt="Abricot logo orange" width={147} height={18.72} />
                    </Link>
                </h1>

                <Menu />
            </div>
        </header>
    );
}