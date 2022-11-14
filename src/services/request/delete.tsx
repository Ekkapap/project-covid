import { API } from 'src/constants';
import axios, { AxiosResponse, AxiosError } from 'axios';

// import { ServerResponse } from 'src/types/Service/Response';
// import { handleTokenErrors } from '../errors/error.service';

export default function callDelete(endpoint: string, payload?: any) {
    // const headerOptions = { Authorization: `Bearer ${token}` };
    return (
        axios
            .delete(API + endpoint, payload)
            .then(
                (response: AxiosResponse) => {
                    return response;
                },
                // response.data.then((json: any) => ({ json, response }))
            )
            // .then(handleTokenErrors)
            .then((response: any) => {
                return { success: true, response, error: null };
            })
            .catch((error: AxiosError) => {
                console.log('AxiosError', error.response?.data.error);
                return Promise.reject({ error: error.response?.data.error });
            })
    );

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
