import { fork, call, takeEvery } from 'redux-saga/effects';
import { getReinfectedRequest, GET_REINFECTED } from 'src/actions/reinfected';

import * as api from 'src/services/api';
import { fetchEntity } from '../saga';

const getReinfectedRequestEntity = fetchEntity.bind(null, getReinfectedRequest, api.getReinfectedData);

function* callGetReinfectedAction() {
  yield call(getReinfectedRequestEntity, {});
}

function* watchGetReinfectedAction() {
  yield takeEvery(GET_REINFECTED.REQUEST, callGetReinfectedAction);
}

export default function* root() {
  yield fork(watchGetReinfectedAction);
}
