import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const Filters = ({
  categoriaProdutoList,
  tipoMedidaList,
  nomeFilter,
  setNomeFilter,
  categoriaIdFilter,
  setCategoriaIdFilter,
  tipoMedidaIdFilter,
  setTipoMedidaIdFilter,
  situacaoFilter,
  setSituacaoFilter,
  resetFilters,
}) => {
  return (
    <div className="mb-32">
      <div className="grid grid-col md:grid-cols-3 md:gap-3">
        <div className="mb-6">
          <TextField
            className="w-full"
            id="nomeFilter"
            label="Nome"
            variant="outlined"
            value={nomeFilter}
            onChange={(e) => setNomeFilter(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <TextField
            className="w-full"
            id="outlined-select-currency"
            variant="outlined"
            select
            label="Categoria"
            value={categoriaIdFilter}
            onChange={(e) => setCategoriaIdFilter(e.target.value)}
          >
            <MenuItem key={0} value={0}>
              Todos
            </MenuItem>
            {categoriaProdutoList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.nome}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="mb-6">
          <TextField
            className="w-full"
            id="outlined-select-currency"
            variant="outlined"
            select
            label="Tipo Medida"
            value={tipoMedidaIdFilter}
            onChange={(e) => setTipoMedidaIdFilter(e.target.value)}
          >
            <MenuItem key={0} value={0}>
              Todos
            </MenuItem>
            {tipoMedidaList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.nome}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div className="grid grid-col md:grid-cols-4 md:gap-4">
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
