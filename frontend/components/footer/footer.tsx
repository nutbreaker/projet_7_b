import Image from 'next/image';
import styles from './footer.module.css';

export default function Footer() {

    return (
        <footer>
            <div className={styles.container}>
            <Image src="/assets/logo-black.svg" alt="Abricot logo noir" width={101} height={12.86} />
            Abricot 2025
            </div>
        </footer>
    )

}