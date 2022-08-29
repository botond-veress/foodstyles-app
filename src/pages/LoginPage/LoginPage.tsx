import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { Session } from '@/context/session';

import { Card } from '@/components/Card';
import { Title } from '@/components/Title';
import { Form, FormField, FormError, handleGraphQLError, ErrorCode } from '@/components/Form';
import { TextInput } from '@/components/Form/TextInput';
import { Button } from '@/components/Form/Button';

const schema = yup
  .object({
    email: yup.string().email().required(),
    // We don't want to validate the password length at
    // login, maybe users who signed up in the past had
    // different validation rules that would fail now.
    password: yup.string().required()
  })
  .required();

export const LoginPage: React.FC = () => {
  const { login } = Session.useContainer();

  const onSubmit = React.useCallback(
    (values: yup.InferType<typeof schema>) => {
      return login(values.email, values.password)
        .then(() => null)
        .catch(
          handleGraphQLError({
            [ErrorCode.Unauthenticated]: () => `The email and/or the password you provided is incorrect.`
          })
        );
    },
    [login]
  );

  return (
    <Card className="max-w-sm">
      <Title>Welcome back!</Title>
      <p className="text-secondary-medium">Log in to continue.</p>

      <Form {...{ schema, onSubmit }}>
        {({ submitting, submitError }) => (
          <React.Fragment>
            <div className="my-6 space-y-4">
              <FormField is={TextInput} id="email" name="email" placeholder="Email" autoComplete="email" validated />

              <FormField
                is={TextInput}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="password"
                validated
              />

              <Link to="/sign-up" className="inline-block text-sm text-primary-dark underline hover:text-opacity-90">
                Don&apos;t have an account? Sign up.
              </Link>

              <div>
                <FormError error={submitError} />
              </div>

              <Button type="submit">{submitting ? 'Loading...' : 'Log In'}</Button>
            </div>
          </React.Fragment>
        )}
      </Form>
    </Card>
  );
};
