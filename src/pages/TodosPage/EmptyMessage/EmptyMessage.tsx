import React from 'react';

interface Props {
  completed?: boolean;
}

export const EmptyMessage: React.FC<Props> = ({ completed }) => {
  if (completed === undefined) return <React.Fragment>No todos were found.</React.Fragment>;
  if (completed) return <React.Fragment>You have no completed todos.</React.Fragment>;
  return <React.Fragment>All your todos are completed.</React.Fragment>;
};
