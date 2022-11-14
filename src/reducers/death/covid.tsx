import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { DeathRequest } from 'src/types';

const initialState: DeathRequest = {
  isFetching: false,
  data: [],
};

export default function covid(state = initialState, action: AnyAction): DeathRequest {
  switch (action.type) {
    case types.GET_DEATH.REQUEST:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case types.GET_DEATH.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case types.GET_DEATH.FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
      };
    default:
      return state;
  }
}
