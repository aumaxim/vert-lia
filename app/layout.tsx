import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealClient from '@/components/RevealClient';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: "Vert l'IA ? — Le coût écologique caché de l'intelligence artificielle",
  description:
    "Comprendre, comparer et calculer l'impact énergétique, carbone et hydrique de l'IA. Projet citoyen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />
        <RevealClient />
      </body>
    </html>
  );
}
