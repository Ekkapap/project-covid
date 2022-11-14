/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RootState } from 'src/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from 'src/actions/auth/auth.action';
import { useMediaQuery } from 'react-responsive';
import Register from 'src/pages/users/register';
import RequestResetPassword from '../resetpassword/request';
import InformRegister from 'src/pages/users/consent/inform_register';
import './styles/core.scss';
import logo from 'src/constants/logo.png';
const LoginPage: FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const dispatch = useDispatch();
  const globalState = useSelector((state: RootState) => state);
  const login = globalState.auth;
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalRequest, setShowModalRequest] = useState(false);
  const [showModalConsent, setShowModalConsent] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const loginRequest = (email: string, password: string, ttl: number) => dispatch(
    loginAction.request(email, password, ttl)
  );
  const onFinish = async (values: any) => {
    if (loginRequest) {
      loginRequest(values.email.toLowerCase(), values.password, 86400);
    }
  };
  return (
    <div className='main' style={{ background: '#2c3338' }}>
      <Row>
        <Col xs={24} md={24} style={{ textAlign: 'center' }}><img src={logo} style={{ width: '12vh' }} /></Col>
        <Col xs={24} md={24} className='header'>THAILAND Coronavirus (COVID-19)</Col>
        <Col xs={24} md={24} className='content'>
          <div id='login'>
            <Form
              name='normal_login'
              id='login form'
              className='login-form'
              // initialValues={{}}
              onFinish={onFinish}>
              <Row style={{ marginBottom: '1rem' }}>
                <Col>
                  <Form.Item
                    name='email'
                    validateTrigger="onBlur"
                    rules={[
                      { required: true, message: 'กรุณาระบุอีเมลล์' },
                      { required: true, pattern: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g), message: 'อีเมลล์ผิดรูปแบบ' }
                    ]}>
                    <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='อีเมลล์' />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ marginBottom: '1rem' }}>
                <Col>
                  <Form.Item
                    name='password'
                    validateTrigger="onBlur"
                    rules={[
                      { required: true, message: 'กรุณาระบุรหัสผ่าน' },
                      { min: 6, message: "อย่างน้อย 6 ตัวอักษร" }
                    ]}>
                    <Input
                      prefix={<LockOutlined className='site-form-item-icon' />}
                      type='password'
                      placeholder='รหัสผ่าน'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button block loading={login.authPending} htmlType='submit' className='loginBtn'>
                    เข้าสู่ระบบ
                  </Button>
                </Col>
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Col md={12} style={{ fontSize: 14, textAlign: 'left' }}>
                  <Button
                    type="link"
                    style={{ color: '#aeaeae', fontSize: '14px', padding: 0 }}
                    onClick={() => setShowModalRequest(true)}>
                    ลืมรหัสผ่าน
                  </Button>
                </Col>
                <Col md={12} style={{ fontSize: 14, textAlign: 'right', paddingRight: '2px' }}>
                  <Button
                    type="link"
                    onClick={() => setShowModalConsent(true)}
                    style={{ color: '#aeaeae', fontSize: '14px', padding: 0 }}>
                    ลงทะเบียน
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      <Register showModalRegister={showModalRegister} setShowModalRegister={setShowModalRegister} editStatus={editStatus} setEditStatus={setEditStatus} />
      <RequestResetPassword showModalRequest={showModalRequest} setShowModalRequest={setShowModalRequest} />
      {showModalConsent &&
        (<InformRegister showModalConsent={showModalConsent} setShowModalConsent={setShowModalConsent} setShowModalRegister={setShowModalRegister} />)
      }
    </div>
  );
};

export default LoginPage;