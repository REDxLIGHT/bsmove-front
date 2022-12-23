import React from 'react';

import styles from './index.module.css';

const EstimateSection = ({ title = '', children }) => {
  return (
    <div className={styles.estimate_section_container}>
      <div className={styles.estimate_section_component}>
        <div className={styles.estimate_section_title}>{title}</div>
        <div className={styles.estimate_section_content}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default EstimateSection;
