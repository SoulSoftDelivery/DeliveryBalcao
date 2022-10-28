import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import axios from 'axios';
import ProductsHeader from './ProductsHeader';
import ClientesTable from './ClientesTable';
import ConfirmAlertExcluir from '../../../utilities/confirmAlert';
// import GeneralAlert from '../../../utilities/generalAlert';

function Products() {
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
  // const [alert, setAlert] = useState({
  //   'type': 'error',
  //   'message': '',
  // });

  const user = useSelector(selectUser);

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

  function handleEditar() {
    console.log("teste editar");
  }

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir(clienteId) {
    setShowConfirmExcluir(true);
    // Guarda a data de importação selecionada
    setClienteIdClick(clienteId);
  }

  function handleExcluir() {
    // Inicia o load
    setButtonLoading({
      'button': 'Excluir',
      'id': clienteIdClick,
      'loading': true,
    });

    axios
      .delete('Cliente/Delete/' + clienteIdClick)
      .then((response) => {
        if (response.data.msg) {
          // setAlert({
          //   'type': 'warning',
          //   'message': response.data.msg,
          // });

          alert(response.data.msg);
        } else {
          // setAlert({
          //   'type': 'success',
          //   'message': 'Cliente excluido com sucesso.',
          // });

          alert('Cliente excluido com sucesso.');
        }

        getClientes();
      })
      .catch((error) => {
        // setAlert({
        //   'type': 'error',
        //   'message': 'Não foi possível concluir a solicitação.',
        // });

        alert('Não foi possível concluir a solicitação.');
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
      header={<ProductsHeader searchText={searchText} setSearchText={setSearchText} />}
      content={
        <>
          {/* Alert para mensagem geral */}
          {/* {alert.message && (
            <GeneralAlert
              custom="my-4 mx-4"
              type={alert.type}
              message={alert.message}
              setAlert={setAlert}
            />
          )} */}

          <ClientesTable
            clienteList={clienteList}
            buttonLoading={buttonLoading}
            showConfirmExcluir={showConfirmExcluir}
            setShowConfirmExcluir={setShowConfirmExcluir}
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

export default Products;
