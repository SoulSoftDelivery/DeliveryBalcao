import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import _ from '@lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import ClienteHeader from './ClienteHeader';
import Form from './form';

/**
 * Form Validation Schema
 */
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

function Cliente(props) {
  // const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [loadingSalvar, setLoadingSalvar] = useState(false);
  const [noProduct, setNoProduct] = useState(false);

  const routeParams = useParams();

  // Busca o Cliente
  const getCliente = async (clienteId) => {
    const data = {
      params: {
        'clienteId': clienteId,
      },
    };

    axios
      .get('Cliente/Create', data)
      .then((response) => {
        // setValue('rowKey', response.data.RowKey, { shouldValidate: true });
        // setValue('contatoNome', response.data.ContatoNome, { shouldValidate: true });
        // setValue('contatoWhatsappNum', response.data.ContatoWhatsappNum, { shouldValidate: true });
        // setValue('contatoEmail', response.data.ContatoEmail, { shouldValidate: true });
        // setValue('contatoCpfCnpj', response.data.ContatoCpfCnpj, { shouldValidate: true });
        // setValue('contatoEndereco', response.data.ContatoEndereco, { shouldValidate: true });
        // setValue('contatoSexo', response.data.ContatoSexo, { shouldValidate: true });

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (routeParams.clienteId !== "new") {
      getCliente(routeParams.clienteId);
    } else {
      reset();
    }

    // setValue('partitionKey', user.partitionKey, { shouldValidate: true });
  }, [routeParams]);

  const { control, formState, setValue, handleSubmit, reset, setError, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  /**
   * Show Message if the requested products is not exists
   */
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such product!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/e-commerce/products"
          color="inherit"
        >
          Go to Products Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (product && routeParams.productId !== product.id && routeParams.productId !== 'new')
  // ) {
  //   return <FuseLoading />;
  // }

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FusePageCarded
        header={
          <ClienteHeader
            loadingSalvar={loadingSalvar}
            getValues={getValues}
            dirtyFields={dirtyFields}
            isValid={isValid}
          />
        }
        content={
          <>
            {/* Formulária da página */}
            <Form
              control={control}
              errors={errors}
            />
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </form>
  );
}

export default Cliente;
