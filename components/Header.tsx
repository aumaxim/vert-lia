'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/comprendre', label: 'Comprendre' },
  { href: '/comparer', label: 'Comparer' },
  { href: '/calculateur', label: 'Calculateur' },
  { href: '/agir', label: 'Agir' },
  { href: '/chat', label: 'Démo' },
];

function ctaFor(path: string): { label: string; href: string } {
  if (path.startsWith('/calculateur')) return { label: 'Comment agir ?', href: '/agir' };
  if (path.startsWith('/chat')) return { label: 'Calculateur', href: '/calculateur' };
  return { label: 'Calculer mon impact', href: '/calculateur' };
}

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const cta = ctaFor(pathname);

  return (
    <header className="site-header">
      <nav className="nav">
        <Link className="brand" href="/" aria-label="Vert l'IA ? — Accueil">
          <Image
            src="/logo.png"
            alt="Vert l'IA ?"
            width={300}
            height={200}
            priority
            style={{ height: 78, width: 'auto', display: 'block' }}
          />
        </Link>
        <div className={`nav-links${open ? ' open' : ''}`}>
          {NAV.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? 'active' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link className="nav-cta" href={cta.href}>
          {cta.label}
        </Link>
        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
}
