import { lazy } from 'react';

const Cliente = lazy(() => import('./product/Cliente'));
const Clientes = lazy(() => import('./clientesTable/Clientes'));

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'clientes',
      element: <Clientes />,
    },
    {
      path: 'cliente/:clienteId/*',
      element: <Cliente />,
    },
  ],
};

export default ECommerceAppConfig;
