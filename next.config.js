/** @type {import('next').NextConfig} */
// basePath piloté par env : vide en dev local (racine), défini sur le VPS
// (ex: /projet-ing-maxime) pour servir l'app sous un sous-chemin nginx.
// NEXT_PUBLIC_BASE_PATH doit être présent au BUILD (inliné côté client).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig = {
  reactStrictMode: true,
  basePath,
};
module.exports = nextConfig;
