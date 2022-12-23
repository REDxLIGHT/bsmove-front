import React from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';

const S = {};

S.Radio = styled(Radio)`
  color: ${({ theme }) => theme.colors.mainGreen};
  backround-color: ${({ theme }) => theme.colors.mainGreen};
`;

const RadioButton = ({ checked, onChange, value, name }) => (
  <S.Radio
    size="small"
    checked={checked}
    onChange={onChange}
    value={value}
    name={name}
    inputProps={{ 'aria-label': name }}
    color="default"
  />
);

export default RadioButton;
