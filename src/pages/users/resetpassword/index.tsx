/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Button, Modal, notification } from 'antd';
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from "react-router-dom";
import { api } from 'src/services';
import { FixedHandleTokenErrors } from 'src/services/errors/error.service';
import logo from 'src/constants/changPass.png';
import '../login/styles/core.scss';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
const openNotificationWithIcon = (message: string, type: NotificationType) => {
  notification[type]({
    message: '',
    duration: 4,
    placement: 'bottomRight',
    description: message,
  });
};

type propsType = {
  computedMatch:{params:{uid:string;token:string}}
}
const ResetPasswordPage: FC<propsType> = ({computedMatch:{params:{uid,token}}}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [tokenValidate,setTokenValidate] = useState<boolean>(false);
  const timerRef = useRef<any>();

  const vToken = useCallback((t:string)=>{
    api.validateToken(t).then((response)=>{
      if(response.success){
        if(response.response.data?.result?.userId==uid){
          setTokenValidate(true);
        }else{
          // openNotificationWithIcon('ลิงค์เปลี่ยนรหัสผ่านหมดอายุกรุณาดำเนินการใหม่อีกครั้ง', 'error');
          // timerRef.current = setTimeout(() => history.push('/login'), 3000);
        }
      }
    }).catch((response: any) => {FixedHandleTokenErrors(response, dispatch);});
  },[uid,dispatch]);

  const confirmChange = (formValue:any) => {
    Modal.confirm({
      title: 'ยืนยันการเปลี่ยนรหัสผ่าน',
      icon: <ExclamationCircleOutlined />,
      content: 'คุณยืนยันเปลี่ยนรหัสผ่านใช่หรือไม่',
      okText: 'บันทึก',
      okButtonProps: { loading: loading },
      cancelText: 'ยกเลิก',
      onOk: () => onFinish(formValue)
    });
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    if(tokenValidate){
      api.resetPassword(token, { newPassword: values.confirmPassword }).then((response?:any)=>{
        if(response.success){
          api.deleteToken(token).then((res?:any)=>{
            if(res.success){
              setLoading(false);
              openNotificationWithIcon('เปลี่ยนรหัสผ่านสำเร็จ', 'success');
              timerRef.current = setTimeout(() => history.push('/login'), 3000);
            }
          }).catch((response: any) => {setLoading(false);FixedHandleTokenErrors(response, dispatch);});
        }
      }).catch((response: any) => {setLoading(false);FixedHandleTokenErrors(response, dispatch);});
    }else{
      setLoading(false);
      openNotificationWithIcon('ลิงค์เปลี่ยนรหัสผ่านหมดอายุกรุณาดำเนินการใหม่อีกครั้ง', 'error');
      timerRef.current = setTimeout(() => history.push('/login'), 3000);
    }
  };
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  useEffect(() => {
    if(token!=""){
      vToken(token);
    }
    return () => setTokenValidate(false);
  },[token,vToken]);

  return (
    <div className='main' style={{ background: '#2c3338' }}>
      <Row>
        <Col xs={24} md={24} style={{textAlign:'center',marginBottom:'3rem'}}><img src={logo} style={{width:'16vh'}} /></Col>
        {/* <Col xs={24} md={24} className='header'>เปลี่ยนรหัสผ่าน</Col> */}
        <Col xs={24} md={24} className='content'>
          <div id='login'>
            <Form
              name='normal_login'
              id='login form'
              className='login-form'
              form={form}
              onFinish={confirmChange}>
              <Row style={{ marginBottom: '1rem' }}>
                <Col>
                  <Form.Item
                    label='รหัสผ่านใหม่'
                    labelCol={{span:24}}
                    required={false}
                    name='newPassword'
                    validateTrigger="onBlur"
                    rules={[
                      { required: true, message: 'กรุณาระบุรหัสผ่านใหม่' },
                      { min: 6, message: "อย่างน้อย 6 ตัวอักษร" }
                    ]}>
                    <Input 
                      prefix={<LockOutlined className='site-form-item-icon' />} 
                      type='password'
                      placeholder='รหัสผ่านใหม่' />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ marginBottom: '1rem' }}>
                <Col>
                  <Form.Item
                    label='ยันยันรหัสผ่าน'
                    labelCol={{span:24}}
                    required={false}
                    name='confirmPassword'
                    validateTrigger="onBlur"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: 'กรุณายืนยันรหัสผ่านใหม่' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน'));
                        },
                      }),
                    ]}>
                    <Input
                      prefix={<LockOutlined className='site-form-item-icon' />}
                      type='password'
                      placeholder='ยืนยันรหัสผ่าน'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button block loading={loading} className='loginBtn' onClick={form.submit}>เปลี่ยนรหัสผ่าน</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPasswordPage;