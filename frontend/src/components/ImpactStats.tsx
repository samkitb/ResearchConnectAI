import React, { useEffect, useRef, useState } from 'react';
import { API_BASE } from './config.ts';

type Metrics = {
  students_connected: number;
  universities_covered: number;
  faculty_contacts: number;
};

// Smoothly counts up to `target` once, when the element scrolls into view.
const CountUp: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '+' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      const duration = 1400;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === 'undefined') { run(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
};

export function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    fetch(`${API_BASE}/metrics`, { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(d => { if (!cancelled) setMetrics(d); })
      .catch(() => { if (!cancelled) setFailed(true); })
      .finally(() => clearTimeout(timer));
    return () => { cancelled = true; clearTimeout(timer); ctrl.abort(); };
  }, []);

  return { metrics, failed };
}

const items: { key: keyof Metrics; label: string; icon: string; tone: string }[] = [
  { key: 'students_connected', label: 'Students connected', icon: '🎓', tone: 'from-brand-500 to-blue-500' },
  { key: 'universities_covered', label: 'Universities covered', icon: '🏛️', tone: 'from-violet-500 to-fuchsia-500' },
  { key: 'faculty_contacts', label: 'Faculty contacts saved', icon: '✉️', tone: 'from-emerald-500 to-teal-500' },
];

type Props = { compact?: boolean; hide?: (keyof Metrics)[] };

const ImpactStats: React.FC<Props> = ({ compact = false, hide = [] }) => {
  const { metrics, failed } = useMetrics();
  const shown = items.filter(i => !hide.includes(i.key));

  // If the API is unreachable, show nothing rather than a broken placeholder.
  if (failed) return null;

  return (
    <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'sm:grid-cols-3'}`}>
      {shown.map(({ key, label, icon, tone }) => (
        <div key={key} className="glass card-hover rounded-2xl p-6 flex items-center gap-4">
          <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${tone} flex items-center justify-center text-xl shadow-soft`}>
            {icon}
          </div>
          <div>
            <div className="text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums">
              {metrics ? <CountUp target={metrics[key] ?? 0} /> : <span className="inline-block h-8 w-20 rounded bg-slate-200 animate-pulse" />}
            </div>
            <div className="text-sm text-slate-500">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpactStats;
