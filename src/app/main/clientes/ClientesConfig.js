import { lazy } from 'react';

const Cliente = lazy(() => import('./clienteDetails/Cliente'));
const Clientes = lazy(() => import('./clientesTable/Clientes'));

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
