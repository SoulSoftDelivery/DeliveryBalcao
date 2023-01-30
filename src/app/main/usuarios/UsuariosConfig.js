import { lazy } from 'react';

const Details = lazy(() => import('./details'));
const Table = lazy(() => import('./table'));

const UsuariosConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'usuarios',
      element: <Table />,
    },
    {
      path: 'usuario/:usuarioId/*',
      element: <Details />,
    },
  ],
};

export default UsuariosConfig;
