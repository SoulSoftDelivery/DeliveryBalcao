import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

function InputPassword({ label, name, control, error, helperText }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          className="mb-24"
          type="password"
          label={label}
          error={error}
          helperText={helperText}
          variant="outlined"
          required
          fullWidth
        />
      )}
    />
  );
}

export default InputPassword;
