import { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartRows, type CurvePoint } from "@/lib/scurve";

export function SCurveChart({ points }: { points: CurvePoint[] }) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);

  const data = chartRows(points);

  if (!on) {
    return <div className="h-80 animate-pulse rounded-md bg-line/70" />;
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: "var(--color-muted)", fontSize: 11 }}
            axisLine={{ stroke: "var(--color-line)" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "var(--color-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            formatter={(value) => [`${Number(value ?? 0).toFixed(1)}%`, ""]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--color-line)",
              fontSize: 12,
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="Rencana"
            stroke="var(--color-navy-soft)"
            fill="var(--color-navy)"
            fillOpacity={0.08}
            strokeWidth={2}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="Aktual"
            stroke="var(--color-brand)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "var(--color-brand)" }}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="Prakiraan"
            stroke="var(--color-navy-soft)"
            strokeWidth={1.8}
            strokeDasharray="6 4"
            dot={false}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
