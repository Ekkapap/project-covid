/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Dispatch, SetStateAction, useState, ReactNode } from 'react';
import { Row, Col, Form, Input, Button, Modal, Select } from 'antd';
// import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
// import { RootState } from "src/reducers";
import { api } from 'src/services';
import { FixedHandleTokenErrors } from 'src/services/errors/error.service';
import './request.scss';

interface ParentProps {
  showModalRequest: boolean;
  setShowModalRequest: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;
const RequestResetPassword: FC<ParentProps> = ({ showModalRequest, setShowModalRequest }) => {
  // const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  // const globalState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('none');
  const [status, setStatus] = useState<ReactNode>(null);
  const [form] = Form.useForm();
  const onFinish = async (formValue: any) => {
    setBtnLoading(true);
    api.requestResetPassword({ email: formValue.email.toLowerCase() }).then((response) => {
      if (response.success) {
        const resMessage = <span className="result" style={{ fontSize: '.8em', color: "green" }}>
          ระบบส่งลิงค์การตั้งค่ารหัสผ่านให้คุณเรียบร้อยแล้ว<br />กรุณาตรวจสอบอีเมลล์ของคุณ<br />อีเมลล์อาจอยู่ในกล่องจดหมายขยะ
        </span>;
        setStatus(resMessage);
        form.resetFields();
      }
      setBtnLoading(false);
    }).catch((response: any) => {
      if (response.error.statusCode == 404) {
        const resMessage = <span className="result" style={{ fontSize: '.8em', color: "red" }}>ไม่มีอีเมลล์นี้ในระบบ</span>;
        setStatus(resMessage);
      }
      setBtnLoading(false);
      FixedHandleTokenErrors(response, dispatch);
    });
  };

  const onCancel = () => {
    form.resetFields();
    setStatus(null);
    setBtnLoading(false);
    setShowModalRequest(false);
  };

  return (
    <Modal
      title="ลืมรหัสผ่าน"
      centered
      visible={showModalRequest}
      maskClosable={false}
      afterClose={onCancel}
      okButtonProps={{ size: "middle", style: { fontSize: '.7em' }, loading: false }}
      cancelButtonProps={{ size: "middle", style: { fontSize: '.7em' } }}
      footer={[
        <Button key="cancel" size="small" onClick={onCancel}>ปิด</Button>,
        <Button key="submit" size="small" type="primary" loading={btnLoading} onClick={form.submit}>ส่งลิงค์ตั้งค่ารหัสผ่าน</Button>
      ]}
    >
      <Form id="requestResetPassword" form={form} layout="vertical" onFinish={onFinish} hideRequiredMark>
        <Row gutter={12}>
          <Col span={12} xs={24} md={24}>
            <span style={{ fontSize: '1em' }}>กรุณาระบุอีเมลล์ของคุณ</span><br />
            <span style={{ fontSize: '.8em' }}>ระบบจะส่งลิงค์ตั้งค่ารหัสผ่านใหม่ไปยังอีเมลล์ของคุณ</span>
            <Form.Item
              name="email"
              style={{ marginTop: '1rem' }}
              validateTrigger="onBlur"
              rules={[
                { required: true, message: 'กรุณาระบุอีเมลล์' },
                { required: true, pattern: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g), message: 'อีเมลล์ผิดรูปแบบ' }
              ]}
            >
              <Input name="email" type="email" placeholder="กรุณาระบุอีเมลล์" />
            </Form.Item>
            {status}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RequestResetPassword;
