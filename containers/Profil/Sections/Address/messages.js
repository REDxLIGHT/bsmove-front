export default {
  sectionTitle: {
    deliveryAddress: 'Adresse de livraison',
  },
  form: {
    action: 'Modifier les informations',
  },
  inputs: {
    lastName: {
      name: 'address.lastName',
      label: 'Nom',
      placeholder: 'Ex: Dupond',
    },
    firstName: {
      name: 'address.firstName',
      label: 'Prénom',
      placeholder: 'Ex: Jean',
    },
      street: {
        name: 'address.street',
        label: 'Rue',
        placeholder: 'Ex: 1 Avenue des Champs-Élysées',
      },
      zipCode: {
        name: 'address.zipCode',
        label: 'Code postal',
        placeholder: 'Ex: 75008',
      },
      city: {
        name: 'address.city',
        label: 'Ville',
        placeholder: 'Ex: Paris',
      },
      country: {
        name: 'address.country',
        label: 'Pays',
        placeholder: 'Ex: France',
      },
  },
  alert: {
    error: 'Une erreur s\'est produite. Impossible de modifier les informations.',
    success: 'Les informations ont été modifiées avec succès.',
  }
}
