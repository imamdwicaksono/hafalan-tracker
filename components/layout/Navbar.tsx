"use client"

import { useState } from "react"
import Drawer from "./Drawer"

export default function Navbar() {
  const [open, setOpen] = useState(false)

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