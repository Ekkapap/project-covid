import { createRequestType } from '../const';
import { action } from '../const';

export const getHospitalRequest = {
  request: () => action(GET_HOSPITAL.REQUEST, {}),
  success: (response: any) => {
    return action(GET_HOSPITAL.SUCCESS, { data: response });
  },
  failure: (error: any) => action(GET_HOSPITAL.FAILURE, { error }),
};

export const GET_HOSPITAL = createRequestType('GET_HOSPITAL');

export const getPopulationAction = {
  request: () => action(GET_POPULATION.REQUEST),
  success: (response: any) => {
    return action(GET_POPULATION.SUCCESS, { data: response });
  },
  failure: (error: any) => action(GET_POPULATION.FAILURE, { error }),
};

export const GET_POPULATION = createRequestType('GET_POPULATION');
