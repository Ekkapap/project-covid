import { createRequestType } from '../const';
import { action } from '../const';

export const getOtherDiseaseRequest = {
  request: () => action(GET_OTHER_DISEASE.REQUEST, {}),
  success: (response: any) => {
    return action(GET_OTHER_DISEASE.SUCCESS, { data: response });
  },
  failure: (error: any) => action(GET_OTHER_DISEASE.FAILURE, { error }),
};

export const GET_OTHER_DISEASE = createRequestType('GET_OTHER_DISEASE');
