import messages from './messages';

export const arrivalDateInformationsSectionOptions = [
  { label: messages.radio.arrivalDateInformations.fixe, value: 'fixe' },
  { label: messages.radio.arrivalDateInformations.flexible, value: 'flexible' }
]

export const departureInformationsOptions = [
  { label: messages.radio.departureInformations.no, value: 'no' },
  { label: messages.radio.departureInformations.yes, value: 'yes' },
]

export const DEPARTURE_FLOOR_OPTIONS = [
  { label: messages.selects.floor.ground, value: 0 },
  { label: messages.selects.floor.first, value: 1 },
  { label: messages.selects.floor.second, value: 2 },
  { label: messages.selects.floor.third, value: 3 },
  { label: messages.selects.floor.fourth, value: 4 },
  { label: messages.selects.floor.fifth, value: 5 },
]

export const DEPARTURE_LIFT_OPTIONS = [
  { label: messages.selects.elevator.yes, value: true },
  { label: messages.selects.elevator.no, value: false },
]

export const DEPARTURE_FURNITURES_LIFT_OPTIONS = [
  { label: messages.selects.furnituresLift.yes, value: true },
  { label: messages.selects.furnituresLift.no, value: false },
]

export const DEPARTURE_FOOT_DISTANCE_OPTIONS = [
  { label: messages.selects.footDistance.zeroToFifty, value: 'small' },
  { label: messages.selects.footDistance.fiftyToHundred, value: 'medium' },
  { label: messages.selects.footDistance.moreThanHundred, value: 'large' },
]

export const ARRIVAL_FLOOR_OPTIONS = [
  { label: messages.selects.floor.ground, value: 0 },
  { label: messages.selects.floor.first, value: 1 },
  { label: messages.selects.floor.second, value: 2 },
  { label: messages.selects.floor.third, value: 3 },
  { label: messages.selects.floor.fourth, value: 4 },
  { label: messages.selects.floor.fifth, value: 5 },
]

export const ARRIVAL_LIFT_OPTIONS = [
  { label: messages.selects.elevator.yes, value: true },
  { label: messages.selects.elevator.no, value: false },
]

export const ARRIVAL_FURNITURES_LIFT_OPTIONS = [
  { label: messages.selects.footDistance.zeroToFifty, value: 'small' },
  { label: messages.selects.footDistance.fiftyToHundred, value: 'medium' },
  { label: messages.selects.footDistance.moreThanHundred, value: 'large' },
]

export const ARRIVAL_FOOT_DISTANCE_OPTIONS = [
  { label: messages.selects.furnituresLift.yes, value: true },
  { label: messages.selects.furnituresLift.no, value: false },
]