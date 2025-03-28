// src/components/SkeletonLoader.js
import React from "react";

const SkeletonLoader = ({ type = "product" }) => {
  if (type === "product") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-300 animate-pulse rounded-lg h-48"></div>
        ))}
      </div>
    );
  }

  if (type === "category") {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-300 rounded w-1/2 animate-pulse"></div> {/* Titre */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-300 animate-pulse rounded-lg h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  // Par défaut, retour d'un simple skeleton de texte
  return (
    <div className="h-8 bg-gray-300 rounded w-1/2 animate-pulse"></div>
  );
};

export default SkeletonLoader;
