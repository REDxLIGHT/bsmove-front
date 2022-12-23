import {useEstimate} from "../../../../hooks/estimate";
import {Fade, FormControlLabel} from "@material-ui/core";
import styles from "../index.module.css";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {inventoryHeavyObjectsFloors, inventoryHeavyObjectsOptions, inventoryVolumeKnownOptions} from "../constants";
import Routes from "../../../../helpers/routes";
import messages from "../messages";
import {isObjectEmpty} from "../../../../helpers/functions";
import EstimateSection from "../../section";
import FormGroup from "../../../../components/FormGroup";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import CheckBox from "../../../../components/CheckBox";
import Select from "../../../../components/Select";
import {METRICS} from "../../../../helpers/constants";

const VolumeEstimateSection = ({ inventory, addToEstimateInventoryByKey, handleContinue }) => {
    const router = useRouter();
    const [currentRadioValue, setCurrentRadioValue] = useState(inventoryVolumeKnownOptions[0].value);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({
        size: false,
    })
    const [values, setValues] = useState({
        volumeKnown: '',
        size: '',
    });

    function handleVolumeRedirection() {
        return router.push(Routes.VOLUME_CALCULATOR_PAGE);
    }

    function handleRadioChange(event) {
        if (event.target.value === currentRadioValue) return ;
        setCurrentRadioValue(event.target.value);
        addToEstimateInventoryByKey('volume', { [event.target.name]: event.target.value === inventoryVolumeKnownOptions[0].value });
    }

    function handleChange(event) {
        if (isNaN(event.target.value)) return ;
        if (touched.size && !event.target.value) setErrors({ size: messages.sections.volume.input.errors.empty })
        else if (touched.size && event.target.value) setErrors({});
        addToEstimateInventoryByKey('volume', { [event.target.name]: event.target.value });
    }

    useEffect(() => {
        setValues(inventory?.volume);
        setCurrentRadioValue(inventory?.volume?.volumeKnown ? inventoryVolumeKnownOptions[0].value : inventoryVolumeKnownOptions[1].value)
    }, [inventory])

    useEffect(() => {
        handleContinue(
            isObjectEmpty(errors)
            && currentRadioValue === inventoryVolumeKnownOptions[0].value
            && (touched.size || inventory?.volume?.size)
        )
    }, [errors, currentRadioValue]);

    return (
        <EstimateSection title={messages.sections.volume.title}>
            <div className={styles.estimate_inventory_volume_section_subtitle}>
                {messages.sections.volume.subtitle}
            </div>
            <div>
                <FormGroup
                    name={messages.radio.volumeKnown.name}
                    label=''
                    defaultValue={inventoryVolumeKnownOptions[0].value}
                    options={inventoryVolumeKnownOptions}
                    currentValue={currentRadioValue}
                    onChange={handleRadioChange}
                />
            </div>
            <div className={styles.estimate_inventory_volume_section_action}>
                {
                    inventory?.volume?.volumeKnown
                        ? (
                            <div className={styles.estimate_inventory_volume_section_action_volume_known}>
                                <Input
                                    label={messages.sections.volume.input.label}
                                    placeholder={messages.sections.volume.input.placeholder}
                                    error={touched.size && errors.size}
                                    name={messages.sections.volume.input.name}
                                    values={values?.size}
                                    value={values?.size}
                                    onChange={handleChange}
                                    onFocus={() => setTouched({ size: true })}
                                    // onBlur={formik.handleBlur}
                                    required
                                    fullWidth
                                    type='text'
                                />
                                <span>{METRICS.CUBE}</span>
                            </div>
                        ) : (
                            <Button onClick={handleVolumeRedirection}>
                                {messages.sections.volume.button.label}
                            </Button>
                        )
                }
            </div>
        </EstimateSection>
    )
}
const HeavyItemsChecklist = ({ inventory, addToEstimateInventoryByKey, items, setItems, }) => {
    function handleCheckboxChange(event) {
        setItems(previousItems => ({ ...previousItems, [event.target.name]: { ...previousItems[event.target.name], present: !inventory?.heavyObjects?.items?.[event.target.name]?.present }}))
        addToEstimateInventoryByKey('heavyObjects', {
            items: {
                ...inventory?.heavyObjects?.items,
                [event.target.name]: {
                    ...inventory?.heavyObjects?.items?.[event.target.name],
                    present: !inventory?.heavyObjects?.items?.[event.target.name]?.present,
                }
            },
        })
    }

    function handleInputChange(event) {
        addToEstimateInventoryByKey('heavyObjects', {
            items: {
                ...inventory?.heavyObjects?.items,
                other: {
                    ...inventory?.heavyObjects?.items?.other,
                    item: {
                        ...inventory?.heavyObjects?.items?.other?.item,
                        value: event.target.value,
                    },
                }
            },
        })
    }

    function handleSelectChange(event) {
        setItems(previousItems => ({ ...previousItems, [event.target.name]: { ...previousItems[event.target.name], floors: event.target.value }}))
        addToEstimateInventoryByKey('heavyObjects', {
            items: {
                ...inventory?.heavyObjects?.items,
                [event.target.name]: {
                    ...inventory?.heavyObjects?.items?.[event.target.name],
                    floors: event.target.value
                }
            },
        })
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
                <div>{messages.sections.heavyObjects.items.piano.description}</div>
                <Select
                    label={messages.select.label}
                    name={messages.select.piano.name}
                    onChange={handleSelectChange}
                    value={inventory?.heavyObjects?.items?.piano?.floors}
                    options={inventoryHeavyObjectsFloors}
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
                <div>{messages.sections.heavyObjects.items.piano.description}</div>
                <Select
                    label={messages.select.label}
                    name={messages.select.fridge.name}
                    onChange={handleSelectChange}
                    value={inventory?.heavyObjects?.items?.fridge?.floors}
                    options={inventoryHeavyObjectsFloors}
                />
            </div>
            <div className={styles.inventory_heavy_objects_section}>
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
                />
                <Select
                    label={messages.select.label}
                    name={messages.select.other.name}
                    onChange={handleSelectChange}
                    value={items?.other?.floors}
                    options={inventoryHeavyObjectsFloors}
                />
            </div>
        </div>
    )
}

const HeavyObjectsSection = ({ inventory, addToEstimateInventoryByKey }) => {
    const [currentRadioValue, setCurrentRadioValue] = useState(inventory?.heavyObjects?.heavyObjects ? 'yes' : 'no');
    const [items, setItems] = useState({
        piano: inventory?.heavyObjects?.items?.piano,
        fridge: inventory?.heavyObjects?.items?.fridge,
        other: inventory?.heavyObjects?.items?.other,
    })

    // REGLER PROBLEME ETAGES

    function handleRadioChange(event) {
        if (event.target.value === currentRadioValue) return ;
        setCurrentRadioValue(event.target.value);
        addToEstimateInventoryByKey('heavyObjects', { [event.target.name]: event.target.value === inventoryHeavyObjectsOptions[1].value });
    }

    useEffect(() => {
        addToEstimateInventoryByKey('heavyObjects', { items: currentRadioValue === 'yes' ? items : {} });
    }, [currentRadioValue])

    useEffect(() => {
        if (currentRadioValue === 'yes') {
            setItems(inventory?.heavyObjects?.items)
        }
    }, [inventory])

    return (
        <EstimateSection title={messages.sections.heavyObjects.title}>
            <div>
                <FormGroup
                    name={messages.radio.heavyObjects.name}
                    label=''
                    defaultValue={inventoryHeavyObjectsOptions[0].value}
                    options={inventoryHeavyObjectsOptions}
                    currentValue={currentRadioValue}
                    onChange={handleRadioChange}
                />
            </div>
            {
                currentRadioValue === 'yes' ? (
                    <HeavyItemsChecklist
                        items={items}
                        setItems={setItems}
                        inventory={inventory}
                        addToEstimateInventoryByKey={addToEstimateInventoryByKey}
                    />
                ) : null
            }
        </EstimateSection>
    )
}

const EstimateInventoryFirstPart = ({ handleContinue }) => {
    const { estimate: { inventory = {}}, addToEstimateInventoryByKey } = useEstimate();
    return (
        <Fade timeout={500} in={true}>
            <div className={styles.estimate_page_inventory_container}>
                <VolumeEstimateSection inventory={inventory} addToEstimateInventoryByKey={addToEstimateInventoryByKey} handleContinue={handleContinue} />
                <HeavyObjectsSection inventory={inventory} addToEstimateInventoryByKey={addToEstimateInventoryByKey} />
            </div>
        </Fade>
    )
}

export default EstimateInventoryFirstPart