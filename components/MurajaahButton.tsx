"use client"

import { supabase } from "@/lib/supabase/client"
import { calculateNextReview } from "@/modules/hafalan/murajaahV2"
import { useState } from "react"

export default function MurajaahButton({ item }: any) {
  const [status, setStatus] = useState("lancar")

  const handleClick = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return alert("Login dulu")

    const review = calculateNextReview(item, status)

    const { error } = await supabase
      .from("hafalan_entries")
      .update({
        status,
        repetition_level: review.level,
        next_review_date: review.next_review_date
      })
      .eq("id", item.id)

    if (error) {
      alert(error.message)
    } else {
      alert("Murajaah tersimpan 🔁")
      window.location.reload()
    }
  }

  return (
    <div className="mt-2 space-y-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="lancar">✅ Lancar</option>
        <option value="tidak_lancar">❌ Tidak Lancar</option>
      </select>

      <button
        onClick={handleClick}
        className="w-full bg-green-600 text-white p-2 rounded-xl"
      >
        Simpan Murajaah
      </button>
    </div>
  )
}