import { createRequestType } from '../const';
import { action } from '../const';

export const getIpdRequest = {
  request: () => action(GET_IPD.REQUEST, {}),
  success: (response: any) => {
    return action(GET_IPD.SUCCESS, { data: response });
  },
  failure: (error: any) => action(GET_IPD.FAILURE, { error }),
};

export const GET_IPD = createRequestType('GET_IPD');
