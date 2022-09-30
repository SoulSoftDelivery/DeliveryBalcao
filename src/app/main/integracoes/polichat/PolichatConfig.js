import Polichat from './Polichat';

const PolichatConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'integracoes/polichat',
      element: <Polichat />,
    },
  ],
};

export default PolichatConfig;
