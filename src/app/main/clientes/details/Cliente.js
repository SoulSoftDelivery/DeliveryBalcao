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
  telefone: yup
    .string()
    .nullable()
    .required('Digite o número de telefone'),
  email: yup
    .string()
    .email('Digite um email válido')
    .nullable(),
  sexo: yup
    .string()
    .nullable(),
  rua: yup
    .string()
    .nullable()
    .required('Digite a rua'),
  quadra: yup
    .string()
    .nullable(),
  lote: yup
    .string()
    .nullable(),
  numero: yup
    .string()
    .nullable(),
  bairro: yup
    .string()
    .nullable()
    .required('Digite o bairro'),
  complemento: yup
    .string()
    .nullable(),
  ativo: yup
    .bool(),
});

const defaultValues = {
  empresaId: 0,
  clienteId: 0,
  nome: '',
  telefone: '',
  email: '',
  sexo: '',
  clienteSituacao: 0,
  enderecoId: 0,
  uf: '',
  cidade: '',
  cep: '',
  rua: '',
  quadra: '',
  lote: '',
  numero: '',
  bairro: '',
  complemento: '',
  ativo: false,
};

function Cliente() {
  const [loadingSalvar, setLoadingSalvar] = useState(false);
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
  const [checked, setChecked] = useState(true);

  const user = useSelector(selectUser);
  const routeParams = useParams();
  const dispatch = useDispatch();

  const { control, formState, setValue, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, errors, dirtyFields } = formState;

  // Busca o Cliente
  const getClientes = async (clienteId) => {
    axios
      .get('Cliente/' + clienteId)
      .then((response) => {
        setValue('clienteId', response.data.conteudo[0].clienteId, { shouldValidate: true });
        setValue('nome', response.data.conteudo[0].nome, { shouldValidate: true });
        setValue('telefone', response.data.conteudo[0].telefone, { shouldValidate: true });
        setValue('email', response.data.conteudo[0].email, { shouldValidate: true });
        setValue('sexo', response.data.conteudo[0].sexo, { shouldValidate: true });
        setValue('clienteSituacao', response.data.conteudo[0].clienteSituacao, { shouldValidate: true });
        setValue('enderecoId', response.data.conteudo[0].enderecoId, { shouldValidate: true });
        setValue('uf', response.data.conteudo[0].cidade, { shouldValidate: true });
        setValue('cep', response.data.conteudo[0].cep, { shouldValidate: true });
        setValue('cidade', response.data.conteudo[0].cidade, { shouldValidate: true });
        setValue('rua', response.data.conteudo[0].rua, { shouldValidate: true });
        setValue('quadra', response.data.conteudo[0].quadra, { shouldValidate: true });
        setValue('lote', response.data.conteudo[0].lote, { shouldValidate: true });
        setValue('numero', response.data.conteudo[0].numero, { shouldValidate: true });
        setValue('bairro', response.data.conteudo[0].bairro, { shouldValidate: true });
        setValue('complemento', response.data.conteudo[0].complemento, { shouldValidate: true });
        setValue('ativo', response.data.conteudo[0].ativo, { shouldValidate: true });

        setChecked(response.data.conteudo[0].ativo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (routeParams.clienteId !== "new") {
      getClientes(routeParams.clienteId);
    }

    setValue('empresaId', user.empresaId, { shouldValidate: true });
  }, [routeParams]);

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir() {
    setShowConfirmExcluir(true);
  }

  function handleExcluir() {
    // Inicia o load
    setLoadingExcluir(true);

    axios
      .delete('Cliente/' + getValues('clienteId'))
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

    if (data.clienteId) {
      await axios
        .patch('Cliente', data)
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
        .post('Cliente', data)
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
                control={control}
                errors={errors}
                checked={checked}
                setChecked={setChecked}
                setValue={setValue}
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
        scroll="normal"
      />
    </form>
  );
}

export default Cliente;
