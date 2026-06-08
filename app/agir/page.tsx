import Link from 'next/link';

export const metadata = {
  title: "Agir au quotidien — Watt l'IA ?",
};

const GESTES = [
  {
    emoji: '🎯',
    title: 'Soigne ton prompt',
    text: 'Une question claire évite 5 allers-retours. Moins de régénérations = moins de calcul.',
  },
  {
    emoji: '🖼️',
    title: "Génère l'image en une fois",
    text: 'Évite de relancer 10 variantes. Choisis bien ta description avant de lancer.',
  },
  {
    emoji: '🧰',
    title: 'Le bon outil pour la tâche',
    text: 'Pas besoin du plus gros modèle pour une question simple. Les petits modèles consomment beaucoup moins.',
  },
  {
    emoji: '🔁',
    title: 'Réutilise plutôt que régénérer',
    text: "Garde et adapte une bonne réponse au lieu d'en relancer une nouvelle à chaque fois.",
  },
  {
    emoji: '🔎',
    title: 'IA ou simple recherche ?',
    text: 'Pour une date ou une définition, une recherche classique suffit souvent — et coûte moins.',
  },
  {
    emoji: '📦',
    title: 'Regroupe tes demandes',
    text: "Pose plusieurs questions liées dans un même échange plutôt qu'en multipliant les sessions.",
  },
  {
    emoji: '🌍',
    title: 'Renseigne-toi sur les fournisseurs',
    text: 'Certains alimentent leurs centres en énergie bas-carbone. La transparence progresse — demande-la.',
  },
  {
    emoji: '💬',
    title: 'Partage ce que tu sais',
    text: "Comprendre l'impact, sans dramatiser, aide ton entourage à utiliser l'IA plus intelligemment.",
  },
];

export default function Agir() {
  return (
    <main>
      {/* HERO */}
      <section className="section-sm" style={{ position: 'relative', paddingTop: 64 }}>
        <div className="blobs">
          <div
            className="blob g"
            style={{ width: 340, height: 340, top: -50, right: '-2%' }}
          ></div>
          <div
            className="blob v"
            style={{ width: 260, height: 260, top: 30, left: '-2%' }}
          ></div>
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 840 }}>
          <div className="eyebrow t-violet reveal">Agir au quotidien</div>
          <h1
            className="h1 reveal"
            data-delay="60"
            style={{ fontSize: 'clamp(36px,5.5vw,62px)', margin: '16px 0 18px' }}
          >
            Un usage plus sobre, sans renoncer à l&apos;IA
          </h1>
          <p className="lead reveal" data-delay="120">
            Pas besoin d&apos;arrêter l&apos;IA. Quelques réflexes simples suffisent à réduire
            l&apos;essentiel de l&apos;empreinte — surtout sur les tâches les plus lourdes.
          </p>
        </div>
      </section>

      {/* Le geste qui compte le plus */}
      <section className="section-sm">
        <div className="wrap">
          <div
            className="reveal"
            style={{
              background: 'linear-gradient(135deg,#0e9457,#12b56a)',
              borderRadius: 'var(--radius-lg)',
              padding: 44,
              color: '#fff',
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                opacity: 0.85,
              }}
            >
              Le réflexe n°1
            </div>
            <h2
              className="h2"
              style={{ color: '#fff', margin: '12px 0 12px', fontSize: 38 }}
            >
              Réserve l&apos;image et la vidéo à ce qui compte
            </h2>
            <p style={{ fontSize: 19, opacity: 0.94, maxWidth: 720 }}>
              Une vidéo IA peut coûter ~100 à 300 images, et une image jusqu&apos;à une charge de
              téléphone. Générer du texte est, à l&apos;inverse, très léger.{' '}
              <strong>
                Limiter les images/vidéos « pour le fun » et les régénérations en série est, de
                loin, ce qui change le plus.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Liste de gestes */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal" style={{ maxWidth: 720 }}>
            <div className="eyebrow">8 gestes concrets</div>
            <h2 className="h2">Des habitudes faciles à prendre</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {GESTES.map((g, i) => (
              <div
                key={g.title}
                className="card reveal"
                data-delay={i % 2 === 1 ? '60' : undefined}
                style={{
                  padding: 26,
                  display: 'flex',
                  gap: 18,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 30, lineHeight: 1 }}>{g.emoji}</span>
                <div>
                  <h3 className="h3" style={{ fontSize: 19 }}>
                    {g.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', marginTop: 6 }}>{g.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui ne sert à rien */}
      <section
        className="section"
        style={{
          background: 'var(--bg-warm)',
          borderTop: '1px solid var(--line-2)',
          borderBottom: '1px solid var(--line-2)',
        }}
      >
        <div
          className="wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div className="reveal">
            <div className="eyebrow t-coral">À relativiser</div>
            <h2 className="h2" style={{ margin: '14px 0 14px' }}>
              Ne te culpabilise pas pour un « merci »
            </h2>
            <p className="lead">
              Dire bonjour ou merci à une IA, écrire un prompt de plus : à l&apos;échelle
              individuelle, c&apos;est négligeable. L&apos;important est ailleurs — dans les usages
              lourds répétés et dans les choix collectifs (modèles, énergie des centres). Vise
              l&apos;impact réel, pas la perfection.
            </p>
          </div>
          <div className="card reveal" data-delay="100" style={{ padding: 30 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>✅</span>
                <span>
                  <strong>Gros effet :</strong> limiter vidéos &amp; images superflues
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>✅</span>
                <span>
                  <strong>Bon effet :</strong> éviter les régénérations en série
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>🟡</span>
                <span>
                  <strong>Effet faible :</strong> compter ses requêtes texte
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>⚪</span>
                <span>
                  <strong>Effet négligeable :</strong> supprimer les « merci »
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>
              Teste l&apos;effet de tes habitudes
            </h2>
            <p className="lead" style={{ maxWidth: 520, margin: '0 auto 26px' }}>
              Retourne au calculateur et compare un profil « avant / après ».
            </p>
            <Link className="btn btn-pri" href="/calculateur">
              Ouvrir le calculateur →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
