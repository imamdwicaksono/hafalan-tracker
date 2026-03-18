"use client"

import { useEffect, useState } from "react"
import Drawer from "./Drawer"
import { supabase } from "@/lib/supabase/client"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  // ❌ belum login → jangan render navbar
  if (!user) return null
  

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-50">
        <button onClick={() => setOpen(true)}>
          ☰
        </button>

        <h1 className="font-bold">Hafalan App</h1>

        <div></div>
      </div>

      <Drawer open={open} setOpen={setOpen} />
    </>
  )
}