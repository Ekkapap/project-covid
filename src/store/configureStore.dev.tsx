import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, PersistConfig } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import createRootReducer from 'src/reducers';
import sagas from 'src/sagas';
import { jwt } from './middleware';
import localforage from 'localforage';

const history = createBrowserHistory({
  basename: process.env.REACT_APP_BASENAME,
});

const rootReducer = createRootReducer(history);

const configureStore = (preloadedState?: any) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Jwt Middleware
  middleware.push(jwt);

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
    // predicate: (getState, action) => !action.type.includes('@@redux-form') // ปิด trace redux form
  });

  middleware.push(logger);

  const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage: localforage,
    // storage,
    // whitelist: ['s'],
    blacklist: ['form', 'patient', 'notify'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Saga Middleware
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(persistedReducer, preloadedState, enhancer);

  sagaMiddleware.run(sagas);

  return store;
};

export default { configureStore, history };
