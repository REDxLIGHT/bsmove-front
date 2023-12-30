import { useState } from "react";
import styles from "../index.module.css";
import { Tabs, Tab } from "@mui/material";
import DatePicker from "../../../components/Pickers/DatePicker";
import { useFormik } from "formik";
import Counter from "../../../components/Counter";
import CheckBox from "../../../components/CheckBox";
import { FormControlLabel } from "@mui/material";
import Button from "../../../components/Button";
import { Button as MUIButton } from "@mui/material";
import Routes from "../../../helpers/routes";
import { useRouter } from "next/router";
import { useRent } from "../../../hooks/rent";
import MUISelect from "@mui/material/Select";
import MUIMenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import FloorSelect from "../../../components/Utilities/FloorSelect";
import GeolocationInput from "../../../components/GeolocationInput";
import {
  FULL_DAY_DURATION,
  HALF_DAY_DURATION,
  PASSAGE_DURATION,
} from "../../../helpers/constants";
import { useEstimate } from "../../../hooks/estimate";
import { getMoversPrice } from "../../../helpers/prices";
import TabPanel from "../../../components/TabPanel";

const VehicleRentSearchSectionVehicle = () => {
  const router = useRouter();
  const { handleVehicleRent, handleMoversRent, rent } = useRent();

  function validate(values) {
    const errors = {};
    if (!values.startAddress)
      errors.startAddress = "Merci d'ajouter une addresse de départ";
    if (!values.endAddress)
      errors.endAddress = "Merci d'ajouter une addresse d'arrivée";
    if (!values.startDate)
      errors.startDate = "Merci d'ajouter une date de départ";
    if (!values.duration) errors.duration = "Merci d'ajouter une durée";
    if (values.onlyMovingMen && !values.nbMovingMen)
      errors.nbMovingMen = "Merci d'ajouter des déménageurs";
    return errors;
  }

  function handleSubmit(values) {
    handleMoversRent({
      ...rent.movers,
      present: true,
      nbMovingMen: values.nbMovingMen,
      totalPrice: getMoversPrice(values.nbMovingMen, values.duration),
    });
    if (values.onlyMovingMen) {
      handleMoversRent({
        ...rent.movers,
        present: true,
        nbMovingMen: values.nbMovingMen,
        totalPrice: getMoversPrice(values.nbMovingMen, values.duration),
        ...values,
      });
      router.push(Routes.MOVERS_RENT_PAGE_SUMMARY);
    } else {
      handleVehicleRent(values);
      router.push(Routes.VEHICLE_RENT_PAGE_SELECTION);
    }
  }

  const formik = useFormik({
    initialValues: {
      startAddress: {},
      endAddress: {},
      startDate: null,
      duration: null,
      nbMovingMen: 0,
      onlyMovingMen: false,
      type: "vehicle",
    },
    validate,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          padding: "50px 98px",
        }}
      >
        <div style={{ display: "flex", gap: "1em" }}>
          <div style={{ width: "50%" }}>
            <label>Départ</label>
            <GeolocationInput
              name={"startAddress"}
              onChange={(value) => formik.setFieldValue("startAddress", value)}
              placeholder={"Adresse de départ"}
            />
            {formik.errors.startAddress && formik.touched.startAddress && (
              <span style={{ color: "red" }}>{formik.errors.startAddress}</span>
            )}
          </div>
          <div style={{ width: "50%" }}>
            <label>Arrivée</label>
            <GeolocationInput
              name={"endAddress"}
              onChange={(value) => formik.setFieldValue("endAddress", value)}
              placeholder={"Adresse d'arrivée"}
            />
            {formik.errors.endAddress && formik.touched.endAddress && (
              <span style={{ color: "red" }}>{formik.errors.endAddress}</span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1em" }}>
          <div style={{ width: "50%" }}>
            <label>Date de votre déménagement</label>
            <DatePicker
              defaultValue={null}
              name="startDate"
              value={formik.values.startDate}
              handleChange={(newValue) => {
                formik.setFieldValue("startDate", newValue);
              }}
              fullWidth={true}
              error={formik.errors.startDate}
            />
            {formik.errors.startDate && formik.touched.startDate && (
              <span style={{ color: "red" }}>{formik.errors.startDate}</span>
            )}
          </div>
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <label>Durée de la manutention</label>
            <MUISelect
              label=""
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
            >
              <MUIMenuItem value={HALF_DAY_DURATION}>4h</MUIMenuItem>
              <MUIMenuItem value={FULL_DAY_DURATION}>8h</MUIMenuItem>
            </MUISelect>
            {formik.errors.duration && formik.touched.duration && (
              <span style={{ color: "red" }}>{formik.errors.duration}</span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <span style={{ fontWeight: 600 }}>Nombre de déménageurs</span>
            <Counter
              minValue={0}
              value={formik.values.nbMovingMen}
              handleInc={() =>
                formik.setFieldValue(
                  "nbMovingMen",
                  formik.values.nbMovingMen + 1
                )
              }
              handleDec={() =>
                formik.setFieldValue(
                  "nbMovingMen",
                  formik.values.nbMovingMen - 1
                )
              }
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={formik.values.onlyMovingMen}
                  onChange={() =>
                    formik.setFieldValue(
                      "onlyMovingMen",
                      !formik.values.onlyMovingMen
                    )
                  }
                />
              }
              label={<label>{"Louer de la main d'œuvre uniquement"}</label>}
            />
          </div>
          <span style={{ fontStyle: "12px" }}>(En plus du chauffeur)</span>
        </div>
        {formik.errors.nbMovingMen && formik.touched.nbMovingMen ? (
          <span style={{ color: "red" }}>{formik.errors.nbMovingMen}</span>
        ) : null}
        <footer
          style={{
            display: "flex",
            paddingTop: "1em",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <MUIButton
            type="click"
            variant="text"
            onClick={() => router.push(Routes.CONTACT_PAGE)}
            sx={{
              color: "black",
              fontWeight: 600,
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            Je souhaite être rappelé
          </MUIButton>
          <div style={{ width: "25%" }}>
            <Button type="submit">Valider et rechercher</Button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export const PARIS_PIN_POINT = {
  lat: 48.866667,
  lon: 2.333333,
};

export function getPassagePrice(km) {
  return (110 + km * 0.7) * 1.2;
}
const LiftRentSection = () => {
  const router = useRouter();
  const { handleLiftRent, handleMoversRent, rent } = useRent();
  const { getKmBetweenDistances } = useEstimate();

  function validate(values) {
    const errors = {};
    if (!values.startAddress)
      errors.startAddress = "Merci d'ajouter une addresse de départ";
    if (!values.startDate)
      errors.startDate = "Merci d'ajouter une date de départ";
    if (!values.duration) errors.duration = "Merci d'ajouter une durée";
    if (values.floors === null) errors.floors = "Merci d'ajouter l'étage";
    return errors;
  }

  async function handleSubmit(values) {
    const km = await getKmBetweenDistances(PARIS_PIN_POINT, {
      lat: values.startAddress.lat,
      lon: values.startAddress.lng,
    });
    handleMoversRent({
      ...rent.movers,
      present: values.nbMovingMen > 0,
      nbMovingMen: values.nbMovingMen,
      totalPrice: getMoversPrice(values.nbMovingMen, values.duration),
      km,
    });
    handleLiftRent({
      ...rent.lift,
      present: true,
      km,
      ...values,
    });
    router.push(Routes.LIFT_RENT_PAGE_SELECTION);
  }

  const formik = useFormik({
    initialValues: {
      startAddress: {},
      startDate: null,
      duration: null,
      floors: "",
      liftType: "",
      type: "lift",
      nbMovingMen: 0,
      isEntrancePresent: false,
      entranceNotTallEnough: false,
    },
    validate,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          padding: "50px 98px",
        }}
      >
        <div style={{ display: "flex", gap: "1em" }}>
          <div style={{ width: "50%" }}>
            <label>Votre adresse</label>
            <GeolocationInput
              name={"startAddress"}
              onChange={(value) => formik.setFieldValue("startAddress", value)}
              placeholder={"Adresse de départ"}
            />
            {formik.errors.startAddress && formik.touched.startAddress && (
              <span style={{ color: "red" }}>{formik.errors.startAddress}</span>
            )}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label>Etage</label>
            <FloorSelect
              label=""
              name="floors"
              value={formik.values.floors}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "1em" }}>
          <div style={{ width: "50%" }}>
            <label>Date</label>
            <DatePicker
              defaultValue={null}
              name="startDate"
              value={formik.values.startDate}
              handleChange={(newValue) => {
                formik.setFieldValue("startDate", newValue);
              }}
              fullWidth={true}
              error={formik.errors.startDate}
            />
            {formik.errors.startDate && formik.touched.startDate && (
              <span style={{ color: "red" }}>{formik.errors.startDate}</span>
            )}
          </div>
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <label>Durée de la manutention</label>
            <MUISelect
              label=""
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
            >
              <MUIMenuItem value={PASSAGE_DURATION}>Passage (1h)</MUIMenuItem>
              <MUIMenuItem value={HALF_DAY_DURATION}>
                Demi journée (4h)
              </MUIMenuItem>
              <MUIMenuItem value={FULL_DAY_DURATION}>Journée (8h)</MUIMenuItem>
            </MUISelect>
            {formik.errors.duration && formik.touched.duration && (
              <span style={{ color: "red" }}>{formik.errors.duration}</span>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1em",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: 600 }}>Nombre de déménageurs</span>
            <Counter
              minValue={0}
              value={formik.values.nbMovingMen}
              handleInc={() =>
                formik.setFieldValue(
                  "nbMovingMen",
                  formik.values.nbMovingMen + 1
                )
              }
              handleDec={() =>
                formik.setFieldValue(
                  "nbMovingMen",
                  formik.values.nbMovingMen - 1
                )
              }
            />
            <span>(L'opérateur est déjà inclus)</span>
          </div>
          <section
            style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
          >
            <FormControlLabel
              control={
                <CheckBox
                  checked={formik.values.isEntrancePresent}
                  onChange={() =>
                    formik.setFieldValue(
                      "isEntrancePresent",
                      !formik.values.isEntrancePresent
                    )
                  }
                />
              }
              label={<label>{"J'ai un passage ou une cour"}</label>}
            />
            <Fade in={formik.values.isEntrancePresent}>
              <FormControlLabel
                control={
                  <CheckBox
                    checked={formik.values.entranceNotTallEnough}
                    onChange={() =>
                      formik.setFieldValue(
                        "entranceNotTallEnough",
                        !formik.values.entranceNotTallEnough
                      )
                    }
                  />
                }
                label={
                  <label>{"Mon passage fait plus de 2,2m de hauteur"}</label>
                }
              />
            </Fade>
          </section>
        </div>
        <footer
          style={{
            display: "flex",
            paddingTop: "1em",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <MUIButton
            type="click"
            variant="text"
            onClick={() => router.push(Routes.CONTACT_PAGE)}
            sx={{
              color: "black",
              fontWeight: 600,
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            Je souhaite être rappelé
          </MUIButton>
          <div style={{ width: "25%" }}>
            <Button type="submit">Valider et rechercher</Button>
          </div>
        </footer>
      </form>
    </div>
  );
};

const VehicleRentSearchSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  function handleTabChange(e, newTab = 0) {
    if (newTab === activeTab) return;
    setActiveTab(newTab);
  }

  return (
    <section className={styles.vehicle_rent_search_section}>
      <article className={styles.vehicle_rent_search_section__container}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Tab
            label="Location d'un camion de déménagement"
            fullWidth
            className={styles.halfWidthTab}
            sx={{
              backgroundColor: activeTab === 0 ? "#F1F9F5" : "inherit",
              color: "#1B2032 !important",
            }}
          />
          <Tab
            label="Location d'un monte-meuble"
            fullWidth
            className={styles.halfWidthTab}
            sx={{
              backgroundColor: activeTab === 1 ? "#F1F9F5" : "inherit",
              color: "#1B2032 !important",
            }}
          />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <VehicleRentSearchSectionVehicle />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <LiftRentSection />
        </TabPanel>
      </article>
    </section>
  );
};

export default VehicleRentSearchSection;
