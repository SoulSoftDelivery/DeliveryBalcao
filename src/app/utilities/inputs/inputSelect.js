import * as React from 'react';
import { Controller } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function InputSelect({ label, name, control, list, error, helperText, handleChange }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl className="mb-16 w-full">
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            {...field}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={label}
            // onChange={handleChange}
          >
            {list.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.nome}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default InputSelect;
