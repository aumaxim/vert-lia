import Link from 'next/link';
import { Zap, Smartphone } from 'lucide-react';
import './home.css';

export default function Home() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <section
        className="hero"
        style={{ position: 'relative', padding: '64px 0 30px', textAlign: 'center' }}
      >
        <div className="blobs">
          <div
            className="blob g"
            style={{ width: 380, height: 380, top: -40, left: '6%' }}
          ></div>
          <div
            className="blob a"
            style={{ width: 320, height: 320, top: 40, right: '4%' }}
          ></div>
          <div
            className="blob c"
            style={{ width: 300, height: 300, bottom: -80, left: '34%' }}
          ></div>
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge reveal" style={{ marginBottom: 24 }}>
            <Zap size={14} strokeWidth={2.5} className="t-amber" /> Le coût caché de l&apos;intelligence artificielle
          </div>
          <h1 className="h1 reveal" data-delay="60" style={{ marginBottom: 22 }}>
            Ton IA consomme
            <br />
            de l&apos;<span className="t-green">énergie</span>, du{' '}
            <span className="t-amber">CO₂</span>
            <br />
            et de l&apos;<span className="t-cyan">eau</span>.
          </h1>
          <p
            className="lead reveal"
            data-delay="120"
            style={{ maxWidth: 580, margin: '0 auto 34px' }}
          >
            Chaque prompt a un coût invisible. On le rend visible — avec des chiffres simples,
            des comparaisons concrètes et un calculateur — sans tomber dans l&apos;alarmisme.
          </p>
          <div
            className="reveal"
            data-delay="180"
            style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link className="btn btn-pri" href="/chat">
              <Zap size={18} strokeWidth={2.5} /> Essayer la démo live →
            </Link>
            <Link className="btn btn-ghost" href="/calculateur">
              Calculer mon impact
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Pastilles : texte → image → vidéo ============ */}
      <section className="section-sm">
        <div className="wrap">
          <p
            className="reveal"
            style={{
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: 15,
              marginBottom: 22,
            }}
          >
            L&apos;ordre de grandeur change radicalement selon ce que tu demandes&nbsp;:
          </p>
          <div className="pill-grid">
            <div className="pill green reveal">
              <div className="ico">Texte · 1 requête</div>
              <div className="pn">
                ~0,3 <span style={{ fontSize: 24 }}>Wh</span>
              </div>
              <div className="pl">
                Une question à un assistant IA. Soit ~2 g de CO₂ — l&apos;équivalent de quelques
                secondes d&apos;ampoule LED.
              </div>
              <span className="estimate-tag" style={{ marginTop: 16 }}>
                Estimation
              </span>
            </div>
            <div className="pill amber reveal" data-delay="90">
              <div className="ico">Image · 1 génération</div>
              <div className="pn">
                jusqu&apos;à ~1 <span style={{ fontSize: 24, display: 'inline-flex', alignItems: 'center', gap: 6 }}>charge <Smartphone size={22} strokeWidth={2.2} /></span>
              </div>
              <div className="pl">
                Générer une image peut coûter autant qu&apos;une charge complète de smartphone —
                bien plus qu&apos;un texte.
              </div>
              <span className="estimate-tag" style={{ marginTop: 16 }}>
                Estimation
              </span>
            </div>
            <div className="pill coral reveal" data-delay="180">
              <div className="ico">Vidéo · 5 secondes</div>
              <div className="pn">
                ~1 <span style={{ fontSize: 24 }}>kWh</span>
              </div>
              <div className="pl">
                Une courte vidéo IA peut consommer ~1 kWh — des centaines de fois une image. Le
                plus lourd, de loin.
              </div>
              <span className="estimate-tag" style={{ marginTop: 16 }}>
                Estimation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURE VEDETTE : Démo live ============ */}
      <section className="section">
        <div className="wrap">
          <div className="demo-feature reveal">
            <div className="demo-blobs">
              <span className="db g"></span>
              <span className="db a"></span>
            </div>
            <div className="demo-left">
              <div className="demo-badge">
                <span className="ping"></span>Nouveau · Démo interactive
              </div>
              <h2 className="h2" style={{ color: '#fff', margin: '16px 0 14px' }}>
                Parle à une IA.
                <br />
                Vois la facture <span className="t-live">en direct</span>.
              </h2>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: '#bcd3c4',
                  maxWidth: 440,
                  marginBottom: 28,
                }}
              >
                Chaque réponse d&apos;un vrai modèle affiche son coût estimé — énergie, CO₂, eau,
                tokens — et le compteur additionne toute ta session. La façon la plus concrète de
                ressentir l&apos;impact.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <Link className="btn btn-pri" href="/chat">
                  Lancer la démo →
                </Link>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 13,
                    color: '#8fae9c',
                  }}
                >
                  ≈ 1 min · réponses réelles
                </span>
              </div>
            </div>

            <div className="demo-right">
              <div className="mock">
                <div className="mock-head">
                  <span className="mock-dot"></span> Assistant IA{' '}
                  <span className="mock-tag">type Haiku</span>
                </div>
                <div className="mock-body">
                  <div className="mb user">C&apos;est quoi un data center&nbsp;?</div>
                  <div className="mb ai">
                    Un data center est un immense bâtiment rempli de serveurs qui stockent et
                    traitent les données — dont celles de l&apos;IA. Il consomme beaucoup
                    d&apos;électricité et doit être refroidi en permanence.
                    <span className="mb-cost"><Zap size={12} strokeWidth={2.5} style={{ verticalAlign: '-2px' }} /> 0,4 Wh · 3 g CO₂ · ~410 tokens</span>
                  </div>
                </div>
                <div className="mock-meter">
                  <div>
                    <div className="mm-label">Session · énergie</div>
                    <div className="mm-num">1,2 Wh</div>
                  </div>
                  <div className="mm-bar">
                    <span style={{ width: '24%' }}></span>
                  </div>
                  <div className="mm-eq" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>≈ 8&nbsp;% <Smartphone size={14} strokeWidth={2.2} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Chiffres-clés animés ============ */}
      <section
        className="section"
        style={{
          background: 'var(--bg-warm)',
          borderTop: '1px solid var(--line-2)',
          borderBottom: '1px solid var(--line-2)',
        }}
      >
        <div className="wrap">
          <div
            className="section-head reveal"
            style={{ margin: '0 auto 50px', textAlign: 'center' }}
          >
            <div className="eyebrow">À l&apos;échelle de la planète</div>
            <h2 className="h2">Petit par requête, énorme par milliards</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 22,
            }}
          >
            <div className="card reveal" style={{ textAlign: 'center' }}>
              <div className="h2 t-green">
                <span data-count="2" data-suffix=" %"></span>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 15, marginTop: 6 }}>
                de l&apos;électricité mondiale consommée par les data centers
              </div>
            </div>
            <div className="card reveal" data-delay="80" style={{ textAlign: 'center' }}>
              <div className="h2 t-amber">
                <span data-count="1" data-prefix="~" data-suffix=" Md"></span>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 15, marginTop: 6 }}>
                de requêtes envoyées à ChatGPT chaque jour
              </div>
            </div>
            <div className="card reveal" data-delay="160" style={{ textAlign: 'center' }}>
              <div className="h2 t-cyan">
                <span data-count="10" data-prefix="×"></span>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 15, marginTop: 6 }}>
                plus d&apos;énergie qu&apos;une recherche web pour une requête IA
              </div>
            </div>
            <div className="card reveal" data-delay="240" style={{ textAlign: 'center' }}>
              <div className="h2 t-coral">
                <span data-count="60" data-suffix="–90 %"></span>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 15, marginTop: 6 }}>
                de l&apos;énergie de l&apos;IA vient de l&apos;usage, pas de l&apos;entraînement
              </div>
            </div>
          </div>
          <p
            className="reveal"
            style={{
              textAlign: 'center',
              color: 'var(--muted-2)',
              fontSize: 13,
              marginTop: 26,
            }}
          >
            Ordres de grandeur issus d&apos;études récentes — détails et sources sur la page{' '}
            <Link href="/sources" style={{ color: 'var(--green-d)', fontWeight: 600 }}>
              Sources&nbsp;&amp;&nbsp;méthode
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ============ Comparaison concrète teaser ============ */}
      <section className="section">
        <div
          className="wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div className="reveal">
            <div className="eyebrow">Rendre visible l&apos;invisible</div>
            <h2 className="h2" style={{ margin: '14px 0 16px' }}>
              Une image IA, <span className="t-amber">ça coûte combien</span> au juste&nbsp;?
            </h2>
            <p className="lead" style={{ marginBottom: 26 }}>
              On traduit la consommation de l&apos;IA en repères du quotidien : charges de
              téléphone, mètres en voiture, eau de refroidissement.
            </p>
            <Link className="btn btn-dark" href="/comparer">
              Comparer les IA →
            </Link>
          </div>
          <div className="card reveal" data-delay="100" style={{ padding: 34 }}>
            <div
              className="h3"
              style={{
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              Générer{' '}
              <span
                className="mono"
                style={{
                  background: 'var(--amber)',
                  color: '#fff',
                  padding: '2px 10px',
                  borderRadius: 6,
                  fontSize: 18,
                }}
              >
                1
              </span>{' '}
              image équivaut à…
            </div>
            <div className="bars">
              <div className="bar">
                <div className="bl">Charge smartphone</div>
                <div className="bt">
                  <div className="bf green" data-w="80%"></div>
                </div>
                <div className="bv green">~80 %</div>
              </div>
              <div className="bar">
                <div className="bl">CO₂ émis</div>
                <div className="bt">
                  <div className="bf amber" data-w="45%"></div>
                </div>
                <div className="bv amber">~5 g</div>
              </div>
              <div className="bar">
                <div className="bl">Voiture thermique</div>
                <div className="bt">
                  <div className="bf coral" data-w="30%"></div>
                </div>
                <div className="bv coral">~35 m</div>
              </div>
              <div className="bar">
                <div className="bl">Eau (refroidiss.)</div>
                <div className="bt">
                  <div className="bf cyan" data-w="22%"></div>
                </div>
                <div className="bv cyan">~3 cL</div>
              </div>
            </div>
            <p
              style={{
                fontSize: 12,
                color: 'var(--muted-2)',
                marginTop: 18,
                fontFamily: 'var(--mono)',
              }}
            >
              Estimation pour un grand modèle de diffusion · varie fortement selon le modèle
            </p>
          </div>
        </div>
      </section>

      {/* ============ Parcours / liens pages ============ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div
            className="section-head reveal"
            style={{ margin: '0 auto 44px', textAlign: 'center' }}
          >
            <div className="eyebrow">Par où commencer</div>
            <h2 className="h2">Explore le sujet à ton rythme</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              gap: 18,
            }}
          >
            <Link
              className="card reveal"
              href="/comprendre"
              style={{ display: 'block', padding: 32 }}
            >
              <div className="h3 t-green">01 — Comprendre l&apos;impact</div>
              <p style={{ color: 'var(--muted)', marginTop: 10 }}>
                D&apos;où vient vraiment la consommation : entraînement, inférence, refroidissement.
                Les 3 ressources en jeu.
              </p>
            </Link>
            <Link
              className="card reveal"
              data-delay="80"
              href="/comparer"
              style={{ display: 'block', padding: 32 }}
            >
              <div className="h3 t-amber">02 — Comparer les IA</div>
              <p style={{ color: 'var(--muted)', marginTop: 10 }}>
                Texte, image, vidéo : qui consomme quoi ? Des graphiques clairs pour visualiser
                les écarts.
              </p>
            </Link>
            <Link
              className="card reveal"
              href="/calculateur"
              style={{ display: 'block', padding: 32 }}
            >
              <div className="h3 t-cyan">03 — Calculer mon impact</div>
              <p style={{ color: 'var(--muted)', marginTop: 10 }}>
                Estime ta propre empreinte IA hebdomadaire et vois à quoi elle correspond
                concrètement.
              </p>
            </Link>
            <Link
              className="card reveal"
              data-delay="80"
              href="/agir"
              style={{ display: 'block', padding: 32 }}
            >
              <div className="h3 t-violet">04 — Agir au quotidien</div>
              <p style={{ color: 'var(--muted)', marginTop: 10 }}>
                Des gestes simples et réalistes pour un usage plus sobre — sans renoncer à
                l&apos;IA.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CTA bande ============ */}
      <section className="section-sm">
        <div className="wrap">
          <div
            className="reveal"
            style={{
              background: 'linear-gradient(135deg,#0e9457,#12b56a)',
              borderRadius: 'var(--radius-lg)',
              padding: 56,
              textAlign: 'center',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <h2 className="h2" style={{ color: '#fff', marginBottom: 14 }}>
              Curieux de ta propre empreinte&nbsp;?
            </h2>
            <p
              style={{
                fontSize: 19,
                opacity: 0.92,
                maxWidth: 520,
                margin: '0 auto 28px',
              }}
            >
              En 1 minute, estime ce que ton usage de l&apos;IA représente chaque semaine.
            </p>
            <Link
              className="btn"
              href="/calculateur"
              style={{ background: '#fff', color: 'var(--green-d)' }}
            >
              Lancer le calculateur →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
