import React from 'react';
import classnames from 'classnames';

import { Logo } from '@/components/Logo';

interface Props {
  className?: string;
}

export const Card: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => (
  <div className={classnames('w-full min-h-screen p-8 bg-white md:min-h-0 md:rounded-md', className)}>
    <Logo className="w-10 mb-6" />

    {children}
  </div>
);
