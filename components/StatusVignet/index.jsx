import React from 'react';
import styled from 'styled-components';

import messages from './messages';
import styles from './index.module.css';

const S = {};

S.StatusVignet = styled.div`
  padding: ${({ padding }) => padding || 'inherit'};
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  font-weight: 600;
  width: 100%;
  text-align: center;
`;

const StatusVignet = ({ status = 'incomplete', message, padding = '0em', fontSize }) => {
  return (
   <div className={`${styles.status_vignet} ${styles[`status_vignet_${status}`]}`}>
     <S.StatusVignet padding={padding} fontSize={fontSize}>
        {message || messages.status[status || 'incomplete']}
     </S.StatusVignet>
   </div>
  )
}

export default StatusVignet;
