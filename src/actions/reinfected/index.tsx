import { createRequestType } from '../const';
import { action } from '../const';

export const getReinfectedRequest = {
  request: () => action(GET_REINFECTED.REQUEST, {}),
  success: (response: any) => {
    return action(GET_REINFECTED.SUCCESS, { data: response });
  },
  failure: (error: any) => action(GET_REINFECTED.FAILURE, { error }),
};

export const GET_REINFECTED = createRequestType('GET_REINFECTED');
