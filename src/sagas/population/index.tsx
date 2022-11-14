import { fork, call, takeEvery } from 'redux-saga/effects';
import { getPopulationAction } from 'src/actions/hospital';
import { GET_POPULATION } from 'src/actions/hospital';

import * as api from 'src/services/api';
import { fetchEntity } from '../saga';

const getPopulationEntity = fetchEntity.bind(null, getPopulationAction, api.getPOP);

function* callGetPopulationAction() {
  yield call(getPopulationEntity, {});
}

function* watchGetPopulationRequest() {
  yield takeEvery(GET_POPULATION.REQUEST, callGetPopulationAction);
}

export default function* root() {
  yield fork(watchGetPopulationRequest);
}
