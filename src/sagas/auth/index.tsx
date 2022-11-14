import { fork } from 'redux-saga/effects';
import consent from './consent.saga';

export default function* root() {
  yield fork(consent);
}
