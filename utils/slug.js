import slugify from "slugify";

// Exemple de fonction pour générer un slug
function generateSlug(text) {
  return slugify(text, {
    lower: true,  // Mettre le texte en minuscules
    remove: /[*+~.()'"!:@]/g,  // Supprimer les caractères spéciaux
  });
}

export { generateSlug };
