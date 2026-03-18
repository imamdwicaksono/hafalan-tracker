export function getNextHafalan(last: any) {
  if (!last) return null

  let nextStart = last.ayat_end + 1
  let nextEnd = nextStart + 4 // default 5 ayat

  return {
    surah: last.surah,
    ayatStart: nextStart,
    ayatEnd: nextEnd
  }
}