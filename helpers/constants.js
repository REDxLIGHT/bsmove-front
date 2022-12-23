import messages from "./messages";

export const CURRENCY = {
  EUR: '€',
  DOLL: '$',
}

export const METRICS = {
  CUBE: 'm³',
  CENTIMETER_CUBE: 'cm³',
}

export const ALERT = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFOS: 'info',
};

export const mockCustomer = {
  email: 'test@test.fr',
  address: {
    street: '10 rue des Champs Elysées',
    city: 'Paris',
    zipCode: '75008',
    country: 'France'
  },
  firstName: 'PrénomTest',
  lastName: 'NomTest',
  phoneNumber: '0666666666',
  birthDate: '02/02/02',
};

export const DELIVERY_MODES = [
  { name: 'chronopost', messages: messages.deliveryMode.chronopost, value: 0 },
]

export const NAV_HEADER_FURNITURES_BUY_STEPS = [
  messages.furnituresBuySteps.firstStep,
  messages.furnituresBuySteps.secondStep,
  messages.furnituresBuySteps.thirdStep,
];

export const NAV_HEADER_ESTIMATE_STEPS = [
  messages.estimateSteps.firstStep,
  messages.estimateSteps.secondStep,
  messages.estimateSteps.thirdStep,
];
