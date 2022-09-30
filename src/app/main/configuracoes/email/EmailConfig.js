import Email from './Email';

const EmailConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'configuracoes/email',
      element: <Email />,
    },
  ],
};

export default EmailConfig;
