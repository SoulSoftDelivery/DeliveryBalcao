import { lazy } from 'react';

const Details = lazy(() => import('./details'));
const Table = lazy(() => import('./table'));

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
