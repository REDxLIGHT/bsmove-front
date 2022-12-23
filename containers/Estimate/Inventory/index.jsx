import React from 'react';

import styles from './index.module.css';
import EstimateInventoryFirstPart from "./FirstPart";
import EstimateInventorySecondPart from "./SecondPart";


const EstimateInventoryComponent = ({ handleContinue, step = 1 }) => (
  <div className={styles.estimate_page_sections_container}>
    {
      step === 1 ? <EstimateInventoryFirstPart handleContinue={handleContinue} /> : null
    }
    {
      step === 2 ? <EstimateInventorySecondPart handleContinue={handleContinue} /> : null
    }
  </div>
)

export default EstimateInventoryComponent;
