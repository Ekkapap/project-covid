import React from 'react';
// import { RootState } from 'src/reducers';
import PromiseRender from './PromiseRender';

// const CURRENT: string[] | [] = ['user', 'admin'];

const checkPermissions = (authority: any, currentAuthority: any, target: any, Exception: any) => {
  if (!authority) {
    return target;
  }

  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority.includes(item))) {
        return target;
      }
    } else if (authority.includes(currentAuthority)) {
      return target;
    }

    return Exception;
  }

  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority === item)) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }

    return Exception;
  }

  if (authority instanceof Promise) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  }

  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority); // 函数执行后返回值是 Promise

      if (bool instanceof Promise) {
        return <PromiseRender ok={target} error={Exception} promise={bool} />;
      }

      if (bool) {
        return target;
      }

      return Exception;
    } catch (error) {
      console.log('error check permissions');
      throw error;
    }
  }

  throw new Error('unsupported parameters');
};

function Check(authority: string[], userAuthority: string[], target: any, Exception: any) {
  // const [permission] = useReducer((state: RootState) => state, ['user'] as never);

  console.log('permission', userAuthority);

  return checkPermissions(authority, userAuthority, target, Exception);
}

export { checkPermissions };

export default Check;
