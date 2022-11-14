export const jwt = (store: any) => (next: any) => (action: any) => {
  // buffer.push(action);

  if (action.type === 'INVALID_TOKEN') {
    // buffer = [];
    // store.dispatch({ type: 'REPINCODE' });
    // }
    // if (action.type === 'REFRESH_EXPIRED') {
    // 	buffer = [];
    store.dispatch({ type: 'LOGOUT_REQUEST' });
  } else {
    // 	if (buffer.length > 20) {
    // 		//remove all items but keep the last 20 which forms the buffer
    // 		buffer.splice(0, buffer.length - 20);
    // 	}
    return next(action);
  }
};
