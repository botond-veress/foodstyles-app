import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import 'tailwindcss/tailwind.css';

import { Session } from './context/session';
import { initializeApollo } from './services/apollo';
import { App } from './App';

const client = initializeApollo();

const root = createRoot(document.getElementById('app')!);

root.render(
  <BrowserRouter>
    <ApolloProvider {...{ client }}>
      <Session.Provider>
        <App />
      </Session.Provider>
    </ApolloProvider>
  </BrowserRouter>
);
