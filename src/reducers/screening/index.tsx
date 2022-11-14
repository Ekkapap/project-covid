import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { ScreeningRequest } from 'src/types';

const initialState: ScreeningRequest = {
  isFetching: false,
  data: [],
};

export default function screening(state = initialState, action: AnyAction): ScreeningRequest {
  switch (action.type) {
    case types.GET_SCREENING.REQUEST:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case types.GET_SCREENING.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case types.GET_SCREENING.FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
      };
    default:
      return state;
  }
}
