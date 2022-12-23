import messages from './messages';

export const inventoryVolumeKnownOptions = [
  { label: messages.radio.volumeKnown.known.label, value: messages.radio.volumeKnown.known.value },
  { label: messages.radio.volumeKnown.unknown.label, value: messages.radio.volumeKnown.unknown.value }
]

export const inventoryHeavyObjectsOptions = [
  { label: messages.radio.heavyObjects.no.label, value: messages.radio.heavyObjects.no.value },
  { label: messages.radio.heavyObjects.yes.label, value: messages.radio.heavyObjects.yes.value },
]

export const inventoryHeavyObjectsFloors = [
  { label: messages.select.floors.zero.label, value: 0 },
  { label: messages.select.floors.one.label, value: 1 },
  { label: messages.select.floors.two.label, value: 2 },
  { label: messages.select.floors.three.label, value: 3 },
  { label: messages.select.floors.four.label, value: 4 },
  { label: messages.select.floors.five.label, value: 5 },
  { label: messages.select.floors.six.label, value: 6 },
  { label: messages.select.floors.seven.label, value: 7 },
  { label: messages.select.floors.eight.label, value: 8 },
  { label: messages.select.floors.nine.label, value: 9 },
  { label: messages.select.floors.ten.label, value: 10 },
]

export const mountingHelpNeededOptions = [
  { label: messages.radio.mounting.no.label, value: messages.radio.mounting.no.value },
  { label: messages.radio.mounting.disassemblingMounting.label, value: messages.radio.mounting.disassemblingMounting.value },
  { label: messages.radio.mounting.disassembling.label, value: messages.radio.mounting.disassembling.value },
  { label: messages.radio.mounting.mounting.label, value: messages.radio.mounting.mounting.value },
]

export const mountingExtraFurnituresOptions = [
  { label: messages.radio.extraFurnitures.no.label, value: messages.radio.extraFurnitures.no.value },
  { label: messages.radio.extraFurnitures.yes.label, value: messages.radio.extraFurnitures.yes.value }
]