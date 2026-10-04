export type CurvePoint = {
  week: number;
  planned: number;
  actual: number | null;
  note?: string;
};

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

/** Normalized logistic S-curve, 0 at t=0 and 100 at t=1. */
export function logisticPct(t: number, mid = 0.48, k = 10) {
  const sigmoid = (x: number) => 1 / (1 + Math.exp(-k * (x - mid)));
  const a = sigmoid(0);
  const b = sigmoid(1);
  const clamped = Math.min(1, Math.max(0, t));
  return ((sigmoid(clamped) - a) / (b - a)) * 100;
}

export function buildWeeks(opts: {
  total: number;
  actualThrough: number;
  lagWeeks?: number;
  mid?: number;
  k?: number;
}): CurvePoint[] {
  const { total, actualThrough, lagWeeks = 0, mid = 0.48, k = 10 } = opts;
  return Array.from({ length: total }, (_, i) => {
    const week = i + 1;
    const planned = round1(logisticPct(week / total, mid, k));
    let actual: number | null = null;
    if (week <= actualThrough) {
      const t = (week - lagWeeks) / total;
      actual = round1(Math.max(0, Math.min(100, logisticPct(t, mid, k))));
      if (week === total && actualThrough >= total) actual = 100;
      if (week === actualThrough && actualThrough < total) {
        actual = round1(Math.min(actual, planned + 8));
      }
    }
    return { week, planned: week === total ? 100 : planned, actual };
  });
}

export function lastActual(points: CurvePoint[]) {
  for (let i = points.length - 1; i >= 0; i--) {
    if (points[i].actual != null) return points[i];
  }
  return null;
}

export function spiOf(points: CurvePoint[]) {
  const last = lastActual(points);
  if (!last || last.planned <= 0 || last.actual == null) return null;
  return round1(last.actual / last.planned);
}

export type CurveHealth = "maju" | "on-track" | "terlambat" | "selesai" | "belum";

export function healthOf(points: CurvePoint[]): CurveHealth {
  const last = lastActual(points);
  if (!last || last.actual == null) return "belum";
  if (last.actual >= 99.5 && last.week >= points.length) return "selesai";
  const spi = last.actual / last.planned;
  if (spi >= 1.05) return "maju";
  if (spi >= 0.95) return "on-track";
  return "terlambat";
}

export function variancePct(points: CurvePoint[]) {
  const last = lastActual(points);
  if (!last || last.actual == null) return null;
  return round1(last.actual - last.planned);
}

export function nextOpenWeek(points: CurvePoint[]) {
  const found = points.find((p) => p.actual == null);
  return found?.week ?? null;
}

export function remainingPct(points: CurvePoint[]) {
  const last = lastActual(points);
  if (!last || last.actual == null) return 100;
  return round1(Math.max(0, 100 - last.actual));
}

/** Points of progress per week, from the last two logged weeks (or average). */
export function velocityOf(points: CurvePoint[]) {
  const logged = points.filter((p) => p.actual != null) as { week: number; actual: number }[];
  if (logged.length >= 2) {
    const a = logged[logged.length - 2];
    const b = logged[logged.length - 1];
    const dw = b.week - a.week;
    if (dw <= 0) return null;
    return round1((b.actual - a.actual) / dw);
  }
  if (logged.length === 1 && logged[0].week > 0) {
    return round1(logged[0].actual / logged[0].week);
  }
  return null;
}

/** Estimated week number when actual hits 100%. */
export function forecastFinishWeek(points: CurvePoint[]) {
  const last = lastActual(points);
  if (!last || last.actual == null) return null;
  if (last.actual >= 99.5) return last.week;
  const v = velocityOf(points);
  if (v && v > 0.15) {
    return round1(last.week + (100 - last.actual) / v);
  }
  const spi = spiOf(points);
  if (spi && spi > 0) return round1(points.length / spi);
  return null;
}

export function delayWeeks(points: CurvePoint[]) {
  const finish = forecastFinishWeek(points);
  if (finish == null) return null;
  return round1(finish - points.length);
}

export function earnedValue(contract: number, points: CurvePoint[]) {
  const last = lastActual(points);
  if (!last || last.actual == null) return 0;
  return Math.round((contract * last.actual) / 100);
}

export function plannedValue(contract: number, points: CurvePoint[]) {
  const last = lastActual(points);
  const planned = last?.planned ?? 0;
  return Math.round((contract * planned) / 100);
}

export type ChartRow = {
  week: string;
  weekNum: number;
  Rencana: number | null;
  Aktual: number | null;
  Prakiraan: number | null;
};

export function chartRows(points: CurvePoint[]): ChartRow[] {
  const last = lastActual(points);
  const v = velocityOf(points);
  const finish = forecastFinishWeek(points);
  const extra = finish != null ? Math.ceil(finish) : points.length;
  const total = Math.min(Math.max(points.length, extra), points.length + 6);
  const rows: ChartRow[] = [];
  for (let i = 1; i <= total; i++) {
    const src = points[i - 1];
    const planned = src?.planned ?? (i >= points.length ? 100 : null);
    const actual = src?.actual ?? null;
    let forecast: number | null = null;
    if (last && last.actual != null && v && v > 0) {
      if (i <= last.week) {
        forecast = i === last.week ? last.actual : null;
      } else {
        forecast = round1(Math.min(100, last.actual + v * (i - last.week)));
      }
    }
    rows.push({
      week: `M${i}`,
      weekNum: i,
      Rencana: planned,
      Aktual: actual,
      Prakiraan: forecast,
    });
  }
  return rows;
}

export const HEALTH_LABEL: Record<CurveHealth, string> = {
  maju: "Lebih cepat",
  "on-track": "Sesuai rencana",
  terlambat: "Terlambat",
  selesai: "Selesai",
  belum: "Belum mulai",
};
