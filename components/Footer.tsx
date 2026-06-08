import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="brand">
              <span className="dot"></span>Watt l&apos;IA&nbsp;?
            </div>
            <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 340 }}>
              Un projet citoyen pour comprendre l&apos;impact écologique de l&apos;intelligence
              artificielle, sans catastrophisme ni déni.
            </p>
          </div>
          <div className="footer-col">
            <h4>Le site</h4>
            <Link href="/comprendre">Comprendre l&apos;impact</Link>
            <Link href="/comparer">Comparer les IA</Link>
            <Link href="/calculateur">Calculateur</Link>
            <Link href="/agir">Agir au quotidien</Link>
          </div>
          <div className="footer-col">
            <h4>À propos</h4>
            <Link href="/sources">Sources &amp; méthode</Link>
            <Link href="/comprendre">Lexique</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            Projet Ingénieur citoyen · 2025 — chiffres = ordres de grandeur estimés, sources
            vérifiables.
          </span>
          <span className="mono">Watt l&apos;IA ?</span>
        </div>
      </div>
    </footer>
  );
}
