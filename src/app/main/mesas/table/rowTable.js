import React, { useState, useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import LoadingButton from '@mui/lab/LoadingButton';

const RowTable = ({
  mesa,
  handleExcluir,
  handleEditar,
  buttonLoading,
}) => {
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [loadingEditar, setLoadingEditar] = useState(false);

  useEffect(() => {
    if (buttonLoading.id === mesa.id) {
      if (buttonLoading.button === 'Excluir') {
        setLoadingExcluir(buttonLoading.loading);
      }

      if (buttonLoading.button === 'Editar') {
        setLoadingEditar(buttonLoading.loading);
      }
    }
  }, [buttonLoading]);

  return (
    <TableRow
      className="h-72 cursor-pointer"
      hover
      // role="checkbox"
      // aria-checked={isSelected}
      tabIndex={-1}
      // selected={isSelected}
      // onClick={() => handleEditar(mesa.id)}
    >
      <TableCell className="p-4 md:p-16" align="center" component="th" scope="row" onClick={() => handleEditar(mesa.id)}>
        {mesa.id}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(mesa.id)}>
        {mesa.numero}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(mesa.id)}>
        {(new Date(mesa.dtCadastro)).toLocaleString("pt-BR")}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(mesa.id)}>
        {mesa.ativo ? (
          <FuseSvgIcon className="text-green" size={20}>
            heroicons-outline:check-circle
          </FuseSvgIcon>
        ) : (
          <FuseSvgIcon className="text-red" size={20}>
            heroicons-outline:minus-circle
          </FuseSvgIcon>
        )}
      </TableCell>
      <TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
        <LoadingButton
          className="mx-2"
          variant="contained"
          size="small"
          color="error"
          loading={loadingExcluir}
          onClick={() => handleExcluir(mesa.id)}
        >
          Excluir
        </LoadingButton>
        <LoadingButton
          className="mx-2"
          variant="contained"
          size="small"
          loading={loadingEditar}
          onClick={() => handleEditar(mesa.id)}
        >
          Editar
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};

export default RowTable;
