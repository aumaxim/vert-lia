'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import {
  MessageSquare,
  Image as ImageIcon,
  Video,
  Car,
  Smartphone,
  Lightbulb,
  Droplet,
} from 'lucide-react';
import {
  OP,
  CAR_G_PER_KM,
  PHONE_WH,
  LED_W,
  fmtFR,
  fmtWh,
  fmtG,
} from '@/lib/estimates';

const PRESETS = {
  curieux: { t: 5, i: 0, v: 0 },
  regulier: { t: 30, i: 5, v: 1 },
  intensif: { t: 80, i: 30, v: 6 },
} as const;

function pct(v: number, max: number): number {
  return Math.max(2, Math.min(100, (v / max) * 100));
}

type ResultCardVars = CSSProperties & { '--c'?: string; '--cb'?: string };

export default function CalculateurClient() {
  const [text, setText] = useState(20);
  const [img, setImg] = useState(3);
  const [vid, setVid] = useState(0);

  const r = useMemo(() => {
    const tW = text * 7;
    const iW = img;
    const vW = vid / 4.33;
    const wkWh = tW * OP.text.wh + iW * OP.img.wh + vW * OP.vid.wh;
    const wkCo2 = tW * OP.text.co2 + iW * OP.img.co2 + vW * OP.vid.co2;
    const wkWat = tW * OP.text.water + iW * OP.img.water + vW * OP.vid.water;
    const yrWh = wkWh * 52;
    const yrCo2 = wkCo2 * 52;
    const yrWat = wkWat * 52;
    const km = yrCo2 / CAR_G_PER_KM;
    const phone = yrWh / PHONE_WH;
    const ledH = yrWh / LED_W;
    const waterL = yrWat / 100;

    let note: string;
    if (yrCo2 < 2000)
      note =
        'Un usage léger : ton empreinte IA annuelle reste modeste, bien en dessous d’un aller-retour en voiture pour le week-end.';
    else if (yrCo2 < 20000)
      note =
        'Un usage marqué surtout par les images et vidéos. Réduire le superflu (régénérations, vidéos pour le fun) a le plus d’effet.';
    else
      note =
        'Un usage intensif : ce sont les vidéos et images qui dominent largement. C’est là que de petits réflexes changent beaucoup.';

    return { wkWh, wkCo2, yrWh, yrCo2, km, phone, ledH, waterL, note };
  }, [text, img, vid]);

  function applyPreset(p: (typeof PRESETS)[keyof typeof PRESETS]) {
    setText(p.t);
    setImg(p.i);
    setVid(p.v);
  }

  const energyVars: ResultCardVars = { '--c': 'var(--green)', '--cb': 'var(--green-bg)' };
  const co2Vars: ResultCardVars = { '--c': 'var(--amber)', '--cb': 'var(--amber-bg)' };

  return (
    <>
      {/* HERO */}
      <section
        className="section-sm"
        style={{ position: 'relative', paddingTop: 60, paddingBottom: 20 }}
      >
        <div className="blobs">
          <div
            className="blob c"
            style={{ width: 320, height: 320, top: -50, left: '-3%' }}
          ></div>
          <div
            className="blob g"
            style={{ width: 280, height: 280, top: 10, right: 0 }}
          ></div>
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 840 }}>
          <div className="eyebrow t-cyan reveal">Calculateur</div>
          <h1
            className="h1 reveal"
            data-delay="60"
            style={{ fontSize: 'clamp(34px,5vw,58px)', margin: '16px 0 16px' }}
          >
            Quelle est ton empreinte IA&nbsp;?
          </h1>
          <p className="lead reveal" data-delay="120">
            Ajuste ton usage habituel ci-dessous. L&apos;estimation se met à jour en direct — sur
            une semaine et sur une année.
          </p>
        </div>
      </section>

      {/* CALCULATEUR */}
      <section className="section-sm" style={{ paddingTop: 24 }}>
        <div
          className="wrap calc-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* Contrôles */}
          <div className="card reveal" style={{ padding: 32 }}>
            <h2 className="h3" style={{ marginBottom: 6 }}>
              Ton usage
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 26 }}>
              Glisse les curseurs selon tes habitudes.
            </p>

            <div className="ctrl">
              <div className="ctrl-head">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                  <MessageSquare size={18} strokeWidth={2.2} className="t-green" /> Requêtes texte <span className="ctrl-sub">par jour</span>
                </span>
                <span className="ctrl-val">{text}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={text}
                onChange={(e) => setText(+e.target.value)}
              />
            </div>

            <div className="ctrl">
              <div className="ctrl-head">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                  <ImageIcon size={18} strokeWidth={2.2} className="t-amber" /> Images générées <span className="ctrl-sub">par semaine</span>
                </span>
                <span className="ctrl-val">{img}</span>
              </div>
              <input
                type="range"
                min={0}
                max={80}
                step={1}
                value={img}
                onChange={(e) => setImg(+e.target.value)}
              />
            </div>

            <div className="ctrl">
              <div className="ctrl-head">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                  <Video size={18} strokeWidth={2.2} className="t-coral" /> Vidéos IA <span className="ctrl-sub">par mois</span>
                </span>
                <span className="ctrl-val">{vid}</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={vid}
                onChange={(e) => setVid(+e.target.value)}
              />
            </div>

            <div className="presets">
              <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>
                Profils&nbsp;:
              </span>
              <button className="preset" onClick={() => applyPreset(PRESETS.curieux)}>
                Curieux
              </button>
              <button className="preset" onClick={() => applyPreset(PRESETS.regulier)}>
                Régulier
              </button>
              <button className="preset" onClick={() => applyPreset(PRESETS.intensif)}>
                Intensif
              </button>
            </div>
          </div>

          {/* Résultats */}
          <div className="reveal" data-delay="80">
            <div
              className="calc-results"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div className="result-card" style={energyVars}>
                <div className="rc-label">Énergie / an</div>
                <div className="rc-num">{fmtWh(r.yrWh)}</div>
                <div className="rc-sub">{fmtWh(r.wkWh)} par semaine</div>
              </div>
              <div className="result-card" style={co2Vars}>
                <div className="rc-label">CO₂ / an</div>
                <div className="rc-num">{fmtG(r.yrCo2)}</div>
                <div className="rc-sub">{fmtG(r.wkCo2)} par semaine</div>
              </div>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <h3 className="h3" style={{ fontSize: 19, marginBottom: 18 }}>
                Sur un an, ça équivaut à…
              </h3>
              <div className="bars">
                <div className="bar">
                  <div className="bl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 7 }}><Car size={16} strokeWidth={2.2} /> Voiture therm.</div>
                  <div className="bt">
                    <div
                      className="bf coral"
                      style={{ width: pct(r.km, 120) + '%' }}
                    ></div>
                  </div>
                  <div className="bv coral">
                    {fmtFR(r.km, r.km < 10 ? 1 : 0)} km
                  </div>
                </div>
                <div className="bar">
                  <div className="bl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 7 }}><Smartphone size={16} strokeWidth={2.2} /> Charges tél.</div>
                  <div className="bt">
                    <div
                      className="bf green"
                      style={{ width: pct(r.phone, 4000) + '%' }}
                    ></div>
                  </div>
                  <div className="bv green">{fmtFR(r.phone, 0)}×</div>
                </div>
                <div className="bar">
                  <div className="bl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 7 }}><Lightbulb size={16} strokeWidth={2.2} /> Ampoule LED</div>
                  <div className="bt">
                    <div
                      className="bf amber"
                      style={{ width: pct(r.ledH, 8000) + '%' }}
                    ></div>
                  </div>
                  <div className="bv amber">
                    {fmtFR(r.ledH, r.ledH < 10 ? 1 : 0)} h
                  </div>
                </div>
                <div className="bar">
                  <div className="bl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 7 }}><Droplet size={16} strokeWidth={2.2} /> Eau (refroid.)</div>
                  <div className="bt">
                    <div
                      className="bf cyan"
                      style={{ width: pct(r.waterL, 800) + '%' }}
                    ></div>
                  </div>
                  <div className="bv cyan">
                    {fmtFR(r.waterL, r.waterL < 10 ? 1 : 0)} L
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--muted)',
                  marginTop: 22,
                  lineHeight: 1.5,
                }}
              >
                {r.note}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
