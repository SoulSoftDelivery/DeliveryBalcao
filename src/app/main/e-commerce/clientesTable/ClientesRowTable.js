import React, { useState, useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import Icon from '@mui/material/Icon';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import LoadingButton from '@mui/lab/LoadingButton';

const ClientesRowTable = ({
  cliente,
  handleExcluir,
  handleEditar,
  buttonLoading,
}) => {
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [loadingEditar, setLoadingEditar] = useState(false);

  useEffect(() => {
    if (buttonLoading.id === cliente.id) {
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
      // onClick={() => handleEditar(cliente.id)}
    >
      <TableCell className="p-4 md:p-16" align="center" component="th" scope="row" onClick={() => handleEditar(cliente.id)}>
        {cliente.id}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(cliente.id)}>
        {cliente.nome}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(cliente.id)}>
        {cliente.telefone}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(cliente.id)}>
        {cliente.email}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(cliente.id)}>
        {(new Date(cliente.dtCadastro)).toLocaleString("pt-BR")}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(cliente.id)}>
        {cliente.ativo ? (
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
          onClick={() => handleExcluir(cliente.id)}
        >
          Excluir
        </LoadingButton>
        <LoadingButton
          className="mx-2"
          variant="contained"
          size="small"
          loading={loadingEditar}
          onClick={() => handleEditar(cliente.id)}
        >
          Editar
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};

export default ClientesRowTable;
