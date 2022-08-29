import React from 'react';
import classnames from 'classnames';
import { CheckIcon } from '@heroicons/react/solid';

interface Props {
  checked: boolean;
  className?: string;
  onToggle(checked: boolean): void;
}

export const TodoItemCheckbox: React.FC<Props> = ({ checked, className, onToggle }) => (
  <button
    className={classnames(
      'inline-flex items-center justify-center w-5 h-5 rounded border',
      {
        ['bg-primary-medium border-primary-medium']: checked,
        ['border-secondary-light']: !checked
      },
      className
    )}
    onClick={() => onToggle(!checked)}
  >
    <CheckIcon className="w-4 h-4 text-white" />
  </button>
);
