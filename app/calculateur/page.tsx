import Link from 'next/link';
import CalculateurClient from './CalculateurClient';
import './calculateur.css';

export const metadata = {
  title: "Calculateur — Watt l'IA ?",
};

export default function CalculateurPage() {
  return (
    <main>
      <CalculateurClient />

      {/* Disclaimer */}
      <section className="section-sm" style={{ paddingTop: 6 }}>
        <div className="wrap">
          <div
            className="reveal"
            style={{
              background: 'var(--surface-2)',
              borderRadius: 16,
              padding: '22px 26px',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: 22 }}>ℹ️</span>
            <p
              style={{
                fontSize: 14,
                color: 'var(--muted)',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Ces résultats sont des <strong>estimations pédagogiques</strong> basées sur des
              ordres de grandeur publics (≈0,3 Wh/requête texte, ≈5 Wh/image, ≈1 kWh/vidéo de 5 s).
              Les valeurs réelles varient selon les modèles, les centres de données et le mix
              électrique. Méthode détaillée sur la page{' '}
              <Link href="/sources" style={{ color: 'var(--green-d)', fontWeight: 600 }}>
                Sources
              </Link>
              .
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
          <Link className="btn btn-pri" href="/agir">
            Réduire mon empreinte →
          </Link>
          <Link className="btn btn-ghost" href="/comparer">
            Revoir les comparaisons
          </Link>
        </div>
      </section>
    </main>
  );
}
