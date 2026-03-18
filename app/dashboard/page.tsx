import { createSupabaseServer } from "@/lib/supabase/server"
import LogoutButton from "@/components/LogoutButton"
import { SURAH_LIST } from "@/config/surah"

export default async function Dashboard() {
  const supabase = await createSupabaseServer()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Unauthorized</div>
  }

  const { data } = await supabase
    .from("hafalan_entries")
    .select("*")
    .eq("user_id", user.id)
    .order("tanggal", { ascending: false })

  // 🔥 TOTAL AYAT
  const totalAyat =
    data?.reduce(
      (sum, d) =>
        sum + ((d.ayat_end || 0) - (d.ayat_start || 0) + 1),
      0
    ) || 0

  // 🔥 HARI INI
  const today = new Date().toISOString().split("T")[0]

  const todayCount =
    data?.filter((d) => d.tanggal === today).length || 0

  // 🔥 STREAK
  const dates = [
    ...new Set(data?.map((d) => d.tanggal))
  ].sort()

  let streak = 1

  for (let i = dates.length - 1; i > 0; i--) {
    const current = new Date(dates[i])
    const prev = new Date(dates[i - 1])

    const diff =
      (current.getTime() - prev.getTime()) /
      (1000 * 60 * 60 * 24)

    if (diff === 1) {
      streak++
    } else {
      break
    }
  }

  return (
    <div className="p-4 space-y-4 pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Hafalan</h1>
          <p className="text-gray-500 text-sm">
            Assalamu’alaikum 👋
          </p>
        </div>
        <LogoutButton />
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-3">

        <div className="bg-green-100 p-3 rounded-xl">
          <p className="text-sm text-gray-600">Total Ayat</p>
          <p className="text-xl font-bold">{totalAyat}</p>
        </div>

        <div className="bg-blue-100 p-3 rounded-xl">
          <p className="text-sm text-gray-600">Hari Ini</p>
          <p className="text-xl font-bold">{todayCount}</p>
        </div>

        <div className="bg-purple-100 p-3 rounded-xl col-span-2">
          <p className="text-sm text-gray-600">Streak</p>
          <p className="text-xl font-bold">{streak} hari 🔥</p>
        </div>

      </div>

      {/* LIST */}
      <div>
        <h2 className="font-semibold mb-2">Riwayat Hafalan</h2>

        {data?.length === 0 && (
          <p className="text-gray-500">Belum ada data</p>
        )}

        <div className="space-y-2">
          {data?.map((item) => {
            const surah = SURAH_LIST.find(
              (s) => s.id === item.surah
            )

            return (
              <div
                key={item.id}
                className="border rounded-xl p-3 shadow-sm"
              >
                <div className="flex justify-between">
                  <p className="font-semibold capitalize">
                    {item.type}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.tanggal}
                  </p>
                </div>

                <p className="text-sm">
                  {surah?.name || "-"} • Ayat{" "}
                  {item.ayat_start} - {item.ayat_end}
                </p>

                <p className="text-xs text-gray-500">
                  Juz {item.juz}
                </p>

                <p
                  className={`text-xs mt-1 ${
                    item.status === "lancar"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}