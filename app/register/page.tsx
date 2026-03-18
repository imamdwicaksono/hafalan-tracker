"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)

    const { data,error } = await supabase.auth.signUp({
      email,
      password
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Registrasi berhasil ✅, silakan verifikasi email kamu sebelum login")

    // 🔥 cek butuh verifikasi atau tidak
    window.location.href = "/verify"
    
  }

  return (
    <div className="p-4 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm space-y-4">

        <h1 className="text-2xl font-bold text-center">
          Daftar Akun
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded-xl"
        >
          {loading ? "Loading..." : "Daftar"}
        </button>

        <p className="text-center text-sm">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>

      </div>
    </div>
  )
}