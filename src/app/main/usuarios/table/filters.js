import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import useDebounce from 'src/app/utilities/debounce/useDebounce';

const Filters = ({
  nomeFilter,
  handleNomeFilter,
  situacaoFilter,
  setSituacaoFilter,
  resetFilters,
}) => {
  const [displayValue, setDisplayValue] = useState(nomeFilter);
  const debouncedChange = useDebounce(handleNomeFilter, 500);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <div className="mb-32">
      <div className="grid grid-col md:grid-cols-3 md:gap-3">
        <div className="mb-6">
          <TextField
            className="w-full"
            id="nomeFilter"
            label="Nome"
            variant="outlined"
            value={displayValue}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <TextField
            className="w-full"
            id="outlined-select-currency"
            variant="outlined"
            select
            label="Situação"
            value={situacaoFilter}
            onChange={(e) => setSituacaoFilter(e.target.value)}
          >
            <MenuItem key={0} value={0}>
              Todos
            </MenuItem>
            <MenuItem key={1} value={1}>
              Ativo
            </MenuItem>
            <MenuItem key={2} value={2}>
              Inativo
            </MenuItem>
          </TextField>
        </div>

        <div className="mb-6">
          <Button variant="contained" className="md:ml-8 mt-6" onClick={resetFilters}>
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
