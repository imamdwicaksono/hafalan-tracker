import { HafalanRepo } from "./repository"

export const HafalanService = {
  async addEntry(entry: any) {
    // rule: jangan tambah jika sabqi belum lancar
    if (entry.type === "sabaq" && entry.status === "tidak_lancar") {
      throw new Error("Perbaiki hafalan dulu sebelum lanjut")
    }

    return HafalanRepo.create(entry)
  }
}