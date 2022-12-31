import React from 'react';
import MUICheckBox from '@mui/material/Checkbox';

const CheckBox = ({ checked, ...rest }) => (
  <MUICheckBox checked={checked} {...rest} />
);


export default CheckBox;
