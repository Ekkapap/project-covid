import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { VaccineRequest } from 'src/types';

const initialState: VaccineRequest = {
  isFetching: false,
  data: [],
};

export default function screening(state = initialState, action: AnyAction): VaccineRequest {
  switch (action.type) {
    case types.GET_VACCINE.REQUEST:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case types.GET_VACCINE.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case types.GET_VACCINE.FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
      };
    default:
      return state;
  }
}
