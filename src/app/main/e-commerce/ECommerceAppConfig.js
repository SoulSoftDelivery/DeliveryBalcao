import { lazy } from 'react';

const Cliente = lazy(() => import('./product/Product'));
const Clientes = lazy(() => import('./clientesTable/Index'));

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
