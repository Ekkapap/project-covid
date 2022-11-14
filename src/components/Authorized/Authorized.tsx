import React from 'react';
import check from './CheckPermissions';

const Authorized: any = ({
  children,
  authority,
  userAuthority,
  noMatch = null,
}: {
  children: any;
  authority: string[];
  userAuthority: string[];
  noMatch: any;
}): any => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, userAuthority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized;
