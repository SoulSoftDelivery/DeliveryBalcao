import React, { useState, useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import LoadingButton from '@mui/lab/LoadingButton';
import numeral from 'numeral';

const RowTable = ({
  produto,
  handleExcluir,
  handleEditar,
  buttonLoading,
}) => {
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [loadingEditar, setLoadingEditar] = useState(false);

  useEffect(() => {
    if (buttonLoading.id === produto.id) {
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
      // onClick={() => handleEditar(produto.id)}
    >
      <TableCell className="p-4 md:p-16" align="center" component="th" scope="row" onClick={() => handleEditar(produto.id)}>
        {produto.id}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(produto.id)}>
        {produto.nome}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(produto.id)}>
        {produto.qtd}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(produto.id)}>
        {numeral(produto.valor).format('0.00')}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(produto.id)}>
        {produto.categoriaProduto.nome}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(produto.id)}>
        {produto.tipoMedida.nome}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(produto.id)}>
        {(new Date(produto.dtCadastro)).toLocaleString("pt-BR")}
      </TableCell>

      <TableCell className="p-4 md:p-16" align="left" component="th" scope="row" onClick={() => handleEditar(produto.id)}>
        {produto.ativo ? (
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
          onClick={() => handleExcluir(produto.id)}
        >
          Excluir
        </LoadingButton>
        <LoadingButton
          className="mx-2"
          variant="contained"
          size="small"
          loading={loadingEditar}
          onClick={() => handleEditar(produto.id)}
        >
          Editar
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};

export default RowTable;
