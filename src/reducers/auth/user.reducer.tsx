/* eslint-disable @typescript-eslint/no-unused-vars */
import { type } from 'os';
import { AnyAction } from 'redux';
import * as types from 'src/actions';
import { User } from 'src/types/user';

const initialState: User = {
  user_id: null,
  cid: null,
  name: null,
  email: null,
  position: null,
  mobile: null,
  changwat: {
    changwatcode: null,
    changwatname: null,
  },
  amphur: {
    amphurcode: null,
    amphurname: null,
  },
  tambon: {
    tamboncode: null,
    tambonname: null,
  },
  department: {
    hoscode: null,
    hosname: null,
    hosfullname: null,
  },
  informConsent: null,
};

export function user(state = initialState, action: AnyAction): User {
  switch (action.type) {
    case types.LOGIN.REQUEST: {
      return { ...state };
    }

    case types.LOGIN.SUCCESS:
      return {
        ...state,
        user_id: action.data.userId,
      };

    case types.LOGIN.FAILURE:
      return initialState;

    case types.LOGOUT.SUCCESS:
      return initialState;

    case types.SET_CONSENT.SUCCESS: {
      return { ...state, informConsent: action.data.informConsent };
    }
    case types.GET_USERINFOS.SUCCESS:
      return {
        ...state,
        cid: action.data.cid,
        name: action.data.fullname,
        position: action.data.position,
        email: action.data.email,
        mobile: action.data.mobile,
        changwat: {
          changwatcode: action.data.hospital.changwat.changwatcode,
          changwatname: action.data.hospital.changwat.changwatname,
        },
        amphur: {
          amphurcode: action.data.hospital.amphur.amphur_id,
          amphurname: action.data.hospital.amphur.amphur_name,
        },
        tambon: {
          tamboncode: action.data.hospital.tambol.addressid,
          tambonname: action.data.hospital.tambol.name,
        },
        department: {
          hoscode: action.data.hospital.hos_id,
          hosname: action.data.hospital.hos_name,
          hosfullname: action.data.hospital.hos_fullname,
        },
        informConsent: action.data.informConsent,
      };

    default:
      return state;
  }
}

// export default combineReducers(user);
