import { all, fork } from 'redux-saga/effects';

import login from './auth/login.saga';
import auth from './auth';
import screening from './screening';
import vaccine from './vaccine';
import ipd from './ipd';
import death from './death';
import reinfected from './reinfected';

import population from './population';
import other_disease from './other_disease';

export default function* root() {
  yield all([
    fork(auth),
    fork(login),
    fork(screening),
    fork(vaccine),
    fork(ipd),
    fork(death),
    fork(population),
    fork(other_disease),
    fork(reinfected),
  ]);
}
