import React from 'react';
import messages from "./messages";
import EstimateSection from "../section";
import Fade from "@mui/material/Fade";

import styles from './index.module.css';
import {useEstimate} from "../../../hooks/estimate";
import {METRICS} from "../../../helpers/constants";
import {formatDate} from "../../../helpers/functions";

const EstimateSummaryItem = ({ item = {} }) => {
    return (
        <div className={styles.summary_estimate_section_inventory_item}>
            <span className={styles.summary_estimate_section_inventory_item_name}>{item?.name}</span>
            <span>x{item?.count}</span>
        </div>
    )
}

const EstimateSummaryItemList = ({ itemList = [] }) => (
    <div className={styles.summary_estimate_section_inventory_container}>
        {itemList.map((item, index) => (
            item?.count >0 ? <EstimateSummaryItem item={item} key={index} /> : null
        ))}
    </div>
)


const EstimateSummaryInformationBlock = ({ label = '', content = 'test' }) => {
    return (
        <div className={styles.estimate_informations_block_container}>
            <div className={styles.estimate_informations_block_label}>{label}</div>
            <div className={styles.estimate_informations_block_content}>
                {content}
            </div>
        </div>
    )
}

const UNKNOW = 'N/A';

const EstimateSummaryComponent = () => {
    const {
        estimate: {
            details: {
                arrivalInformations,
                departureInformations,
                arrivalDateInformations: {
                    departureDate,
                    flexible,
                } = {},
            } = {},
            inventory,
            inventory: {
                mounting: {
                    extraFurnitures: {
                        items: extraFurnituresItems = [],
                        needed: extraFurnituresNeeded = false,
                    } = {},
                } = {},
                volume: {
                    size,
                } = {}
            } = {}
        } = {}
    } = useEstimate()

  return (
      <Fade in={true} timeout={500}>
          <div className={styles.sectionsContainer}>
              <EstimateSection title={messages.sections.informations.title}>
                  <div className={styles.estimate_informations_container}>
                      <EstimateSummaryInformationBlock
                          label={messages.sections.informations.blockLabel.departure}
                          content={departureInformations?.address?.placeName || UNKNOW}
                      />
                      <EstimateSummaryInformationBlock
                          label={messages.sections.informations.blockLabel.arrival}
                          content={arrivalInformations?.address?.placeName || UNKNOW}
                      />
                      <EstimateSummaryInformationBlock
                          label={messages.sections.informations.blockLabel.date}
                          content={flexible ? 'Flexible' : formatDate(departureDate, 'LLLL')}
                      />
                      <EstimateSummaryInformationBlock
                          label={messages.sections.informations.blockLabel.volume}
                          content={size && `${size}${METRICS.CUBE}` || UNKNOW}
                      />
                  </div>
              </EstimateSection>
              {
                  extraFurnituresNeeded
                  ? (
                          <EstimateSection title={messages.sections.inventory.title}>
                              <EstimateSummaryItemList itemList={extraFurnituresItems} />
                          </EstimateSection>
                      ) : null
              }
          </div>
      </Fade>
  )
}

export default EstimateSummaryComponent;
