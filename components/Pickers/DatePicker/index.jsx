import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import messages from './messages';

const DateInput = ({ value, handleChange }) => {
  const today = new Date();
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
      <KeyboardDatePicker
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
        onChange={handleChange} />
    </MuiPickersUtilsProvider>
  );
}

export default DateInput;