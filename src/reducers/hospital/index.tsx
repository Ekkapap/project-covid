import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { HospitalRequest } from 'src/types';

const initialState: HospitalRequest = {
  isFetching: false,
  data: [],
};

export default function screening(state = initialState, action: AnyAction): HospitalRequest {
  switch (action.type) {
    case types.GET_HOSPITAL.REQUEST:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case types.GET_HOSPITAL.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case types.GET_HOSPITAL.FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
      };
    default:
      return state;
  }
}
