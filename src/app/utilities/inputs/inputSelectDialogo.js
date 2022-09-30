import React from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function InputSelectDialogo({ label, name, control, listDialogos, handleChangeDialogo }) {
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
            label="Dialogo"
            onChange={handleChangeDialogo}
          >
            {listDialogos.map((dialogo) => (
              <MenuItem value={dialogo.numDialogo} key={dialogo.numDialogo}>
                {dialogo.numDialogo} - {dialogo.titulo}
              </MenuItem>
            ))}
          </Select>
          {/* {errors.numDialogo && (<FormHelperText>{errors.numDialogo.message}</FormHelperText>)} */}
        </FormControl>
      )}
    />
  );
}

export default InputSelectDialogo;
