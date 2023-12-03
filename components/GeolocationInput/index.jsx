import { any, bool, string } from "prop-types";
import InputAsyncSelect from "../InputAsyncSelect";

const GeolocationInput = ({
  name,
  isDisabled = false,
  onChange,
  placeholder,
  initialInputValue = '',
  label = ''
}) => (
  <InputAsyncSelect
    initialInputValue={initialInputValue}
    name={name}
    isDisabled={isDisabled}
    onSelect={onChange}
    placeholder={placeholder}
    label={label}
  />
);

GeolocationInput.propTypes = {
  name: string,
  isDisabled: bool,
  placeholder: string,
  onChange: any,
  initialInputValue: string,
  label: string
};

export default GeolocationInput;
