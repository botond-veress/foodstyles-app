import React from 'react';

import { Session } from '@/context/session';

interface Props {
  className?: string;
}

export const LogoutButton: React.FC<Props> = ({ className }) => {
  const { logout } = Session.useContainer();

  return (
    <button {...{ className }} onClick={logout}>
      Logout
    </button>
  );
};
