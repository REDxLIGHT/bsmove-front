export default {
  sections: {
    details: {
      movingDate: 'Date de votre déménagement',
      departure: {
        title: 'Départ',
        input: {
          name: 'address',
          label: 'Adresse de départ',
          placeholder: 'Entrer votre adresse complète',
        },
        parkingPermit: {
          name: 'parkingPermit',
          text: 'Avez-vous besoin d’une ',
          link: 'autorisation de stationnement ?',
        },
      },
      arrival: {
        title: 'Arrivée',
        input: {
          name: 'address',
          label: 'Adresse d\'arrivé',
          placeholder: 'Entrer votre adresse complète',
        },
        parkingPermit: {
          name: 'parkingPermit',
          text: 'Avez-vous besoin d’une ',
          link: 'autorisation de stationnement ?',
        },
      },
      noAddress: 'Aucune addresse trouvée',
    },
  },
  radio: {
    arrivalDateInformations: {
      name: 'arrivalDateInformations',
      label: '',
      fixe: 'Date fixe',
      flexible: 'Date flexible',
    },
    departureInformations: {
      name: 'parkingPermit',
      label: '',
      no: 'Non',
      yes: 'Oui',
    },
    arrivalInformations: {
      name: 'parkingPermit',
      label: '',
      no: 'Non',
      yes: 'Oui',
    },
  },
  selects: {
    floor: {
      name: 'floor',
      label: 'Etages',
      ground: '0',
      first: '1',
      second: '2',
      third: '3',
      fourth: '4',
      fifth: '5',
    },
    elevator: {
      name: 'elevator',
      label: 'Ascenseur',
      yes: 'Oui',
      no: 'Non',
    },
    footDistance: {
      name: 'footDistance',
      label: 'Portage',
      zeroToFifty: 'Jusqu\'à 50 mètres',
      fiftyToHundred: 'De 50 à 100 mètres',
      moreThanHundred: 'Plus de 100 mètres',
    },
    furnituresLift: {
      name: 'furnituresLift',
      label: 'Monte-meuble',
      yes: 'Oui',
      no: 'Non',
    },
  },
}