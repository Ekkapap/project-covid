import React from 'react';
import Authorized from './Authorized';
import { Route, Redirect } from 'react-router-dom';

const AuthorizedRoute = ({
  component: Component,
  authority,
  userAuthority,
  redirectPath,
  ...rest
}: {
  component?: any;
  authority?: string[];
  userAuthority?: string[];
  redirectPath?: string;
}) => {
  return (
    <Authorized
      authority={authority}
      userAuthority={userAuthority}
      noMatch={
        <Route
          {...rest}
          render={() => (
            <Redirect
              to={{
                pathname: redirectPath || '/404',
              }}
            />
          )}
        />
      }>
      <Route {...rest} component={Component} />
      {/* <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />  */}
    </Authorized>
  );
};

export default AuthorizedRoute;
