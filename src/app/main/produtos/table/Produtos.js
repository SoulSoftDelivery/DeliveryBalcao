import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import FusePageCarded from '@fuse/core/FusePageCarded';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TableContent from './TableContent';
import ConfirmAlertExcluir from '../../../utilities/confirmAlert';
import PageHeader from '../../../utilities/layout/pageHeader';
import Filters from './Filters';

const Root = styled(FusePageCarded)({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-toolbar': {},
  '& .FusePageCarded-content': {},
  '& .FusePageCarded-sidebarHeader': {},
  '& .FusePageCarded-sidebarContent': {},
});

function Produtos() {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [produtoIdClick, setProdutoIdClick] = useState(0);
  const [produtoList, setProdutoList] = useState([]);
  const [categoriaProdutoList, setCategoriaProdutoList] = useState([]);
  const [tipoMedidaList, setTipoMedidaList] = useState([]);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
  const [buttonLoading, setButtonLoading] = useState({
    'button': '',
    'id': '',
    'loading': false,
  });

  // Filter
  const [nomeFilter, setNomeFilter] = useState('');
  const [categoriaIdFilter, setCategoriaIdFilter] = useState('');
  const [tipoMedidaIdFilter, setTipoMedidaIdFilter] = useState('');
  const [situacaoFilter, setSituacaoFilter] = useState('');

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCategoriasProdutos = async () => {
    axios
      .get('CategoriaProduto')
      .then((response) => {
        setCategoriaProdutoList(response.data.conteudo[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTiposMedidas = async () => {
    axios
      .get('TipoMedida')
      .then((response) => {
        setTipoMedidaList(response.data.conteudo[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProdutos = async () => {
    const data = {
      params: {
        'empresaId': user.empresaId,
        'nome': nomeFilter.trim(),
        'categoriaProdutoId': categoriaIdFilter === '' ? 0 : categoriaIdFilter,
        'tipoMedidaId': tipoMedidaIdFilter === '' ? 0 : tipoMedidaIdFilter,
        'situacao': situacaoFilter === '' ? 0 : situacaoFilter,
        'page': page,
        'pageSize': rowsPerPage,
      },
    };

    axios
      .get('Produto', data)
      .then((response) => {
        setProdutoList(response.data.conteudo[0].results[0]);
        setTotalRows(response.data.conteudo[0].totalRows);
      })
      .catch((error) => {
        setProdutoList([]);
        console.log(error);
      });
  };

  // Busca as listas após a renderização da página
  useEffect(() => {
    getCategoriasProdutos();
    getTiposMedidas();
    getProdutos();
  }, []);

  // Atualiza a lista de Clientes quando uma paginação ou filtro é alterado
  useEffect(() => {
    getProdutos();
  }, [nomeFilter, categoriaIdFilter, tipoMedidaIdFilter, situacaoFilter, rowsPerPage, page]);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleNomeFilter(data) {
    setNomeFilter(data);
  }

  function handleEditar(produtoId) {
    navigate('/produto/' + produtoId);
  }

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir(produtoId) {
    setShowConfirmExcluir(true);
    // Guarda a data de importação selecionada
    setProdutoIdClick(produtoId);
  }

  async function handleExcluir() {
    // Inicia o load
    setButtonLoading({
      'button': 'Excluir',
      'id': produtoIdClick,
      'loading': true,
    });

    await axios
      .delete('Produto/' + produtoIdClick)
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

        getProdutos();
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
      'id': produtoIdClick,
      'loading': false,
    });

    setProdutoIdClick(0);
  }

  function resetFilters() {
    setNomeFilter('');
    setCategoriaIdFilter('');
    setTipoMedidaIdFilter('');
    setSituacaoFilter('');
  }

  return (
    <Root
      header={<PageHeader title="Produtos" buttonUrl="/produto/new" />}
      content={
        <div className="flex-auto p-24 sm:p-40">
          {/* Filtros */}
          <Filters
            categoriaProdutoList={categoriaProdutoList}
            tipoMedidaList={tipoMedidaList}
            nomeFilter={nomeFilter}
            handleNomeFilter={handleNomeFilter}
            categoriaIdFilter={categoriaIdFilter}
            setCategoriaIdFilter={setCategoriaIdFilter}
            tipoMedidaIdFilter={tipoMedidaIdFilter}
            setTipoMedidaIdFilter={setTipoMedidaIdFilter}
            situacaoFilter={situacaoFilter}
            setSituacaoFilter={setSituacaoFilter}
            resetFilters={resetFilters}
          />
          {/* Tabela */}
          <TableContent
            produtoList={produtoList}
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

export default Produtos;
