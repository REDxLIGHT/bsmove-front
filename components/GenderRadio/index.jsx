import React from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@material-ui/core';

import messages from './messages';
import styles from './index.module.css';

const GenderRadio = ({ value = 'female', onChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel className={styles.gender_radio_legend}>{messages.title}</FormLabel>
      <RadioGroup aria-label="gender" name="gender" value={value} onChange={onChange} className={styles.gender_radio_buttons_container}>
        <FormControlLabel value="female" control={<Radio className={styles.custom_radio} size='small' color='default' />} label={messages.gender.female} />
        <FormControlLabel value="male" control={<Radio className={styles.custom_radio} size='small' color='default' />} label={messages.gender.male} />
      </RadioGroup>
    </FormControl>
  )
}

export default GenderRadio;
