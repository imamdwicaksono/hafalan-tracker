"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { JUZ_MAP } from "@/config/juz"
import { SURAH_LIST } from "@/config/surah"
import { getNextHafalan } from "@/modules/hafalan/engine"
import error from "next/error"


export default function InputPage() {
    const [type, setType] = useState("sabaq")
    const [juz, setJuz] = useState(30)
    const [halaman, setHalaman] = useState(1)
    const [status, setStatus] = useState("lancar")
    const [loading, setLoading] = useState(false)
    const [surah, setSurah] = useState(1)
    const [ayatStart, setAyatStart] = useState(1)
    const [ayatEnd, setAyatEnd] = useState(1)

    const [lastData, setLastData] = useState<any>(null)

    const selectedSurah = SURAH_LIST.find(s => s.id === surah)
    const maxAyat = selectedSurah?.ayat || 1


    const currentJuz = JUZ_MAP.find(j => j.juz === juz)

    const surahOptions = currentJuz?.surah.map((item) => {
        const surahData = SURAH_LIST.find(s => s.id === item.s)

        return {
            ...item,
            name: surahData?.name
        }
    }) || []

    const handleAyatChange = (val: number, type: "start" | "end") => {
    if (val < 1) val = 1
    if (val > maxAyat) val = maxAyat

    if (type === "start") setAyatStart(val)
    else setAyatEnd(val)
    }

    useEffect(() => {
        const fetchLast = async () => {
            const { data } = await supabase
            .from("hafalan_entries")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle()

            if (!error) {
            setLastData(data)
            }
        }

        fetchLast()
    }, [])

    useEffect(() => {
    if (type !== "sabaq") {
        const first = surahOptions[0]
        if (first) {
        setSurah(first.s)
        setAyatStart(first.f)
        setAyatEnd(first.t)
        }
    }
    }, [juz])

    useEffect(() => {
        if (type === "sabaq" && lastData) {
            const next = getNextHafalan(lastData)

            if (next) {
            setSurah(next.surah)
            setAyatStart(next.ayatStart)
            setAyatEnd(next.ayatEnd)
            }
        }
    }, [type])

    useEffect(() => {
        const selected = surahOptions.find(s => s.s === surah)

        if (selected && type !== "sabaq") {
            setAyatStart(selected.f)
            setAyatEnd(selected.t)
        }
    }, [surah, juz, type])

    useEffect(() => {
    if (type === "sabaq" && lastData) {
        const next = getNextHafalan(lastData)

        if (next) {
        setSurah(next.surah)
        setAyatStart(next.ayatStart)
        setAyatEnd(next.ayatEnd)
        }
    }
    }, [type, lastData])

  const handleSubmit = async () => {
    setLoading(true)

    const {
    data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
    alert("User belum login")
    return
    }

    const { error } = await supabase
    .from("hafalan_entries")
    .upsert(
        [
        {
            user_id: user.id,
            type,
            juz,
            surah,
            ayat_start: ayatStart,
            ayat_end: ayatEnd,
            status,
            tanggal: new Date().toISOString().split("T")[0]
        }
        ],
        {
        onConflict: "user_id,tanggal,type"
        }
    )

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Hafalan tersimpan ✅")
    }
  }

  return (
    <div className="p-4 pb-24">
      <div className="max-w-md mx-auto space-y-4">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Input Hafalan</h1>
          <p className="text-gray-500 text-sm">
            Catat hafalan harianmu
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">

          {/* TYPE */}
          <div>
            <label className="text-sm font-medium">
                Jenis Hafalan
            </label>

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full mt-1 border p-3 rounded-xl"
            >
                <option value="sabaq">📖 Sabaq</option>
                <option value="sabqi">🔁 Sabqi</option>
                <option value="manzil">🧠 Manzil</option>
            </select>

            {/* DESKRIPSI DINAMIS */}
            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                {type === "sabaq" && (
                <>
                    <p className="font-semibold">📖 Sabaq (Hafalan Baru)</p>
                    <p>
                    Hafalan ayat baru yang sedang kamu tambahkan hari ini.
                    Fokus pada kelancaran dan ketepatan bacaan.
                    </p>
                    <ul className="list-disc ml-4 mt-1 text-xs">
                    <li>Biasanya ½ – 1 halaman</li>
                    <li>Diulang berkali-kali sampai lancar</li>
                    <li>Fondasi utama hafalan</li>
                    </ul>
                </>
                )}

                {type === "sabqi" && (
                <>
                    <p className="font-semibold">🔁 Sabqi (Hafalan Kemarin)</p>
                    <p>
                    Mengulang hafalan yang didapat sebelumnya agar tidak mudah lupa.
                    </p>
                    <ul className="list-disc ml-4 mt-1 text-xs">
                    <li>Diambil dari hafalan 1–2 hari sebelumnya</li>
                    <li>Tanpa melihat mushaf (idealnya)</li>
                    <li>Menjaga hafalan tetap kuat</li>
                    </ul>
                </>
                )}

                {type === "manzil" && (
                <>
                    <p className="font-semibold">🧠 Manzil (Murajaah Lama)</p>
                    <p>
                    Mengulang hafalan lama (juz-juz sebelumnya) agar tidak hilang.
                    </p>
                    <ul className="list-disc ml-4 mt-1 text-xs">
                    <li>Bisa 1–5 juz per hari</li>
                    <li>Fokus menjaga hafalan jangka panjang</li>
                    <li>Wajib untuk hafalan yang sudah lama</li>
                    </ul>
                </>
                )}
            </div>
            </div>

          {/* GRID INPUT */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Juz</label>
              <select
                value={juz}
                onChange={(e) => setJuz(Number(e.target.value))}
                className="w-full mt-1 border p-3 rounded-xl"
              >
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Juz {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* SURAH + AYAT (HANYA UNTUK SABAQ & SABQI) */}
            {type !== "manzil" && (
            <>
                <div>
                <label>Surah</label>
                <select
                value={surah}
                onChange={(e) => setSurah(Number(e.target.value))}
                className="w-full border p-3 rounded-xl"
                >
                {surahOptions.map((s) => (
                    <option key={s.s} value={s.s}>
                    {s.s}. {s.name || "Unknown"} ({s.f}-{s.t})
                    </option>
                ))}
                </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                <input
                    type="number"
                    value={ayatStart}
                    onChange={(e) =>
                    handleAyatChange(Number(e.target.value), "start")
                    }
                    placeholder="Ayat awal"
                />

                <input
                    type="number"
                    value={ayatEnd}
                    onChange={(e) =>
                    handleAyatChange(Number(e.target.value), "end")
                    }
                    placeholder="Ayat akhir"
                />
                </div>

                <p className="text-xs text-gray-500">
                Maks ayat: {maxAyat}
                </p>
            </>
            )}
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm font-medium">
              Status Hafalan
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 border p-3 rounded-xl"
            >
              <option value="lancar">✅ Lancar</option>
              <option value="tidak_lancar">❌ Tidak Lancar</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold"
          >
            {loading ? "Menyimpan..." : "Simpan Hafalan"}
          </button>
        </div>
      </div>
    </div>
  )
}