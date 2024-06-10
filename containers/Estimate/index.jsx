import { useState } from "react";
import { useRouter } from "next/router";

import styles from "./index.module.css";
import messages from "./messages";
import EstimateUserFormComponent from './Summary/components/EstimateUserFormComponent'
import Subtitle from "../../components/Texts/Subtitle";
import Button from "../../components/Button";
import Routes from "../../helpers/routes";
import EstimateDetailsComponent from "./Details";
import EstimateInventoryComponent from "./Inventory";
import EstimateSummaryComponent from "./Summary";
import { useEstimate } from "../../hooks/estimate";
import { useCustomer } from "../../hooks/customer";
import api from "../../helpers/api";
import { useLoading } from "../../hooks/loading";
import { useAlert } from "../../hooks/alert";
import PriceCalculator from "../../components/PriceCalculator";
import { useGlobal } from "../../hooks/global";
import { BorderLeft, Email } from "@mui/icons-material";

const HelpBox = () => {
  const router = useRouter();
  function handleContactRedirect() {
    return router.push(Routes.CONTACT_PAGE);
  }
  return (
    <div className={styles.estimate_page_content_section_help_container}>
      <div className={styles.estimate_page_content_section_help_title}>
        {messages.helpBox.title}
      </div>
      <div>{messages.helpBox.content}</div>
      <div
        className={styles.estimate_page_content_section_help_action_container}
      >
        <Button onClick={handleContactRedirect} outlined>
          {messages.helpBox.action}
        </Button>
      </div>
    </div>
  );
};

const STEPS = [
  Routes.ESTIMATE_DETAILS_PAGE,
  Routes.ESTIMATE_INVENTORY_PAGE,
  Routes.ESTIMATE_INVENTORY_PAGE,
  Routes.ESTIMATE_INVENTORY_PAGE,
  Routes.ESTIMATE_SUMMARY_PAGE,
];

const DEFAULT_LAT = 0;
const DEFAULT_LNG = 0;

function mapValuesToEstimateRequest(estimate, extraData, formData) {
  return {
    prename: formData?.prename,
    name: formData?.name,
    email: formData?.email,
    phone: formData?.phone,
    address: formData?.address,
    startGeo: {
      lat:
        estimate?.details?.departureInformations?.address?.lat || DEFAULT_LAT,
      lng:
        estimate?.details?.departureInformations?.address?.lng || DEFAULT_LNG,
    },
    endGeo: {
      lat: estimate?.details?.arrivalInformations?.address?.lat || DEFAULT_LAT,
      lng: estimate?.details?.arrivalInformations?.address?.lng || DEFAULT_LNG,
    },
    distance: extraData?.distance,
    startInformations: {
      floor: estimate?.details?.departureInformations?.floor || 0,
      elevator: estimate?.details?.departureInformations?.elevator || false,
      furnituresLift:
        estimate?.details?.departureInformations?.furnituresLift || false,
      parkingPermit:
        estimate?.details?.departureInformations?.parkingPermit || false,
      footDistance: estimate?.details?.departureInformations?.footDistance || 0,
      address: {
        placeName:
          estimate?.details?.departureInformations?.address?.placeName || "",
        lat:
          estimate?.details?.departureInformations?.address?.lat || DEFAULT_LAT,
        lng:
          estimate?.details?.departureInformations?.address?.lng || DEFAULT_LNG,
        country:
          estimate?.details?.departureInformations?.address?.country ||
          "France",
      },
    },
    endInformations: {
      floor: estimate?.details?.arrivalInformations?.floor || 0,
      elevator: estimate?.details?.arrivalInformations?.elevator || false,
      furnituresLift:
        estimate?.details?.arrivalInformations?.furnituresLift || false,
      parkingPermit:
        estimate?.details?.arrivalInformations?.parkingPermit || false,
      footDistance: estimate?.details?.arrivalInformations?.footDistance || 0,
      address: {
        placeName:
          estimate?.details?.arrivalInformations?.address?.placeName || "",
        lat:
          estimate?.details?.arrivalInformations?.address?.lat || DEFAULT_LAT,
        lng:
          estimate?.details?.arrivalInformations?.address?.lng || DEFAULT_LNG,
        country:
          estimate?.details?.arrivalInformations?.address?.country || "France",
      },
    },
    time: {
      departureStartDate:
        estimate?.details?.arrivalDateInformations?.departureStartDate ||
        new Date().toISOString(),
      departureEndDate:
        estimate?.details?.arrivalDateInformations?.departureEndDate || null,
    },
    timeFlexible: estimate?.details?.arrivalDateInformations?.flexible || false,
    volume: {
      volume: estimate?.inventory?.volume?.volume,
      quantity: estimate?.inventory?.volume?.quantity,
      rooms: estimate?.inventory?.volume?.rooms,
    },
    heavyObjects: {
      hasHeavyObjects:
        estimate?.inventory?.heavyObjects?.hasHeavyObjects || false,
      items: {
        piano: {
          present:
            estimate?.inventory?.heavyObjects?.items?.piano?.present || false,
          floors: estimate?.inventory?.heavyObjects?.items?.piano?.floors || 0,
          type: estimate?.inventory?.heavyObjects?.items?.piano?.type || null,
        },
        fridge: {
          present:
            estimate?.inventory?.heavyObjects?.items?.fridge?.present || false,
          floors: estimate?.inventory?.heavyObjects?.items?.fridge?.floors || 0,
          type: estimate?.inventory?.heavyObjects?.items?.fridge?.type || null,
        },
        safe: {
          present:
            estimate?.inventory?.heavyObjects?.items?.safe?.present || false,
          floors: estimate?.inventory?.heavyObjects?.items?.safe?.floors || 0,
          type: estimate?.inventory?.heavyObjects?.items?.safe?.type || null,
        },
        poolTable: {
          present:
            estimate?.inventory?.heavyObjects?.items?.poolTable?.present ||
            false,
          floors:
            estimate?.inventory?.heavyObjects?.items?.poolTable?.floors || 0,
          type:
            estimate?.inventory?.heavyObjects?.items?.poolTable?.type || null,
        },
        other: {
          present:
            estimate?.inventory?.heavyObjects?.items?.other?.present || false,
          type:
            estimate?.inventory?.heavyObjects?.items?.other?.item?.value ||
            null,

          floors: estimate?.inventory?.heavyObjects?.items?.other?.floors || 0,
        },
      },
    },
    needHelp:
      (estimate?.inventory?.mounting?.mountingType &&
        estimate?.inventory?.mounting?.mountingType !== "no") ||
      false,
    needHelpInformations: {
      mountingHelp: {
        items: {},
      },
      mountingType: estimate?.inventory?.mounting?.mountingType || "no",
      items: {
        hard: {
          count: estimate?.inventory?.mounting?.items?.hard?.count || 0,
        },
        simple: {
          count: estimate?.inventory?.mounting?.items?.simple?.count || 0,
        },
        medium: {
          count: estimate?.inventory?.mounting?.items?.medium?.count || 0,
        },
      },
      extraFurnitures: {
        needed: estimate?.inventory?.mounting?.extraFurnitures?.needed || false,
        standard: {
          isHelpNeededToWrap:
            estimate?.inventory?.mounting?.extraFurnitures?.standard
              ?.isHelpNeededToWrap || false,
          items:
            estimate?.inventory?.mounting?.extraFurnitures?.standard?.items ||
            [],
        },
        fragile: {
          isHelpNeededToWrap:
            estimate?.inventory?.mounting?.extraFurnitures?.fragile
              ?.isHelpNeededToWrap || false,
          items:
            estimate?.inventory?.mounting?.extraFurnitures?.fragile?.items ||
            [],
        },
        others: {
          isHelpNeededToWrap:
            estimate?.inventory?.mounting?.extraFurnitures?.others
              ?.isHelpNeededToWrap || false,
          items:
            estimate?.inventory?.mounting?.extraFurnitures?.others?.items || [],
        },
      },
    },
    status: "WAITING_ACTION",
    totalPrice: extraData.priceCalculator?.totalPrice,
  };
}

export async function getDistanceWithCoordinates(start, end) {
  const result = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false`
  );
  const resultJson = await result.json();
  return resultJson?.routes[0]?.distance
    ? resultJson?.routes[0]?.distance / 1000
    : 0; // distance is in km
}

const EstimateContainer = ({ step = 0, setStep }) => {
  const [canContinue, setCanContinue] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { estimate, clearEstimate, priceCalculator } = useEstimate();
  // const { auth, customer } = useCustomer();
  // const { auth, customer } = useCustomer();
  const { resetRedirect, addToGlobalStateByKey } = useGlobal();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();
  // Function to handle form data submission from EstimateUserFormComponent
  function handleFormSubmit(data) {
    setFormData(data); // Update the state with form data
    console.log("Form data:", formData);
  }

  const [formData, setFormData] = useState({});


  function handleContinue(value, errorMessage = "") {
    setCanContinue(value);
    setErrorMessage(errorMessage ?? "");
  }

  async function handleEstimateConfirmation() {
    setGlobalLoading(true);
    const distance = await getDistanceWithCoordinates(
      estimate?.details?.departureInformations?.address,
      estimate?.details?.arrivalInformations?.address
    );

    const requestData = mapValuesToEstimateRequest(estimate, {
      distance,
      priceCalculator,
    }, formData);

    const res = await api.post("/Estimates/no-auth", requestData);
    if (res?.ok) {
      await router.replace(Routes.ESTIMATE_VALIDATION_PAGE);
      clearEstimate();
      console.log("API Response:", res);

      console.log("API Response:", res);

    } else
      setAlert({
        severity: "error",
        content: "Une erreur est survenue lors de l'envoie du devis.",
      });
    setGlobalLoading(false);
  }

  function handleModifyEstimate() {
    router.push(STEPS[0]);
  }

  async function handleNextStep() {
    if (!canContinue) return;
    if (step === 1) return setStep(2);
    if (step === 2) {
      // if (!auth?.id) {
      //   addToGlobalStateByKey("redirect", STEPS[step + 1]);
      //   return router.push(Routes.LOGIN_PAGE);
      // }
      return setStep(3);
    }
    if (step === 3) {
      // resetRedirect();
      return router.push(Routes.HOME_PAGE);
    }
    await router.push(STEPS[step + 1]);
  }


  async function handlePreviousStep() {
    if (step === 0) return router.push(Routes.HOME_PAGE);
    await router.push(STEPS[step - 1]);
  }

  return (
    <div className={styles.estimate_page_container}>
      <PriceCalculator />
      <section className={styles.estimate_page_header}>
        <h1 className={styles.estimate_page_title}>
          {step === 3 ? messages.summary : messages.title}
        </h1>
        {step === 1 || step === 2 ? (
          <div className={styles.estimate_page_subtitle}>
            {messages.subtitle}
          </div>
        ) : null}
      </section>
      <section className={styles.estimate_page_content_container}>
        <div className={styles.estimate_page_left_container}>
          {step === 0 ? (
            <EstimateDetailsComponent
              canContinue={canContinue}
              handleContinue={handleContinue}
            />
          ) : null}
          
          {step === 1 ? (
            <EstimateInventoryComponent
              step={step}
              handleContinue={handleContinue}
            />
          ) : null}
          {step === 2 ? (
            <EstimateUserFormComponent
              handleContinue={handleContinue}
              step={step}
              initialFormData={formData}
              onSubmit={handleFormSubmit} // Pass the handleFormSubmit function
            />
          ) : null}
          {step === 3 ? (
            <EstimateSummaryComponent handleContinue={handleContinue} />
          ) : null}
          <div className={styles.estimate_page_action_container}>
            {step === 3 ? (
              <div className={styles.estimate_confirmation_actions_container}>
                <Button outlined={true} onClick={handleModifyEstimate}>
                  {messages.actions.modifyOrder}
                </Button>
                <Button onClick={handleEstimateConfirmation}>
                  {messages.actions.finalizeEstimate}
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "flex-end",
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  width: '100%',
                  gap: '10px',
                  marginRight: '20px'
                }}>
                  <Button onClick={handleNextStep}>
                    {messages.actions.nextStep}
                  </Button>
                  {step > 0 && step != 2 && (
                    <Button onClick={handlePreviousStep}>
                      {messages.actions.previousStep}
                    </Button>
                  )}
                </div>
                {errorMessage && (
                  <span style={{ color: "red" }}>{errorMessage}</span>
                )}
              </div>
            )}
          </div>
        </div>
        {step !== 3 && (
          <div className={styles.estimate_page_right_container}>
            <HelpBox />
          </div>
        )}
      </section>
    </div>
  );
};

export default EstimateContainer;
