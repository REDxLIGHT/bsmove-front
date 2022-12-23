export default {
  action: {
    submit: 'Valider et payer',
  },
  alert: {
    form: {
      error: 'Impossible de récupérer les champs du formulaire.',
    },
    confirmCardSetup: {
      error: 'Le paiement a échoué, merci de vérifier les informations fournies.',
    },
    order: {
      error: 'Une erreur s\'est produite lors du paiement de la commande. Merci de vérifier les adresses et le panier.',
      success: 'La commande a bien été effectuée, merci pour vos achats !',
    },
  },
  inputs: {
    cardOwner: {
      label: 'Titulaire de la carte',
      placeholder: 'Jean Dupont',
    },
    cardNumber: {
      label: 'Numéro de la carte',
      placeholder: '4242 4242 4242 4242',
    },
    cardExpiry: {
      label: 'Date d\'expiration',
      placeholder: '03/22',
    },
    cardCvc: {
      label: 'Cryptogramme',
      placeholder: '424',
    },
    cgu: {
      firstPart: 'En cochant cette case, vous acceptez et reconnaissez avoir pris connaissance des ',
      secondPart: 'Conditions Générales de Vente',
      thirdPart: ' BSmove.com et de ses offres partenaires et ',
      fourthPart: 'la Politique de Vie Privée.',
    }
  },
  saveCard: 'Je souhaite sauvegarder mes informations bancaires pour mes prochains achats.'
}