import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { getProduct, newProduct, resetProduct, selectProduct } from '../store/productSlice';
import reducer from '../store';
import ProductHeader from './ProductHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import InventoryTab from './tabs/InventoryTab';
import PricingTab from './tabs/PricingTab';
import ProductImagesTab from './tabs/ProductImagesTab';
import ShippingTab from './tabs/ShippingTab';
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
  const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (routeParams.id !== "new") {
      getCliente(routeParams.id);
    } else {
      reset();
    }

    // setValue('partitionKey', user.partitionKey, { shouldValidate: true });
  }, [routeParams]);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

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
  if (
    _.isEmpty(form) ||
    (product && routeParams.productId !== product.id && routeParams.productId !== 'new')
  ) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      header={<ProductHeader />}
      content={
        <>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64 border-b-1' }}
          >
            <Tab className="h-64" label="Basic Info" />
            <Tab className="h-64" label="Product Images" />
            <Tab className="h-64" label="Pricing" />
            <Tab className="h-64" label="Inventory" />
            <Tab className="h-64" label="Shipping" />
          </Tabs>
          <div className="p-16 sm:p-24 max-w-3xl">
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <BasicInfoTab />
            </div>

            <div className={tabValue !== 1 ? 'hidden' : ''}>
              <ProductImagesTab />
            </div>

            <div className={tabValue !== 2 ? 'hidden' : ''}>
              <PricingTab />
            </div>

            <div className={tabValue !== 3 ? 'hidden' : ''}>
              <InventoryTab />
            </div>

            <div className={tabValue !== 4 ? 'hidden' : ''}>
              <ShippingTab />
            </div>
          </div>
        </>
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Cliente;
