import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

function InputNumber({ label, name, disabled, control, error, helperText }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id="outlined-number"
          className="mb-16 w-full"
          disabled={disabled}
          label={label}
          error={error}
          helperText={helperText}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      )}
    />
  );
}

export default InputNumber;
