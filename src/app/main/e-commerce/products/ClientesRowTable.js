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
      // onClick={(event) => handleClick(n)}
    >
      <TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
        {cliente.id}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row">
        {cliente.nome}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row">
        {cliente.telefone}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row">
        {cliente.email}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row">
        {(new Date(cliente.dtCadastro)).toLocaleString("pt-BR")}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row">
        {cliente.situacao === "A" ? (
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
          loading={loadingExcluir}
          onClick={() => handleEditar(cliente.id)}
        >
          Editar
        </LoadingButton>
      </TableCell>
    </TableRow>
    // <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    //   <TableCell component="th" scope="row">
    //     {cliente.enviado === true && (<Icon>check</Icon>)}
    //   </TableCell>
    //   <TableCell component="th" scope="row">
    //     {cliente.dataCadastroBR}
    //   </TableCell>
    //   <TableCell>{cliente.totalRegistro}</TableCell>
    //   <TableCell>{cliente.totalSucesso == null ? "--" : cliente.totalSucesso}</TableCell>
    //   <TableCell>{cliente.totalFalha == null ? "--" : cliente.totalFalha}</TableCell>
    //   <TableCell>
    //     <Stack spacing={2} direction="row">
    //       <LoadingButton
    //         variant="contained"
    //         size="small"
    //         color="error"
    //         loading={loadingExcluir}
    //         onClick={() => handleExcluir(cliente.bloco)}
    //       >
    //         Excluir
    //       </LoadingButton>
    //       <LoadingButton
    //         variant="contained"
    //         size="small"
    //         loading={loadingDisparar}
    //         onClick={() => handleDisparar(cliente.bloco)}
    //       >
    //         Disparar
    //       </LoadingButton>
    //       <LoadingButton
    //         variant="contained"
    //         size="small"
    //         color="success"
    //         loading={loadingExportar}
    //         onClick={() => handleExportar(cliente.bloco)}
    //       >
    //         Exportar
    //       </LoadingButton>
    //       <LoadingButton
    //         variant="contained"
    //         size="small"
    //         loading={loadingNovoBlocoFalhas}
    //         onClick={() => handleNovoBlocoFalhas(cliente.bloco)}
    //       >
    //         Novo bloco falhas
    //       </LoadingButton>
    //     </Stack>
    //   </TableCell>
    // </TableRow>
  );
};

export default ClientesRowTable;
