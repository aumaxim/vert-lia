export const OP = {
  text: { wh: 0.3, co2: 2, water: 0.5 },
  img: { wh: 5, co2: 5, water: 3 },
  vid: { wh: 1000, co2: 400, water: 500 },
} as const;

export const CAR_G_PER_KM = 170;
export const PHONE_WH = 15;
export const LED_W = 8;

export const BASE_TOKENS = 300;
export const BASE_WH = 0.3;
export const BASE_CO2 = 2;
export const BASE_WATER = 0.5;
export const SESSION_FULL_WH = 5;

const frFormatter = (dec: number) =>
  new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });

export function fmtFR(n: number, dec = 0): string {
  return frFormatter(dec).format(n);
}

export function fmtWh(wh: number): string {
  if (wh >= 1000) return fmtFR(wh / 1000, 2) + ' kWh';
  return fmtFR(wh, wh < 10 ? 2 : 1) + ' Wh';
}

export function fmtG(g: number): string {
  if (g >= 1000) return fmtFR(g / 1000, 1) + ' kg';
  return fmtFR(g, 0) + ' g';
}

export function fmtL(cl: number): string {
  if (cl >= 100) return fmtFR(cl / 100, 1) + ' L';
  return fmtFR(cl, 0) + ' cL';
}

export function estTokens(s: string): number {
  return Math.max(1, Math.round((s ?? '').trim().length / 4));
}
