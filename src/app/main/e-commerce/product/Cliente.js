import react, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { showMessage } from 'app/store/fuse/messageSlice';
import { selectUser } from 'app/store/userSlice';
import ClienteHeader from './ClienteHeader';
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
});

const defaultValues = {
  clienteId: 0,
  enderecoId: 0,
  empresaId: 0,
  nome: '',
  telefone: '',
  email: '',
  sexo: '',
  rua: '',
  quadra: '',
  lote: '',
  numero: '',
  bairro: '',
  complemento: '',
};

function Cliente() {
  const [loadingSalvar, setLoadingSalvar] = useState(false);

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
  const getCliente = async (clienteId) => {
    const data = {
      params: {
        'clienteId': clienteId,
      },
    };

    axios
      .get('Cliente/Get/' + clienteId)
      .then((response) => {
        setValue('clienteId', response.data.conteudo[0].clienteId, { shouldValidate: true });
        setValue('enderecoId', response.data.conteudo[0].enderecoId, { shouldValidate: true });
        setValue('nome', response.data.conteudo[0].nome, { shouldValidate: true });
        setValue('telefone', response.data.conteudo[0].telefone, { shouldValidate: true });
        setValue('email', response.data.conteudo[0].email, { shouldValidate: true });
        // setValue('sexo', response.data.conteudo[0].sexo, { shouldValidate: true });
        setValue('rua', response.data.conteudo[0].rua, { shouldValidate: true });
        setValue('quadra', response.data.conteudo[0].quadra, { shouldValidate: true });
        setValue('lote', response.data.conteudo[0].lote, { shouldValidate: true });
        setValue('numero', response.data.conteudo[0].numero, { shouldValidate: true });
        setValue('bairro', response.data.conteudo[0].bairro, { shouldValidate: true });
        setValue('complemento', response.data.conteudo[0].complemento, { shouldValidate: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (routeParams.clienteId !== "new") {
      getCliente(routeParams.clienteId);
    }

    setValue('empresaId', user.empresaId, { shouldValidate: true });
  }, [routeParams]);

  async function onSubmit(data) {
    setLoadingSalvar(true);

    if (data.clienteId) {
      await axios
        .patch('Cliente/Update', data)
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
              variant: 'success',
            })
          );
          console.log(error);
        });
    } else {
      await axios
        .post('Cliente/Create', data)
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
              variant: 'success',
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
          <ClienteHeader
            loadingSalvar={loadingSalvar}
            getValues={getValues}
            dirtyFields={dirtyFields}
            isValid={isValid}
            reset={resetForm}
          />
        }
        content={
          <div className="flex-auto p-24 sm:p-40">
            {/* Formulária da página */}
            <Form control={control} errors={errors} />
          </div>
        }
        scroll="page"
      />
    </form>
  );
}

export default Cliente;
