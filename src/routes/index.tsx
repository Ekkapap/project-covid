/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, RouteProps, Redirect } from 'react-router-dom';
import _ from 'lodash';
import * as types from 'src/actions';
import { RootState } from 'src/reducers';

import { AuthState } from 'src/types/auth';
import { GlobalConfig, AppConfig } from 'src/types/global';
import AuthorizedRoute from 'src/components/Authorized/AuthorizedRoute';
import Notifier from 'src/components/Notifier';
import { routes } from './routes';
import { LANGUAGE_CHANGE } from 'src/actions/global';

interface IProps {
  login: AuthState;
  global: GlobalConfig;
  appconfig: AppConfig;
  userAuthority: string[];
  dispatchCollapsed?: (collapsed: boolean) => void;
  dispatchLanguageChanged?: (lang: string) => void;
}

interface IState {}

export interface CustomRouteProps {
  path?: string;
  component?: any;
  authority?: string[];
  exact?: boolean;
  routes?: CustomRouteProps[];
  userAuthority?: string[];
  redirect?: string;
  redirectPath?: string;
}

class Routes extends React.Component<IProps & RouteProps, IState> {
  handleCollapsed = (collapsed: boolean) => {
    const { dispatchCollapsed } = this.props;
    if (dispatchCollapsed) {
      dispatchCollapsed(collapsed);
    }
  };

  handleChangeLanguage = (lang: string) => {
    const { dispatchLanguageChanged } = this.props;

    if (dispatchLanguageChanged) {
      dispatchLanguageChanged(lang);
    }
  };

  RouteWithSubRoutes = (route: CustomRouteProps) => {
    const childrenRoute =
      route.routes &&
      route.routes.map((child: CustomRouteProps, ix: number) => {
        let authority: string[] = [];

        if (route.authority) {
          authority.push(...route.authority);
        }

        if (child.authority) {
          authority.push(...child.authority);
        }

        if (child.routes) {
          return child.routes.map((subChild: CustomRouteProps, i: number) => {
            if (subChild.authority) {
              authority.push(...subChild.authority);
            }

            if (subChild.redirect) {
              return <Redirect key={`${ix}-${i}`} to={subChild.redirect} />;
            }
            return <this.RouteWithSubRoutes key={i} {...subChild} />;
          });
        } else {
          if (child.redirect) {
            return <Redirect key={ix.toString()} to={child.redirect} />;
          }

          return (
            <AuthorizedRoute
              key={ix.toString()}
              {...child}
              authority={authority.length > 0 ? authority : undefined}
              userAuthority={route.userAuthority}
            />
          );
        }
      });

    if (route.authority && _.intersection(route.authority, this.props.login.authority).length === 0) {
      return <Redirect to='login' />;
    }

    return <route.component {...route} children={<Switch>{childrenRoute}</Switch>} />;
  };

  render() {
    const { global, appconfig, userAuthority } = this.props;

    const restProps = {
      appconfig: appconfig,
      userAuthority: userAuthority,
      collapsed: global.collapsed || false,
      onCollapse: this.handleCollapsed,
      onLanguageChangd: this.handleChangeLanguage,
    };

    return (
      <>
        <div>
          <Notifier />
          <Switch>
            {routes.map((route, i) => (
              <this.RouteWithSubRoutes key={i} {...restProps} {...route} />
            ))}
            <Redirect to='login' />
          </Switch>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  login: state.auth,
  userAuthority: state.auth.authority,
  global: state.global.config,
  appconfig: state.global.app,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchCollapsed: (collapsed: boolean) =>
    dispatch({
      type: types.GLOBAL_COLLAPSED,
      collapsed,
    }),

  dispatchLanguageChanged: (lang: string) => {
    dispatch({ type: LANGUAGE_CHANGE, lang });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
