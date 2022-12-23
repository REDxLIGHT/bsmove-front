import React from 'react';
import styled from 'styled-components';

import styles from './index.module.css';

const S = {};

S.Button = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  background-color: inherit;
`;

S.ButtonLabel = styled.div`
  color: ${({ theme, active }) => active ? theme.colors.mainGreen : theme.colors.dark};
  text-decoration: ${({ active }) => active ? 'underline' : 'none'};
  font-weigth: 600;
  transition: 0.3s;
  font-family: 'proxima-nova', sans-serif;
  font-weight: 1.25em;
`;

const VerticalTab = ({ title, active, handleTabChange, tabValue }) => (
  <div className={styles.tab_container}>
    <S.Button onClick={() => handleTabChange(tabValue)}>
      <S.ButtonLabel active={active}>{title}</S.ButtonLabel>
    </S.Button>
  </div>
)

const VerticalTabs = ({ tabs = [], active, handleTabChange }) => (
  <div className={styles.container}>
    {tabs.map(tab => (
      <VerticalTab title={tab.title} tabValue={tab.value} active={active === tab.value} handleTabChange={handleTabChange} />
    ))}
  </div>
);

export default VerticalTabs;
