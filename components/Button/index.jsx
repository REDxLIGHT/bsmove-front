import React from 'react';
import styled from 'styled-components';
import MUIButton from '@material-ui/core/Button';
import LoadingComponent from '../LoadingComponent';

const S = {};

S.Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 4rem;
`;

S.Button = styled(MUIButton)`
  color: ${({ theme, disabled, $outlined, $color }) => !disabled
    ? ($outlined ? ($color || theme.colors.mainGreen) : theme.colors.lightGrey)
    : theme.colors.grey};
  background-color: ${({ theme, disabled, $outlined, $backgroundColor }) => !disabled
    ? ($outlined ? ($backgroundColor || 'transparent') : ($backgroundColor || theme.colors.mainGreen))
    : theme.colors.disabledGrey};
  &:hover {
    background-color: ${({ theme, $outlined, $backgroundColor }) => $outlined ? ($backgroundColor || 'transparent') : theme.colors.mainGreen};
  }
  border-radius: 8px;
  height: ${({ height }) => height || '3rem'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  max-height: 3rem;
  border: ${({ theme, $color, disabled, $outlined }) => !disabled ? `1px solid ${$outlined ? ($color || theme.colors.mainGreen) : 'none'}` : theme.colors.grey};
`;

S.ButtonLabel = styled.span`
  font-size: ${({ fontSize }) => fontSize || '1em'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: none;
  width: 100%;
  padding: ${({ paddingLabel }) => paddingLabel || '0.5em'};
  margin: ${({ marginLabel }) => marginLabel || 0};
  color: ${({ theme, disabled, $outlined, $color }) => !disabled
  ? ($outlined ? ($color || theme.colors.mainGreen) : theme.colors.lightGrey)
  : theme.colors.grey};
`;

function Button({ type, onClick, loading = false, outlined, disabled = false, fullWidth = true, children, ...rest }) {
  return (
    <S.Container>
      <S.Button type={type} onClick={onClick} disableFocusRipple $outlined={outlined} disabled={disabled} fullWidth={fullWidth} {...rest}>
        {loading ?
          <LoadingComponent secondary />
          : <S.ButtonLabel $outlined={outlined} disabled={disabled} {...rest}>{children}</S.ButtonLabel>
        }
      </S.Button>
    </S.Container>
  )
}

export default Button;
