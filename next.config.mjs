/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baserow-backend-production20240528124524339000000001.s3.amazonaws.com',
        port: '', // Laisse vide si tu n'utilises pas de port spécifique
        pathname: '/**', // Si les images peuvent être n'importe où dans le bucket
      },
      {
        protocol: 'https',
        hostname: 'mdd.eu', // Ajoute ce domaine pour tes images
        port: '',
        pathname: '/**', // Modifie le chemin si nécessaire
      },
    ],
  },
}

export default nextConfig;
