import Link from 'next/link';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Menu from '@/components/header/menu';
// https://nextjs.org/docs/app/getting-started/css#css-modules
import styles from './header.module.css';

export default async function Header() {
    // https://nextjs.org/docs/pages/guides/authentication#optimistic-checks-with-proxy-optional
    const isLoggedIn = (await cookies()).has('authToken');

    // at this stage there is no login
    if (false && !isLoggedIn) return null;

    return (
        <header>
            <div className={styles.container}>

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