import { ApolloError } from '@apollo/client';

export enum ErrorCode {
  Unauthenticated = 'UNAUTHENTICATED'
}

export type ErrorHandler = (message: string) => string;

export interface DefaultHandler {
  fallback?: ErrorHandler;
}

export type ErrorCodeHandler = {
  [x in ErrorCode]?: ErrorHandler;
};

const fallbackHandler: ErrorHandler = (message) => message;

export const handleGraphQLError = ({ fallback = fallbackHandler, ...map }: DefaultHandler & ErrorCodeHandler) => {
  const handlers = Object.entries(map);

  return (error: Error) => {
    if (!(error instanceof ApolloError)) return fallback(error.message);

    for (const [code, handler] of handlers) {
      const graphqlError = error.graphQLErrors.find((error) => error.extensions.code === code);

      if (!graphqlError) continue;

      return handler(graphqlError.message);
    }

    return fallback(error.message);
  };
};
