import { ArrowUpRight } from 'lucide-react';
import './sources.css';

export const metadata = {
  title: "Sources & méthode — Vert l'IA ?",
};

export default function Sources() {
  return (
    <main>
      {/* HERO */}
      <section className="section-sm" style={{ position: 'relative', paddingTop: 64 }}>
        <div className="wrap" style={{ maxWidth: 840 }}>
          <div className="eyebrow reveal">Sources &amp; méthode</div>
          <h1
            className="h1 reveal"
            data-delay="60"
            style={{ fontSize: 'clamp(34px,5vw,56px)', margin: '16px 0 18px' }}
          >
            Des ordres de grandeur, pas des vérités absolues
          </h1>
          <p className="lead reveal" data-delay="120">
            L&apos;impact exact de l&apos;IA reste difficile à mesurer : peu de chiffres officiels,
            des méthodes variables, de fortes incertitudes. Ce site assume des{' '}
            <strong>estimations transparentes</strong>, fondées sur des études publiques récentes.
          </p>
        </div>
      </section>

      {/* Tableau des valeurs */}
      <section className="section-sm">
        <div className="wrap">
          <div className="card reveal" style={{ padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                padding: '24px 28px',
                borderBottom: '1px solid var(--line)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <h2 className="h3" style={{ fontSize: 22 }}>
                Hypothèses utilisées dans le calculateur
              </h2>
              <span className="estimate-tag">Valeurs centrales</span>
            </div>
            <div className="tbl">
              <div className="tr th">
                <div>Opération</div>
                <div>Énergie</div>
                <div>CO₂</div>
                <div>Fourchette connue</div>
              </div>
              <div className="tr">
                <div>
                  <strong>Requête texte</strong>
                </div>
                <div className="mono t-green">~0,3 Wh</div>
                <div className="mono">~2 g</div>
                <div className="muted">0,24 – 3 Wh selon le modèle</div>
              </div>
              <div className="tr">
                <div>
                  <strong>Image générée</strong>
                </div>
                <div className="mono t-amber">~5 Wh</div>
                <div className="mono">~5 g</div>
                <div className="muted">0,3 – 11 Wh selon résolution/modèle</div>
              </div>
              <div className="tr">
                <div>
                  <strong>Vidéo IA (5 s)</strong>
                </div>
                <div className="mono t-coral">~1 000 Wh</div>
                <div className="mono">~400 g</div>
                <div className="muted">estimation unique, forte incertitude</div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 16,
              marginTop: 16,
            }}
          >
            <div className="card reveal" style={{ padding: 22 }}>
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '.08em',
                }}
              >
                Charge smartphone
              </div>
              <div className="h3" style={{ marginTop: 8 }}>
                ~15 Wh
              </div>
            </div>
            <div className="card reveal" data-delay="70" style={{ padding: 22 }}>
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '.08em',
                }}
              >
                Voiture thermique
              </div>
              <div className="h3" style={{ marginTop: 8 }}>
                ~170 g CO₂/km
              </div>
            </div>
            <div className="card reveal" data-delay="140" style={{ padding: 22 }}>
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '.08em',
                }}
              >
                Ampoule LED
              </div>
              <div className="h3" style={{ marginTop: 8 }}>
                ~8 W
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div className="reveal">
            <h2 className="h2" style={{ fontSize: 34, marginBottom: 16 }}>
              Notre méthode
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: 14 }}>
              On retient une <strong>valeur centrale</strong> par type d&apos;opération, issue du
              croisement de plusieurs études. Le calculateur multiplie cette valeur par ton usage
              déclaré, puis convertit en repères du quotidien.
            </p>
            <p style={{ color: 'var(--muted)' }}>
              Les conversions reposent sur des moyennes : un mix électrique mondial pour le CO₂,
              une charge de smartphone à 15 Wh, une voiture thermique à 170 g/km. Selon ton pays et
              tes outils, le réel peut varier d&apos;un facteur 2 à 10.
            </p>
          </div>
          <div className="reveal" data-delay="100">
            <h2 className="h2" style={{ fontSize: 34, marginBottom: 16 }}>
              Limites assumées
            </h2>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <li style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--amber-d)', fontWeight: 800 }}>—</span>
                <span style={{ color: 'var(--muted)' }}>
                  Les fabricants publient peu de chiffres officiels et vérifiables.
                </span>
              </li>
              <li style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--amber-d)', fontWeight: 800 }}>—</span>
                <span style={{ color: 'var(--muted)' }}>
                  Les méthodes diffèrent (inférence seule vs. entraînement amorti, eau directe vs.
                  indirecte).
                </span>
              </li>
              <li style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--amber-d)', fontWeight: 800 }}>—</span>
                <span style={{ color: 'var(--muted)' }}>
                  Les modèles évoluent vite : l&apos;efficacité progresse, les usages explosent.
                </span>
              </li>
              <li style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--amber-d)', fontWeight: 800 }}>—</span>
                <span style={{ color: 'var(--muted)' }}>
                  Objectif : donner le bon <em>ordre de grandeur</em>, pas un chiffre à la décimale.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section
        className="section"
        style={{
          background: 'var(--bg-warm)',
          borderTop: '1px solid var(--line-2)',
          borderBottom: '1px solid var(--line-2)',
        }}
      >
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: 720 }}>
            <div className="eyebrow">Pour aller plus loin</div>
            <h2 className="h2">Quelques sources publiques</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <a
              className="card reveal src"
              href="https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/"
              target="_blank"
              rel="noopener"
            >
              <h3 className="h3" style={{ fontSize: 18 }}>
                MIT Technology Review — AI energy footprint{' '}
                <ArrowUpRight size={16} strokeWidth={2.4} className="t-green" style={{ display: 'inline', verticalAlign: '-3px' }} />
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>
                Enquête de référence (mai 2025) sur l&apos;énergie de l&apos;IA, texte / image / vidéo.
              </p>
            </a>
            <a
              className="card reveal src"
              data-delay="60"
              href="https://www.sustainabilitybynumbers.com/p/ai-footprint-august-2025"
              target="_blank"
              rel="noopener"
            >
              <h3 className="h3" style={{ fontSize: 18 }}>
                Sustainability by Numbers — H. Ritchie <ArrowUpRight size={16} strokeWidth={2.4} className="t-green" style={{ display: 'inline', verticalAlign: '-3px' }} />
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>
                Synthèse des estimations par requête, image et vidéo, avec leurs incertitudes.
              </p>
            </a>
            <a
              className="card reveal src"
              href="https://arxiv.org/abs/2311.16863"
              target="_blank"
              rel="noopener"
            >
              <h3 className="h3" style={{ fontSize: 18 }}>
                « Power Hungry Processing » — Hugging Face / CMU{' '}
                <ArrowUpRight size={16} strokeWidth={2.4} className="t-green" style={{ display: 'inline', verticalAlign: '-3px' }} />
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>
                Étude mesurant l&apos;énergie par tâche : l&apos;image, la plus gourmande, ≈ une
                charge de téléphone.
              </p>
            </a>
            <a
              className="card reveal src"
              data-delay="60"
              href="https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use"
              target="_blank"
              rel="noopener"
            >
              <h3 className="h3" style={{ fontSize: 18 }}>
                Epoch AI — How much energy does ChatGPT use?{' '}
                <ArrowUpRight size={16} strokeWidth={2.4} className="t-green" style={{ display: 'inline', verticalAlign: '-3px' }} />
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>
                Estimation ~0,3 Wh par requête texte et mise en perspective à l&apos;échelle
                globale.
              </p>
            </a>
          </div>
          <p
            className="reveal"
            style={{ fontSize: 13, color: 'var(--muted-2)', marginTop: 20 }}
          >
            Liens externes vers des sources tierces, à jour à la création du projet. Les chiffres y
            sont eux-mêmes présentés comme des estimations.
          </p>
        </div>
      </section>

      {/* À propos */}
      <section className="section-sm">
        <div className="wrap">
          <div
            className="reveal"
            style={{
              background: 'var(--ink)',
              color: '#dfeee4',
              borderRadius: 'var(--radius-lg)',
              padding: 44,
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--green)',
              }}
            >
              À propos
            </div>
            <h2 className="h2" style={{ color: '#fff', margin: '12px 0 12px', fontSize: 32 }}>
              Un projet Ingénieur citoyen
            </h2>
            <p style={{ fontSize: 17, opacity: 0.9, maxWidth: 720 }}>
              « Vert l&apos;IA ? » est un projet étudiant à vocation citoyenne : rendre visible et
              compréhensible l&apos;impact écologique de l&apos;intelligence artificielle, pour un
              usage plus conscient — sans déni technophobe ni catastrophisme.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
