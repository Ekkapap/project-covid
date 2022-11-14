import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { History } from 'history';

import { default as global } from './global';
import { auth } from './auth/auth.reducer';
import { user } from './auth/user.reducer';
import { default as notify } from './notify';
import { filter } from './filter/filter.reducer';
import { default as screening } from './screening';

import { default as vaccine } from './vaccine';
import { default as ipd } from './ipd';
import { default as death } from './death';
import { default as hospital } from './hospital';
import { default as population } from './population';
import { default as status } from './status';
import { default as other_disease } from './other_disease';
import { default as reinfected } from './reinfected';
// import { i18nextReducer } from 'i18next-reducer';

const mainReducer = {
  global,
  auth,
  user,
  notify,
  filter,
  screening,
  vaccine,
  other_disease,
  population,
  ipd,
  death,
  hospital,
  status,
  reinfected,
  form: formReducer,
  i18next: {} as any,
  // i18next: i18nextReducer,
};

const rootType = combineReducers(mainReducer);

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...mainReducer,
  });

export type RootState = ReturnType<typeof rootType>;

export default rootReducer;
