import React from 'react';
import classnames from 'classnames';

interface Props {
  className?: string;
}

export const Title: React.FC<React.PropsWithChildren<Props>> = ({ className, ...props }) => (
  <h1 {...props} className={classnames('text-2xl text-primary-dark font-bold', className)} />
);
