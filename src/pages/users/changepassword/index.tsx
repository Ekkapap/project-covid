/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Form, Input, Button, Modal, notification } from 'antd';
import React, { useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducers';
import { Trans } from 'react-i18next';
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { api } from 'src/services';
import './index.less';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const openNotificationWithIcon = (message: string, type: NotificationType) => {
  // let status = '';
  // switch (type) {
  //   case 'success': status = 'สำเร็จ'; break;
  //   case 'error': status = 'ไม่สำเร็จ'; break;
  //   default: status = '';
  // }
  notification[type]({
    message: '',
    duration: 4,
    placement: 'bottomRight',
    description: message
  });
};
const ChangePasswordPage: FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const { auth: { authToken } } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const changePassword = (formValue: any) => {
    setLoading(true);
    let params = {
      "oldPassword": formValue.oldPassword,
      "newPassword": formValue.newPassword
    };
    api.changePassword(authToken, params).then((R1) => {
      if (R1.success) {
        openNotificationWithIcon('เปลี่ยนรหัสผ่านสำเร็จ', 'success');
        form.resetFields();
      } else {
        console.log(R1);
      }
      setLoading(false);
    }).catch((err) => {
      if (err.error.statusCode == 400) {
        openNotificationWithIcon('รหัสผ่านเดิมไม่ถูกต้อง', 'error');
      } else {
        openNotificationWithIcon(err.error.message, 'error');
      }
      setLoading(false);
    });
  };
  const confirmChange = () => {
    Modal.confirm({
      title: 'ยืนยันการเปลี่ยนรหัสผ่าน',
      icon: <ExclamationCircleOutlined />,
      content: 'คุณยืนยันเปลี่ยนรหัสผ่านใช่หรือไม่',
      okText: 'บันทึก',
      okButtonProps: { loading: loading },
      cancelText: 'ยกเลิก',
      onOk: form.submit
    });
  };
  return (
    <div id="changPassword" style={{ paddingBottom: '48px' }}>
      {' '}
      <Row style={{ marginBottom: '0.8rem' }}>
        <Col xs={24} md={24} className='text-header-main'>เปลี่ยนรหัสผ่าน</Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]} style={{ backgroundColor: 'unset', minHeight: 'unset' }}>
            <Col xs={24} md={24}>
              <Row className='profileRow'>
                <Form
                  form={form}
                  name='changPasswordForm'
                  id='changPasswordForm'
                  // className='login-form'
                  // initialValues={{}}
                  onFinish={changePassword}>
                  <Row style={{ marginBottom: '1rem' }}>
                    <Col>
                      <Form.Item
                        name='oldPassword'
                        validateTrigger="onBlur"
                        rules={[
                          { required: true, message: 'กรุณาระบุรหัสผ่านเดิม' },
                          { min: 6, message: "อย่างน้อย 6 ตัวอักษร" }
                        ]}>
                        <Input
                          prefix={<LockOutlined className='site-form-item-icon' />}
                          type='password'
                          placeholder='รหัสผ่านเดิม'
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: '1rem' }}>
                    <Col>
                      <Form.Item
                        name='newPassword'
                        validateTrigger="onBlur"
                        rules={[
                          { required: true, message: 'กรุณาระบุรหัสผ่านใหม่' },
                          { min: 6, message: "อย่างน้อย 6 ตัวอักษร" }
                        ]}>
                        <Input
                          prefix={<LockOutlined className='site-form-item-icon' />}
                          type='password'
                          placeholder='รหัสผ่านใหม่'
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className='changPasswordBtn' htmlType='button' loading={loading} onClick={confirmChange}>
                        เปลี่ยนรหัสผ่าน
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );

};
export default ChangePasswordPage;