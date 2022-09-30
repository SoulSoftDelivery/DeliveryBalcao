import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';

function InputText({ label, name, disabled, control, error, helperText, iconInput }) {
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
          }}
          variant="outlined"
        />
      )}
    />
  );
}

export default InputText;
