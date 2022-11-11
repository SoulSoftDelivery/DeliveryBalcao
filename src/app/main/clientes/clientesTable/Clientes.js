import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClientesHeader from './ClientesHeader';
import ClientesTable from './ClientesTable';
import ConfirmAlertExcluir from '../../../utilities/confirmAlert';

function Clientes() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clienteIdClick, setClienteIdClick] = useState(0);
  const [clienteList, setClienteList] = useState([]);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
  const [buttonLoading, setButtonLoading] = useState({
    'button': '',
    'id': '',
    'loading': false,
  });

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Função consulta lista de contatos
  const getClientes = async () => {
    const data = {
      params: {
        'empresaId': user.empresaId,
        'searchText': searchText.trim(),
        'Page': page,
        'PageSize': rowsPerPage,
      },
    };

    axios
      .get('Cliente/List', data)
      .then((response) => {
        setClienteList(response.data.conteudo[0].results[0]);
        setTotalRows(response.data.conteudo[0].totalRows);
      })
      .catch((error) => {
        setClienteList([]);
        console.log(error);
      });
  };

  // Lista os Clientes no carregamento da página
  useEffect(() => {
    getClientes();
  }, []);

  // Lista os Clientes quando a paginação é alterada
  useEffect(() => {
    getClientes();
  }, [searchText, rowsPerPage, page]);

  function handleChangePage(event, value) {
    console.log(value);
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleEditar(clienteId) {
    navigate('/cliente/' + clienteId);
  }

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir(clienteId) {
    setShowConfirmExcluir(true);
    // Guarda a data de importação selecionada
    setClienteIdClick(clienteId);
  }

  async function handleExcluir() {
    // Inicia o load
    setButtonLoading({
      'button': 'Excluir',
      'id': clienteIdClick,
      'loading': true,
    });

    await axios
      .delete('Cliente/Delete/' + clienteIdClick)
      .then((response) => {
        if (response.data.msg) {
          dispatch(
            showMessage({
              message: response.data.msg,
              autoHideDuration: 5000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'success',
            })
          );
        } else {
          dispatch(
            showMessage({
              message: 'Registro excluido com sucesso.',
              autoHideDuration: 5000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'success',
            })
          );
        }

        getClientes();
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: 'Não foi possível concluir a solicitação.',
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        console.log(error);
      });

    // Finaliza o load
    setButtonLoading({
      'button': 'Excluir',
      'id': clienteIdClick,
      'loading': false,
    });

    setClienteIdClick(0);
  }

  return (
    <FusePageCarded
      header={<ClientesHeader searchText={searchText} setSearchText={setSearchText} />}
      content={
        <>
          {/* Tabela */}
          <ClientesTable
            clienteList={clienteList}
            buttonLoading={buttonLoading}
            handleExcluir={openConfirmExcluir}
            handleEditar={handleEditar}
            page={page}
            totalRows={totalRows}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />

          {/* ConfirmAlert Excluir */}
          <ConfirmAlertExcluir
            open={showConfirmExcluir}
            setOpen={setShowConfirmExcluir}
            message="Excluir o cliente selecionado?"
            returnFunction={handleExcluir}
          />
        </>
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Clientes;
