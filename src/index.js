import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//
import { Helmet } from 'react-helmet';
import App from 'App';
import Routes from 'pages/Routes';
//
import * as axiosClient from 'utils/api/axiosClient';
import { configureStore } from './store';

import './styles/index.scss';

const { API_URL } = process.env;

const initialState = {};
const store = configureStore(initialState);
axiosClient.init({ store, API_URL });

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Helmet defaultTitle="Home Page">
        <meta name="description" content="Project description" />
      </Helmet>
      <App>
        <Routes />
      </App>
    </BrowserRouter>
  </Provider>,
  MOUNT_NODE
);
