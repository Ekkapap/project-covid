import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { ReinfectedRequest } from 'src/types';

const initialState: ReinfectedRequest = {
  isFetching: false,
  data: [],
};

export default function reinfected(state = initialState, action: AnyAction): ReinfectedRequest {
  switch (action.type) {
    case types.GET_REINFECTED.REQUEST:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case types.GET_REINFECTED.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case types.GET_REINFECTED.FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
      };
    default:
      return state;
  }
}
