"use client"

import { use, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      console.log("Current session:", session)
    }

    checkSession()
  }, [])

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        alert(error.message)
        return
    }

    // 🔥 FORCE SET SESSION
    await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
    })

    // 🔥 hard reload
    window.location.href = "/dashboard"
    }

  return (
    <div className="p-4 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Login
        </h1>

        <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full"
            onChange={(e) => setPassword(e.target.value)}
        />

        <button
            onClick={handleLogin}
            className="bg-green-600 text-white p-2 w-full rounded"
        >
            Login
        </button>

            <p className="text-center text-sm">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-600">
                Daftar
            </a>
            </p>
        </div>


    </div>
  )
}