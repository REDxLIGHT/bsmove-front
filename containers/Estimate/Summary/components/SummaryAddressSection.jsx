import Divider from "@mui/material/Divider";
import EstimateSection from "../../section";
import messages from "../messages";
import styles from "../index.module.css";
import { formatDate } from "../../../../helpers/functions";
import {
  DEPARTURE_FOOT_DISTANCE_OPTIONS,
  DEPARTURE_FURNITURES_LIFT_OPTIONS,
  DEPARTURE_LIFT_OPTIONS,
} from "../../Details/constants";
import { EstimateSummaryInformationBlock, UNKNOW } from "../index";
import { useEstimate } from "../../../../hooks/estimate";

const SummaryAddressSection = () => {
  const {
    estimate: {
      details: {
        departureInformations = {},
        arrivalInformations = {},
        arrivalDateInformations: { departureDate, flexible } = {},
      } = {},
    } = {},
  } = useEstimate();

  console.log("arrival informations : ", arrivalInformations);
  return (
    <EstimateSection title={messages.sections.informations.title}>
      <div className={styles.estimate_informations_container}>
        <Divider />
        <h3>Départ</h3>
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.date}
          content={flexible ? "Flexible" : formatDate(departureDate, "LLLL")}
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.departure}
          content={departureInformations?.address?.placeName || UNKNOW}
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.departureFloors}
          content={
            departureInformations?.floor >= 0
              ? departureInformations?.floor
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.departureElevator}
          content={
            departureInformations?.furnituresLift
              ? DEPARTURE_LIFT_OPTIONS.find(
                  (option) => option.value === departureInformations?.elevator
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.departureHasFurnituresLift
          }
          content={
            departureInformations?.furnituresLift
              ? DEPARTURE_FURNITURES_LIFT_OPTIONS.find(
                  (option) =>
                    option.value === departureInformations?.furnituresLift
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.departureFootDistance
          }
          content={
            departureInformations?.furnituresLift
              ? DEPARTURE_FOOT_DISTANCE_OPTIONS.find(
                  (option) =>
                    option.value === departureInformations?.footDistance
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.departureNeedParkingPermit
          }
          content={departureInformations?.parkingPermit ? "Oui" : "Non"}
        />
        <Divider />
        <h3>Arrivée</h3>
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.arrival}
          content={arrivalInformations?.address?.placeName || UNKNOW}
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.arrivalFloors}
          content={
            arrivalInformations?.floor >= 0
              ? arrivalInformations?.floor
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.arrivalElevator}
          content={
            arrivalInformations?.furnituresLift
              ? DEPARTURE_LIFT_OPTIONS.find(
                  (option) => option.value === arrivalInformations?.elevator
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.arrivalHasFurnituresLift
          }
          content={
            arrivalInformations?.furnituresLift
              ? DEPARTURE_FURNITURES_LIFT_OPTIONS.find(
                  (option) =>
                    option.value === arrivalInformations?.furnituresLift
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.arrivalFootDistance}
          content={
            arrivalInformations?.footDistance
              ? DEPARTURE_FOOT_DISTANCE_OPTIONS.find(
                  (option) => option.value === arrivalInformations?.footDistance
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.arrivalNeedParkingPermit
          }
          content={arrivalInformations?.parkingPermit ? "Oui" : "Non"}
        />
      </div>
    </EstimateSection>
  );
};

export default SummaryAddressSection;
