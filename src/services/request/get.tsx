/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

// import { ServerResponse } from 'src/types/Service/Response';
import { HandleTokenErrors } from '../errors/error.service';

export default function callGet(api_url: string | undefined, endpoint: string, token?: string | null, payload?: any) {
  const headerOptions: AxiosRequestConfig = {
    headers: { Authorization: `${token}` },
    params: payload,
  };
  return axios
    .get(api_url + endpoint, headerOptions)

    .then(
      (response: AxiosResponse) => {
        return response;
      },
      // response.data.then((json: any) => ({ json, response }))
    )
    .then((response: any) => {
      return { success: true, response, error: null };
    })
    .catch(HandleTokenErrors);

  // .catch((error: AxiosError) => {
  //   console.log('AxiosError', error.response?.data.error);
  //   return Promise.reject({ error: error.response?.data.error });
  // });

  // return fetch(API + endpoint, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     ...(token && headerOptions),
  //   },
  //   body: JSON.stringify(payload),
  // })
  //   .then((response: any) =>
  //     response.json().then((json: any) => ({ json, response }))
  //   )
  //   .then(handleTokenErrors)
  //   .then((response: any) => {
  //     const resp: ServerResponse = response.json;

  //     if (!response.response.ok) {
  //       return Promise.reject(response.statusText);
  //     }

  //     return resp;
  //   })

  //   .catch((error) => Promise.reject({ error }));
}
