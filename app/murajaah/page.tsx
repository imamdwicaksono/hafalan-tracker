import { createSupabaseServer } from "@/lib/supabase/server"
import { generateMurajaah } from "@/modules/hafalan/murajaah"
import { SURAH_LIST } from "@/config/surah"
import MurajaahButton from "@/components/MurajaahButton"

export default async function MurajaahPage() {
  const supabase = await createSupabaseServer()

  const {
    data: { user }
  } = await supabase.auth.getUser()


    const today = new Date().toISOString().split("T")[0]

    const { data } = await supabase
    .from("hafalan_entries")
    .select("*")
    .eq("user_id", user.id)
    .lte("next_review_date", today)

  const murajaahList = generateMurajaah(data || [])

  return (
    <div className="p-4 space-y-4">

      <h1 className="text-2xl font-bold">Murajaah</h1>

      {murajaahList.length === 0 && (
        <p className="text-gray-500">
          Belum ada hafalan
        </p>
      )}

      <div className="space-y-3">
        {murajaahList.map((item, i) => {
          const surah = SURAH_LIST.find(
            (s) => s.id === item.surah
          )

          return (
            <div
              key={i}
              className="p-4 border rounded-xl"
            >
              <p className="font-semibold">
                {surah?.name}
              </p>

              <p className="text-sm">
                Ayat {item.ayatStart} - {item.ayatEnd}
              </p>

              <p className="text-xs text-gray-500">
                Terakhir: {item.lastReviewed}
              </p>

              <p className="text-xs text-red-500">
                Prioritas: {item.priority.toFixed(1)}
              </p>

              <p className="text-xs text-gray-500">
                Level: {item.repetition_level || 0}
                </p>

                <p className="text-xs text-blue-500">
                Next: {item.next_review_date}
                </p>

              <MurajaahButton item={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}