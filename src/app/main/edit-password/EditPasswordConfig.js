import EditPassword from './EditPassword';

const EditPasswordConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'edit-password',
      element: <EditPassword />,
    },
  ],
};

export default EditPasswordConfig;
