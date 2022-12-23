import React, { useEffect, useRef } from 'react';
import { FormControl, InputLabel, MenuItem, Select as MUISelect } from '@material-ui/core';
import styles from './index.module.css'

const Select = ({ label = 'select', name = 'select', value, onChange, options = [] }) => {

  return (
    <FormControl variant="filled" className={styles.select_form_control_container}>
      <InputLabel htmlFor={`filled-${label}-native-simple`}>{label}</InputLabel>
      <MUISelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={onChange}
        inputProps={{
          id: `filled-${label}-native-simple`,
          name,
          className: styles.select_input_root,
        }}
      >
        {options.map(option => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  )
}

export default Select;