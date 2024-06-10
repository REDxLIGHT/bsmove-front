import { METRICS } from "../../../helpers/constants";

export default {
  sections: {
    volume: {
      title: "Votre volume",
      subtitle:
        "Une bonne estimation du volume est un élément clé pour éviter les mauvaises surprises le jour J. Nos conseillers sont à votre disposition.",
      input: {
        label: `Mon volume en ${METRICS.CUBE}`,
        placeholder: "Ex: 6",
        name: "volume",
        errors: {
          empty: "Champs requis.",
          invalid: "Volume invalide",
        },
      },
      button: {
        label: "Connaître son volume",
      },
    },
    heavyObjects: {
      title: "Possédez-vous des objets lourd?",
      items: {
        piano: {
          name: "piano",
          label: "Piano",
          description: "Total des étages (départ + arrivée)",
        },
        fridge: {
          name: "fridge",
          label: "Frigo américain",
          description:
            "Nombre total des étages (départ + arrivée) avec portage du piano",
          select: {
            label: "Etages",
          },
        },
        poolTable: {
          name: "poolTable",
          label: "Billard",
          description: "Total des étages (départ + arrivée)",
        },
        safe: {
          name: "safe",
          label: "Coffre fort",
          description: "Total des étages (départ + arrivée)",
        },
        // other: {
        //   name: "other",
        //   label: "Autre",
        //   input: {
        //     name: "itemName",
        //     label: "Décrire votre produit (Nom, taille...)",
        //   },
        // },
      },
    },
    mounting: {
      title:
        "Avez-vous besoin d'aide pour le démontage et le remontage de votre mobilier ?",
      itemsType: {
        simple: {
          name: "simple",
          label: "Simple",
          description:
            "Bureau simple, commode de taille moyenne, étagère simple, lit simple, lit bébé, placard (décrochage), table...",
        },
        medium: {
          name: "medium",
          label: "Moyen",
          description:
            "Armoire 2 portes, buffet plusieurs blocs, bureau d'angle, canapé, etagère, grande commode, lit mezzanine simple, living plusieurs blocs...",
        },
        hard: {
          name: "hard",
          label: "Compliqué",
          description:
            "Armoire 3 portes et plus, armoire pont, armoire lit, bibliothèque, buffet, bahut, grande, vitrine, lit mezzanine 2 personnes, lit combiné avec bureau, living, vaisselier...",
        },
      },
    },
    extraFurnitures: {
      title: "Avez-vous besoin de fournitures pour votre déménagement ?",
      solid: {
        name: "solid",
        label: "Pour le non fragile",
        description: "Vêtements, livres, ustensiles de cuisine.",
      },
      fragile: {
        name: "fragile",
        label: "Pour le fragile",
        description: "Vaisselle, bouteilles, bibelots.",
      },
      others: {
        name: "others",
        label: "Autres fournitures",
      },
    },
  },
  radio: {
    volumeKnown: {
      name: "volumeKnown",
      known: {
        label: "Je connais mon volume",
        value: "known",
      },
      unknown: {
        label: "Je ne connais pas mon volume",
        value: "unknown",
      },
    },
    heavyObjects: {
      name: "hasHeavyObjects",
      yes: {
        label: "Oui",
        value: "yes",
      },
      no: {
        label: "Non",
        value: "no",
      },
    },
    mounting: {
      name: "mountingType",
      no: {
        label: "Non",
        value: "no",
      },
      disassemblingMounting: {
        label: "Démontage / Remontage",
        value: "disassemblingMounting",
      },
      disassembling: {
        label: "Démontage",
        value: "disassembling",
      },
      mounting: {
        label: "Remontage",
        value: "mounting",
      },
    },
    extraFurnitures: {
      name: "extraFurnitures",
      no: {
        label: "Non",
        value: "no",
      },
      yes: {
        label: "Oui",
        value: "yes",
      },
    },
  },
  select: {
    label: "Étages",
    piano: {
      name: "piano",
    },
    fridge: {
      name: "fridge",
    },
    safe: {
      name: "safe",
    },
    poolTable: {
      name: "poolTable",
    },
    other: {
      name: "other",
    },
    floors: {
      zero: {
        label: "0",
        value: 0,
      },
      one: {
        label: "1",
        value: 1,
      },
      two: {
        label: "2",
        value: 2,
      },
      three: {
        label: "3",
        value: 3,
      },
      four: {
        label: "4",
        value: 4,
      },
      five: {
        label: "5",
        value: 5,
      },
      six: {
        label: "6",
        value: 6,
      },
      seven: {
        label: "7",
        value: 7,
      },
      eight: {
        label: "8",
        value: 8,
      },
      nine: {
        label: "9",
        value: 9,
      },
      ten: {
        label: "10",
        value: 10,
      },
    },
  },
};
