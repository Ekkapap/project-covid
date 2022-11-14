import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { SubmitStatus } from 'src/types/global';

const initialData: SubmitStatus = {
  isSubmitting: false,
  isSucceed: false,
  isFailure: false,
};

export default function set_user_consent(state = initialData, action: AnyAction): SubmitStatus {
  switch (action.type) {
    case types.SET_CONSENT.REQUEST:
      return {
        ...state,
        isSubmitting: true,
        isSucceed: false,
        isFailure: false,
      };
    case types.SET_CONSENT.SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
        isSucceed: true,
        isFailure: false,
      };
    }
    case types.SET_CONSENT.FAILURE:
      return {
        ...state,
        isSubmitting: false,
        isSucceed: false,
        isFailure: true,
      };
    case types.SET_CONSENT.CLEAR:
      return initialData;
    default:
      return state;
  }
}
