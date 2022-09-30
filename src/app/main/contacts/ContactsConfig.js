import { lazy } from 'react';
import ContactView from './contact/ContactView';

const Contacts = lazy(() => import('./Contacts'));

const ContactsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'contacts',
      element: <Contacts />,
      children: [
        {
          path: ':id',
          element: <ContactView />,
        },
      ],
    },
  ],
};

export default ContactsConfig;
