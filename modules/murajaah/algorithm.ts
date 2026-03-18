export function generateMurajaahPlan(entries: any[]) {
  const today = new Date()

  return entries
    .map((e) => {
      const last = new Date(e.tanggal)
      const diffDays =
        (today.getTime() - last.getTime()) / (1000 * 3600 * 24)

      let priority = 0

      // rule 1: makin lama → makin prioritas
      priority += diffDays

      // rule 2: kalau tidak lancar → boost
      if (e.status === "tidak_lancar") {
        priority += 50
      }

      // rule 3: sabaq baru → boost
      if (e.type === "sabaq") {
        priority += 30
      }

      return { ...e, priority }
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 10) // ambil top 10 murajaah
}