export default {
  sectionTitle: {
    coordinates: 'Vos coordonnées',
    password: 'Votre mot de passe',
  },
  sections: {
    action: 'Enregistrer les modification',
    labels: {
      lastName: 'Nom',
      firstName: 'Prénom',
      phoneNumber: 'Téléphone',
      birthDate: 'Date de naissance',
      email: 'Adresse email',
      password: 'Mot de passe',
      oldPassword: 'Ancien mot de passe',
      newPassword: 'Nouveau mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
    },
  },
  errors: {
    required: 'Champs requis',
    nonIdentical: 'Les mots de passes doivent être les mêmes',
  },
  alert: {
    modification: {
      success: 'Les informations ont été modifiées avec succès!',
    },
    error: {
      oldPassword: 'Ancien mot de passe invalide',
      patchError: 'Impossible de modifier les informations.',
    }
  },
  button: 'Modifier',
  inputs: {
    lastName: {
      name: 'lastName',
      label: 'Nom',
      placeholder: 'Dupond',
    },
    firstName: {
      name: 'firstName',
      label: 'Prénom',
      placeholder: 'Jean',
    },
    email: {
      name: 'email',
      label: 'Adresse E-mail',
      placeholder: 'jean.dupond@gmail.com',
    },
    phoneNumber: {
      name: 'phoneNumber',
      label: 'Téléphone',
      placeholder: '06.06.06.06.06',
    },
    oldPassword: {
      name: 'oldPassword',
      label: 'Ancien mot de passe',
      placeholder: '***************',
    },
    newPassword: {
      name: 'newPassword',
      label: 'Nouveau mot de passe',
      placeholder: '***************',
    },
    confirmNewPassword: {
      name: 'confirmNewPassword',
      label: 'Confirmez le mot de passe',
      placeholder: '***************',
    },
  }
}