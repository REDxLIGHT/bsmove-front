import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import messages from './messages';
import styles from './index.module.css';

const S = {};

S.ButtonContainer = styled.div`
  margin: ${({ margin }) => margin || 'inherit'};
`;

const Counter = ({ minValue = 0, maxValue, value = 0, handleInc, handleDec, margin }) => (
  <>
    <div className="counter-component__furniture_count_container">
      <S.ButtonContainer margin={margin} className="counter-component__furniture_count_buttons_container">
        <div className="counter-component__furniture_count_button">
          <IconButton disabled={value === minValue} onClick={handleDec}>
            <RemoveIcon className="counter-component__furniture_icon_style" />
          </IconButton>
        </div>
        <div className="counter-component__furniture_count_button">
          {value}
        </div>
        <div className="counter-component__furniture_count_button">
          <IconButton disabled={maxValue} onClick={handleInc}>
            <AddIcon className="counter-component__furniture_icon_style" />
          </IconButton>
        </div>
      </S.ButtonContainer>
    </div>
    {maxValue && <div className="counter-component__furniture_max_quantity">{messages.maxQuantity}</div>}
  </>
);

export default Counter;
