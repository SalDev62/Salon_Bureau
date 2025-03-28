// components/ErrorPage.js

import Link from 'next/link';

export default function ErrorProduit({ message, linkText, linkHref }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="mb-4 text-red-500 text-4xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9l-6 6-6-6" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{message}</h2>
        <p className="text-sm text-gray-500 mb-6">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link href={linkHref} className="text-blue-500 hover:text-blue-700 font-semibold">
          {linkText}
        </Link>
      </div>
    </div>
  );
}
