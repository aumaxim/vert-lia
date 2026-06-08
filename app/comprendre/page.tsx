import Link from 'next/link';
import { Zap, Factory, Droplet, Scale } from 'lucide-react';

export const metadata = {
  title: "Comprendre l'impact — Watt l'IA ?",
};

export default function Comprendre() {
  return (
    <main>
      {/* HERO */}
      <section className="section-sm" style={{ position: 'relative', paddingTop: 64 }}>
        <div className="blobs">
          <div
            className="blob g"
            style={{ width: 340, height: 340, top: -60, left: '-4%' }}
          ></div>
          <div
            className="blob c"
            style={{ width: 280, height: 280, top: 0, right: '2%' }}
          ></div>
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 840 }}>
          <div className="eyebrow reveal">Comprendre l&apos;impact</div>
          <h1
            className="h1 reveal"
            data-delay="60"
            style={{ fontSize: 'clamp(36px,5.5vw,62px)', margin: '16px 0 18px' }}
          >
            D&apos;où vient la consommation de l&apos;IA&nbsp;?
          </h1>
          <p className="lead reveal" data-delay="120">
            Pour générer une réponse, un modèle d&apos;IA mobilise des milliers de processeurs dans
            d&apos;immenses centres de données. Trois ressources sont en jeu — décortiquons-les.
          </p>
        </div>
      </section>

      {/* 3 ressources */}
      <section className="section-sm">
        <div className="wrap">
          <div className="pill-grid">
            <div className="pill green reveal">
              <div className="ico">Ressource 1</div>
              <div className="h3" style={{ margin: '14px 0 8px', fontSize: 26, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Zap size={26} strokeWidth={2.2} className="t-green" /> L&apos;électricité
              </div>
              <div className="pl">
                Les puces (GPU) qui font « réfléchir » l&apos;IA consomment énormément de courant.
                C&apos;est le poste n°1, surtout à l&apos;usage.
              </div>
            </div>
            <div className="pill amber reveal" data-delay="90">
              <div className="ico">Ressource 2</div>
              <div className="h3" style={{ margin: '14px 0 8px', fontSize: 26, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Factory size={26} strokeWidth={2.2} className="t-amber" /> Le CO₂
              </div>
              <div className="pl">
                Si cette électricité vient du gaz ou du charbon, elle émet du carbone.
                L&apos;empreinte dépend donc fortement du pays.
              </div>
            </div>
            <div className="pill cyan reveal" data-delay="180">
              <div className="ico">Ressource 3</div>
              <div className="h3" style={{ margin: '14px 0 8px', fontSize: 26, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Droplet size={26} strokeWidth={2.2} className="t-cyan" /> L&apos;eau
              </div>
              <div className="pl">
                Les serveurs chauffent. Beaucoup de centres utilisent de l&apos;eau douce qui
                s&apos;évapore pour les refroidir.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entraînement vs Inférence */}
      <section
        className="section"
        style={{
          background: 'var(--bg-warm)',
          borderTop: '1px solid var(--line-2)',
          borderBottom: '1px solid var(--line-2)',
        }}
      >
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow t-amber">Deux moments très différents</div>
            <h2 className="h2">Entraînement &amp; utilisation</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              On croit souvent que le gros de l&apos;impact vient de la création du modèle. En
              réalité, c&apos;est l&apos;usage quotidien, répété des milliards de fois, qui pèse le
              plus.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div className="card reveal" style={{ padding: 32 }}>
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: 'var(--violet-d)',
                }}
              >
                Phase 1 — une seule fois
              </div>
              <h3 className="h3" style={{ margin: '12px 0' }}>
                L&apos;entraînement
              </h3>
              <p style={{ color: 'var(--muted)', marginBottom: 18 }}>
                Apprendre au modèle demande des semaines de calcul. L&apos;entraînement d&apos;un
                très grand modèle a pu émettre l&apos;équivalent de{' '}
                <strong className="t-violet">~500 tonnes de CO₂</strong> — comme des centaines de
                vols Paris–New York.
              </p>
              <span className="estimate-tag">Estimation · ordre de grandeur</span>
            </div>
            <div
              className="card reveal"
              data-delay="100"
              style={{ padding: 32, border: '2px solid rgba(18,181,106,0.4)' }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: 'var(--green-d)',
                }}
              >
                Phase 2 — à chaque requête
              </div>
              <h3 className="h3" style={{ margin: '12px 0' }}>
                L&apos;utilisation (inférence)
              </h3>
              <p style={{ color: 'var(--muted)', marginBottom: 18 }}>
                Chaque requête est minuscule, mais il y en a des{' '}
                <strong className="t-green">milliards par jour</strong>. Cumulé, l&apos;usage
                représente aujourd&apos;hui <strong className="t-green">60 à 90 %</strong> de
                l&apos;énergie totale de l&apos;IA.
              </p>
              <span className="estimate-tag">Estimation · ordre de grandeur</span>
            </div>
          </div>
        </div>
      </section>

      {/* Le voyage d'un prompt */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: 760 }}>
            <div className="eyebrow">Étape par étape</div>
            <h2 className="h2">Le voyage d&apos;un prompt</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              className="card reveal"
              style={{
                display: 'flex',
                gap: 22,
                alignItems: 'flex-start',
                padding: '24px 28px',
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: 'var(--green-d)',
                  flex: 'none',
                  width: 52,
                }}
              >
                01
              </div>
              <div>
                <h3 className="h3" style={{ fontSize: 20 }}>
                  Tu écris ta question
                </h3>
                <p style={{ color: 'var(--muted)', marginTop: 4 }}>
                  Ton message part de ton téléphone vers un centre de données, parfois à
                  l&apos;autre bout du monde.
                </p>
              </div>
            </div>
            <div
              className="card reveal"
              data-delay="70"
              style={{
                display: 'flex',
                gap: 22,
                alignItems: 'flex-start',
                padding: '24px 28px',
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: 'var(--amber-d)',
                  flex: 'none',
                  width: 52,
                }}
              >
                02
              </div>
              <div>
                <h3 className="h3" style={{ fontSize: 20 }}>
                  Les GPU calculent
                </h3>
                <p style={{ color: 'var(--muted)', marginTop: 4 }}>
                  Des milliers de processeurs spécialisés s&apos;activent pour produire la réponse,
                  mot après mot. C&apos;est là que l&apos;électricité est consommée.
                </p>
              </div>
            </div>
            <div
              className="card reveal"
              data-delay="140"
              style={{
                display: 'flex',
                gap: 22,
                alignItems: 'flex-start',
                padding: '24px 28px',
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: 'var(--cyan-d)',
                  flex: 'none',
                  width: 52,
                }}
              >
                03
              </div>
              <div>
                <h3 className="h3" style={{ fontSize: 20 }}>
                  Le centre se refroidit
                </h3>
                <p style={{ color: 'var(--muted)', marginTop: 4 }}>
                  Toute cette puissance dégage de la chaleur. Climatisation et circuits d&apos;eau
                  entrent en jeu pour éviter la surchauffe.
                </p>
              </div>
            </div>
            <div
              className="card reveal"
              data-delay="210"
              style={{
                display: 'flex',
                gap: 22,
                alignItems: 'flex-start',
                padding: '24px 28px',
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: 'var(--coral-d)',
                  flex: 'none',
                  width: 52,
                }}
              >
                04
              </div>
              <div>
                <h3 className="h3" style={{ fontSize: 20 }}>
                  La réponse revient
                </h3>
                <p style={{ color: 'var(--muted)', marginTop: 4 }}>
                  En une fraction de seconde. Invisible — mais chaque étape a eu un petit coût bien
                  réel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuance */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div
            className="reveal"
            style={{
              background: 'var(--green-bg)',
              border: '1.5px solid rgba(18,181,106,0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: 44,
            }}
          >
            <h2 className="h2" style={{ fontSize: 34, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <Scale size={32} strokeWidth={2.2} className="t-green" /> Garder le sens des proportions
            </h2>
            <p className="lead" style={{ color: 'var(--ink-soft)', maxWidth: 760 }}>
              Une requête texte reste minuscule : une recherche web consomme déjà très peu, et
              l&apos;IA n&apos;en représente que quelques fois plus. L&apos;enjeu n&apos;est pas de
              culpabiliser pour un prompt, mais de comprendre que{' '}
              <strong>l&apos;échelle (milliards d&apos;usages) et les tâches lourdes (image, vidéo)</strong>{' '}
              font la différence. Le but de ce site : des repères honnêtes, ni déni ni catastrophisme.
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
          <Link className="btn btn-pri" href="/comparer">
            Comparer les IA →
          </Link>
          <Link className="btn btn-ghost" href="/calculateur">
            Calculer mon impact
          </Link>
        </div>
      </section>
    </main>
  );
}
