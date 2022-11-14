import { fork, call, takeEvery } from 'redux-saga/effects';
import { getVaccineRequest, GET_VACCINE } from 'src/actions/vaccine';

import * as api from 'src/services/api';
import { fetchEntity } from '../saga';

const getScreeningRequestEntity = fetchEntity.bind(null, getVaccineRequest, api.getVaccineData);

function* callGetScreeningAction() {
  yield call(getScreeningRequestEntity, {});
}

function* watchGetScreeningAction() {
  yield takeEvery(GET_VACCINE.REQUEST, callGetScreeningAction);
}

export default function* root() {
  yield fork(watchGetScreeningAction);
}
