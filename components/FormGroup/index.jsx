import React from 'react';
import Radio from '../Radio';
import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';

import styles from './index.module.css';

const FormGroup = ({ name, label, options = [], onChange, currentValue, defaultValue = 0 }) => {
  return (
    <FormControl variant="standard" component="fieldset">
      {label ? <FormLabel className={styles.radio_legend}>{label}</FormLabel> : null}
      <RadioGroup aria-label={name} name={name} value={currentValue} defaultValue={defaultValue} onChange={onChange} className={styles.radio_buttons_container}>
        {options.map((option => (
          <FormControlLabel key={option?.label} checked={currentValue === option?.value} value={option?.value} control={<Radio onlyName name={name} className={styles.custom_radio} size='small' color='default' />} label={option?.label} />
        )))}
      </RadioGroup>
    </FormControl>
  );
}

export default FormGroup;
