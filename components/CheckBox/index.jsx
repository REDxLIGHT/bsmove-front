import React from 'react';
import MUICheckBox from '@material-ui/core/Checkbox';
import MUIFormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

const CustomCheckBox = withStyles({
  root: {
    color: 'rgb(56, 199, 152) !important',
    '&$checked': {
      color: 'rgb(56, 199, 152) !important',
    },
  },
  checked: {},
})((props) => <MUICheckBox color="default" {...props} />);

const CheckBox = ({ checked, ...rest }) => {
  return (
    <CustomCheckBox checked={checked} {...rest} />
  );
}

export default CheckBox;
