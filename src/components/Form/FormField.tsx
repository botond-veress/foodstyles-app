import React from 'react';
import { useField } from 'react-final-form';

import { Is, IsProps, IsElement } from '@/components/Is';
import { ValidationMessage } from '@/components/Form/ValidationMessage';

const usePropagatedHandler = <T, R>(fieldCallback: (event: T) => R, propCallback?: (event: T) => R) => {
  return React.useCallback(
    (event: T) => {
      const result = fieldCallback(event);

      if (!result || !propCallback) return result;

      return propCallback(event);
    },
    [fieldCallback, propCallback]
  );
};

type Props<T extends IsElement> = IsProps<T> & {
  className?: string;
  inputClassName?: string;
};

export function FormField<T extends IsElement>({
  name,
  type,
  validated,
  className,
  inputClassName,
  ...props
}: React.PropsWithChildren<Props<T>>) {
  const { meta, input } = useField(name, { type });

  const error = React.useMemo(() => {
    if (!validated) return undefined;

    const invalid = meta.submitError ? !!meta.submitError && !meta.dirtySinceLastSubmit : meta.invalid;

    if (!invalid) return undefined;

    const visible = !!meta.touched && invalid;

    const error = meta.error || meta.submitError;

    return {
      visible,
      message: error?.id
    };
  }, [validated, meta]);

  const onFocus = usePropagatedHandler(input.onFocus, props.onFocus);
  const onBlur = usePropagatedHandler(input.onBlur, props.onBlur);
  const onChange = usePropagatedHandler(input.onChange, props.onChange);

  return (
    <div {...{ className }}>
      <Is
        {...props}
        {...input}
        {...{ onFocus, onBlur, onChange }}
        invalid={error?.visible}
        className={inputClassName}
      />
      {!!error && <ValidationMessage {...error} className="mt-1" />}
    </div>
  );
}
