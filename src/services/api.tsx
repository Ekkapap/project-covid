/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { callGet, callPost, callPut, callPatch, callDelete } from './request';
import { API, DDCMOPH_API } from 'src/constants';

export const loginEndpoint = (token: string, payload: any) =>
  callPost(API, 'teamusers/login?include=user', null, payload);

//API : https://datacenter-r8way.moph.go.th:3002/explorer/#/deathcovid

export const getScreeningData = (token: string) => callGet(API, 'screencovids', token);
export const getVaccineData = (token: string) => callGet(API, 'vaccinecovids', token);
export const getIpdData = (token: string) => callGet(API, 'ipdcovids', token);
export const getHospitalData = (token: string) => callGet(API, 'hospitals', token);
export const getDeathData = (token: string) => callGet(API, 'deathcovids', token);
export const getReinfectedData = (token: string) => callGet(API, 'covid_reinfecteds', token);
export const getExcessMortalityDeath = (token: string) => callGet(API, 'deaths', token);
export const getCovidToday = (payload: any) => callGet(DDCMOPH_API, 'Cases/today-cases-all', null, payload);

//USER
export const auth = (token: string, payload: string) => callPost(API, 'teamusers/login', null, payload);
export const logout = (token: any, data: string) => callPost(API, `teamusers/logout?access_token=${token}`);
export const deleteToken = (token: any) => callDelete(`AccessTokens/${token}`, null);
export const changePassword = (token: string | null, payload: any) =>
  callPost(API, `teamusers/change-password?access_token=${token}`, token, payload);
export const getUser = (payload: any, token: string) => callGet(API, 'teamusers', token, payload);
export const getUsers = (payload: any, token: string) => callGet(API, 'teamusers', token, payload);
export const getUsersNew = (payload: any, token: string) => callGet(API, 'register_temps', token, payload);
export const getUserRoles = (token: any, payload: any) => {
  const param = {
    filter: {
      field: { name: true, roleId: true, principalId: true },
      where: { principalId: payload.userId, principalType: 'CovidCenter' },
      include: {
        relation: 'Role',
        scope: {
          fields: { name: true },
        },
      },
    },
    access_token: payload.token,
  };
  return callGet(API, `RoleMappings`, payload.token, param);
};

export const getUserInfo = (token: string, payload: any) => {
  const param = {
    filter: {
      fields: {
        id: true,
        fullname: true,
        position: true,
        cid: true,
        email: true,
        mobile: true,
        application: true,
        principalId: true,
        roleId: true,
        hos_id: true,
        informConsent: true,
      },
      where: { application: { in: ['CovidCenter'] } },
      include: [
        {
          relation: 'RoleMapping',
          scope: {
            where: { principalType: 'CovidCenter' },
            include: {
              relation: 'Role',
              scope: {
                fields: { id: true, name: true, created: true, modified: true },
              },
            },
          },
        },
        {
          relation: 'hospital',
          scope: {
            fields: {
              hos_id: true,
              hos_name: true,
              hos_fullname: true,
              hos_proid: true,
              hos_ampid: true,
              hos_tumid: true,
            },
            include: [
              { relation: 'changwat', scope: { fields: { changwatcode: true, changwatname: true } } },
              { relation: 'amphur', scope: { fields: { amphur_id: true, amphur_name: true } } },
              { relation: 'tambol', scope: { fields: { addressid: true, name: true } } },
            ],
          },
        },
      ],
    },
    access_token: payload.token,
  };
  return callGet(API, `teamusers/${payload.userId}`, token, param);
};
export const getHospital = (token: string, hos_id: string) => {
  const param = {
    filter: {
      where: { hos_id: hos_id },
      fields: {
        hos_id: true,
        hos_name: true,
        hos_fullname: true,
        hos_proid: true,
        hos_ampid: true,
        hos_tumid: true,
      },
      include: [
        { relation: 'changwat', scope: { fields: { changwatcode: true, changwatname: true } } },
        { relation: 'amphur', scope: { fields: { amphur_id: true, amphur_name: true } } },
        { relation: 'tambol', scope: { fields: { addressid: true, name: true } } },
      ],
    },
    access_token: token,
  };
  return callGet(API, `hospitals`, token, param);
};
export const insertUser = (token: string, payload: any) => callPost(API, 'teamusers', token, payload);
export const updateUser = (payload: any) => {
  return callPatch(API, `teamusers/${payload.userId}?access_token=${payload.token}`, payload.token, payload.data);
};
export const updateUserConsent = (token: any, payload: any) => {
  return callPatch(API, `teamusers/${payload.userId}?access_token=${token}`, payload.token, payload.data);
};

export const deleteUser = (payload: any) =>
  callDelete(`teamusers/${payload.id}?access_token=${payload.token}`, payload.data);

export const insertUserRole = (token: string, payload: any) =>
  callPost(API, `RoleMappings?access_token=${token}`, token, payload);
export const updateUserRole = (payload: any) =>
  callPatch(API, `RoleMappings/${payload.roleMappingId}?access_token=${payload.token}`, payload.token, payload.data);
export const deleteUserRole = (payload: any) =>
  callDelete(`RoleMappings/${payload.roleMappingId}?access_token=${payload.token}`, null);

export const insertRegister = (payload: any) => callPost(API, `register_temps`, null, payload);
export const deleteRegister = (payload: any) =>
  callDelete(`register_temps/${payload.id}?access_token=${payload.token}`, null);

// RESET-PASSWORD
export const requestResetPassword = (payload: { email: string; }) => callPost(API, `/teamusers/reset`, null, payload);
export const resetPassword = (token: string, payload: { newPassword: string; }) =>
  callPost(API, `teamusers/reset-password?access_token=${token}`, token, payload);
export const validateToken = (token: string) =>
  callGet(API, `AccessTokens/validateAccessToken?access_token${token}`, token, null);

// Population
export const getPOP = (payload: any, token: string) => {
  const param = {
    filter: {
      fields: { changwatcode: true, changwatname: true, pop: true },
      where: { pop: { ne: null } },
      include: {
        relation: 'amphur',
        scope: {
          where: { pop: { ne: null } },
          include: {
            relation: 'tambol',
            scope: {
              fields: { addressid: true, name: true, pop: true },
              where: { pop: { ne: null } },
            },
          },
        },
      },
    },
  };
  return callGet(API, 'changwats', token, param);
};

// Get Hospitals
export const getHospitals = (token: string) => {
  const param = {
    filter: {
      fields: {
        hos_id: true,
        hos_name: true,
      },
      where: {
        covid_project: true,
      },
      order: ['hos_tumid ASC', 'hos_id ASC'],
    },
  };
  return callGet(API, 'hospitals', token, param);
};
// Get Changwat
export const getChangwat = (token: string) => {
  const param = {
    filter: {
      fields: {
        changwatcode: true,
        changwatname: true,
      },
      where: {
        zonecode: '08',
      },
      order: 'changwatcode ASC',
    },
  };
  return callGet(API, 'changwats', token, param);
};
//Get other_disease
export const getOtherDisease = (token: string) => callGet(API, 'other_diseases', token, null);
// Send Email
export const sendEmail = (payload: any, token: string) => callGet(API, 'Emails?' + payload, token, payload);