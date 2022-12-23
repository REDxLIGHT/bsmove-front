export default {
  action: {
    label: 'Modifier',
  },
  dialog: {
    informations: {
      coordonates: {
        title: 'Mettre à jour mes coordonnées',
      }
    },
  },
  inputs: {
    lastName: {
      name: 'lastName',
      placeholder: 'Ex : Dupont',
    },
    firstName: {
      name: 'firstName',
      placeholder: 'Ex : Jean',
    },
    phoneNumber: {
      name: 'phoneNumber',
      placeholder: 'Ex : 0666666666',
    },
    birthDate: {
      name: 'birthDate',
      placeholder: 'Ex : 01/01/2001',
    },
    email: {
      name: 'email',
      placeholder: 'Ex : jean.dupont@gmail.com',
    },
    newPassword: {
      name: 'newPassword',
      placeholder: '************',
    },
    oldPassword: {
      name: 'oldPassword',
      placeholder: '************',
    },
    confirmPassword: {
      name: 'confirmPassword',
      placeholder: '***********',
    },
  },
}