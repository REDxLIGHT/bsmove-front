export default {
  title: 'Livraison',
  alert: {
    success: 'La modification a été enregistrée avec succès',
    error: {
      updateAddress: 'Impossible de sauvegarder l\'adresse pour les prochains achats.',
      noAddress: 'Merci de remplir les champs',
    },
  },
  action: {
    modify: 'Modifier',
    continue: 'Poursuivre la commande',
  },
  inputs: {
    delivery: {
      lastName: {
        name: 'lastName',
        label: 'Nom de famille',
        placeholder: 'Dupont',
      },
      firstName: {
        name: 'firstName',
        label: 'Prénom',
        placeholder: 'Jean',
      },
      street: {
        name: 'street',
        label: 'Rue',
        placeholder: '10 rue du Mont St. Michel',
      },
      city: {
        name: 'city',
        label: 'Ville',
        placeholder: 'Paris',
      },
      zipCode: {
        name: 'zipCode',
        label: 'Code postal',
        placeholder: '75001',
      },
      country: {
        name: 'country',
        label: 'Pays',
        placeholder: 'France',
      },
      saveAddress: {
        name: 'saveAddress',
        label: 'Enregistrer cette addresse pour les futures commandes.',
      },
    },
    facturation: {
      lastName: {
        name: 'lastName',
        label: 'Nom de famille',
        placeholder: 'Dupont',
      },
      firstName: {
        name: 'firstName',
        label: 'Prénom',
        placeholder: 'Jean',
      },
      street: {
        name: 'street',
        label: 'Rue',
        placeholder: '10 rue du Mont St. Michel',
      },
      city: {
        name: 'city',
        label: 'Ville',
        placeholder: 'Paris',
      },
      zipCode: {
        name: 'zipCode',
        label: 'Code postal',
        placeholder: '75001',
      },
      country: {
        name: 'country',
        label: 'Pays',
        placeholder: 'France',
      },
    },
  },
  grid: {
    deliveryModeBlock: {
      title: 'Mode de livraison',
    },
    deliveryAddressBlock: {
      title: 'Adresse de livraison',
    },
    facturationAddressBlock: {
      title: 'Adresse de facturation',
      checkbox: 'Votre adresse de facturation est identique à l\'adresse de livraison',
    },
  },
  dialog: {
    action: {
      confirm: 'Enregistrer',
      deny: 'Annuler',
    },
    delivery: {
      title: 'Modification des informations de livraison',
      input: {
        lastName: 'Nom',
        firstName: 'Prénom',
        street: 'Rue',
        zipCode: 'Code postal',
        city: 'Ville',
        country: 'Pays',
      },
    },
    facturation: {
      title: 'Modification des informations de facturation',
      input: {
        lastName: 'Nom',
        firstName: 'Prénom',
        street: 'Rue',
        zipCode: 'Code postal',
        city: 'Ville',
        country: 'Pays',
      },
    },
  },
}