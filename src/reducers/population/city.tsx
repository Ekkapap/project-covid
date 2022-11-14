import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { PopulationRequest } from 'src/types/population';

const initialState: PopulationRequest = {
  isFetching: false,
  data: [],
};

export default function city(state = initialState, action: AnyAction): PopulationRequest {
  switch (action.type) {
    case types.GET_POPULATION.REQUEST:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case types.GET_POPULATION.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case types.GET_POPULATION.FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
      };
    default:
      return state;
  }
}
