export function generateMurajaah(data: any[]) {
  if (!data || data.length === 0) return []

  // group by surah
  const grouped: any = {}

  data.forEach((d) => {
    if (!grouped[d.surah]) grouped[d.surah] = []
    grouped[d.surah].push(d)
  })

  const result: any[] = []

  Object.keys(grouped).forEach((surahId) => {
    const items = grouped[surahId]

    // sort by tanggal lama → baru
    items.sort(
      (a: any, b: any) =>
        new Date(a.tanggal).getTime() -
        new Date(b.tanggal).getTime()
    )

    const oldest = items[0]

    result.push({
      surah: oldest.surah,
      ayatStart: oldest.ayat_start,
      ayatEnd: oldest.ayat_end,
      lastReviewed: oldest.tanggal,
      priority: getPriority(oldest)
    })
  })

  // sort by priority
  return result.sort((a, b) => b.priority - a.priority)
}

function getPriority(item: any) {
  let score = 0

  // ❗ lama tidak diulang
  const days =
    (Date.now() - new Date(item.tanggal).getTime()) /
    (1000 * 60 * 60 * 24)

  score += days

  // ❗ tidak lancar
  if (item.status === "tidak_lancar") {
    score += 10
  }

  return score
}