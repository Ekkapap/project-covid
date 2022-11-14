import { fork, call, takeEvery } from 'redux-saga/effects';
import { getScreeningRequest, GET_SCREENING } from 'src/actions/screening';

import * as api from 'src/services/api';
import { fetchEntity } from '../saga';

const getScreeningRequestEntity = fetchEntity.bind(null, getScreeningRequest, api.getScreeningData);

function* callGetScreeningAction() {
  yield call(getScreeningRequestEntity, {});
}

function* watchGetScreeningAction() {
  yield takeEvery(GET_SCREENING.REQUEST, callGetScreeningAction);
}

export default function* root() {
  yield fork(watchGetScreeningAction);
}
