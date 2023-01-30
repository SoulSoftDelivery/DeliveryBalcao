import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import FusePageCarded from '@fuse/core/FusePageCarded';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TableContent from './tableContent';
import ConfirmAlertExcluir from '../../../utilities/confirmAlert';
import PageHeader from '../../../utilities/layout/pageHeader';
import Filters from './filters';

const Root = styled(FusePageCarded)({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-toolbar': {},
  '& .FusePageCarded-content': {},
  '& .FusePageCarded-sidebarHeader': {},
  '& .FusePageCarded-sidebarContent': {},
});

function Index() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [usuarioIdClick, setUsuarioIdClick] = useState(0);
  const [usuariosLista, setUsuariosLista] = useState([]);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
  const [buttonLoading, setButtonLoading] = useState({
    'button': '',
    'id': '',
    'loading': false,
  });

  // Filter
  const [nomeFilter, setNomeFilter] = useState('');
  const [situacaoFilter, setSituacaoFilter] = useState('');

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUsuarios = async () => {
    const data = {
      params: {
        'empresaId': user.empresaId,
        'nome': nomeFilter.trim(),
        'situacao': situacaoFilter === '' ? 0 : situacaoFilter,
        'page': page,
        'pageSize': rowsPerPage,
      },
    };

    axios
      .get('Usuario/', data)
      .then((response) => {
        setUsuariosLista(response.data.conteudo[0].results[0]);
        setTotalRows(response.data.conteudo[0].totalRows);
      })
      .catch((error) => {
        setUsuariosLista([]);
        console.log(error);
      });
  };

  // Busca as listas após a renderização da página
  useEffect(() => {
    getUsuarios();
  }, []);

  // Atualiza a lista de Usuarios quando uma paginação ou filtro é alterado
  useEffect(() => {
    getUsuarios();
  }, [nomeFilter, situacaoFilter, rowsPerPage, page]);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleNomeFilter(data) {
    setNomeFilter(data);
  }

  function handleEditar(usuarioId) {
    navigate(`/usuario/${usuarioId}`);
  }

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir(usuarioId) {
    setShowConfirmExcluir(true);
    // Guarda a data de importação selecionada
    setUsuarioIdClick(usuarioId);
  }

  async function handleExcluir() {
    // Inicia o load
    setButtonLoading({
      'button': 'Excluir',
      'id': usuarioIdClick,
      'loading': true,
    });

    await axios
      .delete(`Usuario/${usuarioIdClick}`)
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

        getUsuarios();
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
      'id': usuarioIdClick,
      'loading': false,
    });

    setUsuarioIdClick(0);
  }

  function resetFilters() {
    setNomeFilter('');
    setSituacaoFilter('');
  }

  return (
    <Root
      header={<PageHeader title="Usuarios" buttonUrl="/usuario/new" />}
      content={
        <div className="flex-auto p-24 sm:p-40">
          {/* Filtros */}
          <Filters
            nomeFilter={nomeFilter}
            handleNomeFilter={handleNomeFilter}
            situacaoFilter={situacaoFilter}
            setSituacaoFilter={setSituacaoFilter}
            resetFilters={resetFilters}
          />
          {/* Tabela */}
          <TableContent
            lista={usuariosLista}
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
            message="Excluir o item selecionado?"
            returnFunction={handleExcluir}
          />
        </div>
      }
      scroll="normal"
    />
  );
}

export default Index;
