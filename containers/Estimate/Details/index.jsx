import React, { useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IconButton } from '@mui/material';
import AsyncSelect from "react-select/async";
import * as _ from "lodash";

import { useEstimate } from '../../../hooks/estimate';
import DatePicker from '../../../components/Pickers/DatePicker';
import FormGroup from '../../../components/FormGroup';
import Select from '../../../components/Select';
import EstimateSection from '../section';

import {
  departureInformationsOptions,
  DEPARTURE_FLOOR_OPTIONS,
  DEPARTURE_FOOT_DISTANCE_OPTIONS,
  DEPARTURE_FURNITURES_LIFT_OPTIONS,
  DEPARTURE_LIFT_OPTIONS,
} from './constants';
import styles from './index.module.css';
import messages from './messages';
import { isObjectEmpty } from '../../../helpers/functions';


const arrivalDateInformationsSectionOptions = [
  { label: messages.radio.arrivalDateInformations.fixe, value: 'fixe' },
  { label: messages.radio.arrivalDateInformations.flexible, value: 'flexible' }
]

const ArrivalDateInformationsSection = ({ flexible, addToEstimateDetailsByKey }) => {
  const [departureDateValue, setDepartureDateValue] = useState(new Date());
  const [currentValue, setCurrentValue] = useState('fixe');

  async function handleDateChange(newDate) {
    setDepartureDateValue(newDate);
  }

  function handleRadioChange(event) {
    if (event.target.value === currentValue) return ;
    setCurrentValue(event.target.value);
    addToEstimateDetailsByKey('arrivalDateInformations', { flexible: event.target.value === 'flexible' })
  }

  useEffect(() => {
    if (departureDateValue && !flexible) {
      addToEstimateDetailsByKey('arrivalDateInformations', { departureDate: departureDateValue } )
    } else if (flexible) {
      setCurrentValue('flexible')
      addToEstimateDetailsByKey('arrivalDateInformations', { departureDate: null } )
    }
  }, [departureDateValue, flexible])

  return (
    <EstimateSection title={messages.sections.details.movingDate}>
      <div className={styles.estimate_arrival_date_information_section_content}>
        <FormGroup
          name={messages.radio.arrivalDateInformations.name}
          label=''
          defaultValue={arrivalDateInformationsSectionOptions[0].value}
          options={arrivalDateInformationsSectionOptions}
          currentValue={currentValue}
          onChange={handleRadioChange}
        />
        {
          !flexible
            ?
            (
              <div className={styles.estimate_arrival_date_information_section_content_date_picker_container}>
                <DatePicker defaultValue={null} value={departureDateValue} handleChange={handleDateChange} />
              </div>
            ) : null
        }
      </div>
    </EstimateSection>
  )
}

function mapPlaceApiToData(result) {
  const mapped = result?.map((item) => {
    return {
      value: item?.display_name.toLowerCase(),
      label: item?.display_name,
      placeName: item?.display_name || '',
      lng: Number(item?.lon) || 0,
      lat: Number(item?.lat) || 0,
      country: item?.address?.country || '',
    }
  })
  return mapped
}

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const InputAsyncSelect = ({
  name = '',
  isDisabled = false,
  addToEstimateDetailsByKey,
  type = 'departure',
}) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [menuPortalTarget, setMenuPortalTarget] = useState(null)
  const [selected, setSelected] = useState(null);

  function handleChange(value) {
    setSelected(value)
    addToEstimateDetailsByKey(type === 'departure' ? 'departureInformations' : 'arrivalInformations', { [name]: value })
  }

  function handleOnInputChange(inputValue) {
    setInputValue(inputValue.toLowerCase())
  }

  useEffect(() => {
    setMenuPortalTarget(document.body)
  }, [name])

  async function fetchAddresses(address) {
    if (address) {
      const params = {
        q: address,
        format: "json",
        addressdetails: 1,
        country: 'France',
      };
      const queryString = new URLSearchParams(params).toString();
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const localizationResult = await fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions);
      const result = await localizationResult.text()
      const mappedResult = mapPlaceApiToData(JSON.parse(result));
      return mappedResult
    }
  }

  async function loadOptions(value, cb) {
    if (value?.length > 4) {
      cb(await fetchAddresses(value.toLowerCase()))
    }
  }

  function handleOnBlur() {
    setInputValue(inputValue)
    setOptions([]);
  }

  return (
      <>
        <AsyncSelect
            noOptionsMessage={() => messages.sections.details.noAddress}
            onInputChange={_.debounce(handleOnInputChange, 700)}
            value={selected}
            onChange={handleChange}
            defaultValue=''
            placeholder={messages.sections.details[type]?.input.placeholder}
            menuPortalTarget={menuPortalTarget}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            isDisabled={isDisabled}
            onBlur={handleOnBlur}
            isLoading={isLoading}
            isClearable={true}
            isSearchable={true}
            name={name}
            loadOptions={loadOptions}
            cacheOptions
        />
      </>
  )
}

const DepartureInformationsSection = ({ departureInformations, addToEstimateDetailsByKey }) => {
  const [currentRadioValue, setCurrentRadioValue] = useState('no');
  const [values, setValues] = useState({
    address: '',
    floor: '',
    elevator: '',
    footDistance: '',
    furnituresLift: '',
    parkingPermit: '',
  })


  async function handleChange(event) {
    addToEstimateDetailsByKey('departureInformations', { [event.target.name]: event.target.value });
  }

  function handleRadioChange(event) {
    if (event.target.value === currentRadioValue) return ;
    setCurrentRadioValue(event.target.value);
    addToEstimateDetailsByKey('departureInformations', { [event.target.name]: event.target.value === 'yes' });
  }

  // useEffect(() => {
  //   fetchAddresses(values?.address)
  // }, [values])

  useEffect(() => {
    setValues(departureInformations);
    setCurrentRadioValue(departureInformations?.parkingPermit ? 'yes' : 'no')
  }, [departureInformations])

  // useEffect(() => {
  //   addToEstimateDetailsByKey('departureInformations', { parkingPermit: departureInformations?.parkingPermit || false })
  // }, [departureInformations])

  return (
    <EstimateSection title={messages.sections.details.departure.title}>
      <div className={styles.estimate_departure_location_information_container}>
        {/*<div className={styles.estimate_departure_location_information_input_container}>*/}
          <InputAsyncSelect name='address' type='departure' addToEstimateDetailsByKey={addToEstimateDetailsByKey} />
          {/*<Input*/}
          {/*  label={messages.sections.details.departure.input.label}*/}
          {/*  placeholder={messages.sections.details.departure.input.placeholder}*/}
          {/*  name={messages.sections.details.departure.input.name}*/}
          {/*  value={values?.address}*/}
          {/*  onBlur={handleChange}*/}
          {/*  onChange={handleChange}*/}
          {/*  required*/}
          {/*  fullWidth*/}
          {/*  type='text'*/}
          {/*  name='address'*/}
          {/*/>*/}
        {/*</div>*/}
        <div className={styles.estimate_departure_location_information_select_options_container}>
          <Select
            label={messages.selects.floor.label}
            name={messages.selects.floor.name}
            onChange={handleChange}
            value={values?.floor}
            options={DEPARTURE_FLOOR_OPTIONS}
          />
          {!(values?.floor === 0)
            ? <Select
                label={messages.selects.elevator.label}
                name={messages.selects.elevator.name}
                onChange={handleChange}
                value={values?.elevator}
                options={DEPARTURE_LIFT_OPTIONS}
              />
            : null
          }
          <Select
            label={messages.selects.footDistance.label}
            name={messages.selects.footDistance.name}
            onChange={handleChange}
            value={values?.footDistance}
            options={DEPARTURE_FOOT_DISTANCE_OPTIONS}
          />
          {!(values?.floor === 0)
            ? <Select
                label={messages.selects.furnituresLift.label}
                name={messages.selects.furnituresLift.name}
                onChange={handleChange}
                value={values?.furnituresLift}
                options={DEPARTURE_FURNITURES_LIFT_OPTIONS}
              />
            : null
          }
        </div>
        <div className={styles.estimate_parking_permit_container}>
          <div className={styles.estimate_parking_permit_question}>
            <span className={styles.estimate_page_subtitle}>{messages.sections.details.departure.parkingPermit.text}</span>
            <span className={styles.estimate_details_page_parking_permit_link}>
              {messages.sections.details.departure.parkingPermit.link}
            </span>
            <IconButton onClick={() => {}} size="large">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
          <FormGroup
            name={messages.radio.departureInformations.name}
            label=''
            defaultValue={departureInformationsOptions[0].value}
            options={departureInformationsOptions}
            currentValue={currentRadioValue}
            onChange={handleRadioChange}
          />
        </div>
      </div>
    </EstimateSection>
  );
}

const ArrivalInformationsSection = ({ arrivalInformations, addToEstimateDetailsByKey }) => {
  const [currentRadioValue, setCurrentRadioValue] = useState('no');
  const [values, setValues] = useState({
    address: '',
    floor: '',
    elevator: '',
    footDistance: '',
    furnituresLift: '',
    parkingPermit: '',
  })

  function handleChange(event) {
    addToEstimateDetailsByKey('arrivalInformations', { [event.target.name]: event.target.value });
  }

  function handleRadioChange(event) {
    if (event.target.value === currentRadioValue) return ;
    setCurrentRadioValue(event.target.value);
    addToEstimateDetailsByKey('arrivalInformations', { [event.target.name]: event.target.value === 'yes' });
  }

  useEffect(() => {
    setValues(arrivalInformations);
    setCurrentRadioValue(arrivalInformations?.parkingPermit ? 'yes' : 'no')
  }, [arrivalInformations])

  return (
    <EstimateSection title={messages.sections.details.arrival.title}>
      <div className={styles.estimate_departure_location_information_container}>
        <InputAsyncSelect name='address' type='arrival' addToEstimateDetailsByKey={addToEstimateDetailsByKey} />
        {/*<div className={styles.estimate_departure_location_information_input_container}>*/}
        {/*  <Input*/}
        {/*    label={messages.sections.details.arrival.input.label}*/}
        {/*    placeholder={messages.sections.details.arrival.input.placeholder}*/}
        {/*    name={messages.sections.details.arrival.input.name}*/}
        {/*    value={values?.address}*/}
        {/*    onBlur={handleChange}*/}
        {/*    onChange={handleChange}*/}
        {/*    required*/}
        {/*    fullWidth*/}
        {/*    type='text'*/}
        {/*    name='address'*/}
        {/*  />*/}
        {/*</div>*/}
        <div className={styles.estimate_departure_location_information_select_options_container}>
          <Select
            label={messages.selects.floor.label}
            name={messages.selects.floor.name}
            onChange={handleChange}
            value={values?.floor}
            options={DEPARTURE_FLOOR_OPTIONS}
          />
          {!(values?.floor === 0)
            ? <Select
                label={messages.selects.elevator.label}
                name={messages.selects.elevator.name}
                onChange={handleChange}
                value={values?.elevator}
                options={DEPARTURE_LIFT_OPTIONS}
              />
            : null
          }
          <Select
            label={messages.selects.footDistance.label}
            name={messages.selects.footDistance.name}
            onChange={handleChange}
            value={values?.footDistance}
            options={DEPARTURE_FOOT_DISTANCE_OPTIONS}
          />
          {!(values?.floor === 0)
            ? <Select
                label={messages.selects.furnituresLift.label}
                name={messages.selects.furnituresLift.name}
                onChange={handleChange}
                value={values?.furnituresLift}
                options={DEPARTURE_FURNITURES_LIFT_OPTIONS}
              />
            : null
          }
        </div>
        <div className={styles.estimate_parking_permit_container}>
          <div className={styles.estimate_parking_permit_question}>
            <span className={styles.estimate_page_subtitle}>{messages.sections.details.arrival.parkingPermit.text}</span>
            <span className={styles.estimate_details_page_parking_permit_link}>
              {messages.sections.details.arrival.parkingPermit.link}
            </span>
            <IconButton onClick={() => {}} size="large">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
          <FormGroup
            name={messages.radio.arrivalInformations.name}
            label=''
            defaultValue={departureInformationsOptions[0].value}
            options={departureInformationsOptions}
            currentValue={currentRadioValue}
            onChange={handleRadioChange}
          />
        </div>
      </div>
    </EstimateSection>
  );
}

const EstimateDetailsComponent = ({ handleContinue, canContinue = false }) => {
  const { estimate: { details = {} }, addToEstimateDetailsByKey } = useEstimate();

  useEffect(() => {
    if ((details?.arrivalDateInformations?.departureDate || details?.arrivalDateInformations?.flexible === true)
        && !isObjectEmpty(details?.departureInformations?.address)
        && !isObjectEmpty(details?.arrivalInformations?.address)) {
      if (!canContinue) handleContinue(true);
    } else {
      if (canContinue) handleContinue(false)
    }
  }, [details]);

  return (
    <div className={styles.estimate_page_sections_container}>
      <ArrivalDateInformationsSection
        flexible={details?.arrivalDateInformations?.flexible}
        addToEstimateDetailsByKey={addToEstimateDetailsByKey}
      />
      <DepartureInformationsSection
        departureInformations={details?.departureInformations}
        addToEstimateDetailsByKey={addToEstimateDetailsByKey}
      />
      <ArrivalInformationsSection
        arrivalInformations={details?.arrivalInformations}
        addToEstimateDetailsByKey={addToEstimateDetailsByKey}
      />
    </div>
  )
}

export default EstimateDetailsComponent;
