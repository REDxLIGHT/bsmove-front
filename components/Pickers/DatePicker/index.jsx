import React from 'react';
import frLocale from "date-fns/locale/fr";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import messages from './messages';
import {TextField} from "@mui/material";

const DateInput = ({ value, handleChange }) => {
  const today = new Date();
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        placeholder='jj/mm/aaaa'
        minDate={today}
        disablePast
        maxDate={maxDate}
        autoOk
        value={value}
        format="dd/MM/yyyy"
        invalidDateMessage={messages.invalidDateMessage}
        invalidLabel={messages.invalidDateMessage}
        minDateMessage={messages.pastDate}
        maxDateMessage={messages.futureDate}
        onChange={handleChange}
        renderInput={(props) => <TextField label='date input' {...props} />}
      />
    </LocalizationProvider>
  );
}

export default DateInput;