export const HandleTokenErrors = (response: any) => {
  if (response.response?.status === 401) {
    // dispatch({
    //   type: 'INVALID_TOKEN',
    // });

    return Promise.reject(response);
  }

  return response;
};

export const FixedHandleTokenErrors = (response: any, dispatch?: any) => {
  if (response.response?.status === 401) {
    dispatch({
      type: 'INVALID_TOKEN',
    });

    return Promise.reject(response);
  }
  /// in other case

  return response;
};

// general errors are for non-request specific problems that can occur with
// many requests, such as network errors and app specific, general errors
export const generalError: any = (response: any) => {
  if (response === 'TypeError: Network request failed') {
    // return store.dispatch(connectionError('Network request failed'));
    // other checks for connection issues
  } else {
    // generic errors
  }
};
