import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { OtherDiseaseRequest } from 'src/types';

const initialState: OtherDiseaseRequest = {
  isFetching: false,
  data: [],
};

export default function otherDisease(state = initialState, action: AnyAction): OtherDiseaseRequest {
  switch (action.type) {
    case types.GET_OTHER_DISEASE.REQUEST:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case types.GET_OTHER_DISEASE.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case types.GET_OTHER_DISEASE.FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
      };
    default:
      return state;
  }
}
