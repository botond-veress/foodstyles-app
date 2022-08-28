import React from 'react';
import classnames from 'classnames';
import { InformationCircleIcon } from '@heroicons/react/outline';

interface Props {
  error?: React.ReactNode;
  className?: string;
}

export function FormError({ error, className }: React.PropsWithChildren<Props>) {
  if (!error) return null;

  return (
    <div
      className={classnames('flex px-4 py-3 space-x-2 text-sm rounded-md bg-red-100 text-red-500', className)}
      role="alert"
    >
      <InformationCircleIcon className="flex-shrink-0 w-5 h-5" />
      <span>{error}</span>
    </div>
  );
}
