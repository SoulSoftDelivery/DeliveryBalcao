import React from 'react';
import { Controller } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function InputCheckbox({
  label,
  name,
  control,
  checked,
  setChecked,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              color="default"
              {...field}
              checked={checked}
              onClick={(e) => setChecked(e.target.checked)}
            />
          }
          label={label}
        />
      )}
    />

    // <Controller
    //   name="lembrarLogin"
    //   control={control}
    //   render={({ field }) => (
    //     <FormControl>
    //       <FormControlLabel label="Lembrar login" control={<Checkbox {...field} />} />
    //     </FormControl>
    //   )}
    // />
  );
}

export default InputCheckbox;
