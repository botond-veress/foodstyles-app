import React from 'react';
import classnames from 'classnames';
import * as yup from 'yup';
import { FormApi } from 'final-form';

import { useCreateTodoMutation, useDeleteTodoMutation, useListTodosQuery, useUpdateTodoMutation } from '@/hooks/api';
import { Form, FormField, FormError, handleGraphQLError } from '@/components/Form';
import { TextInput } from '@/components/Form/TextInput';
import { Button } from '@/components/Form/Button';
import { Card } from '@/components/Card';
import { LogoutButton } from '@/components/LogoutButton';
import { Title } from '@/components/Title';

import { useCompletedQueryParam } from './hooks/useCompletedParam';
import { useCompletedFilters } from './hooks/useCompletedFilters';
import { TodoList } from './TodoList';
import { EmptyMessage } from './EmptyMessage';

const schema = yup
  .object({
    title: yup.string().required()
  })
  .required();

export const TodosPage: React.FC = () => {
  const [completed, onCompletedUpdate] = useCompletedQueryParam();
  const filters = useCompletedFilters(completed, onCompletedUpdate);

  const todos = useListTodosQuery({ variables: { completed } });
  const [create] = useCreateTodoMutation({ onCompleted: () => todos.fetchMore({}) });
  const [update] = useUpdateTodoMutation({ onCompleted: () => todos.fetchMore({}) });
  const [remove] = useDeleteTodoMutation({ onCompleted: () => todos.fetchMore({}) });

  const onSubmit = React.useCallback(
    async (values: yup.InferType<typeof schema>, form: FormApi) => {
      await create({ variables: { title: values.title } }).catch(handleGraphQLError({}));

      form.reset();
      form.resetFieldState('title');
    },
    [create]
  );

  const onToggle = React.useCallback(
    async (id: string, completed: boolean) => {
      await update({ variables: { id, completed } });
    },
    [update]
  );

  const onDelete = React.useCallback(
    async (id: string) => {
      await remove({ variables: { id } });
    },
    [remove]
  );

  return (
    <Card className="flex flex-col max-w-md">
      <Title>Todo List</Title>

      <Form {...{ schema, onSubmit }}>
        {({ submitError }) => (
          <React.Fragment>
            <div className="my-6 space-y-4">
              <FormField is={TextInput} id="title" name="title" placeholder="Add a new todo" />

              <div>
                <FormError error={submitError} />
              </div>

              <Button type="submit" className="hidden">
                Add todo
              </Button>
            </div>
          </React.Fragment>
        )}
      </Form>

      <div className="flex-1">
        {todos.loading ? (
          <div>Loading...</div>
        ) : todos.data?.listTodos.length ? (
          <TodoList items={todos.data.listTodos} {...{ onToggle, onDelete }} />
        ) : (
          <EmptyMessage {...{ completed }} />
        )}
      </div>

      <footer className="sticky w-full bottom-0 pt-4 bg-white md:static md:p-0 md:mt-6">
        <div className="flex justify-between space-x-3 text-sm">
          <div className="flex -mx-3">
            <div className="hidden mx-3 text-secondary-medium font-medium md:block">Show:</div>

            {filters.map(({ name, active, update }) => (
              <button
                key={name}
                className={classnames('mx-3 text-sm', {
                  ['text-primary-dark']: active,
                  ['text-primary-medium underline']: !active
                })}
                onClick={update}
              >
                {name}
              </button>
            ))}
          </div>

          <LogoutButton className="mx-3 text-primary-medium text-sm underline md:hidden" />
        </div>
      </footer>
    </Card>
  );
};
