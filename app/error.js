/* eslint react/no-unescaped-entities: "off" */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger l'utilisateur vers la page d'accueil après 3 secondes
    setTimeout(() => {
      router.push('/'); // Ou vers une autre page que tu préfères
    }, 3000);
  }, [router]);

  return (
    <div className="error-page">
      <h1>Oups ! Cette page n'existe pas.</h1>
      <p>Vous allez être redirigé vers la page d'accueil.</p>
    </div>
  );
}
