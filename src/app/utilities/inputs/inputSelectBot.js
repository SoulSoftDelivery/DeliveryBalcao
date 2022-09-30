import React from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function InputSelectBot({ label, name, control, listBots, handleChangeBot }) {
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
            label="Bot"
            onChange={handleChangeBot}
          >
            {listBots.map((bot) => (
              <MenuItem value={bot.botNumero} key={bot.botNumero}>
                {bot.botNumero} - {bot.nomeBot}
              </MenuItem>
            ))}
          </Select>
          {/* {errors.botNumero && (<FormHelperText>{errors.botNumero.message}</FormHelperText>)} */}
        </FormControl>
      )}
    />
  );
}

export default InputSelectBot;
