"use client"

import Link from "next/link"

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full bg-white border flex justify-around p-2">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/input">Input</Link>
      <Link href="/murajaah">Murajaah</Link>
    </div>
  )
}