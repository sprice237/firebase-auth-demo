import React, { useMemo } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import type { CmpWithChildren } from '@sprice237/firebase-auth-demo/utils';

export const GqlProvider: CmpWithChildren<{ token?: string }> = ({ token, children }) => {
  const client = useMemo(() => {
    const cache = new InMemoryCache();

    const httpLink = createHttpLink({
      uri: 'http://localhost:8080/graphql',
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    const link = authLink.concat(httpLink);

    const client = new ApolloClient({
      cache,
      link,
    });

    return client;
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
