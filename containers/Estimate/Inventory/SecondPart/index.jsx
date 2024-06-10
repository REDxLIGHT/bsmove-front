import { useEffect, useState } from "react";
import styles from "../index.module.css";
import messages from "../messages";
import Counter from "../../../../components/Counter";
import {
  mountingExtraFurnituresOptions,
  mountingHelpNeededOptions,
} from "../constants";
import EstimateSection from "../../section";
import FormGroup from "../../../../components/FormGroup";
import { Fade } from "@mui/material";
import api from "../../../../helpers/api";
import ExtraFurnitureCard from "../../../../components/ExtraFurnituresCard";
import { useEstimate } from "../../../../hooks/estimate";
import { yesNoBooleanConversion } from "../../../../helpers/functions";
import Pager from "../../../../components/Pager";
import LoadingComponent from "../../../../components/LoadingComponent";
import CheckBox from "../../../../components/CheckBox";
import { FormControlLabel } from "@mui/material";

const MountingTypeComponent = ({
  type,
  inventory,
  addToEstimateInventoryByKey,
}) => {
  const [count, setCount] = useState(
    inventory?.mounting?.items?.[type]?.count || 0
  );

  function handleCountInc() {
    setCount((prev) => prev + 1);
  }

  function handleCountDec() {
    if (!count) return;
    setCount((prev) => prev - 1);
  }

  useEffect(() => {
    if (count === undefined) return;
    addToEstimateInventoryByKey("mounting", {
      items: {
        ...inventory?.mounting?.items,
        [type]: {
          ...inventory?.mounting?.items?.[type],
          count,
        },
      },
    });
  }, [count]);

  return (
    <div className={styles.mounting_type_container}>
      <div className={styles.inventory_section_label}>
        {messages.sections.mounting.itemsType[type].label}
      </div>
      <div className={styles.mounting_type_content}>
        <div className={styles.inventory_section_description}>
          {messages.sections.mounting.itemsType[type].description}
        </div>
        <div className={styles.mounting_type_counter}>
          <Counter
            minValue={0}
            value={count}
            handleInc={handleCountInc}
            handleDec={handleCountDec}
            // margin="50% 0 0 0"
          />
        </div>
      </div>
    </div>
  );
};

const MountingHelpSection = ({ inventory, addToEstimateInventoryByKey }) => {
  const [currentRadioValue, setCurrentRadioValue] = useState(
    inventory?.mounting?.type || mountingHelpNeededOptions[0].value
  );
  const [items, setItems] = useState({
    simple: inventory?.mounting?.items?.simple,
    medium: inventory?.mounting?.items?.medium,
    hard: inventory?.mounting?.items?.hard,
  });
  // REGLER PROBLEME ETAGES

  function handleRadioChange(event) {
    if (event.target.value === currentRadioValue) return;
    setCurrentRadioValue(event.target.value);
    addToEstimateInventoryByKey("mounting", {
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    addToEstimateInventoryByKey("mounting", {
      mountingHelp: {
        ...inventory?.mounting?.mountingHelp,
        items:
          currentRadioValue === mountingHelpNeededOptions[0].value ? items : {},
      },
    });
  }, [currentRadioValue]);

  useEffect(() => {
    if (currentRadioValue !== mountingHelpNeededOptions[0].value) {
      setItems(inventory?.mounting?.mountingHelp?.items);
    }
  }, [inventory]);

  return (
    <EstimateSection title={messages.sections.mounting.title}>
      <div>
        <FormGroup
          name={messages.radio.mounting.name}
          label=""
          defaultValue={mountingHelpNeededOptions[0].value}
          options={mountingHelpNeededOptions}
          currentValue={currentRadioValue}
          onChange={handleRadioChange}
        />
      </div>
      {currentRadioValue !== mountingHelpNeededOptions[0].value ? (
        <Fade timeout={500} in={true}>
          <div className={styles.mounting_type_sections_container}>
            <MountingTypeComponent
              inventory={inventory}
              addToEstimateInventoryByKey={addToEstimateInventoryByKey}
              type="simple"
            />
            <MountingTypeComponent
              inventory={inventory}
              addToEstimateInventoryByKey={addToEstimateInventoryByKey}
              type="medium"
            />
            <MountingTypeComponent
              inventory={inventory}
              addToEstimateInventoryByKey={addToEstimateInventoryByKey}
              type="hard"
            />
          </div>
        </Fade>
      ) : null}
    </EstimateSection>
  );
};

const ExtraFurnituresComponent = ({
  type = "standard",
  list = [],
  title = "",
  isBoxFurnitures = true,
  helpWrappingLabel = "J'ai besoin d'aide pour l'emballage des cartons",
}) => {
  const {
    addToEstimateInventoryByKey,
    estimate: { inventory },
  } = useEstimate();

  function handleNeedHelpToWrapToggle() {
    if (!type) return;
    addToEstimateInventoryByKey("mounting", {
      ...inventory?.mounting,
      extraFurnitures: {
        ...inventory?.mounting?.extraFurnitures,
        [type]: {
          ...inventory?.mounting?.extraFurnitures?.[type],
          isHelpNeededToWrap:
            !inventory?.mounting?.extraFurnitures?.[type]?.isHelpNeededToWrap,
        },
      },
    });
  }

  return (
    <div>
      <div className={styles.furnitures_buy_items_grid}>
        <div>
          <section
            style={{ display: "flex", flexDirection: "column", gap: "1em" }}
          >
            <h2>{title}</h2>
            <div className={styles.furnitures_buy_items_grid_content}>
              {list?.map((item, index) => (
                <ExtraFurnitureCard
                  item={item}
                  key={index}
                  withoutPrice
                  category={type}
                />
              ))}
            </div>
            {isBoxFurnitures ? (
              <FormControlLabel
                key="helpWrapping"
                id="helpWrapping"
                control={
                  <CheckBox
                    name="helpWrapping"
                    checked={
                      inventory?.mounting?.extraFurnitures?.[type]
                        ?.isHelpNeededToWrap
                    }
                  />
                }
                label={helpWrappingLabel}
                onChange={handleNeedHelpToWrapToggle}
              />
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};

const ExtraFurnituresContainer = ({
  inventory,
  addToEstimateInventoryByKey,
}) => {
  const [items, setItems] = useState([
    { type: "standard", items: [] },
    { type: "fragile", items: [] },
    { type: "protection", items: [] },
    { type: "others", items: [] },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRadioValue, setCurrentRadioValue] = useState(
    inventory?.mounting?.extraFurnitures?.needed
      ? mountingExtraFurnituresOptions[1].value
      : mountingExtraFurnituresOptions[0].value
  );

  function handleRadioChange(event) {
    if (event.target.value === currentRadioValue) return;
    setCurrentRadioValue(event.target.value);
    addToEstimateInventoryByKey("mounting", {
      [event.target.name]: {
        ...inventory?.mounting?.[event.target.name],
        needed: yesNoBooleanConversion(event.target.value),
      },
    });
  }

  function separateItemsByCategories(dataList) {
    const dupList = [...items];
    dataList.forEach((item) => {
      switch (item.category) {
        case "standard": {
          dupList[0].items.push(item);
          break;
        }
        case "fragile":
        case "protection": {
          dupList[1].items.push(item);
          break;
        }
        case "others": {
          dupList[3].items.push(item);
          break;
        }
        default: {
          dupList[3].items.push(item);
          break;
        }
      }
    });
    setItems(dupList);
  }

  useEffect(() => {
    async function fetchItems() {
      setIsLoading(true);
      const res = await api.get("/Products");
      setIsLoading(false);
      separateItemsByCategories(res.data);
    }
    fetchItems();
  }, []);

  return (
    <EstimateSection title={messages.sections.extraFurnitures.title}>
      <div>
        <FormGroup
          name={messages.radio.extraFurnitures.name}
          label=""
          defaultValue={mountingExtraFurnituresOptions[0].value}
          options={mountingExtraFurnituresOptions}
          currentValue={currentRadioValue}
          onChange={handleRadioChange}
        />
      </div>
      <Fade timeout={500} in={true}>
        <div>
          {currentRadioValue ===
          mountingExtraFurnituresOptions[0].value ? null : isLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <ExtraFurnituresComponent
                list={items[0]?.items}
                type="standard"
                title="Pour le non-fragile"
                helpWrappingLabel="J'ai besoin d'aide pour l'emballage des cartons non-fragiles"
              />
              <ExtraFurnituresComponent
                list={items[1]?.items}
                type="fragile"
                title="Pour le fragile"
                helpWrappingLabel="J'ai besoin d'aide pour l'emballage des cartons fragiles"
              />
              <ExtraFurnituresComponent
                list={items[3]?.items}
                type="others"
                title="Autres fournitures"
                isBoxFurnitures={false}
              />
            </>
          )}
        </div>
      </Fade>
    </EstimateSection>
  );
};

const EstimateInventorySecondPart = ({ handleContinue }) => {
  const {
    estimate: { inventory = {} },
    addToEstimateInventoryByKey,
  } = useEstimate();
  return (
    <Fade timeout={500} in={true}>
      <div className={styles.estimate_page_inventory_button}>
        <MountingHelpSection
          inventory={inventory}
          addToEstimateInventoryByKey={addToEstimateInventoryByKey}
        />
        <ExtraFurnituresContainer
          inventory={inventory}
          addToEstimateInventoryByKey={addToEstimateInventoryByKey}
        />
      </div>
    </Fade>
  );
};

export default EstimateInventorySecondPart;
