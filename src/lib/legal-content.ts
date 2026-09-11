// Contenu des pages /privacy et /terms, en anglais et en français.
//
// Tout ce qui est écrit ici décrit le fonctionnement RÉEL du site, du plugin et du
// backend (voir CLAUDE.md du dépôt logo-declinaisons, §6 licence et §2.3 mise à jour).
// Une promesse ajoutée ici doit rester vraie par rapport au code : c'est un contrat.
//
// Format : un document = des sections ; le corps d'une section alterne des paragraphes
// (string) et des listes (string[]). Dans un texte, [libellé](https://…) devient un lien.
import { LEGAL } from "./legal";
import type { Language } from "./translations";

export type LegalBlock = string | string[];
export type LegalSection = { id: string; title: string; body: LegalBlock[] };
export type LegalDoc = { title: string; subtitle: string; sections: LegalSection[] };
export type LegalUi = {
  backHome: string;
  updated: string;
  toc: string;
  seeAlso: string;
  privacyLink: string;
  termsLink: string;
  contact: string;
};

const LS_PRIVACY = "https://www.lemonsqueezy.com/privacy";
const LS_TERMS = "https://www.lemonsqueezy.com/terms";
const PORTAL = "https://logotyps.lemonsqueezy.com/billing";
const MY_ORDERS = "https://app.lemonsqueezy.com/my-orders";
const ODR = "https://ec.europa.eu/consumers/odr";

function formatDate(iso: string, lang: Language) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Bloc « éditeur » des mentions légales : seules les lignes renseignées apparaissent.
function publisherLines(lang: Language): string[] {
  const L = LEGAL;
  const fr = lang === "fr";
  const lines: string[] = [];
  const form = fr ? L.legalForm.fr : L.legalForm.en;
  lines.push((fr ? "Éditeur : " : "Publisher: ") + L.publisher + (form ? ", " + form : "") + (L.country ? ", " + L.country : ""));
  if (L.siret) lines.push("SIRET : " + L.siret);
  if (L.address) lines.push((fr ? "Adresse : " : "Address: ") + L.address);
  if (L.phone) lines.push((fr ? "Téléphone : " : "Phone: ") + L.phone);
  if (L.director) lines.push((fr ? "Directeur de la publication : " : "Publication director: ") + L.director);
  lines.push((fr ? "Contact : " : "Contact: ") + "[" + L.email + "](mailto:" + L.email + ")");
  lines.push((fr ? "Hébergeur du site : " : "Website host: ") + "[" + L.host.name + "](" + L.host.url + "), " + L.host.address);
  return lines;
}

export function getLegal(lang: Language): { ui: LegalUi; privacy: LegalDoc; terms: LegalDoc } {
  const L = LEGAL;
  const updated = formatDate(L.updated, lang);
  const mail = "[" + L.email + "](mailto:" + L.email + ")";

  if (lang === "fr") {
    const ui: LegalUi = {
      backHome: "Accueil",
      updated: "Dernière mise à jour : " + updated,
      toc: "Sommaire",
      seeAlso: "Voir aussi",
      privacyLink: "Politique de confidentialité",
      termsLink: "Conditions d'utilisation et mentions légales",
      contact: "Une question ? Écrivez à " + mail + ".",
    };

    const privacy: LegalDoc = {
      title: "Politique de confidentialité",
      subtitle:
        "Ce que Logotyps collecte, pourquoi, où c'est stocké et comment exercer vos droits. Version courte : aucun suivi publicitaire, aucune donnée bancaire chez nous, et vos fichiers de travail ne quittent jamais votre ordinateur.",
      sections: [
        {
          id: "controller",
          title: "1. Qui est responsable du traitement",
          body: [
            "Le site logotyps.fr, le plugin Logotyps pour Adobe Illustrator et le service de licence qui l'accompagne sont édités par " + L.publisher + (L.legalForm.fr ? " (" + L.legalForm.fr + ")" : "") + ", " + L.country + ". Responsable du traitement au sens du RGPD : " + L.publisher + ", joignable à " + mail + ".",
            "Les paiements sont assurés par Lemon Squeezy, qui agit comme vendeur officiel (merchant of record) et est responsable de ses propres traitements (voir la section 5).",
          ],
        },
        {
          id: "scope",
          title: "2. Ce que couvre cette politique",
          body: [
            "Cette politique s'applique à trois choses :",
            [
              "le site logotyps.fr, y compris la page de téléchargement ;",
              "le plugin Logotyps installé dans Adobe Illustrator ;",
              "le service en ligne que le plugin contacte pour compter l'essai gratuit, activer les licences et proposer les mises à jour.",
            ],
          ],
        },
        {
          id: "website",
          title: "3. Sur le site logotyps.fr",
          body: [
            "Le site n'a ni compte utilisateur, ni formulaire, ni outil de mesure d'audience, ni cookie publicitaire. Il ne dépose aucun cookie. Votre choix de langue (EN / FR) est mémorisé dans le stockage local de votre navigateur, sur votre appareil uniquement.",
            "Ce qui est techniquement inévitable :",
            [
              "L'hébergeur du site (" + L.host.name + ") tient des journaux techniques (adresse IP, navigateur, pages demandées) pour la sécurité et le fonctionnement du service, conservés pour une durée limitée selon [sa politique](https://www.hostinger.com/legal/privacy-policy).",
              "La police de caractères Inter est chargée depuis Google Fonts : votre navigateur transmet donc votre adresse IP à Google lors du chargement de la page ([politique de Google](https://policies.google.com/privacy)).",
              "Certaines images du site sont servies par Supabase Storage, qui voit également votre adresse IP ([politique de Supabase](https://supabase.com/privacy)).",
              "Les installeurs proposés sur la page de téléchargement sont stockés sur GitHub : le téléchargement est servi par GitHub, qui reçoit votre adresse IP ([politique de GitHub](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement)).",
            ],
            "Après un achat, Lemon Squeezy vous renvoie sur la page de téléchargement avec votre clé de licence et votre e-mail dans l'adresse de la page, afin de vous les afficher immédiatement. Le site les affiche, puis les retire de la barre d'adresse et de l'historique du navigateur ; il ne les enregistre nulle part.",
          ],
        },
        {
          id: "plugin",
          title: "4. Dans le plugin Logotyps",
          body: [
            "Tout le travail graphique (génération des déclinaisons, exports, charte InDesign, mockups Photoshop) se fait sur votre ordinateur. Vos documents Illustrator, vos logos, vos polices, vos couleurs et vos fichiers exportés ne sont jamais transmis à Pupille Studio ni à un tiers.",
            "Le plugin contacte notre service en ligne dans quatre cas : compter l'essai gratuit, activer une licence, vérifier périodiquement qu'elle est toujours valable, et savoir si une nouvelle version est disponible. Pour cela il envoie :",
            [
              "un identifiant de poste (« HWID ») : une empreinte SHA-256 calculée localement à partir du nom de l'ordinateur, du nom d'utilisateur du système, de l'adresse MAC de la carte réseau, du type et de l'architecture du système, du modèle et du nombre de cœurs du processeur. Seule l'empreinte est envoyée ; ces informations brutes ne quittent pas votre poste, et l'empreinte ne permet pas de les reconstituer ;",
              "lors d'une activation : la clé de licence saisie et, le cas échéant, l'identifiant du poste précédent (après une mise à jour d'Illustrator, l'empreinte peut changer ; l'ancienne activation est alors libérée automatiquement) ;",
              "comme pour toute requête Internet, votre adresse IP est visible par l'hébergeur du service (journaux techniques de Vercel, conservés brièvement).",
            ],
            "Le plugin ne vous demande pas d'adresse e-mail et n'en envoie pas. La vérification de mise à jour ne transmet aucune donnée personnelle : le plugin télécharge simplement la description de la dernière version.",
            "Ce que notre service enregistre :",
            [
              "pour l'essai gratuit : le nombre de générations utilisées, associé à l'identifiant de poste ;",
              "pour une licence activée : la clé de licence, le type de licence, l'identifiant d'activation attribué par Lemon Squeezy, l'adresse e-mail du client telle que Lemon Squeezy la connaît, l'identifiant de poste et les dates d'activation et de dernière vérification.",
            ],
            "Sur votre ordinateur, le plugin conserve l'identifiant de poste et la licence dans deux petits fichiers de votre dossier personnel (.logotyps-hwid et .logotyps-license) ainsi que dans le stockage local du panneau. Ils permettent au plugin de fonctionner jusqu'à 7 jours sans connexion. Désinstaller le plugin ne les supprime pas ; vous pouvez les effacer vous-même.",
          ],
        },
        {
          id: "purchases",
          title: "5. Achats et facturation (Lemon Squeezy)",
          body: [
            "Les licences sont vendues par Lemon Squeezy, vendeur officiel (merchant of record). Lorsque vous achetez, Lemon Squeezy collecte votre nom, votre adresse e-mail, votre pays et votre adresse de facturation, ainsi que vos données de paiement, et se charge de la facture, de la TVA et du reçu. Pupille Studio ne voit jamais votre numéro de carte ni vos coordonnées bancaires.",
            "Pupille Studio accède, via son tableau de bord Lemon Squeezy, aux informations de commande nécessaires au service : nom, e-mail, pays, produit acheté, montant, clé de licence et activations. Ces informations servent à vous assister, à traiter un remboursement et à révoquer une clé remboursée.",
            "Lemon Squeezy traite ces données selon [sa politique de confidentialité](" + LS_PRIVACY + ") et [ses conditions](" + LS_TERMS + "). Vous pouvez à tout moment retrouver vos commandes et vos clés sur [app.lemonsqueezy.com/my-orders](" + MY_ORDERS + ") et gérer votre abonnement sur [le portail client](" + PORTAL + ").",
          ],
        },
        {
          id: "lawful-basis",
          title: "6. Pourquoi nous traitons ces données (bases légales)",
          body: [
            [
              "Exécution du contrat : activer votre licence, la vérifier, vous fournir les mises à jour et le support.",
              "Intérêt légitime : limiter l'essai gratuit à 3 générations par poste, empêcher l'utilisation d'une même clé au-delà du nombre de postes autorisés, assurer la sécurité du service.",
              "Obligation légale : conservation des pièces de facturation, assurée par Lemon Squeezy.",
            ],
            "Aucune donnée n'est utilisée pour de la publicité, du profilage ou de la revente. Nous n'envoyons pas de newsletter.",
          ],
        },
        {
          id: "retention",
          title: "7. Durées de conservation",
          body: [
            [
              "Compteur d'essai : conservé tant que le poste n'a pas de licence, afin que l'essai reste limité à 3 générations. Supprimé sur demande.",
              "Enregistrement de licence : conservé tant que la licence est active sur le poste. Désactiver la licence depuis le panneau supprime l'enregistrement de ce poste. Après un remboursement ou l'expiration d'un abonnement, l'enregistrement est supprimé lors de la vérification suivante. Suppression complète sur demande.",
              "Journaux techniques des hébergeurs : quelques jours à quelques semaines, selon le prestataire.",
              "Données de commande chez Lemon Squeezy : durées légales de conservation comptable et fiscale.",
            ],
          ],
        },
        {
          id: "recipients",
          title: "8. Destinataires, hébergement et transferts hors UE",
          body: [
            "Vos données ne sont ni vendues ni partagées à des fins commerciales. Elles sont traitées par les sous-traitants techniques suivants, chacun limité à sa fonction :",
            [
              "" + L.host.name + " : hébergement du site logotyps.fr (Union européenne).",
              "Vercel Inc. (États-Unis) : exécution du service de licence et de mise à jour ([politique](https://vercel.com/legal/privacy-policy)).",
              "Redis Cloud (Redis Ltd) : base de données du service, hébergée dans la région Paris (France) ([politique](https://redis.io/legal/privacy-policy/)).",
              "Lemon Squeezy (États-Unis) : vente, paiement, facturation, clés de licence.",
              "GitHub (États-Unis) : hébergement des fichiers d'installation.",
              "Google (États-Unis) : polices de caractères du site. Supabase : images du site.",
            ],
            "Pour les prestataires établis aux États-Unis, les transferts sont encadrés par les mécanismes prévus au RGPD (clauses contractuelles types de la Commission européenne ou certification au Data Privacy Framework, selon le prestataire). Les données transmises par le plugin se limitent à l'empreinte de poste, à la clé de licence et à l'adresse IP.",
          ],
        },
        {
          id: "rights",
          title: "9. Vos droits",
          body: [
            "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur les données vous concernant. Pour l'exercer, écrivez à " + mail + " en indiquant l'adresse e-mail utilisée à l'achat ou votre clé de licence. Nous répondons sous un mois.",
            "Concrètement, nous pouvons sur demande : supprimer le compteur d'essai d'un poste, supprimer l'enregistrement d'une licence, ou vous transmettre une copie des données enregistrées. Pour les données de paiement et de facturation, la demande est à adresser à Lemon Squeezy, qui en est responsable.",
            "Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la [CNIL](https://www.cnil.fr).",
          ],
        },
        {
          id: "security",
          title: "10. Sécurité",
          body: [
            "Tous les échanges entre le site, le plugin et nos services sont chiffrés (HTTPS). Les secrets d'accès aux services tiers ne sont présents que côté serveur. Les notifications reçues de Lemon Squeezy sont authentifiées par signature. L'identifiant de poste est une empreinte irréversible, jamais les informations d'origine. Nous ne détenons aucune donnée bancaire.",
          ],
        },
        {
          id: "minors",
          title: "11. Mineurs",
          body: ["Logotyps s'adresse aux professionnels et aux personnes majeures. Nous ne collectons pas sciemment de données concernant des mineurs."],
        },
        {
          id: "changes",
          title: "12. Modifications",
          body: [
            "Cette politique peut évoluer avec le produit. La date en haut de page indique la dernière version ; un changement important sera signalé sur le site ou dans le plugin. " + ui.updated + ".",
          ],
        },
      ],
    };

    const terms: LegalDoc = {
      title: "Conditions d'utilisation",
      subtitle:
        "Les règles qui s'appliquent au site logotyps.fr, à l'essai gratuit, à l'achat et à l'utilisation des licences du plugin Logotyps. Elles incluent les mentions légales du site.",
      sections: [
        { id: "legal-notice", title: "Mentions légales", body: [publisherLines(lang)] },
        {
          id: "purpose",
          title: "1. Objet et acceptation",
          body: [
            "Les présentes conditions régissent l'utilisation du site logotyps.fr et du plugin Logotyps pour Adobe Illustrator (« le Plugin »), édités par " + L.publisher + " (« nous »). En installant le Plugin, en utilisant l'essai gratuit ou en achetant une licence, vous les acceptez. Si vous agissez pour le compte d'une société ou d'une école, vous déclarez avoir le pouvoir de l'engager.",
          ],
        },
        {
          id: "definitions",
          title: "2. Définitions",
          body: [
            [
              "Plugin : le panneau Logotyps installé dans Adobe Illustrator, ses modèles InDesign, ses mockups Photoshop et ses mises à jour.",
              "Licence : le droit d'utiliser le Plugin, matérialisé par une clé de licence remise après l'achat.",
              "Poste : un ordinateur sur lequel la Licence est activée. Chaque activation occupe un poste.",
              "Essai : l'utilisation gratuite du Plugin avant l'achat d'une Licence.",
            ],
          ],
        },
        {
          id: "service",
          title: "3. Le Plugin et ses prérequis",
          body: [
            "Le Plugin génère, à partir d'un logo sélectionné dans Adobe Illustrator, ses déclinaisons (versions, cadrages, traitements couleur), les exporte dans les formats et tailles choisis, et peut produire une charte graphique InDesign avec des mockups rendus par Photoshop. Ses fonctions exactes sont celles décrites sur le site et dans le Plugin à la date de votre achat.",
            "Prérequis : Adobe Illustrator 2022 (version 26) ou plus récent, sur macOS ou Windows. La charte graphique demande en plus Adobe InDesign et Adobe Photoshop 2022 ou plus récents, installés sur le même Poste. Les applications Adobe ne sont pas fournies et relèvent de votre propre licence Adobe.",
            "Une connexion Internet est nécessaire pour compter l'essai, activer une Licence, la vérifier périodiquement et recevoir les mises à jour. Une Licence activée continue de fonctionner jusqu'à 7 jours sans connexion.",
          ],
        },
        {
          id: "trial",
          title: "4. Essai gratuit",
          body: [
            "Le Plugin peut être utilisé gratuitement pour 3 générations par Poste, avec toutes ses fonctions, sans carte bancaire. Les générations sont comptées par notre service en ligne. Contourner ce compteur (réinitialiser ou falsifier l'identifiant de poste, bloquer le service, modifier le Plugin) est interdit.",
          ],
        },
        {
          id: "ordering",
          title: "5. Commande, prix et paiement",
          body: [
            "Les Licences sont vendues par notre partenaire Lemon Squeezy, qui agit comme vendeur officiel (merchant of record) : il encaisse le paiement, établit la facture, collecte la TVA applicable et vous adresse le reçu. Le contrat de vente est conclu avec Lemon Squeezy selon [ses conditions](" + LS_TERMS + ") ; le droit d'utiliser le Plugin vous est concédé par " + L.publisher + " selon les présentes conditions.",
            "Les prix sont affichés en euros, toutes taxes comprises (TTC) : le prix indiqué sur le site est le prix payé, la TVA applicable à votre pays y étant incluse et détaillée sur la page de paiement avant validation. Le paiement est exigible immédiatement. La clé de licence est affichée dès la fin du paiement et envoyée par e-mail avec le reçu ; elle reste consultable à tout moment sur [app.lemonsqueezy.com/my-orders](" + MY_ORDERS + ").",
            "Nous pouvons modifier nos tarifs à tout moment pour les nouvelles commandes. Pour un abonnement annuel en cours, un changement de prix vous est notifié par e-mail avant le renouvellement concerné.",
          ],
        },
        {
          id: "licenses",
          title: "6. Licences",
          body: [
            "Trois formules existent à la date de mise à jour de ces conditions :",
            [
              "Annuelle : 39 € par an, jusqu'à 3 Postes. Renouvelée automatiquement chaque année jusqu'à annulation.",
              "À vie : 59 € en un seul paiement, jusqu'à 3 Postes.",
              "Studio : 149 € en un seul paiement, jusqu'à 15 Postes, destinée aux agences, studios et écoles.",
            ],
            "La Licence est personnelle, non exclusive et non transférable. Elle est accordée à la personne ou à l'entité qui l'a achetée, pour ses propres travaux et ceux de ses clients. Une Licence activée sur le nombre maximal de Postes peut être déplacée : désactivez-la depuis le panneau du Plugin sur un Poste pour l'activer sur un autre. Après une mise à jour majeure d'Illustrator, le Plugin libère l'ancienne activation de lui-même.",
            "« À vie » désigne la durée de vie du Plugin : la Licence reste valable sans nouveau paiement tant que le Plugin est maintenu, et inclut ses mises à jour. Nous ne garantissons pas la compatibilité avec les versions futures des applications Adobe ni une durée de maintenance minimale. Si le service d'activation devait être arrêté, nous nous engageons à fournir un moyen raisonnable de continuer à utiliser les Licences à vie et Studio sans vérification en ligne.",
            "Abonnement annuel : il se renouvelle automatiquement à la date anniversaire, au tarif en vigueur. Vous pouvez l'annuler à tout moment sur [le portail client](" + PORTAL + ") ou depuis le panneau du Plugin ; l'annulation arrête le renouvellement et vous conservez l'accès jusqu'à la fin de la période payée. À l'expiration, le Plugin revient à l'état non licencié.",
            "Il est interdit de : partager, publier, revendre ou louer une clé de licence ; utiliser une même clé au-delà du nombre de Postes autorisés ; contourner ou désactiver les mécanismes de licence ou d'essai ; décompiler, désassembler ou modifier le Plugin, sauf dans les cas prévus par la loi ; extraire les modèles InDesign ou les fichiers de mockups pour les redistribuer ; utiliser le Plugin pour créer un produit concurrent. En cas de manquement, la clé peut être révoquée sans remboursement, après notification par e-mail.",
          ],
        },
        {
          id: "refunds",
          title: "7. Satisfait ou remboursé 14 jours, droit de rétractation",
          body: [
            "Vous disposez de 14 jours à compter de l'achat pour demander le remboursement intégral d'une Licence, sans avoir à vous justifier : écrivez à " + mail + " en indiquant l'adresse e-mail de la commande ou le numéro de commande. Le remboursement est effectué par Lemon Squeezy sur le moyen de paiement utilisé ; la clé de licence est alors révoquée et le Plugin revient à l'état non licencié.",
            "Cette garantie vaut pour tous, particuliers comme professionnels. Pour les consommateurs de l'Union européenne, elle s'ajoute au droit de rétractation légal de 14 jours : en achetant une Licence dont la clé est délivrée immédiatement, vous demandez expressément l'exécution immédiate du contrat ; la garantie ci-dessus vous permet néanmoins d'obtenir le remboursement dans le même délai.",
            "Un renouvellement annuel non souhaité peut être remboursé sur demande dans les 14 jours suivant le prélèvement, à condition que la Licence n'ait pas été utilisée depuis ce prélèvement. Pour éviter un prélèvement, annulez l'abonnement avant la date de renouvellement sur le portail client.",
          ],
        },
        {
          id: "ip",
          title: "8. Propriété intellectuelle",
          body: [
            "Le Plugin, son code, son interface, ses modèles InDesign, ses mockups et les contenus du site sont la propriété de " + L.publisher + " et sont protégés par le droit d'auteur. La Licence ne vous transfère aucun droit de propriété sur le Plugin.",
            "Vos logos, vos documents et tout ce que le Plugin génère à partir d'eux (déclinaisons exportées, chartes, mockups rendus) vous appartiennent. Vous pouvez les utiliser librement, y compris dans un cadre commercial et pour vos clients. Vous restez responsable des droits attachés aux logos, polices et images que vous fournissez au Plugin.",
            "« Adobe », « Illustrator », « InDesign » et « Photoshop » sont des marques d'Adobe Inc. Logotyps est un produit indépendant, ni affilié à Adobe, ni approuvé par Adobe.",
          ],
        },
        {
          id: "beta",
          title: "9. Fonctionnalités en bêta et mises à jour",
          body: [
            "La génération de la charte graphique InDesign et des mockups Photoshop est proposée en bêta : son résultat dépend de vos versions d'InDesign et de Photoshop et des polices installées, et peut demander des ajustements manuels. Nous pouvons faire évoluer, améliorer ou retirer une fonctionnalité en bêta.",
            "Le Plugin vérifie à l'ouverture si une nouvelle version existe et vous propose de l'installer ; vous pouvez reporter cette installation. Certaines mises à jour nécessitent de relancer Illustrator ou de passer par l'installeur. Nous vous recommandons d'installer les mises à jour : nous n'assurons le support que sur la dernière version publiée.",
          ],
        },
        {
          id: "liability",
          title: "10. Garanties et responsabilité",
          body: [
            "Nous nous engageons à fournir un Plugin conforme à sa description. Les consommateurs bénéficient de la garantie légale de conformité applicable aux contenus et services numériques (articles L.224-25-1 et suivants du Code de la consommation), qui ne peut être limitée par les présentes.",
            "Dans les limites permises par la loi, le Plugin est fourni en l'état : nous ne garantissons pas qu'il fonctionnera sans interruption ni erreur, ni qu'il conviendra à tous les logos ou à toutes les configurations. Il vous appartient de sauvegarder vos fichiers avant de l'utiliser. En particulier, l'option « Vider et remplacer » du choix de dossier supprime définitivement le contenu du dossier désigné ; elle est signalée comme telle dans le Plugin et son usage relève de votre responsabilité.",
            "Sauf faute lourde ou dommage corporel, notre responsabilité totale à votre égard est limitée aux sommes que vous nous avez versées au titre de la Licence au cours des 12 mois précédant le fait générateur. Nous ne sommes pas responsables des pertes indirectes (perte de données non sauvegardées, perte de chiffre d'affaires, retard de projet). Ces limitations ne s'appliquent pas lorsque la loi l'interdit, notamment à l'égard des consommateurs pour les garanties légales.",
          ],
        },
        {
          id: "support",
          title: "11. Support",
          body: [
            "Le support se fait par e-mail à " + mail + ", en français ou en anglais, du lundi au vendredi. Nous répondons en général sous quelques jours ouvrés. Le support couvre l'installation, l'activation et le fonctionnement du Plugin ; il ne couvre pas l'utilisation générale des applications Adobe.",
          ],
        },
        {
          id: "data",
          title: "12. Données personnelles",
          body: ["Le traitement de vos données est décrit dans la [Politique de confidentialité](/privacy), qui fait partie des présentes conditions."],
        },
        {
          id: "changes",
          title: "13. Modification des conditions",
          body: [
            "Nous pouvons modifier ces conditions, notamment pour suivre l'évolution du Plugin ou de la réglementation. La version applicable à une commande est celle en vigueur à la date de la commande ; les changements ultérieurs ne réduisent pas les droits attachés à une Licence déjà achetée. " + ui.updated + ".",
          ],
        },
        {
          id: "disputes",
          title: "14. Droit applicable et litiges",
          body: [
            "Les présentes conditions sont soumises au droit français. En cas de difficulté, contactez-nous d'abord à " + mail + " : la plupart des problèmes se règlent en quelques échanges.",
            L.mediator
              ? "Conformément aux articles L.611-1 et suivants du Code de la consommation, un consommateur peut, après nous avoir écrit, recourir gratuitement au médiateur de la consommation suivant : " + L.mediator + "."
              : "Conformément aux articles L.611-1 et suivants du Code de la consommation, un consommateur peut, après nous avoir écrit, recourir gratuitement à un médiateur de la consommation ; ses coordonnées vous sont communiquées sur demande à " + mail + ".",
            "La Commission européenne met à disposition une plateforme de règlement en ligne des litiges : [ec.europa.eu/consumers/odr](" + ODR + "). À défaut de résolution amiable, les tribunaux français sont compétents ; un consommateur peut saisir la juridiction de son lieu de résidence.",
          ],
        },
      ],
    };

    return { ui, privacy, terms };
  }

  // ------------------------------------------------------------------ English
  const ui: LegalUi = {
    backHome: "Home",
    updated: "Last updated: " + updated,
    toc: "Contents",
    seeAlso: "See also",
    privacyLink: "Privacy Policy",
    termsLink: "Terms of Use and legal notice",
    contact: "Questions? Write to " + mail + ".",
  };

  const privacy: LegalDoc = {
    title: "Privacy Policy",
    subtitle:
      "What Logotyps collects, why, where it is stored and how to exercise your rights. Short version: no ad tracking, no payment data on our side, and your working files never leave your computer.",
    sections: [
      {
        id: "controller",
        title: "1. Who is responsible",
        body: [
          "The logotyps.fr website, the Logotyps plugin for Adobe Illustrator and its licensing service are published by " + L.publisher + (L.legalForm.en ? " (" + L.legalForm.en + ")" : "") + ", " + L.country + ". Data controller under the GDPR: " + L.publisher + ", reachable at " + mail + ".",
          "Payments are handled by Lemon Squeezy, which acts as merchant of record and is responsible for its own processing (see section 5).",
        ],
      },
      {
        id: "scope",
        title: "2. What this policy covers",
        body: [
          "This policy applies to three things:",
          [
            "the logotyps.fr website, including the download page;",
            "the Logotyps plugin installed in Adobe Illustrator;",
            "the online service the plugin contacts to count the free trial, activate licenses and offer updates.",
          ],
        ],
      },
      {
        id: "website",
        title: "3. On the logotyps.fr website",
        body: [
          "The website has no user accounts, no forms, no analytics and no advertising cookies. It sets no cookies at all. Your language choice (EN / FR) is kept in your browser's local storage, on your device only.",
          "What is technically unavoidable:",
          [
            "The website host (" + L.host.name + ") keeps technical logs (IP address, browser, pages requested) for security and operations, retained for a limited time under [its policy](https://www.hostinger.com/legal/privacy-policy).",
            "The Inter typeface is loaded from Google Fonts, so your browser sends your IP address to Google when the page loads ([Google's policy](https://policies.google.com/privacy)).",
            "Some images on the site are served by Supabase Storage, which also sees your IP address ([Supabase's policy](https://supabase.com/privacy)).",
            "The installers offered on the download page are stored on GitHub: the download is served by GitHub, which receives your IP address ([GitHub's policy](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement)).",
          ],
          "After a purchase, Lemon Squeezy sends you back to the download page with your license key and email in the page address so they can be shown to you right away. The site displays them, then removes them from the address bar and browser history; it stores them nowhere.",
        ],
      },
      {
        id: "plugin",
        title: "4. In the Logotyps plugin",
        body: [
          "All graphic work (generating variations, exports, the InDesign brand guide, Photoshop mockups) happens on your computer. Your Illustrator documents, logos, fonts, colors and exported files are never sent to Pupille Studio or to any third party.",
          "The plugin contacts our online service in four cases: to count the free trial, to activate a license, to periodically check that it is still valid, and to find out whether a new version is available. For this it sends:",
          [
            "a machine identifier (\"HWID\"): a SHA-256 fingerprint computed locally from the computer name, the operating-system user name, the network card's MAC address, the OS type and architecture, and the processor model and core count. Only the fingerprint is sent; the raw values never leave your computer, and the fingerprint cannot be reversed into them;",
            "when activating: the license key you typed and, if applicable, the previous machine identifier (after an Illustrator update the fingerprint may change; the old activation is then released automatically);",
            "as with any Internet request, your IP address is visible to the service host (Vercel's technical logs, kept briefly).",
          ],
          "The plugin does not ask for, or send, an email address. The update check transmits no personal data: the plugin simply downloads the description of the latest version.",
          "What our service records:",
          [
            "for the free trial: the number of generations used, tied to the machine identifier;",
            "for an activated license: the license key, the license type, the activation identifier assigned by Lemon Squeezy, the customer email as known to Lemon Squeezy, the machine identifier, and the activation and last-check dates.",
          ],
          "On your computer, the plugin keeps the machine identifier and the license in two small files in your home folder (.logotyps-hwid and .logotyps-license) and in the panel's local storage. They let the plugin work for up to 7 days without a connection. Uninstalling the plugin does not delete them; you may delete them yourself.",
        ],
      },
      {
        id: "purchases",
        title: "5. Purchases and invoicing (Lemon Squeezy)",
        body: [
          "Licenses are sold by Lemon Squeezy, acting as merchant of record. When you buy, Lemon Squeezy collects your name, email address, country and billing address, as well as your payment details, and takes care of the invoice, VAT and receipt. Pupille Studio never sees your card number or bank details.",
          "Through its Lemon Squeezy dashboard, Pupille Studio can access the order information needed to run the service: name, email, country, product purchased, amount, license key and activations. This is used to assist you, process a refund and revoke a refunded key.",
          "Lemon Squeezy processes this data under [its privacy policy](" + LS_PRIVACY + ") and [its terms](" + LS_TERMS + "). You can find your orders and keys at any time on [app.lemonsqueezy.com/my-orders](" + MY_ORDERS + ") and manage your subscription on [the customer portal](" + PORTAL + ").",
        ],
      },
      {
        id: "lawful-basis",
        title: "6. Why we process this data (lawful bases)",
        body: [
          [
            "Performance of the contract: activating your license, checking it, providing updates and support.",
            "Legitimate interest: limiting the free trial to 3 generations per machine, preventing one key from being used beyond its allowed number of machines, keeping the service secure.",
            "Legal obligation: retention of invoicing records, handled by Lemon Squeezy.",
          ],
          "No data is used for advertising, profiling or resale. We do not send newsletters.",
        ],
      },
      {
        id: "retention",
        title: "7. Retention periods",
        body: [
          [
            "Trial counter: kept as long as the machine has no license, so the trial stays limited to 3 generations. Deleted on request.",
            "License record: kept while the license is active on the machine. Deactivating the license from the panel deletes that machine's record. After a refund or subscription expiry, the record is deleted at the next check. Full deletion on request.",
            "Hosts' technical logs: a few days to a few weeks, depending on the provider.",
            "Order data at Lemon Squeezy: statutory accounting and tax retention periods.",
          ],
        ],
      },
      {
        id: "recipients",
        title: "8. Recipients, hosting and transfers outside the EU",
        body: [
          "Your data is neither sold nor shared for commercial purposes. It is processed by the following technical providers, each limited to its function:",
          [
            "" + L.host.name + ": hosting of the logotyps.fr website (European Union).",
            "Vercel Inc. (United States): runs the licensing and update service ([policy](https://vercel.com/legal/privacy-policy)).",
            "Redis Cloud (Redis Ltd): the service's database, hosted in the Paris region (France) ([policy](https://redis.io/legal/privacy-policy/)).",
            "Lemon Squeezy (United States): sales, payment, invoicing, license keys.",
            "GitHub (United States): hosting of the installer files.",
            "Google (United States): website typefaces. Supabase: website images.",
          ],
          "For providers established in the United States, transfers rely on the mechanisms provided by the GDPR (the European Commission's standard contractual clauses or Data Privacy Framework certification, depending on the provider). The data sent by the plugin is limited to the machine fingerprint, the license key and the IP address.",
        ],
      },
      {
        id: "rights",
        title: "9. Your rights",
        body: [
          "You have the right to access, rectify, erase, restrict, object to and port the data concerning you. To exercise it, write to " + mail + " with the email address used at purchase or your license key. We reply within one month.",
          "In practice, on request we can: delete a machine's trial counter, delete a license record, or send you a copy of the data recorded. For payment and invoicing data, please contact Lemon Squeezy, which is responsible for it.",
          "If you believe your rights are not respected, you may lodge a complaint with the French data protection authority, the [CNIL](https://www.cnil.fr), or with your local authority.",
        ],
      },
      {
        id: "security",
        title: "10. Security",
        body: [
          "All exchanges between the website, the plugin and our services are encrypted (HTTPS). Credentials for third-party services exist only on the server side. Notifications received from Lemon Squeezy are authenticated by signature. The machine identifier is an irreversible fingerprint, never the original values. We hold no payment data.",
        ],
      },
      {
        id: "minors",
        title: "11. Minors",
        body: ["Logotyps is intended for professionals and adults. We do not knowingly collect data about minors."],
      },
      {
        id: "changes",
        title: "12. Changes",
        body: [
          "This policy may evolve with the product. The date at the top of the page shows the current version; a significant change will be announced on the website or in the plugin. " + ui.updated + ".",
        ],
      },
    ],
  };

  const terms: LegalDoc = {
    title: "Terms of Use",
    subtitle:
      "The rules that apply to the logotyps.fr website, the free trial, and the purchase and use of Logotyps plugin licenses. They include the website's legal notice.",
    sections: [
      { id: "legal-notice", title: "Legal notice", body: [publisherLines(lang)] },
      {
        id: "purpose",
        title: "1. Purpose and acceptance",
        body: [
          "These terms govern the use of the logotyps.fr website and of the Logotyps plugin for Adobe Illustrator (the \"Plugin\"), published by " + L.publisher + " (\"we\"). By installing the Plugin, using the free trial or buying a license, you accept them. If you act on behalf of a company or a school, you confirm that you have the authority to bind it.",
        ],
      },
      {
        id: "definitions",
        title: "2. Definitions",
        body: [
          [
            "Plugin: the Logotyps panel installed in Adobe Illustrator, its InDesign templates, its Photoshop mockups and its updates.",
            "License: the right to use the Plugin, represented by a license key delivered after purchase.",
            "Machine: a computer on which the License is activated. Each activation uses one machine.",
            "Trial: free use of the Plugin before buying a License.",
          ],
        ],
      },
      {
        id: "service",
        title: "3. The Plugin and its requirements",
        body: [
          "From a logo selected in Adobe Illustrator, the Plugin generates its variations (versions, framings, color treatments), exports them in the chosen formats and sizes, and can produce an InDesign brand guide with mockups rendered by Photoshop. Its exact features are those described on the website and in the Plugin on the date of your purchase.",
          "Requirements: Adobe Illustrator 2022 (version 26) or later, on macOS or Windows. The brand guide additionally requires Adobe InDesign and Adobe Photoshop 2022 or later, installed on the same Machine. Adobe applications are not included and are covered by your own Adobe license.",
          "An Internet connection is needed to count the trial, activate a License, check it periodically and receive updates. An activated License keeps working for up to 7 days without a connection.",
        ],
      },
      {
        id: "trial",
        title: "4. Free trial",
        body: [
          "The Plugin can be used free of charge for 3 generations per Machine, with all features, without a credit card. Generations are counted by our online service. Circumventing this counter (resetting or forging the machine identifier, blocking the service, modifying the Plugin) is prohibited.",
        ],
      },
      {
        id: "ordering",
        title: "5. Ordering, prices and payment",
        body: [
          "Licenses are sold by our partner Lemon Squeezy, acting as merchant of record: it collects the payment, issues the invoice, collects applicable VAT and sends you the receipt. The sales contract is concluded with Lemon Squeezy under [its terms](" + LS_TERMS + "); the right to use the Plugin is granted to you by " + L.publisher + " under these terms.",
          "Prices are displayed in euros, all taxes included: the price shown on the website is the price you pay, with the VAT applicable to your country included and itemized on the payment page before you confirm. Payment is due immediately. The license key is displayed as soon as the payment completes and emailed with the receipt; it remains available at any time on [app.lemonsqueezy.com/my-orders](" + MY_ORDERS + ").",
          "We may change our prices at any time for new orders. For an ongoing annual subscription, a price change is notified to you by email before the renewal it applies to.",
        ],
      },
      {
        id: "licenses",
        title: "6. Licenses",
        body: [
          "Three plans exist as of the date these terms were updated:",
          [
            "Annual: 39 € per year, up to 3 Machines. Renewed automatically every year until cancelled.",
            "Lifetime: 59 € as a single payment, up to 3 Machines.",
            "Studio: 149 € as a single payment, up to 15 Machines, intended for agencies, studios and schools.",
          ],
          "The License is personal, non-exclusive and non-transferable. It is granted to the person or entity that bought it, for its own work and its clients' work. A License activated on its maximum number of Machines can be moved: deactivate it from the Plugin panel on one Machine to activate it on another. After a major Illustrator update, the Plugin releases the old activation by itself.",
          "\"Lifetime\" means the lifetime of the Plugin: the License remains valid without further payment for as long as the Plugin is maintained, and includes its updates. We do not guarantee compatibility with future versions of Adobe applications or a minimum maintenance period. Should the activation service ever be discontinued, we commit to providing a reasonable way to keep using Lifetime and Studio Licenses without online verification.",
          "Annual subscription: it renews automatically on its anniversary date, at the then-current price. You can cancel at any time on [the customer portal](" + PORTAL + ") or from the Plugin panel; cancelling stops the renewal and you keep access until the end of the paid period. On expiry, the Plugin returns to its unlicensed state.",
          "It is prohibited to: share, publish, resell or rent a license key; use one key beyond the allowed number of Machines; circumvent or disable the licensing or trial mechanisms; decompile, disassemble or modify the Plugin, except where the law allows; extract the InDesign templates or mockup files to redistribute them; use the Plugin to build a competing product. In case of breach, the key may be revoked without refund, after notice by email.",
        ],
      },
      {
        id: "refunds",
        title: "7. 14-day money-back guarantee and right of withdrawal",
        body: [
          "You have 14 days from purchase to request a full refund of a License, no questions asked: write to " + mail + " with the order email address or the order number. The refund is issued by Lemon Squeezy to the payment method used; the license key is then revoked and the Plugin returns to its unlicensed state.",
          "This guarantee applies to everyone, consumers and professionals alike. For consumers in the European Union, it comes on top of the statutory 14-day right of withdrawal: by buying a License whose key is delivered immediately, you expressly request immediate performance of the contract; the guarantee above nevertheless lets you obtain a refund within the same period.",
          "An unwanted annual renewal can be refunded on request within 14 days of the charge, provided the License has not been used since that charge. To avoid a charge, cancel the subscription before the renewal date on the customer portal.",
        ],
      },
      {
        id: "ip",
        title: "8. Intellectual property",
        body: [
          "The Plugin, its code, its interface, its InDesign templates, its mockups and the website's content are the property of " + L.publisher + " and are protected by copyright. The License transfers no ownership of the Plugin to you.",
          "Your logos, your documents and everything the Plugin generates from them (exported variations, brand guides, rendered mockups) belong to you. You may use them freely, including commercially and for your clients. You remain responsible for the rights attached to the logos, fonts and images you feed into the Plugin.",
          "\"Adobe\", \"Illustrator\", \"InDesign\" and \"Photoshop\" are trademarks of Adobe Inc. Logotyps is an independent product, neither affiliated with nor endorsed by Adobe.",
        ],
      },
      {
        id: "beta",
        title: "9. Beta features and updates",
        body: [
          "Generation of the InDesign brand guide and Photoshop mockups is offered in beta: its result depends on your InDesign and Photoshop versions and on the fonts installed, and may need manual adjustments. We may change, improve or withdraw a beta feature.",
          "On opening, the Plugin checks whether a new version exists and offers to install it; you may postpone. Some updates require restarting Illustrator or running the installer. We recommend installing updates: support is provided for the latest published version only.",
        ],
      },
      {
        id: "liability",
        title: "10. Warranties and liability",
        body: [
          "We undertake to deliver a Plugin that matches its description. Consumers benefit from the statutory conformity guarantee applicable to digital content and services (in France, articles L.224-25-1 and following of the Consumer Code), which these terms cannot limit.",
          "To the extent permitted by law, the Plugin is provided as is: we do not guarantee that it will run without interruption or error, or that it will suit every logo or configuration. It is your responsibility to back up your files before using it. In particular, the \"Empty and replace\" option of the folder chooser permanently deletes the contents of the selected folder; it is flagged as such in the Plugin and its use is your responsibility.",
          "Except in case of gross negligence or personal injury, our total liability towards you is limited to the amounts you paid us for the License in the 12 months preceding the event giving rise to the claim. We are not liable for indirect losses (loss of unsaved data, loss of revenue, project delays). These limitations do not apply where the law prohibits them, in particular towards consumers for statutory guarantees.",
        ],
      },
      {
        id: "support",
        title: "11. Support",
        body: [
          "Support is provided by email at " + mail + ", in English or French, Monday to Friday. We usually reply within a few business days. Support covers installing, activating and operating the Plugin; it does not cover general use of Adobe applications.",
        ],
      },
      {
        id: "data",
        title: "12. Personal data",
        body: ["The processing of your data is described in the [Privacy Policy](/privacy), which forms part of these terms."],
      },
      {
        id: "changes",
        title: "13. Changes to these terms",
        body: [
          "We may amend these terms, in particular to follow changes to the Plugin or to regulations. The version applicable to an order is the one in force on the order date; later changes do not reduce the rights attached to a License already purchased. " + ui.updated + ".",
        ],
      },
      {
        id: "disputes",
        title: "14. Governing law and disputes",
        body: [
          "These terms are governed by French law. If a problem arises, contact us first at " + mail + ": most issues are solved in a few emails.",
          L.mediator
            ? "In accordance with articles L.611-1 and following of the French Consumer Code, a consumer may, after writing to us, use free of charge the following consumer mediator: " + L.mediator + "."
            : "In accordance with articles L.611-1 and following of the French Consumer Code, a consumer may, after writing to us, use a consumer mediator free of charge; the mediator's details are provided on request at " + mail + ".",
          "The European Commission provides an online dispute resolution platform: [ec.europa.eu/consumers/odr](" + ODR + "). Failing an amicable solution, the French courts have jurisdiction; a consumer may also bring the matter before the courts of their place of residence.",
        ],
      },
    ],
  };

  return { ui, privacy, terms };
}
