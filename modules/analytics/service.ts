export function mapToChart(entries: any[]) {
  const grouped: Record<string, number> = {}

  entries.forEach((e) => {
    if (!grouped[e.tanggal]) grouped[e.tanggal] = 0
    grouped[e.tanggal] += 1
  })

  return Object.keys(grouped).map((tanggal) => ({
    tanggal,
    jumlah: grouped[tanggal]
  }))
}