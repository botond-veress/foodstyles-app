import React from 'react';
import { Form as OriginalForm, FormProps, FormRenderProps } from 'react-final-form';
import { FORM_ERROR, FormApi } from 'final-form';
import set from 'lodash/set';
import * as yup from 'yup';

import { errors } from './errors';

yup.setLocale(errors);

export type RenderProps<T> = FormRenderProps<T>;

type Props<S extends yup.ObjectSchema<any>> = Omit<FormProps<yup.InferType<S>>, 'onSubmit'> & {
  initialValues?: Partial<yup.InferType<S>>;
  schema?: S;
  className?: string;
  children(form: RenderProps<yup.InferType<S>>): React.ReactNode;
  onSubmit(values: yup.InferType<S>, form: FormApi): Promise<Object | null | void> | Object | null | void;
};

export function Form<S extends yup.ObjectSchema<any>>({ schema, children, className, ...rest }: Props<S>) {
  const getValue = React.useCallback((values: yup.InferType<S>) => (schema ? schema.cast(values) : values), [schema]);

  const validate = React.useCallback(
    (values: yup.InferType<S>) => {
      if (!schema) return undefined;

      return schema
        .validate(values, { abortEarly: false, stripUnknown: true })
        .then(() => null)
        .catch((error: yup.ValidationError) => {
          return error.inner.reduce((fields, error) => {
            // let's pass both the error message (which is the key to localize) and
            // the params so it can be formatted where it's displayed
            set(fields, error.path!, { id: error.message, values: error.params as any });
            return fields;
          }, {} as { [x: string]: yup.ValidationError });
        });
    },
    [schema]
  );

  const onSubmit = React.useCallback(
    (values: yup.InferType<S>, form: FormApi): Promise<Object | null> => {
      return Promise.resolve()
        .then(() => rest.onSubmit(getValue(values), form))
        .catch(() => `It looks like something went wrong.`)
        .then((result: any) => {
          if (typeof result !== 'string') return result;

          return { [FORM_ERROR]: result };
        });
    },
    [rest, getValue]
  );

  return (
    <OriginalForm
      {...rest}
      {...{ validate, onSubmit }}
      render={(form) => (
        <form {...{ className }} onSubmit={form.handleSubmit} autoComplete="off" spellCheck={false} noValidate>
          {children(form)}
        </form>
      )}
    />
  );
}
