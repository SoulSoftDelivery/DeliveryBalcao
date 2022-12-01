import { lazy } from 'react';

const Cliente = lazy(() => import('./details/Cliente'));
const Clientes = lazy(() => import('./table/Clientes'));

const ClientesConfig = {
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

export default ClientesConfig;
