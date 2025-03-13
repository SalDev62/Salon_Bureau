// components/NavBarMobile.js
import Link from "next/link";
import NavBarMobileClient from './NavBarMobileClient'; // Importer le composant client

async function fetchMenus() {
  const response = await fetch(process.env.FETCH_MENUS_URL);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des menus");
  }
  return await response.json();
}

export default async function NavBarMobile() {
  // Récupération des menus côté serveur
  const menus = await fetchMenus().catch((error) => {
    console.error("Erreur lors de la récupération des menus:", error);
    return [];
  });

  // Rendu du composant client avec les menus
  return <NavBarMobileClient menus={menus} />;
}
