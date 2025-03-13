// components/NavBar.js
import Link from "next/link";
import Image from "next/image";
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['100','200', '500', '600'] })

async function fetchMenus() {
  const response = await fetch(process.env.FETCH_MENUS_URL);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des menus");
  }
  return await response.json();
}

export default async function NavBar() {
  const menus = await fetchMenus().catch((error) => {
    console.error("Erreur lors de la récupération des menus:", error);
    return [];
  });

  return (
    <nav className={`w-full bg-white ${poppins.className} `}>
      <div className="max-w-[1350px] mx-auto flex space-x-16 items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={100}
            height={100}
            quality={80}
            priority
            className="w-auto h-auto"
          />
        </Link>

        {/* Menu principal */}
        <ul className="flex gap-8">
          {menus.map((menu) => (
            <li key={menu.id} className="relative group">
              <Link
                href={`/${menu.id}`}
                className="text-md font-medium text-black hover:text-red-800 transition-colors"
              >
                {menu.nom}
              </Link>

              {/* Sous-menu */}
              {menu.categorieName && menu.categorieName.length > 0 && (
                <ul className="absolute left-0 invisible group-hover:visible bg-white shadow-lg mt-2 rounded-lg w-52 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out delay-100">
                  {menu.categorieName.map((categorieName, index) => (
                    <li key={index}>
                      <Link
                        href={`/${menu.id}/${menu.categorieId[index]}`}
                        className="block py-2 px-4 hover:bg-gray-100 text-gray-700 transition"
                      >
                        {categorieName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
