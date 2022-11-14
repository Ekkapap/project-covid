import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { IpdRequest } from 'src/types';

const initialState: IpdRequest = {
  isFetching: false,
  data: [],
};

export default function ipd(state = initialState, action: AnyAction): IpdRequest {
  switch (action.type) {
    case types.GET_IPD.REQUEST:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case types.GET_IPD.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case types.GET_IPD.FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
      };
    default:
      return state;
  }
}
