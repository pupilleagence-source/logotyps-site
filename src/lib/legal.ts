// Identité légale affichée sur /terms (mentions légales) et /privacy.
// Un champ vide n'est pas affiché : compléter SIRET, adresse, directeur de la
// publication et médiateur de la consommation dès que possible (obligatoires
// en France pour un site marchand).
export const LEGAL = {
  brand: "Logotyps",
  publisher: "Pupille Studio",
  legalForm: "", // ex. "Entreprise individuelle"
  siret: "", // ex. "123 456 789 00012"
  address: "", // adresse postale du siège
  director: "", // directeur de la publication (nom, prénom)
  email: "pupille.agence@gmail.com",
  country: "France",
  // Médiateur de la consommation (nom + adresse ou site), ex. "CM2C — https://www.cm2c.net".
  mediator: "",
  host: {
    name: "Hostinger International Ltd",
    address: "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
    url: "https://www.hostinger.fr",
  },
  // Date de dernière mise à jour des deux documents (ISO).
  updated: "2026-09-11",
};
