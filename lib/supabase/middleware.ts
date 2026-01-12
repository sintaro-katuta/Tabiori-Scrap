import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Redirect to dashboard if logged in and accessing login page
    if (request.nextUrl.pathname.startsWith('/login') && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Also redirect / to dashboard if logged in (optional but nice UX)
    // if (request.nextUrl.pathname === '/' && user) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }
    // Commenting out the root redirect for now as it wasn't explicitly requested, 
    // but the user said "automatically logged in state", so checking /login is the direct answer.
    // Actually, let's include root redirect as it's common "auto-login" behavior.
    if (request.nextUrl.pathname === '/' && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return supabaseResponse
}
