import { AnyAction } from 'redux';
import { AppConfig } from 'src/types/global';
import * as types from 'src/actions/global';

const initialState: AppConfig = {
  lang: 'th',
};

export default function app(state = initialState, action: AnyAction): AppConfig {
  switch (action.type) {
    case types.LANGUAGE_CHANGE:
      return {
        ...state,
        lang: action.lang,
      };

    default:
      return state;
  }
}
