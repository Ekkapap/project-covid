import * as types from 'src/actions';
import { AnyAction } from 'redux';
import { FilterState } from 'src/types/filter';

const initialState: FilterState = {
  chwpart: "ทุกจังหวัด",
  amppart: "ทุกอำเภอ",
  tmbpart: "ทุกตำบล",
  hospart: "ทุกหน่วยงาน",
};

export function filter(state = initialState, action: AnyAction): FilterState {
  switch (action.type) {
    case types.FILTER.CHANGWAT:
      if (Array.isArray(action.chwpart.selectedItemsCode)) {
        return { ...state, chwpart: action.chwpart };
      } else {
        return { ...state, chwpart: action.chwpart, amppart: initialState.amppart, tmbpart: initialState.tmbpart, hospart: initialState.hospart };
      }
    case types.FILTER.AMPUR:
      return { ...state, amppart: action.amppart, tmbpart: initialState.tmbpart, hospart: initialState.hospart };
    case types.FILTER.TAMBON:
      return { ...state, tmbpart: action.tmbpart, hospart: initialState.hospart };
    case types.FILTER.HOSPITAL:
      return { ...state, hospart: action.hospart };
    default:
      return { ...state, chwpart: initialState.chwpart, amppart: initialState.amppart, tmbpart: initialState.tmbpart, hospart: initialState.hospart };
  }
}
