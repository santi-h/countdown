import { useEffect, useState } from 'react';
import { breakdown, Breakdown } from './countdown';

type Parsed =
  | { kind: 'ok'; target: Date }
  | { kind: 'missing' }
  | { kind: 'invalid' };

function parseTarget(): Parsed {
  const raw = new URLSearchParams(window.location.search).get('t');
  if (!raw) return { kind: 'missing' };
  const target = new Date(raw);
  if (Number.isNaN(target.getTime())) return { kind: 'invalid' };
  return { kind: 'ok', target };
}

type UnitLabels = { singular: string; plural: string };

const UNIT_ORDER: Array<{ key: keyof Breakdown; labels: UnitLabels }> = [
  { key: 'years', labels: { singular: 'Year', plural: 'Years' } },
  { key: 'days', labels: { singular: 'Day', plural: 'Days' } },
  { key: 'hours', labels: { singular: 'Hour', plural: 'Hours' } },
  { key: 'minutes', labels: { singular: 'Minute', plural: 'Minutes' } },
  { key: 'seconds', labels: { singular: 'Second', plural: 'Seconds' } },
];

function CountdownDisplay({ target }: { target: Date }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now >= target) {
    return <div className="message">Countdown complete.</div>;
  }

  const parts = breakdown(now, target);
  const firstNonZero = UNIT_ORDER.findIndex(({ key }) => parts[key] > 0);
  const visible = firstNonZero === -1 ? UNIT_ORDER.slice(-1) : UNIT_ORDER.slice(firstNonZero);

  return (
    <div className="countdown">
      {visible.map(({ key, labels }) => {
        const value = parts[key];
        const label = value === 1 ? labels.singular : labels.plural;
        return (
          <div className="unit" key={key}>
            <div className="value">{value}</div>
            <div className="label">{label}</div>
          </div>
        );
      })}
    </div>
  );
}

function buildExample(): { href: string; iso: string } {
  const target = new Date();
  target.setUTCFullYear(target.getUTCFullYear() + 1);
  target.setUTCDate(target.getUTCDate() + 12);
  const iso = target.toISOString().replace(/\.\d{3}Z$/, 'Z');
  return { href: `?t=${iso}`, iso };
}

export function App() {
  const parsed = parseTarget();
  const example = buildExample();

  return (
    <main className="app">
      <h1>Countdown</h1>
      {parsed.kind === 'ok' && <CountdownDisplay target={parsed.target} />}
      {parsed.kind === 'missing' && (
        <div className="message">
          Add a target timestamp to the URL to start the countdown.
        </div>
      )}
      {parsed.kind === 'invalid' && (
        <div className="message error">
          That doesn&apos;t look like a valid ISO 8601 timestamp.
        </div>
      )}
      <p className="helper">
        Try it:{' '}
        <a href={example.href}>
          <code>?t={example.iso}</code>
        </a>
      </p>
    </main>
  );
}
