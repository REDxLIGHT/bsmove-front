export default {
  title: 'Des questions ?',
  subtitle: 'N\'hésitez pas à nous contacter!',
  contact: {
    title: 'Adresse',
    address: {
      street: '8A Rue Luis Bunuel',
      city: '77100 Meaux',
      phoneNumber: '01.43.43.56.53',
    }
  },
  schedules: {
    title: 'Horraires d\'ouvertures',
    week: {
      days: 'Lundi - Samedi',
      schedule: '8H - 18H',
    },
    weekEnd: {
      days: 'Dimanche',
      schedule: 'Fermé',
    },
  },
  contactForm: {
    errors: {
      empty: 'Champs requis',
      email: 'L\'email est invalide'
    },
    inputs: {
      name: {
        name: 'name',
        label: 'Nom',
        placeholder: 'Jean Dupond',
        type: 'text'
      },
      email: {
        name: 'email',
        label: 'Adresse mail',
        placeholder: 'Jean.Dupond@gmail.com',
        type: 'email'
      },
      subject: {
        name: 'subject',
        label: 'Objet',
        placeholder: 'ex: Problème avec un devis',
        type: 'text'
      },
      message: {
        name: 'message',
        label: 'Message',
        placeholder: 'Ecrivez quelque chose...',
        type: 'text'
      },
    },
    action: 'Envoyer le message',
    after: {
      title: 'Message envoyé avec succès!',
      content: 'Nous vous en remercions et reviendrons vers vous dès que possible.',
      action: 'Retour à l\'accueil',
    },
  },
}