import React from 'react';

import Button from '../../../../components/Button';
import { Subtitle } from '../../../../components/Texts'
import { isObjectEmpty } from '../../../../helpers/functions';

import styles from './index.module.css';

const DashboardContainerHeader = ({
  title = 'BSMOVE', withAction = false, actions = {},
}) => {
  return (
    <div className={styles.dashboard_container_header_wrapper}>
      <Subtitle>{title}</Subtitle>
      {withAction && !isObjectEmpty(actions) && (
        <div class>
          <Button outlined={actions?.outlined} $color={actions?.color || 'rgba(15, 23, 42, 1)'} onClick={actions?.onClick}>
            {actions?.buttonChildren}
          </Button>
        </div>
      )}
    </div>
  )
}

export default DashboardContainerHeader;
