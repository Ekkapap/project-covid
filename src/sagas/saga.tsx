import { select, put, call } from 'redux-saga/effects';
import { getToken } from 'src/reducers/selectors';
import { watcherEntityEvent } from 'src/types/global';

export function* fetchEntity(entity: any, apiFn: any, id: any, event?: watcherEntityEvent) {
  const token: string = yield select(getToken);
  // console.log('SAGA-PARAM', id);
  // console.log('entity', entity);

  try {
    const { success, response, error }: any = yield call(apiFn, token, id);

    if (success) {
      yield put(entity.success(response.data));

      if (event && event.onSuccess) {
        yield event.onSuccess(response.data);
      }

      return { response };
    } else {
      yield put(entity.failure(id, error.error));

      if (event && event.onFailure) {
        yield event.onFailure(error.error);
      }
      return { error };
    }
  } catch (error) {
    console.log('fetchEntity error', error);
    yield put(entity.failure(id, error.error));

    if (event && event.onFailure) {
      yield event.onFailure(error.error);
    }

    return { error };
  }
}
