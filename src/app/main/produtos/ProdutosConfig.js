import { lazy } from 'react';

const Details = lazy(() => import('./details/Produto'));
const Table = lazy(() => import('./table/Produtos'));

const ClientesConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'produtos',
      element: <Table />,
    },
    {
      path: 'produto/:produtoId/*',
      element: <Details />,
    },
  ],
};

export default ClientesConfig;
