export default {
  infos: 'Entrez votre e-mail et recevez un lien pour réinitialiser votre mot de passe.',
  form: {
    error: {
      required: 'Champs requis.',
    },
    email: {
      error: 'Email invalide',
    },
  },
  inputs: {
    email: {
      name: 'email',
      label: 'Adresse mail',
      placeholder: 'Ex: jean@dupond.fr',
    },
  },
  button: {
    submit: {
      label: 'Réinitaliser le mot de passe',
    },
  },
  alert: {
    success: 'Votre demande de réinitialisation de mot de passe a bien été prise en compte. Vous allez recevoir un email avec les instructions nécessaires à la modification de votre mot de passe!',
    error: {
      missingValues: 'Merci de renseigner un e-mail valide',
      notExisting: 'L\'email renseigné n\'existe pas.',
      notVerified: 'L\'email renseigné n\'a pas encore été validé.',
      technicalError: 'Une erreur technique est survenue. Merci de contacter le support technique.',
    },
  },
};