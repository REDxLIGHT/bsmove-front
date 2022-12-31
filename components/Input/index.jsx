import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

const S = {};

S.Container = styled.div`
  width: 100%;
  position: relative;
  padding: ${({ error }) => !!error ? '5% 0' : 0 };
`;

S.TextField = styled(TextField)`
  height: 3rem;

  label {
    color: ${props => props.theme.colors.disabledGrey};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: ${({ type }) => type === 'password' ? '75%' : '90%'};
  }

  label.Mui-focused {
    color: ${props => props.error ? props.theme.colors.peachyPink : props.theme.colors.mainGreen} !important;
  };

  .MuiInputBase-input {
    width: ${({ initialType }) => initialType === 'password' ? '80%' : '90%'};
  }
  
  .MuiOutlinedInput-root {
    input {
      color: ${({ error, theme, initialType }) => !!error && initialType !== 'password' ? theme.colors.peachyPink : theme.colors.dark};
    }

    fieldset {
      border-color: ${props => props.error ? props.theme.colors.peachyPink : props.theme.colors.border} !important;
      border-radius: 8px;
    }

    &:hover fieldset {
      border-color: ${props => props.error ? props.theme.colors.peachyPink : props.theme.colors.mainGreen} !important;
    }

    &.Mui-focused fieldset {
      border-color: ${props => props.error ? props.theme.colors.peachyPink : props.theme.colors.mainGreen} !important;
    }

    ${props => {
      if (props.customvariant === 'filled')
        return `
          background-color: #fff;
          box-shadow: 0 1px 2px 0 rgba(69, 91, 99, 0.1);
        `;
    }}
    background-color: ${({ backgroundColor }) => backgroundColor || 'inherit'} !important;
    border-radius: 8px;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
      -webkit-transition-delay: 9999s;
  }
  width: 100%;
`;

S.VisibilityContainer = styled.span`
  position: absolute;
  right: 0;
  line-height: 3.5rem;
`;

S.ErrorContainer = styled.span`
  display: flex;
  justify-content: flex-end;
  color: rgb(255, 0, 0);
`;

const VisibilityContainer = ({ visibility, handleVisibility }) => (
  <S.VisibilityContainer>
    {
      visibility
        ? <IconButton onClick={handleVisibility} size="large"><VisibilityOffIcon fontSize='small' /></IconButton>
        : <IconButton onClick={handleVisibility} size="large"><VisibilityIcon fontSize='small' /></IconButton>
    }
  </S.VisibilityContainer>
);

const Input = ({
  value,
  fullWidth,
  name,
  type = 'text',
  variant = "outlined",
  disabled,
  placeholder,
  values,
  label,
  margin,
  error,
  helperText,
  onChange,
  onBlur,
  withoutVisibility,
  required,
  backgroundColor,
  onFocus,
}) => {
  const [visibility, setVisibility] = useState(false);

  function handleVisibility() {
    return setVisibility(prevState => !prevState);
  }

  return (
    <S.Container margin={margin} error={error}>
      <S.TextField
        required={required}
        fullWidth={fullWidth}
        id={name}
        placeholder={placeholder}
        name={name}
        initialType={type}
        type={type === 'password' && visibility ? 'text' : type}
        values={values}
        value={value}
        label={label}
        disabled={disabled}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange} // always depending on event if no "without formik", see formik
        error={!!error}
        helperText={<S.ErrorContainer>{error}</S.ErrorContainer> || helperText}
        variant={variant}
        backgroundColor={backgroundColor}
      />
      {type === 'password' && !withoutVisibility && <VisibilityContainer visibility={visibility} handleVisibility={handleVisibility} />}
    </S.Container>
  );
}

export default Input;
