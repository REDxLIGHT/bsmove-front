export default {
  layout: {
    backButton: 'Retour',
    status: {
      estimate: {
        validated: 'Devis validé',
        waitingForPayment: 'Devis validé en attente de paiement',
        onGoing: 'En attente de validation',
        denied: 'Devis refusé',
      },
    },
    moving: {
      title: 'Déménagement Ref#',
    },
  },
  content: {
    cards: {
      movingDetails: {
        title: 'Informations déménagement',
        action: 'Afficher le devis complet',
      },
      contact: {
        title: 'Contact',
      },
      documents: {
        title: 'Documents disponible',
        actions: {
          estimate: 'Devis',
          carLetter: 'Lettre de voiture',
          bill: 'Facture',
        },
      },
    },
    actions: {
      accept: 'Accepter le devis',
      decline: 'Refuser le devis',
      edit: 'Modifier le devis',
    }
  },
}