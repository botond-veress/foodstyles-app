import React from 'react';
import classnames from 'classnames';

import { Is, IsProps, IsElement } from '@/components/Is';

export type Props<T extends IsElement> = IsProps<T> & {
  invalid?: boolean;
};

function TextInputComponent<T extends IsElement>(
  {
    // @ts-ignore
    is = 'input',
    invalid,
    className,
    ...props
  }: Props<T>,
  ref: React.Ref<any>
) {
  return (
    <Is
      {...props}
      {...{ ref, is }}
      className={classnames(
        'w-full py-2 text-primary-dark border-b focus:border-primary-medium placeholder:text-secondary-medium focus:outline-none',
        { ['border-secondary-light']: !invalid, ['border-red-500']: invalid },
        className
      )}
    />
  );
}

export const TextInput = React.forwardRef(TextInputComponent);
