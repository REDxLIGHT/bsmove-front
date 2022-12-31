import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const S = {};

S.CircularProgressContainer = styled.div`
  display: flex;
  padding: ${({ padding }) => padding || 'inherit'};
  justify-content: center;
  align-items: center;
  height: 100%;
`;

S.CircularProgress = styled(CircularProgress)`
  color: ${({ theme, $secondary }) => $secondary ? theme.colors.lightGrey : theme.colors.mainGreen};
`;

function LoadingComponent({ size, secondary = false, padding = '' }) {
  return (
    <S.CircularProgressContainer padding={padding}>
      <S.CircularProgress size={size} $secondary={secondary} />
    </S.CircularProgressContainer>
  );
}

export default LoadingComponent;
