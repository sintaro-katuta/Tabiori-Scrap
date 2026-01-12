'use client'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './UserMenu.module.css'
import type { User } from '@supabase/supabase-js'

export default function UserMenu({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const supabase = createClient()

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
        // Wait a bit to ensure the refresh happens or just hard redirect
        // Ideally, middleware or the page/layout logic will catch the session missing, 
        // but explicit redirect is safer.
        window.location.href = '/login'
    }

    const avatarUrl = user.user_metadata.avatar_url
    const displayName = user.user_metadata.full_name || user.email?.split('@')[0]

    return (
        <div className={styles.container} ref={menuRef}>
            <button
                className={styles.avatarBtn}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="User menu"
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <span>{displayName?.charAt(0).toUpperCase()}</span>
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.userEmail}>{user.email}</div>

                    <button className={styles.menuItem} disabled>
                        設定
                    </button>

                    <button className={styles.menuItem} onClick={handleLogout}>
                        ログアウト
                    </button>
                </div>
            )}
        </div>
    )
}
