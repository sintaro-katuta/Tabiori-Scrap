import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'
import UserMenu from './UserMenu'
import { createClient } from '@/lib/supabase/server'

export default async function Header() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

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
                    {user && <UserMenu user={user} />}
                </nav>
            </div>
        </header>
    )
}
