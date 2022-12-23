import React from 'react';
import MUITab from '@material-ui/core/Tab';

export default function Tab({ label, children }) {
  return (
    <>
      <MUITab label={label} />
    </>
  )
}
