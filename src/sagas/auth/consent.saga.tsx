/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { fork, call, takeEvery, select } from 'redux-saga/effects';
import { setUserConsentAction } from 'src/actions/auth/auth.action';
import { SET_CONSENT } from 'src/actions';

import * as api from 'src/services/api';
import { fetchEntity } from '../saga';
import { getUser } from 'src/reducers/selectors';
import { User } from 'src/types/user';

const setUserConsentEntity = fetchEntity.bind(null, setUserConsentAction, api.updateUserConsent);

function* callSetUserConsentAction(action: any) {
  const { informConsent, user_id }: User = yield select(getUser);
  const oldInformConsent = Object.assign({}, informConsent);
  let newInformConsent = { informConsent: {} };
  let tempInFormConsent = {
    CovidCenter: {
      inform: {
        register: false,
        login: false
      }
    }
  };

  if (oldInformConsent) {

    if (oldInformConsent.CovidCenter?.inform?.register) {
      tempInFormConsent.CovidCenter.inform.register = oldInformConsent.CovidCenter?.inform?.register;
    } else {
      tempInFormConsent.CovidCenter.inform.register = action.payload.register;
    }

    if (oldInformConsent.CovidCenter?.inform?.login) {
      tempInFormConsent.CovidCenter.inform.login = oldInformConsent.CovidCenter?.inform?.login;
    } else {
      tempInFormConsent.CovidCenter.inform.login = action.payload.login;
    }

    newInformConsent.informConsent = { ...oldInformConsent, CovidCenter: tempInFormConsent.CovidCenter };

  } else {
    if (action.payload.register) {
      newInformConsent = {
        informConsent: {
          CovidCenter: {
            inform: {
              register: action.payload.register
            }
          }
        }
      };
    } else {
      newInformConsent = {
        informConsent: {
          CovidCenter: {
            inform: {
              login: action.payload.login
            }
          }
        }
      };
    }
  }
  // console.log(newInformConsent);
  yield call(setUserConsentEntity, {
    userId: user_id,
    data: newInformConsent,
  });
}

function* watchSetUserConsentRequest() {
  yield takeEvery(SET_CONSENT.REQUEST, callSetUserConsentAction);
}

export default function* root() {
  yield fork(watchSetUserConsentRequest);
}
