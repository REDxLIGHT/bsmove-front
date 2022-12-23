import React, { useState } from 'react';
import { Autocomplete as MUIAutocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

import styles from './index.module.css';

const Autocomplete = ({ options = [], messages: { label, placeholder, name } = {}, handleChange = () => {} }) => {
  return (
    <>
      <MUIAutocomplete
        id={name}
        freeSolo
        fullWidth
        options={options.map(option => option.name)}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus={false}
            label={label}
            placeholder={placeholder}
            name={name}
            margin="dense"
            variant="standard"
          />
        )}
      />
    </>
  )
}

export default Autocomplete;