import React from 'react';
import styled from 'styled-components';
 
import TextField from '@material-ui/core/TextField';
  
const S = {};

S.Container = styled.div`
  width: 100%;
  margin: ${props => (props.margin ? props.margin : '0px')};
  padding: ${({ error }) => !!error ? '8px 0' : 0 };
`;

S.TextField = styled(TextField)`
  label {
    color: ${props => props.theme.colors.disabledGrey};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  label.Mui-focused {
    color: ${props => props.error ? props.theme.colors.peachyPink : props.theme.colors.mainGreen} !important;
  };
  
  .MuiOutlinedInput-root {
    border: 1px solid ${({ theme }) => theme.colors.border};
    fieldset {
      border-color: ${props => props.error ? props.theme.colors.peachyPink : 'transparent'} !important;
      border-radius: 12px;
    }

    &:hover fieldset {
      border-color: ${props => props.error ? props.theme.colors.peachyPink : props.theme.colors.mainGreen} !important;
    }

    &.Mui-focused fieldset {
      border-color: ${props => props.error ? props.theme.colors.peachyPink : props.theme.colors.mainGreen} !important;
    }

    background-color: #fff;
    border-radius: 12px;
  }
  width: 100%;
  border-radius: 12px;
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
      -webkit-transition-delay: 9999s;
  }
`;

S.ErrorContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: rgb(255, 0, 0);
`;

const TextArea = ({
  value,
  name,
  type = 'text',
  disabled,
  label,
  margin,
  error,
  onChange,
  onBlur,
  helperText,
  rows = 4,
}) => (
  <S.Container margin={margin} error={error}>
    <S.TextField
      id={name}
      name={name}
      type={type}
      value={value}
      label={label}
      disabled={disabled}
      onChange={onChange} // always depending on event, see formik
      onBlur={onBlur}
      error={!!error}
      helperText={helperText}
      variant="outlined"
      multiline
      rows={rows}
      // helperText={<S.ErrorContainer>{error}</S.ErrorContainer> || helperText}
    />
  </S.Container>
);

export default TextArea;
