export default {
  form: {
    error: {
      required: 'Champs requis.',
    },
    oldPassword: {
      error: 'Ancien mot de passe invalide',
    },
    newPassword: {
      error: 'Mot de passe invalide',
    },
    confirmPassword: {
      error: 'Les mots de passes ne sont pas identiques',
    },
  },
  inputs: {
    oldPassword: {
      name: 'oldPassword',
      label: 'Ancien mot de passe',
    },
    newPassword: {
      name: 'newPassword',
      label: 'Nouveau mot de passe',
    },
    confirmPassword: {
      name: 'confirmPassword',
      label: 'Confirmer le nouveau mot de passe',
    },
  },
  button: {
    submit: {
      label: 'Réinitaliser le mot de passe',
    },
  },
  alert: {
    success: 'Votre mot de passe a été modifié avec succès!',
    error: {
      missingValues: 'Merci de remplir tout les champs.',
      confirmPassword: 'Les champs "Mot de passe" et "Confirmation du mot de passe" doivent être identiques',
    },
  },
};