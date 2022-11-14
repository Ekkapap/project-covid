import { createRequestType } from '../const';
import { action } from '../const';

export const getVaccineRequest = {
  request: () => action(GET_VACCINE.REQUEST, {}),
  success: (response: any) => {
    return action(GET_VACCINE.SUCCESS, { data: response });
  },
  failure: (error: any) => action(GET_VACCINE.FAILURE, { error }),
};

export const GET_VACCINE = createRequestType('GET_VACCINE');
