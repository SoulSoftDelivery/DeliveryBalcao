import react, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FusePageCarded from '@fuse/core/FusePageCarded';
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
    .required('Digite o nome'),
  telefone: yup
    .string()
    .required('Digite o número de telefone'),
  email: yup
    .string(),
  sexo: yup
    .string(),
  rua: yup
    .string()
    .required('Digite a rua'),
  quadra: yup
    .string(),
  lote: yup
    .string(),
  numero: yup
    .string(),
  bairro: yup
    .string()
    .required('Digite o bairro'),
});

const defaultValues = {
  nome: '',
  telefone: '',
  email: '',
  sexo: '',
  rua: '',
  quadra: '',
  lote: '',
  numero: '',
  bairro: '',
};

function Cliente() {
  const [loadingSalvar, setLoadingSalvar] = useState(false);

  const user = useSelector(selectUser);

  const routeParams = useParams();

  const { control, formState, setValue, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, errors, dirtyFields } = formState;

  useEffect(() => {
    if (routeParams.clienteId !== "new") {
    //   getCliente(routeParams.clienteId);
    } else {
      reset();
    }

    // setValue('partitionKey', user.partitionKey, { shouldValidate: true });
  }, [routeParams]);

  async function onSubmit(data) {
    console.log(data);
  }

  function resetForm() {
    reset();
  }

  return (
    <Root
      header={
        <ClienteHeader
          loadingSalvar={loadingSalvar}
          getValues={getValues}
          dirtyFields={dirtyFields}
          isValid={isValid}
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
  );
}

export default Cliente;
