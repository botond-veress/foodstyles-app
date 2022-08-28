import React from 'react';
import classnames from 'classnames';

interface Props {
  visible: boolean;
  message: string;
  className?: string;
}

export const ValidationMessage: React.FC<Props> = ({ visible, message, className, ...rest }) => (
  <div className={classnames('text-sm text-red-500', { hidden: !visible }, className)} role="alert" {...rest}>
    {!!message && message}
  </div>
);
