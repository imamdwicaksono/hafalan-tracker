"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts"

export default function ProgressChart({ data }: any) {
  return (
    <LineChart width={320} height={200} data={data}>
      <XAxis dataKey="tanggal" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="jumlah" />
    </LineChart>
  )
}