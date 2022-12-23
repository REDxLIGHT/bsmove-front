export default {
  form: {
    error: {
      required: 'Champs requis.',
    },
    email: {
      error: 'Email invalide',
    },
    password: {
      error: 'Mot de passe invalide',
    }
  },
  inputs: {
    email: {
      name: 'email',
      label: 'Adresse mail',
      placeholder: 'Ex: jean@dupond.fr',
    },
    password: {
      name: 'password',
      label: 'Mot de passe',
    },
  },
  forgotPassword: 'Mot de passe oublié?',
  button: {
    submit: {
      label: 'Se connecter',
    },
  },
  register: {
    content: 'Vous n\'avez pas de compte?',
    link: 'Créez en un',
  },
  alert: {
    missingBoth: 'Merci de fournir un mail et un mot de passe valide afin de continuer.',
    missingEmail: 'Merci de fournir un mail valide',
    missingPassword: 'Merci de fournir un mot de passe valide',
    wrongEmailOrPassword: 'Le mail ou le mot de passe fournit est invalide',
    technicalError: 'Une erreur technique est survenue. Merci de contacter le support technique',
    success: 'Vous êtes connecté!',
  },
}