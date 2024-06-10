import { useEstimate } from "../../../../hooks/estimate";
import { Fade, FormControlLabel } from "@mui/material";
import styles from "../index.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  inventoryHeavyObjectsOptions,
  inventoryVolumeKnownOptions,
} from "../constants";
import Routes from "../../../../helpers/routes";
import messages from "../messages";
import { isObjectEmpty } from "../../../../helpers/functions";
import EstimateSection from "../../section";
import FormGroup from "../../../../components/FormGroup";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import CheckBox from "../../../../components/CheckBox";
import { METRICS } from "../../../../helpers/constants";
import FloorSelect from "../../../../components/Utilities/FloorSelect";
import Select from "../../../../components/Select";

export const PIANO_OPTIONS = [
  { label: "Piano droit", value: "straight_piano" },
  { label: "Piano 1/4", value: "one_quarter_piano" },
  { label: "Piano 1/2", value: "one_half_piano" },
  { label: "Piano 3/4", value: "three_third_piano" },
];

export const FRIDGE_OPTIONS = [
  { label: "Frigo américain", value: "american_fridge" },
];

export const SAFE_OPTIONS = [{ label: "Coffre fort", value: "safe" }];
export const POOL_TABLE_OPTIONS = [{ label: "Billard", value: "pool_table" }];

const VolumeEstimateSection = ({
  inventory,
  addToEstimateInventoryByKey,
  handleContinue,
}) => {
  const router = useRouter();
  const [currentRadioValue, setCurrentRadioValue] = useState(
    inventory?.volume?.volumeKnown
      ? inventoryVolumeKnownOptions[0].value
      : inventoryVolumeKnownOptions[1].value
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [volumeValue, setVolumeValue] = useState("");

  function handleVolumeRedirection() {
    return router.push(Routes.VOLUME_CALCULATOR_PAGE);
  }

  function handleRadioChange(event) {
    if (event.target.value === currentRadioValue) return;
    setCurrentRadioValue(event.target.value);
    addToEstimateInventoryByKey("volume", {
      [event.target.name]:
        event.target.value === inventoryVolumeKnownOptions[0].value,
    });
  }

  const replaceComaByPoints = (str) => {
    return str.replace(",", ".");
  };

  function handleChange(event) {
    const filteredValue = replaceComaByPoints(event.target.value);
    if (filteredValue && !filteredValue.match(/^[0-9.]+$/)) {
      handleContinue(false, "Merci de préciser un volume valide");
      setErrors({ volume: messages.sections.volume.input.errors.empty });
    } else if (touched && !filteredValue) {
      handleContinue(false, "Merci de préciser un volume valide");
      setErrors({ volume: messages.sections.volume.input.errors.empty });
    } else if (touched && Number(filteredValue) > 0) {
      setErrors({});
      handleContinue(true, "");
    }
    const fixedValue = Number(filteredValue).toFixed(2);
    setVolumeValue(filteredValue);
    addToEstimateInventoryByKey("volume", {
      volume: Number(fixedValue),
    });
  }

  useEffect(() => {
    setCurrentRadioValue(
      inventory?.volume?.volumeKnown
        ? inventoryVolumeKnownOptions[0].value
        : inventoryVolumeKnownOptions[1].value
    );
  }, [inventory]);

  useEffect(() => {
    const canContinue =
      isObjectEmpty(errors) &&
      currentRadioValue === inventoryVolumeKnownOptions[0].value &&
      (touched || inventory?.volume?.volume);
    handleContinue(
      canContinue,
      canContinue ? "" : "Merci de préciser un volume valide"
    );
  }, [errors, currentRadioValue]);

  return (
    <EstimateSection title={messages.sections.volume.title}>
      <div className={styles.estimate_inventory_volume_section_subtitle}>
        {messages.sections.volume.subtitle}
      </div>
      <div>
        <FormGroup
          name={messages.radio.volumeKnown.name}
          label=""
          defaultValue={inventoryVolumeKnownOptions[0].value}
          options={inventoryVolumeKnownOptions}
          currentValue={currentRadioValue}
          onChange={handleRadioChange}
        />
      </div>
      <div className={styles.estimate_inventory_volume_section_action}>
        {inventory?.volume?.volumeKnown ? (
          <div
            className={
              styles.estimate_inventory_volume_section_action_volume_known
            }
          >
            <Input
              label={messages.sections.volume.input.label}
              placeholder={messages.sections.volume.input.placeholder}
              error={touched && errors.volume}
              name="volume"
              values={volumeValue || inventory?.volume?.volume || ""}
              value={volumeValue || inventory?.volume?.volume || ""}
              onChange={handleChange}
              onFocus={() => setTouched(true)}
              // onBlur={formik.handleBlur}
              required
              fullWidth
              type="text"
            />
            <span>{METRICS.CUBE}</span>
          </div>
        ) : (
          <Button onClick={handleVolumeRedirection}>
            {messages.sections.volume.button.label}
          </Button>
        )}
      </div>
    </EstimateSection>
  );
};
const HeavyItemsChecklist = ({ inventory, addToEstimateInventoryByKey }) => {
  function handleCheckboxChange(event) {
    addToEstimateInventoryByKey("heavyObjects", {
      items: {
        ...inventory?.heavyObjects?.items,
        [event.target.name]: {
          ...(inventory?.heavyObjects?.items?.[event.target.name] || {}),
          present:
            !inventory?.heavyObjects?.items?.[event.target.name]?.present,
        },
      },
    });
  }

  function handleInputChange(event) {
    addToEstimateInventoryByKey("heavyObjects", {
      items: {
        ...inventory?.heavyObjects?.items,
        other: {
          ...inventory?.heavyObjects?.items?.other,
          type: "other",
          item: {
            ...inventory?.heavyObjects?.items?.other?.item,
            value: event.target.value,
          },
        },
      },
    });
  }

  function handleFloorChange(event) {
    addToEstimateInventoryByKey("heavyObjects", {
      items: {
        ...inventory?.heavyObjects?.items,
        [event.target.name]: {
          ...inventory?.heavyObjects?.items?.[event.target.name],
          floors: event.target.value,
        },
      },
    });
  }

  function handleItemTypeChange(event) {
    addToEstimateInventoryByKey("heavyObjects", {
      items: {
        ...inventory?.heavyObjects?.items,
        [event.target.name]: {
          ...inventory?.heavyObjects?.items[event.target.name],
          type: event.target.value,
        },
      },
    });
  }

  return (
    <div className={styles.inventory_heavy_objects_sections_container}>
      <div className={styles.inventory_heavy_objects_section}>
        <FormControlLabel
          control={
            <CheckBox
              checked={!!inventory?.heavyObjects?.items?.piano?.present}
              name={messages.sections.heavyObjects.items.piano.name}
              onChange={handleCheckboxChange}
            />
          }
          label={messages.sections.heavyObjects.items.piano.label}
        />
        <Select
          label={"Piano"}
          name={"piano"}
          onChange={handleItemTypeChange}
          value={inventory?.heavyObjects?.items?.piano?.type || ""}
          options={PIANO_OPTIONS}
          variant="standard"
          disabled={!inventory?.heavyObjects?.items?.piano?.present}
        />
        <FloorSelect
          label={messages.select.label}
          name={messages.select.piano.name}
          onChange={handleFloorChange}
          value={inventory?.heavyObjects?.items?.piano?.floors}
          variant="standard"
          disabled={!inventory?.heavyObjects?.items?.piano?.present}
        />
      </div>
      <div className={styles.inventory_heavy_objects_section}>
        <FormControlLabel
          control={
            <CheckBox
              checked={!!inventory?.heavyObjects?.items?.fridge?.present}
              name={messages.sections.heavyObjects.items.fridge.name}
              onChange={handleCheckboxChange}
            />
          }
          label={messages.sections.heavyObjects.items.fridge.label}
        />
        <Select
          label={"Frigo"}
          name={"fridge"}
          onChange={handleItemTypeChange}
          value={inventory?.heavyObjects?.items?.fridge?.type || ""}
          options={FRIDGE_OPTIONS}
          variant="standard"
          disabled={!inventory?.heavyObjects?.items?.fridge?.present}
        />
        <FloorSelect
          label={messages.select.label}
          name={messages.select.fridge.name}
          onChange={handleFloorChange}
          value={inventory?.heavyObjects?.items?.fridge?.floors}
          variant="standard"
          disabled={!inventory?.heavyObjects?.items?.fridge?.present}
        />
      </div>
      <div className={styles.inventory_heavy_objects_section}>
        <FormControlLabel
          control={
            <CheckBox
              checked={!!inventory?.heavyObjects?.items?.safe?.present}
              name={messages.sections.heavyObjects.items.safe.name}
              onChange={handleCheckboxChange}
            />
          }
          label={messages.sections.heavyObjects.items.safe.label}
        />
        <Select
          label={"Coffre fort"}
          name={"safe"}
          onChange={handleItemTypeChange}
          value={inventory?.heavyObjects?.items?.safe?.type || ""}
          options={SAFE_OPTIONS}
          variant="standard"
          disabled={!inventory?.heavyObjects?.items?.safe?.present}
        />
        <FloorSelect
          label={messages.select.label}
          name={messages.select.safe.name}
          onChange={handleFloorChange}
          value={inventory?.heavyObjects?.items?.safe?.floors}
          variant="standard"
          disabled={!inventory?.heavyObjects?.items?.safe?.present}
        />
      </div>
      <div className={styles.inventory_heavy_objects_section}>
        <FormControlLabel
          control={
            <CheckBox
              checked={!!inventory?.heavyObjects?.items?.poolTable?.present}
              name={messages.sections.heavyObjects.items.poolTable.name}
              onChange={handleCheckboxChange}
            />
          }
          label={messages.sections.heavyObjects.items.poolTable.label}
        />
        <Select
          label={"Billard"}
          name={"poolTable"}
          onChange={handleItemTypeChange}
          value={inventory?.heavyObjects?.items?.poolTable?.type || ""}
          options={POOL_TABLE_OPTIONS}
          variant="standard"
          disabled={!inventory?.heavyObjects?.items?.poolTable?.present}
        />
        <FloorSelect
          label={messages.select.label}
          name={messages.select.poolTable.name}
          onChange={handleFloorChange}
          value={inventory?.heavyObjects?.items?.poolTable?.floors}
          variant="standard"
          disabled={!inventory?.heavyObjects?.items?.poolTable?.present}
        />
      </div>
      {/* <div className={styles.inventory_heavy_objects_section}>
        <FormControlLabel
          control={
            <CheckBox
              checked={!!inventory?.heavyObjects?.items?.other?.present}
              name={messages.sections.heavyObjects.items.other.name}
              onChange={handleCheckboxChange}
            />
          }
          label={messages.sections.heavyObjects.items.other.label}
        />
        <Input
          name={messages.sections.heavyObjects.items.other.input.name}
          label={messages.sections.heavyObjects.items.other.input.label}
          value={inventory?.heavyObjects?.items?.other?.item?.value}
          onChange={handleInputChange}
          disabled={!inventory?.heavyObjects?.items?.other?.present}
        />
        <FloorSelect
          label={messages.select.label}
          name={messages.select.other.name}
          onChange={handleFloorChange}
          value={inventory?.heavyObjects?.items?.other?.floors}
          variant="standard"
          disabled={!inventory?.heavyObjects?.items?.other?.present}
        />
      </div> */}
    </div>
  );
};

//

const HeavyObjectsSection = ({ inventory, addToEstimateInventoryByKey }) => {
  const [currentRadioValue, setCurrentRadioValue] = useState(
    inventory?.heavyObjects?.hasHeavyObjects ? "yes" : "no"
  );

  function handleRadioChange(event) {
    if (event.target.value === currentRadioValue) return;
    setCurrentRadioValue(event.target.value);
    addToEstimateInventoryByKey("heavyObjects", {
      [event.target.name]:
        event.target.value === inventoryHeavyObjectsOptions[1].value,
    });
  }

  return (
    <EstimateSection title={messages.sections.heavyObjects.title}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <FormGroup
          name={messages.radio.heavyObjects.name}
          label=""
          defaultValue={inventoryHeavyObjectsOptions[0].value}
          options={inventoryHeavyObjectsOptions}
          currentValue={currentRadioValue}
          onChange={handleRadioChange}
        />
        {currentRadioValue === "yes" && (
          <span>{messages.sections.heavyObjects.items.piano.description}</span>
        )}
      </div>
      {currentRadioValue === "yes" ? (
        <HeavyItemsChecklist
          inventory={inventory}
          addToEstimateInventoryByKey={addToEstimateInventoryByKey}
        />
      ) : null}
    </EstimateSection>
  );
};

const EstimateInventoryFirstPart = ({ handleContinue }) => {
  const {
    estimate: { inventory = {} },
    addToEstimateInventoryByKey,
  } = useEstimate();
  return (
    <Fade timeout={500} in={true}>
      <div className={styles.estimate_page_inventory_container}>
        <VolumeEstimateSection
          inventory={inventory}
          addToEstimateInventoryByKey={addToEstimateInventoryByKey}
          handleContinue={handleContinue}
        />
        <HeavyObjectsSection
          inventory={inventory}
          addToEstimateInventoryByKey={addToEstimateInventoryByKey}
        />
      </div>
    </Fade>
  );
};

export default EstimateInventoryFirstPart;
