import React, { useState } from 'react';
import MUITabs from '@mui/material/Tabs';

function Tabs({ children, ...rest }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MUITabs
      onChange={handleChange}
      value={value}
      indicatorColor="primary"
      textColor="primary"
      {...rest}
    >
      {children}
    </MUITabs>
  );
};

export default Tabs;
