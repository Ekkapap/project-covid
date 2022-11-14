import { fork, call, takeEvery } from 'redux-saga/effects';
import {
  getDeathRequest,
  GET_DEATH,
  getExcessMortalityDeathRequest,
  GET_EXCESS_MORTALITY_DEATH,
} from 'src/actions/death';

import * as api from 'src/services/api';
import { fetchEntity } from '../saga';

const getDeathRequestEntity = fetchEntity.bind(null, getDeathRequest, api.getDeathData);

function* callGetDeathAction() {
  yield call(getDeathRequestEntity, {});
}

function* watchGetDeathAction() {
  yield takeEvery(GET_DEATH.REQUEST, callGetDeathAction);
}

const getExcessMortalityDeathRequestEntity = fetchEntity.bind(
  null,
  getExcessMortalityDeathRequest,
  api.getExcessMortalityDeath,
);

function* callGetExcessMortalityDeathAction() {
  yield call(getExcessMortalityDeathRequestEntity, {});
}

function* watchGetExcessMortalityDeathRequest() {
  yield takeEvery(GET_EXCESS_MORTALITY_DEATH.REQUEST, callGetExcessMortalityDeathAction);
}

export default function* root() {
  yield fork(watchGetDeathAction);
  yield fork(watchGetExcessMortalityDeathRequest);
}
