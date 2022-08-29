import React from 'react';
import classnames from 'classnames';
import { XIcon } from '@heroicons/react/solid';

interface Props {
  className?: string;
  onClick(): void;
}

export const TodoItemDeleteButton: React.FC<Props> = ({ className, onClick }) => (
  <button className={classnames('finline-flex items-center justify-center w-5 h-5', className)} {...{ onClick }}>
    <XIcon className="w-4 h-4 text-secondary-medium" />
  </button>
);
