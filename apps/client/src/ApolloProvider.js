import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { HttpLink } from '@apollo/client';

const link = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_API_URL,
  // uri: 'http://localhost:5000',
  // credentials: "include"
});

const customFetch = (uri, options) => {
  const { operationName } = JSON.parse(options.body);
  return fetch(`${uri}?opname=${operationName}`, options);
};

const customLink = new HttpLink({ fetch: customFetch });

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(link, customLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
