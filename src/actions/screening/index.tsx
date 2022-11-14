import { createRequestType } from '../const';
import { action } from '../const';

export const getScreeningRequest = {
  request: () => action(GET_SCREENING.REQUEST, {}),
  success: (response: any) => {
    return action(GET_SCREENING.SUCCESS, { data: response });
  },
  failure: (error: any) => action(GET_SCREENING.FAILURE, { error }),
};

export const GET_SCREENING = createRequestType('GET_SCREENING');
