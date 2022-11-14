import { fork, call, takeEvery } from 'redux-saga/effects';
import { getIpdRequest, GET_IPD } from 'src/actions/ipd';

import * as api from 'src/services/api';
import { fetchEntity } from '../saga';

const getIpdRequestEntity = fetchEntity.bind(null, getIpdRequest, api.getIpdData);

function* callGetIpdAction() {
  yield call(getIpdRequestEntity, {});
}

function* watchGetIpdAction() {
  yield takeEvery(GET_IPD.REQUEST, callGetIpdAction);
}

export default function* root() {
  yield fork(watchGetIpdAction);
}
