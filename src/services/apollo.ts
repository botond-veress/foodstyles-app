import { Response } from 'node-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import { authorizedApi } from '@/services/network/authorized-api';

const link = new HttpLink({
  uri: `/graphql`,
  fetch: async (url, options: any = {}): Promise<any> => {
    const result = await authorizedApi.post<any>(url.toString(), options.body, options);

    // TODO
    const responseBody = typeof result === `object` ? JSON.stringify(result) : result;

    return new Response(responseBody || '', {
      status: 200,
      statusText: ''
    });
  }
});

let apolloClient: ApolloClient<any> | null = null;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: false,
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-and-network'
      },
      query: { fetchPolicy: 'cache-first' }
    }
  });
};

export const initializeApollo = (initialState = null) => {
  const client = apolloClient || createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) client.cache.restore(initialState);

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client;

  return client;
};
