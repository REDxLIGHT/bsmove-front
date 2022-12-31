import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertContext = createContext({
  setAlert: alert => undefined,
});

// This component is declared at the top level,
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ severity: 'error', content: null });

  function handleAlertComingSoon() {
    return setAlert({
      severity: 'info',
      content: 'Cette page est en cours de construction, elle sera bientôt disponible',
    });
  }

  return (
    <AlertContext.Provider value={{
      alert, setAlert, handleAlertComingSoon,
    }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!alert.content}
        autoHideDuration={5000}
        onClose={() => setAlert(prevAlert => ({ severity: prevAlert.severity, content: null }))}
      >
        <Alert
          severity={alert.severity || undefined}
          variant="filled"
        >
          {alert.content}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
