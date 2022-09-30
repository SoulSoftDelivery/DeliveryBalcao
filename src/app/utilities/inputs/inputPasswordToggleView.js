import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

function InputPasswordToggleView({
  label,
  name,
  showSenha,
  setShowSenha,
  control,
  error,
  helperText,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          className="mb-16 w-full"
          type="password"
          label={label}
          error={error}
          helperText={helperText}
          InputProps={{
            type: showSenha ? 'text' : 'password',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowSenha(!showSenha)} size="large">
                  <Icon className="text-20" color="action">
                    {showSenha ? 'visibility' : 'visibility_off'}
                  </Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />
      )}
    />
  );
}

export default InputPasswordToggleView;
