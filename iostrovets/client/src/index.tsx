import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
  makeVar,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const uri = `http://${process.env.REACT_APP_API_DOMEN}/graphql`;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_API_DOMEN}/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('token'),
    },
  },
});

const retryLink = new RetryLink();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  from([errorLink, retryLink, authLink.concat(createUploadLink({ uri }))]),
);

export const currentUserVar = makeVar<any>({});

const cache = new InMemoryCache({
  typePolicies: {
    Post: {
      fields: {
        isRead: {
          read(_, { variables }) {
            const postsReadCount = JSON.parse(
              localStorage.getItem('postsReadCount') || '{}',
            );

            return Boolean(postsReadCount[variables?.id]);
          },
        },
        readCount: {
          read(_, { variables }) {
            const postsReadCount = JSON.parse(
              localStorage.getItem('postsReadCount') || '{}',
            );

            return postsReadCount[variables?.id] || 0;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri,
  cache,
  link: splitLink,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
