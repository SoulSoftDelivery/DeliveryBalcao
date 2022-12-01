import react, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { showMessage } from 'app/store/fuse/messageSlice';
import { selectUser } from 'app/store/userSlice';
import FormHeader from './FormHeader';
import ConfirmAlertExcluir from '../../../utilities/confirmAlert';
import Form from './form';

const Root = styled(FusePageCarded)({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-toolbar': {},
  '& .FusePageCarded-content': {},
  '& .FusePageCarded-sidebarHeader': {},
  '& .FusePageCarded-sidebarContent': {},
});

// Validação de formulário
const schema = yup.object().shape({
  nome: yup
    .string()
    .nullable()
    .required('Digite o nome'),
  descricao: yup
    .string()
    .nullable(),
  qtd: yup
    .string()
    .nullable(),
  valor: yup
    .string()
    .nullable()
    .required('Digite o valor'),
  ativo: yup
    .bool(),
  categoriaProdutoId: yup
    .string()
    .nullable()
    .required("Selecione uma Categoria para o produto"),
  tipoMedidaId: yup
    .string()
    .nullable()
    .required("Selecione um Tipo de Medida para o produto")
});

const defaultValues = {
  id: 0,
  empresaId: 0,
  categoriaProdutoId: '',
  tipoMedidaId: '',
  nome: '',
  descricao: '',
  qtd: '',
  valor: '',
  ativo: false,
};

function Produto() {
  const [loadingSalvar, setLoadingSalvar] = useState(false);
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
  const [checked, setChecked] = useState(true);
  const [categoriaProdutoList, setCategoriaProdutoList] = useState([]);
  const [tipoMedidaList, setTipoMedidaList] = useState([]);

  const user = useSelector(selectUser);
  const routeParams = useParams();
  const dispatch = useDispatch();

  const { control, formState, setValue, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, errors, dirtyFields } = formState;

  // Função consulta lista de contatos
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

  // Função consulta lista de contatos
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

  // Busca o Produto
  const getProdutos = async (produtoId) => {
    axios
      .get('Produto/' + produtoId)
      .then((response) => {
        setValue('id', response.data.conteudo[0].id, { shouldValidate: true });
        setValue('nome', response.data.conteudo[0].nome, { shouldValidate: true });
        setValue('descricao', response.data.conteudo[0].descricao, { shouldValidate: true });
        setValue('qtd', response.data.conteudo[0].qtd, { shouldValidate: true });
        setValue('valor', response.data.conteudo[0].valor, { shouldValidate: true });
        setValue('tipoMedidaId', response.data.conteudo[0].tipoMedidaId, { shouldValidate: true });
        setValue('categoriaProdutoId', response.data.conteudo[0].categoriaProdutoId, { shouldValidate: true });
        setValue('ativo', response.data.conteudo[0].ativo, { shouldValidate: true });

        setChecked(response.data.conteudo[0].ativo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (routeParams.produtoId !== "new") {
      getProdutos(routeParams.produtoId);
    }

    setValue('empresaId', user.empresaId, { shouldValidate: true });

    getCategoriasProdutos();
    getTiposMedidas();
  }, [routeParams]);

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir() {
    setShowConfirmExcluir(true);
  }

  function handleExcluir() {
    // Inicia o load
    setLoadingExcluir(true);

    axios
      .delete('Produto/' + getValues('id'))
      .then((response) => {
        if (response.data.msg) {
          dispatch(
            showMessage({
              message: response.data.msg,
              autoHideDuration: 6000,
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
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'success',
            })
          );
        }

        resetForm();
        setChecked(false);
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: 'Não foi possível concluir a solicitação.',
            autoHideDuration: 6000,
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
    setLoadingExcluir(false);
  }

  async function onSubmit(data) {
    setLoadingSalvar(true);

    if (data.id) {
      await axios
        .patch('Produto', data)
        .then((response) => {
          dispatch(
            showMessage({
              message: 'Registro alterado com sucesso.',
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'success',
            })
          );
        })
        .catch((error) => {
          dispatch(
            showMessage({
              message: 'Não foi possível concluir a Solicitação.',
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'error',
            })
          );
          console.log(error);
        });
    } else {
      await axios
        .post('Produto', data)
        .then((response) => {
          dispatch(
            showMessage({
              message: 'Registro cadastrado com sucesso.',
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'success',
            })
          );
        })
        .catch((error) => {
          dispatch(
            showMessage({
              message: 'Não foi possível concluir a Solicitação.',
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'error',
            })
          );
          console.log(error);
        });
    }

    setLoadingSalvar(false);
  }

  function resetForm() {
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <Root
        header={
          <FormHeader
            handleExcluir={openConfirmExcluir}
            loadingLogin={loadingSalvar}
            loadingExcluir={loadingExcluir}
            getValues={getValues}
            dirtyFields={dirtyFields}
            isValid={isValid}
            reset={resetForm}
          />
        }
        content={
          <>
            <div className="flex-auto p-24 sm:p-40">
              {/* Formulária da página */}
              <Form
                categoriaProdutoList={categoriaProdutoList}
                tipoMedidaList={tipoMedidaList}
                control={control}
                errors={errors}
                checked={checked}
                setChecked={setChecked}
              />
            </div>

            {/* ConfirmAlert Excluir */}
            <ConfirmAlertExcluir
              open={showConfirmExcluir}
              setOpen={setShowConfirmExcluir}
              message="Excluir o cadastro atual?"
              returnFunction={handleExcluir}
            />
          </>
        }
        scroll="page"
      />
    </form>
  );
}

export default Produto;
