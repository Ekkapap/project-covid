import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { SnackbarProvider } from 'notistack';
import { I18nextProvider } from 'react-i18next';
import { configureStore, history } from './store/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes';
import reportWebVitals from './reportWebVitals';
// import configureI18n from './i18n';

import i18n from './i18n';
import './index.less';
import 'antd-button-color/dist/css/style.css';

const store = configureStore();

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={3}>
          <I18nextProvider i18n={i18n}>
            <Routes />
          </I18nextProvider>
        </SnackbarProvider>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
