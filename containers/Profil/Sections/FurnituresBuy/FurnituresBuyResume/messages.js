export default {
  title: 'Commande n°',
  navigation: {
    back: 'Mes achats',
    actual: ' / Commande n°',
  },
  deliveryState: {
    general: {
      firstPart: 'La commande n° ',
      secondPart: ' qui a été passée le ',
    },
    pending: ', est en actuellement en cours de traitement.',
    success: ', a été complétée avec succès.',
    incomplete: ', a rencontré un problème et nécessite résolution afin de continuer. Pour plus d\'informations, merci de contacter le service client.',
    error: ', a été annulée.',
  },
  articlesResume: {
    title: 'Detail de la commande',
    headers: {
      articles: 'Articles',
      quantity: 'Quantité',
      total: 'Total',
    },
    total: 'Total',
  },
  facturationResume: {
    title: 'Adresse de facturation',
  }
}