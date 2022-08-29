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
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  })
  .required();

export const SignUpPage: React.FC = () => {
  const { signUp } = Session.useContainer();

  const onSubmit = React.useCallback(
    (values: yup.InferType<typeof schema>) => {
      return signUp(values.name, values.email, values.password)
        .then(() => null)
        .catch(
          handleGraphQLError({
            [ErrorCode.Unauthenticated]: () => `The email and/or the password you provided is incorrect.`
          })
        );
    },
    [signUp]
  );

  return (
    <Card className="max-w-sm">
      <Title>Welcome!</Title>
      <p className="text-secondary-medium">Sign up to start using Simpledo today.</p>

      <Form {...{ schema, onSubmit }}>
        {({ submitting, submitError }) => (
          <React.Fragment>
            <div className="my-6 space-y-4">
              <FormField is={TextInput} id="name" name="name" placeholder="Full Name" autoComplete="name" validated />

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

              <Link to="/login" className="inline-block text-sm text-primary-dark underline hover:text-opacity-90">
                Do you have an account? Sign in.
              </Link>

              <div>
                <FormError error={submitError} />
              </div>

              <Button type="submit">{submitting ? 'Loading...' : 'Sign Up'}</Button>
            </div>
          </React.Fragment>
        )}
      </Form>
    </Card>
  );
};
