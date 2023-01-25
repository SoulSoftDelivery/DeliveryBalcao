import { lazy } from 'react';

const Details = lazy(() => import('./details'));
const Table = lazy(() => import('./table'));

const MesasConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'mesas',
      element: <Table />,
    },
    {
      path: 'mesa/:mesaId/*',
      element: <Details />,
    },
  ],
};

export default MesasConfig;
