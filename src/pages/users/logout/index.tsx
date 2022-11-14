/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { RootState } from 'src/reducers';
import { logoutAction } from 'src/actions/auth/auth.action';
import { api } from 'src/services';

interface IProps {
  dispatchLogout: any;
  getToken: string | null;
}

class LogoutPage extends Component<IProps> {
  componentDidMount = () => {
    const { dispatchLogout, getToken } = this.props;
    dispatchLogout(getToken);
    return;
  };
  render() {
    // return <Spin tip='Loading...'></Spin>;
    return null;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    getToken: state.auth.authToken,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatchLogout: (token: string) => dispatch(logoutAction.request(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
