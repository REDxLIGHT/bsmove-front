import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './index.module.css';
import messages from './messages';

import Subtitle from '../../components/Texts/Subtitle';
import Button from '../../components/Button';
import Routes from '../../helpers/routes';
import EstimateDetailsComponent from './Details';
import EstimateInventoryComponent from './Inventory';
import EstimateSummaryComponent from './Summary';
import {useEstimate} from "../../hooks/estimate";
import {useCustomer} from "../../hooks/customer";
import {omit} from "ramda";
import api from "../../helpers/api";
import {useLoading} from "../../hooks/loading";
import {useAlert} from "../../hooks/alert";


const HelpBox = () => {
  const router = useRouter();
  function handleContactRedirect() {
    return router.push(Routes.CONTACT_PAGE)
  }
  return (
    <div className={styles.estimate_page_content_section_help_container}>
      <div className={styles.estimate_page_content_section_help_title}>{messages.helpBox.title}</div>
      <div>{messages.helpBox.content}</div>
      <div className={styles.estimate_page_content_section_help_action_container}>
        <Button onClick={handleContactRedirect} outlined>
          {messages.helpBox.action}
        </Button>
      </div>
    </div>
  )
}

const STEPS = [
  Routes.ESTIMATE_DETAILS_PAGE,
  Routes.ESTIMATE_INVENTORY_PAGE,
  Routes.ESTIMATE_INVENTORY_PAGE,
  Routes.ESTIMATE_SUMMARY_PAGE,
]

const DEFAULT_LAT = 0;
const DEFAULT_LNG = 0;

function mapValuesToEstimateRequest(estimate, customer, extraData) {
  return {
    startGeo: {
      lat: estimate?.details?.departureInformations?.address?.lat || DEFAULT_LAT,
      lng: estimate?.details?.departureInformations?.address?.lng ||  DEFAULT_LNG,
    },
    endGeo: {
      lat: estimate?.details?.arrivalInformations?.address?.lat || DEFAULT_LAT,
      lng: estimate?.details?.arrivalInformations?.address?.lng || DEFAULT_LNG,
    },
    distance: extraData?.distance,
    startInformations: {
      floor: estimate?.details?.departureInformations?.floor || 0,
      elevator: estimate?.details?.departureInformations?.elevator || false,
      furnituresLift: estimate?.details?.departureInformations?.furnituresLift || false,
      parkingPermit: estimate?.details?.departureInformations?.parkingPermit || false,
      footDistance: estimate?.details?.departureInformations?.footDistance || 0,
      address: {
        placeName: estimate?.details?.departureInformations?.address?.placeName || '',
        lat: estimate?.details?.departureInformations?.address?.lat || DEFAULT_LAT,
        lng: estimate?.details?.departureInformations?.address?.lng || DEFAULT_LNG,
        country: estimate?.details?.departureInformations?.address?.country || 'France',
      }
    },
    endInformations: {
      floor: estimate?.details?.arrivalInformations?.floor || 0,
      elevator: estimate?.details?.arrivalInformations?.elevator || false,
      furnituresLift: estimate?.details?.arrivalInformations?.furnituresLift || false,
      parkingPermit: estimate?.details?.arrivalInformations?.parkingPermit || false,
      footDistance: estimate?.details?.arrivalInformations?.footDistance || 0,
      address: {
        placeName: estimate?.details?.arrivalInformations?.address?.placeName || '',
        lat: estimate?.details?.arrivalInformations?.address?.lat || DEFAULT_LAT,
        lng: estimate?.details?.arrivalInformations?.address?.lng || DEFAULT_LNG,
        country: estimate?.details?.arrivalInformations?.address?.country || 'France',
      }
    },
    time: estimate?.details?.arrivalDateInformations?.departureDate || new Date().toISOString(),
    timeFlexible: estimate?.details?.arrivalDateInformations?.flexible || false,
    volume: estimate?.inventory?.volume?.size,
    heavyObjects: estimate?.inventory?.heavyObjects?.heavyObjects || false,
    heavyObjectsInformations: {
      piano : {
        present : estimate?.inventory?.heavyObjects?.items?.piano?.present || false,
        floors : estimate?.inventory?.heavyObjects?.items?.piano?.floors || 0,
      },
      fridge : {
        present : estimate?.inventory?.heavyObjects?.items?.fridge?.present || false,
        floors : estimate?.inventory?.heavyObjects?.items?.fridge?.floors || 0,
      },
      other : {
        present : estimate?.inventory?.heavyObjects?.items?.other?.present || false,
        item : {
          value : estimate?.inventory?.heavyObjects?.items?.other?.item?.value || '',
        },
        floors : estimate?.inventory?.heavyObjects?.items?.other?.floors || 0,
      },
    },
    needHelp: (estimate?.inventory?.mounting?.mountingType && estimate?.inventory?.mounting?.mountingType !== 'no') || false,
    needHelpInformations: {
      mountingHelp : {
        items : {

        }
      },
      mountingType : estimate?.inventory?.mounting?.mountingType || 'no',
      items : {
        hard : {
          count : estimate?.inventory?.mounting?.mountingType?.items?.hard?.count || 0,
        },
        simple : {
          count : estimate?.inventory?.mounting?.mountingType?.items?.simple?.count || 0,
        },
        medium : {
          count : estimate?.inventory?.mounting?.mountingType?.items?.medium?.count || 0,
        }
      },
      extraFurnitures : {
        needed : estimate?.inventory?.extraFurnitures?.needed || false,
        items: estimate?.inventory?.extraFurnitures?.items || []
      }
    },
    status: "WAITING_ACTION",
    customerInformations: customer,
    customerId: customer?.id
  }
}

async function getDistanceWithCoordinates(start,end) {
  const result = await fetch(`https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false`)
  const resultJson = await result.json()
  return (resultJson?.routes[0]?.distance) ? (resultJson?.routes[0]?.distance) / 1000 : 0 // distance is in km
}

const EstimateContainer = ({ step = 0, setStep }) => {
  const [canContinue, setCanContinue] = useState(false);
  const router = useRouter();
  const { estimate, clearEstimate } = useEstimate();
  const { auth, customer } = useCustomer();
  const { setGlobalLoading } = useLoading()
  const { setAlert } = useAlert()

  function handleContinue(value) {
    setCanContinue(value);
  }

  async function handleEstimateConfirmation() {
    setGlobalLoading(true)
    const distance = await getDistanceWithCoordinates(estimate?.details?.departureInformations?.address, estimate?.details?.arrivalInformations?.address)
    const requestData = mapValuesToEstimateRequest(estimate, customer, { distance });
    const res = await api.post('/Estimates', requestData, { headers: { Authorization: auth.id } })
    if (res?.ok) {
      await router.replace(Routes.HOME_PAGE)
      clearEstimate()
    }
    else setAlert({ severity: 'error', content: 'Une erreur est survenue lors de l\'envoie du devis.' })
    setGlobalLoading(false)
  }

  function handleModifyEstimate() {
    router.push(STEPS[0])
  }

  async function handleNextStep() {
    if (step === 1) return setStep(2);
    if (step === 3) return router.push(Routes.HOME_PAGE)
    await router.push(STEPS[step + 1]);
  }

  return (
    <div className={styles.estimate_page_container}>
      <div className={styles.estimate_page_header}>
        <Subtitle>{step === 3 ? messages.summary : messages.title}</Subtitle>
        <div className={styles.estimate_page_subtitle}>{messages.subtitle}</div>
      </div>
      <div className={styles.estimate_page_content_container}>
        <div className={styles.estimate_page_left_container}>
          {
            step === 0
              ? <EstimateDetailsComponent canContinue={canContinue} handleContinue={handleContinue} />
              : null
          }
          {
            step === 1 || step === 2
              ? <EstimateInventoryComponent step={step} handleContinue={handleContinue} />
              : null
          }
          {
            step === 3
              ? <EstimateSummaryComponent handleContinue={handleContinue} />
              : null
          }
          <div className={styles.estimate_page_action_container}>
            {step === 3 ? (
                <div className={styles.estimate_confirmation_actions_container}>
                  <Button outlined={true} onClick={handleModifyEstimate}>{messages.actions.modifyOrder}</Button>
                  <Button onClick={handleEstimateConfirmation}>{messages.actions.finalizeEstimate}</Button>
                </div>
            ) : (
                <div className={styles.estimate_page_action_component}>
                  <Button disabled={!canContinue} onClick={handleNextStep}>{messages.actions.nextStep}</Button>
                </div>
            )}
          </div>
        </div>
        {step !== 3 && (<div className={styles.estimate_page_right_container}>
          <HelpBox/>
        </div>)}
      </div>
    </div>
  )
}

export default EstimateContainer;
