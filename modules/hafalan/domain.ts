export type HafalanType = "sabaq" | "sabqi" | "manzil"

export interface HafalanEntry {
  id?: string
  user_id?: string
  tanggal: string

  type: HafalanType
  juz: number
  halaman: number

  status: "lancar" | "tidak_lancar"
  jumlah_kesalahan?: number
}