import { fork, call, takeEvery } from 'redux-saga/effects';
import { getOtherDiseaseRequest, GET_OTHER_DISEASE } from 'src/actions/other_disease';

import * as api from 'src/services/api';
import { fetchEntity } from '../saga';

const getOtherDiseaseRequestEntity = fetchEntity.bind(null, getOtherDiseaseRequest, api.getOtherDisease);

function* callGetOtherDiseaseAction() {
  yield call(getOtherDiseaseRequestEntity, {});
}

function* watchGetOtherDiseaseAction() {
  yield takeEvery(GET_OTHER_DISEASE.REQUEST, callGetOtherDiseaseAction);
}

export default function* root() {
  yield fork(watchGetOtherDiseaseAction);
}
