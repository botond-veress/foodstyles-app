import React from 'react';
import classnames from 'classnames';

import { LogoutButton } from '@/components/LogoutButton';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => (
  <header className={classnames('fixed top-0 left-0 w-full p-4', className)}>
    <nav className="flex justify-end">
      <LogoutButton className="text-primary-dark text-sm" />
    </nav>
  </header>
);
