import React from 'react';

import { Session } from '@/context/session';

import { GuestRoutes } from '@/components/App/GuestRoutes';
import { AuthorizedRoutes } from '@/components/App/AuthorizedRoutes';

export const App: React.FC = () => {
  const { authenticated, loading } = Session.useContainer();

  if (!authenticated && loading) return null;

  if (!authenticated) return <GuestRoutes />;

  return <AuthorizedRoutes />;
};
