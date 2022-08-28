import React from 'react';
import classnames from 'classnames';

import { Is, IsProps, IsElement } from '@/components/Is';

export type Props<T extends IsElement> = IsProps<T>;

function ButtonComponent<T extends IsElement>(
  {
    // @ts-ignore
    is = 'button',
    className,
    ...props
  }: Props<T>,
  ref: React.Ref<any>
) {
  return (
    <Is
      {...props}
      {...{ ref, is }}
      className={classnames('w-full px-4 py-2 text-white bg-primary-medium rounded hover:bg-opacity-90', className)}
    />
  );
}

export const Button = React.forwardRef(ButtonComponent);
