"use client"

export default function HafalanForm({ onSubmit }: any) {
  return (
    <div className="space-y-3">
      <select className="w-full p-2 border">
        <option>sabaq</option>
        <option>sabqi</option>
        <option>manzil</option>
      </select>

      <input placeholder="Juz" type="number" className="w-full p-2 border" />
      <input placeholder="Halaman" type="number" className="w-full p-2 border" />

      <button className="w-full bg-green-600 text-white p-2 rounded">
        Simpan
      </button>
    </div>
  )
}