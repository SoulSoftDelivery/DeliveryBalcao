import React from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function InputSelectSexo({ label, name, control }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        // ***Validação Select Yup (Incompleta)***
        <FormControl className="mb-16 w-full">
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            {...field}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={label}
          >
            <MenuItem value="M" key="M">
              <span>Masculinho</span>
            </MenuItem>
            <MenuItem value="F" key="F">
              <span>Feminino</span>
            </MenuItem>
          </Select>
          {/* {errors.botNumero && (<FormHelperText>{errors.botNumero.message}</FormHelperText>)} */}
        </FormControl>
      )}
    />
  );
}

export default InputSelectSexo;
