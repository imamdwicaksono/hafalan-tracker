export function calculateNextReview(item: any, status: string) {
  let level = item.repetition_level || 0

  if (status === "lancar") {
    level += 1
  } else {
    level = 0 // reset kalau gagal
  }

  const intervals = [1, 3, 7, 14, 30]

  const days = intervals[Math.min(level, intervals.length - 1)]

  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + days)

  return {
    level,
    next_review_date: nextDate.toISOString().split("T")[0]
  }
}