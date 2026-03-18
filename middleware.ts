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

        // 🔥 WAJIB INI
        set: (name: string, value: string, options: any) => {
          res.cookies.set(name, value, options)
        },

        remove: (name: string, options: any) => {
          res.cookies.set(name, "", { ...options, maxAge: 0 })
        }
      },
    }
  )

  const {
    data: { session }
  } = await supabase.auth.getSession()

  // console.log("SESSION:", session)

  // console.log("COOKIES:", req.cookies.getAll())

  const path = req.nextUrl.pathname

  if (!session && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (session && path === "") {
    return NextResponse.redirect(new URL("/dashboard", req.url))  
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*"]
}