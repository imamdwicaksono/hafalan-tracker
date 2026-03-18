"use client"

import Link from "next/link"
import LogoutButton from "../LogoutButton"
import NavLink from "./NavLink"

export default function Drawer({ open, setOpen }: any) {
  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 font-bold border-b">
          Menu
        </div>

        <nav className="flex flex-col p-2 space-y-2">
          <NavLink href="/dashboard" oncClick={() => setOpen(false)}>
            📊 Dashboard
          </NavLink>

          <NavLink href="/input" onClick={() => setOpen(false)}>
            ✏️ Input Hafalan
          </NavLink>

          <NavLink href="/murajaah" onClick={() => setOpen(false)}>
            🧠 Murajaah
          </NavLink>
        </nav>

        <div className="p-4 mt-auto">
          <LogoutButton />
        </div>
      </div>
    </>
  )
}