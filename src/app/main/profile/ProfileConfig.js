import { lazy } from 'react';

const Profile = lazy(() => import('./Profile'));

const ProfileConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'profile',
      element: <Profile />,
    },
  ],
};

export default ProfileConfig;
