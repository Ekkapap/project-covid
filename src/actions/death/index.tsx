import { createRequestType } from '../const';
import { action } from '../const';

export const getDeathRequest = {
  request: () => action(GET_DEATH.REQUEST, {}),
  success: (response: any) => {
    return action(GET_DEATH.SUCCESS, { data: response });
  },
  failure: (error: any) => action(GET_DEATH.FAILURE, { error }),
};

export const GET_DEATH = createRequestType('GET_DEATH');

export const getExcessMortalityDeathRequest = {
  request: () => action(GET_EXCESS_MORTALITY_DEATH.REQUEST, {}),
  success: (response: any) => {
    return action(GET_EXCESS_MORTALITY_DEATH.SUCCESS, { data: response });
  },
  failure: (error: any) => action(GET_EXCESS_MORTALITY_DEATH.FAILURE, { error }),
};

export const GET_EXCESS_MORTALITY_DEATH = createRequestType('GET_EXCESS_MORTALITY_DEATH');
