import Link from 'next/link';
import ComparerTabs from './ComparerTabs';
import './comparer.css';

export const metadata = {
  title: "Comparer les IA — Watt l'IA ?",
};

export default function Comparer() {
  return (
    <main>
      {/* HERO */}
      <section className="section-sm" style={{ position: 'relative', paddingTop: 64 }}>
        <div className="blobs">
          <div
            className="blob a"
            style={{ width: 320, height: 320, top: -50, right: '-2%' }}
          ></div>
          <div
            className="blob v"
            style={{ width: 260, height: 260, top: 20, left: 0 }}
          ></div>
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 840 }}>
          <div className="eyebrow t-amber reveal">Comparer les IA</div>
          <h1
            className="h1 reveal"
            data-delay="60"
            style={{ fontSize: 'clamp(36px,5.5vw,62px)', margin: '16px 0 18px' }}
          >
            Texte, image, vidéo&nbsp;: qui consomme quoi&nbsp;?
          </h1>
          <p className="lead reveal" data-delay="120">
            Le type de tâche change tout. Voici les écarts d&apos;énergie entre les usages les plus
            courants de l&apos;IA, en watt-heures par opération.
          </p>
        </div>
      </section>

      {/* Graphe principal */}
      <section className="section-sm">
        <div className="wrap">
          <div className="card reveal" style={{ padding: 38 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: 10,
                marginBottom: 30,
              }}
            >
              <h2 className="h3" style={{ fontSize: 24 }}>
                Énergie par opération{' '}
                <span style={{ color: 'var(--muted-2)', fontWeight: 600, fontSize: 16 }}>
                  (échelle logarithmique)
                </span>
              </h2>
              <span className="estimate-tag">Wh · estimations</span>
            </div>
            <div className="bars">
              <div className="bar">
                <div className="bl">Recherche web</div>
                <div className="bt">
                  <div className="bf cyan" data-w="8%"></div>
                </div>
                <div className="bv cyan">0,3 Wh</div>
              </div>
              <div className="bar">
                <div className="bl">Requête texte IA</div>
                <div className="bt">
                  <div className="bf green" data-w="14%"></div>
                </div>
                <div className="bv green">~0,3 Wh</div>
              </div>
              <div className="bar">
                <div className="bl">Réponse longue IA</div>
                <div className="bt">
                  <div className="bf green" data-w="34%"></div>
                </div>
                <div className="bv green">~3 Wh</div>
              </div>
              <div className="bar">
                <div className="bl">Image (efficace)</div>
                <div className="bt">
                  <div className="bf amber" data-w="40%"></div>
                </div>
                <div className="bv amber">~2 Wh</div>
              </div>
              <div className="bar">
                <div className="bl">Image (grand modèle)</div>
                <div className="bt">
                  <div className="bf amber" data-w="62%"></div>
                </div>
                <div className="bv amber">~11 Wh</div>
              </div>
              <div className="bar">
                <div className="bl">Vidéo IA · 5 s</div>
                <div className="bt">
                  <div className="bf coral" data-w="100%"></div>
                </div>
                <div className="bv coral">~1 000 Wh</div>
              </div>
            </div>
            <p
              style={{
                fontSize: 13,
                color: 'var(--muted-2)',
                marginTop: 22,
                fontFamily: 'var(--mono)',
              }}
            >
              Échelle log : chaque cran représente ~×10. La vidéo dépasse l&apos;image d&apos;un
              facteur ~100, l&apos;image dépasse le texte d&apos;un facteur ~10 à 40.
            </p>
          </div>
        </div>
      </section>

      {/* 3 cartes équivalences */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: 720 }}>
            <div className="eyebrow">En repères concrets</div>
            <h2 className="h2">Une opération = quoi dans la vraie vie&nbsp;?</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 18,
            }}
          >
            <div
              className="card reveal"
              style={{ padding: 30, borderTop: '4px solid var(--green)' }}
            >
              <div className="h3 t-green">💬 100 requêtes texte</div>
              <ul
                style={{
                  listStyle: 'none',
                  marginTop: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--line-2)',
                    paddingBottom: 10,
                  }}
                >
                  <span style={{ color: 'var(--muted)' }}>Énergie</span>
                  <strong className="mono">~30 Wh</strong>
                </li>
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--line-2)',
                    paddingBottom: 10,
                  }}
                >
                  <span style={{ color: 'var(--muted)' }}>≈ ampoule LED</span>
                  <strong className="mono">~3 h</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>≈ smartphone</span>
                  <strong className="mono">~2 charges</strong>
                </li>
              </ul>
            </div>
            <div
              className="card reveal"
              data-delay="90"
              style={{ padding: 30, borderTop: '4px solid var(--amber)' }}
            >
              <div className="h3 t-amber">🖼️ 100 images IA</div>
              <ul
                style={{
                  listStyle: 'none',
                  marginTop: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--line-2)',
                    paddingBottom: 10,
                  }}
                >
                  <span style={{ color: 'var(--muted)' }}>Énergie</span>
                  <strong className="mono">~0,5–1 kWh</strong>
                </li>
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--line-2)',
                    paddingBottom: 10,
                  }}
                >
                  <span style={{ color: 'var(--muted)' }}>≈ voiture therm.</span>
                  <strong className="mono">~3–6 km</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>≈ smartphone</span>
                  <strong className="mono">~50–80 charges</strong>
                </li>
              </ul>
            </div>
            <div
              className="card reveal"
              data-delay="180"
              style={{ padding: 30, borderTop: '4px solid var(--coral)' }}
            >
              <div className="h3 t-coral">🎬 1 vidéo IA (5 s)</div>
              <ul
                style={{
                  listStyle: 'none',
                  marginTop: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--line-2)',
                    paddingBottom: 10,
                  }}
                >
                  <span style={{ color: 'var(--muted)' }}>Énergie</span>
                  <strong className="mono">~1 kWh</strong>
                </li>
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--line-2)',
                    paddingBottom: 10,
                  }}
                >
                  <span style={{ color: 'var(--muted)' }}>≈ four élec.</span>
                  <strong className="mono">~30 min</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>≈ images IA</span>
                  <strong className="mono">~100–300</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sélecteur interactif */}
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
            <div className="eyebrow t-cyan">Explore</div>
            <h2 className="h2">Choisis une tâche, vois son empreinte</h2>
          </div>
          <div className="card reveal" style={{ padding: 34 }}>
            <ComparerTabs />
            <p
              style={{
                fontSize: 13,
                color: 'var(--muted-2)',
                marginTop: 20,
                fontFamily: 'var(--mono)',
              }}
            >
              Estimations — voir la page Sources pour la méthode et les fourchettes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div
          className="wrap"
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link className="btn btn-pri" href="/calculateur">
            Calculer mon impact →
          </Link>
          <Link className="btn btn-ghost" href="/agir">
            Comment agir ?
          </Link>
        </div>
      </section>
    </main>
  );
}
