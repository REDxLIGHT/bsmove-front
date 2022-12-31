import React from 'react';
import styled from 'styled-components';
import MUICard from '@mui/material/Card';

import styles from './index.module.css'

const S = {};

S.Card = styled(MUICard)`
  display: flex;
  flex-direction: ${({direction}) => direction};
  width: 100%;
  height: 100%;
  border-radius: 12px;
  padding: 1.5em;
  overflow: initial;
  row-gap: 1.5rem;
`;

const Card = ({
  raised = false, children, extraStyle, title,
  direction = 'column'
}) => (
  <S.Card raised={raised} direction={direction}>
    {title && <span className={styles.card_title}>{title}</span>}
    {children}
  </S.Card>
);

export default Card;
