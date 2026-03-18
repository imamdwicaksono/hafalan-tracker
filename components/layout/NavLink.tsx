"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NavLink({ href, children, setOpen }: any) {
  const pathname = usePathname()
  const router = useRouter()

  const active = pathname === href

  const go = (path: string) => {
    if (setOpen) setOpen(false)
    router.push(path)
  }

  return (
    <Link
      href={href}
      onClick={() => go(href)}
      className={`p-2 rounded ${
        active ? "bg-green-100 font-semibold" : ""
      }`}
    >
      {children}
    </Link>
  )
}