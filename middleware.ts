import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"


export async function middleware(req: any) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          res.cookies.set(name, value, options)
        },
        remove: (name: string, options: any) => {
          res.cookies.set(name, "", { ...options, maxAge: 0 })
        }
      }
    }
  )

  const {
    data: { session }
  } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname
  const isAuth = !!session

  const publicRoutes = ["/login", "/register", "/verify"]

  // ❌ belum login → redirect semua kecuali public
  if (!isAuth && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // ✅ sudah login → jangan balik login/register
  if (isAuth && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
}