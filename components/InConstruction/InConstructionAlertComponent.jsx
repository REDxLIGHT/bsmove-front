import Routes from "../../helpers/routes";
import {useAlert} from "../../hooks/alert";
import React from "react";

const InConstructionAlertComponent = ({
  children,
  href = Routes.HOME_PAGE,
  severity = 'info',
  content = 'Cette page est en cours de construction, elle sera bientôt disponible',
}) => {
    const { setAlert } = useAlert()
    function handleCategoryClick() {
        if (href === Routes.HOME_PAGE) {
            setAlert({ severity, content })
        }
    }
    return <div onClick={handleCategoryClick}>{children}</div>
}

export default InConstructionAlertComponent;
