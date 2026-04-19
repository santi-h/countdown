export type Breakdown = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Walks the calendar to count full years, then breaks the remainder into days/h/m/s.
// This matches what a human expects (e.g., "1 year" from 2026-04-19 means 2027-04-19),
// which a fixed 365.25-day year does not.
export function breakdown(now: Date, target: Date): Breakdown {
  if (target <= now) {
    return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const anniversary = new Date(now.getTime());
  let years = 0;
  while (true) {
    const next = new Date(anniversary.getTime());
    next.setUTCFullYear(next.getUTCFullYear() + 1);
    if (next > target) break;
    anniversary.setTime(next.getTime());
    years += 1;
  }

  const totalSeconds = Math.floor((target.getTime() - anniversary.getTime()) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { years, days, hours, minutes, seconds };
}
