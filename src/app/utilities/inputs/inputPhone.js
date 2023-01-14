import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 0000-0000"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function InputPhone({ label, name, disabled, control, error, helperText, iconInput }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          className="mb-16 w-full"
          type="text"
          disabled={disabled}
          label={label}
          error={error}
          helperText={helperText}
          InputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  {iconInput}
                </Icon>
              </InputAdornment>
            ),
            inputComponent: TextMaskCustom,
          }}
          variant="outlined"
        />
      )}
    />
  );
}

export default InputPhone;
