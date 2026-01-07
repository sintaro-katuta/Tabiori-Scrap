import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/dashboard" className={styles.logo}>
                    <Image
                        src="/logo-v2.png"
                        alt="Tsuzuri Logo"
                        width={32}
                        height={32}
                        className={styles.logoImage}
                    />
                    Tsuzuri
                </Link>
                <nav className={styles.nav}>
                    {/* Future: User Avatar / Logout */}
                </nav>
            </div>
        </header>
    )
}
