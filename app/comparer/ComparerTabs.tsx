'use client';

import { useState } from 'react';

type TaskKey = 'texte' | 'image' | 'video';

const DATA: Record<TaskKey, { energy: string; co2: string; equiv: string }> = {
  texte: { energy: '~0,3 Wh', co2: '~2 g', equiv: '≈ quelques secondes d’ampoule LED' },
  image: { energy: '~2–11 Wh', co2: '~5 g', equiv: '≈ jusqu’à une charge de smartphone' },
  video: { energy: '~1 000 Wh', co2: '~400 g', equiv: '≈ ~30 min de four électrique' },
};

const TABS: { key: TaskKey; label: string }[] = [
  { key: 'texte', label: '💬 Texte' },
  { key: 'image', label: '🖼️ Image' },
  { key: 'video', label: '🎬 Vidéo 5 s' },
];

export default function ComparerTabs() {
  const [active, setActive] = useState<TaskKey>('texte');
  const d = DATA[active];

  return (
    <>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`task-tab${active === t.key ? ' is-active' : ''}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
        <div
          style={{
            textAlign: 'center',
            padding: 24,
            background: 'var(--surface-2)',
            borderRadius: 16,
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Énergie
          </div>
          <div className="h2" style={{ fontSize: 38, marginTop: 8 }}>
            {d.energy}
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: 24,
            background: 'var(--surface-2)',
            borderRadius: 16,
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            CO₂
          </div>
          <div className="h2" style={{ fontSize: 38, marginTop: 8 }}>
            {d.co2}
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: 24,
            background: 'var(--surface-2)',
            borderRadius: 16,
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Comparaison
          </div>
          <div className="h3" style={{ fontSize: 22, marginTop: 14, lineHeight: 1.3 }}>
            {d.equiv}
          </div>
        </div>
      </div>
    </>
  );
}
