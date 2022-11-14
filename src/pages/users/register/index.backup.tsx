/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ReactNode, Dispatch, SetStateAction, useState, useEffect, useCallback } from 'react';
import { Row, Col, Form, Input, Button, Modal, Drawer, Select, Space, DatePicker } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "src/reducers";
import { address } from 'src/constants/thaiaddress';
import { api } from 'src/services';
import moment from 'moment';
import './register.scss';

interface ParentProps {
  showModalRegister: boolean;
  setShowModalRegister: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;
const Register: FC<ParentProps> = ({ showModalRegister, setShowModalRegister }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const globalState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { changwatpart, ampurpart, tambonpart, hospitalpart } = address;
  const [changwats, setChangwats] = useState<ReactNode>("ทั้งหมด");
  const [ampurs, setAmpurs] = useState<ReactNode>("ทั้งหมด");
  const [hospitals, setHospitals] = useState<ReactNode>("ทั้งหมด");
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    changwat: { changwatcode: "", changwatname: "ทั้งหมด" },
    amphur: { amphur_id: "", amphur_name: "ทั้งหมด" },
    department: { hcode: "", hos_name: "ทั้งหมด", hos_fullname: "" }
  });

  // SELECT CHW, AMP, HOS
  const prefix = (type: string, value: string) => {
    if (type == "chw") { return (value != "กรุงเทพมหานคร" && value != "ทุกจังหวัด") ? "จ." + value : value; }
    if (type == "amp") { return (value != "ทุกอำเภอ") ? "อ." + value : value; }
    if (type == "tmb") { return (value != "ทุกตำบล") ? "ต." + value : value; }
    if (type == "hos") {
      type mapObjType = { [key: string]: string; };
      const mapObj: mapObjType = {
        "โรงพยาบาลส่งเสริมสุขภาพตำบล": "รพ.สต.",
        "โรงพยาบาลสมเด็จพระยุพราช": "รพร.",
        "โรงพยาบาล": "รพ.",
        "ศูนย์สุขภาพชุมชนเมือง": "ศสม.",
        "ศูนย์สุขภาพชุมชน": "ศสช.",
        "สำนักงานสาธารณสุขจังหวัด": "สสจ.",
        "สำนักงานสาธารณสุขอำเภอ": "สสอ.",
      };
      const reg = /โรงพยาบาลส่งเสริมสุขภาพตำบล|โรงพยาบาลสมเด็จพระยุพราช|โรงพยาบาล|ศูนย์สุขภาพชุมชนเมือง|ศูนย์สุขภาพชุมชน|สำนักงานสาธารณสุขจังหวัด|สำนักงานสาธารณสุขอำเภอ/g;
      // const val = (typeof value !== 'undefined')?value:"";
      return value.replace(reg, (matched) => mapObj[matched]); //.split(/\s(.+)/)[0].split(/ตำบล(.+)/)[0]
    }
    if (type == "hoslong") {
      type mapObjType = { [key: string]: string; };
      const mapObj: mapObjType = {
        "รพ.สต.": "โรงพยาบาลส่งเสริมสุขภาพตำบล",
        "รพร.": "โรงพยาบาลสมเด็จพระยุพราช",
        "รพ.": "โรงพยาบาล",
        "ศสม.": "ศูนย์สุขภาพชุมชนเมือง",
        "ศสช.": "ศูนย์สุขภาพชุมชน",
        "สสจ.": "สำนักงานสาธารณสุขจังหวัด",
        "สสอ.": "สำนักงานสาธารณสุขอำเภอ"
      };
      const reg = /^รพ.สต.|^รพร.|^รพ.|^ศสม.|^ศสช.|^สสจ.|^สสอ./g;
      return value.replace(reg, (matched) => mapObj[matched]).split(/\s(.+)/)[0];
    }
  };
  const genChangwatOptions = useCallback(async () => {
    const chw = Object.keys(changwatpart).map(function (key: string) { return <Option key={key} value={changwatpart[key]["chwcode"]}>{changwatpart[key]["chwname"]}</Option>; });
    setChangwats(chw);
  }, [setChangwats, changwatpart]);
  const genAmpurOptions = useCallback(async (filter: any) => {
    let amp: ReactNode = undefined;
    if (filter) {
      amp = Object.keys(filter).map(function (key: string) { return <Option key={key} value={filter[key]["ampcode"]}>{filter[key]["ampname"]}</Option>; });
    } else {
      amp = Object.keys(ampurpart).map(function (key: string) { return <Option key={key} value={ampurpart[key]["ampcode"]}>{ampurpart[key]["ampname"]}</Option>; });
    }
    setAmpurs(amp);
  }, [setAmpurs, ampurpart]);
  const genHospitalOptions = useCallback(async (filter: any) => {
    let hos: ReactNode = undefined;
    if (filter) {
      hos = Object.keys(filter).map(function (key: string) { return <Option key={key} value={filter[key]["hcode"]}>{prefix("hos", filter[key]["hname"])}</Option>; });
    } else {
      hos = Object.keys(hospitalpart).map(function (key: string) { return <Option key={key} value={hospitalpart[key]["hcode"]}>{prefix("hos", hospitalpart[key]["hname"])}</Option>; });
    }
    setHospitals(hos);
  }, [setHospitals, hospitalpart]);
  
  const onChange = (e: any) => {
    if (e.name == "chw") {
      const ampursFilter = Object.fromEntries(Object.entries(ampurpart).filter(([key]) => {
        if (ampurpart[key]["chwcode"] == "") {
          return true;
        } else {
          return (ampurpart[key]["chwcode"] == e.value);
        }
      }));
      setFormData({
        ...formData,
        changwat: { changwatcode: e.value, changwatname: e.option.children },
        amphur: { amphur_id: "", amphur_name: "" },
        department: { hcode: "", hos_name: "", hos_fullname: "" }
      });
      setHospitals(null);
      genAmpurOptions(ampursFilter);
      form.setFieldsValue({ amphur: "ทั้งหมด", department: "ทั้งหมด" });
    }
    if (e.name == 'amp') {
      const filterAmphurcodefull = formData.changwat.changwatcode + e.value;
      const hospitalsFilter = Object.fromEntries(Object.entries(hospitalpart).filter(([key]) => {
        const amphurcodefull = hospitalpart[key]["chw"] + hospitalpart[key]["amp"];
        return (amphurcodefull == filterAmphurcodefull);
      }));
      genHospitalOptions(hospitalsFilter);
      setFormData({
        ...formData,
        amphur: { amphur_id: e.value, amphur_name: e.option.children },
        department: { hcode: "", hos_name: "", hos_fullname: "" }
      });
      form.setFieldsValue({ department: "ทั้งหมด" });
    }
    if (e.name == 'hos') {
      const hosfullname = prefix("hoslong", e.option.children) || '';
      setFormData({ ...formData, department: { hcode: e.value, hos_name: e.option.children.trim(), hos_fullname: hosfullname.trim() } });
    }
  };

  const onFinish = async (formValue: any) => {
    const formDataFinal = {
      fullname: formValue.fullname,
      position: formValue.position,
      cid: formValue.cid,
      mobile: formValue.mobile,
      email: formValue.email,
      // password: formValue.password,
      changwat: formData.changwat,
      amphur: formData.amphur,
      department: formData.department,
      // application: ["CovidCenter"],
      updateDatetime: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    api.insertRegister(formDataFinal).then((result) => {
      if (result.success) {
        form.resetFields();
        setShowModalRegister(false);
      } else {
        console.log(result.error);
      }
    }).catch((error) => console.log(error));
  };
  const resetForm = () => {
    form.resetFields();
    setAmpurs("ทั้งหมด");
    setHospitals("ทั้งหมด");
    setFormData({
      changwat: { changwatcode: "", changwatname: "" },
      amphur: { amphur_id: "", amphur_name: "" },
      department: { hcode: "", hos_name: "", hos_fullname: "" }
    });
    form.setFieldsValue({ changwat: "ทั้งหมด", amphur: "ทั้งหมด", department: "ทั้งหมด" });
  };
  const onCancel = () => {
    resetForm();
    setShowModalRegister(false);
  };

  useEffect(() => {
    genChangwatOptions();
    return () => setChangwats("ทั้งหมด");
  }, [genChangwatOptions]);

  return (
    <Modal
      title="ลงทะเบียน"
      centered
      visible={showModalRegister}
      maskClosable={false}
      onOk={form.submit}
      onCancel={onCancel}
      okText="บันทึก"
      cancelText="ยกเลิก"
      okButtonProps={{ size: "middle", style: { fontSize: '.7em' }, loading: false }}
      cancelButtonProps={{ size: "middle", style: { fontSize: '.7em' } }}
    >
      <Form id="register" form={form} layout="vertical" onFinish={onFinish} hideRequiredMark>
        <Row gutter={12}>
          <Col span={12} xs={24} md={12}>
            <Form.Item
              name="fullname"
              label="ชื่อ-สกุล"
              validateTrigger="onBlur"
              rules={[{ required: true, message: 'กรุณาระบุชื่อนามสกุล' }]}
            >
              <Input name="fullname" placeholder="กรุณาระบุชื่อนามสกุล" />
            </Form.Item>
          </Col>
          <Col span={12} xs={24} md={12}>
            <Form.Item
              name="position"
              label="ตำแหน่ง"
              validateTrigger="onBlur"
              rules={[{ required: true, message: 'กรุณาระบุตำแหน่ง' }]}
            >
              <Input name="position" placeholder="กรุณาระบุตำแหน่ง" />
            </Form.Item>
          </Col>
          <Col span={12} xs={24} md={12}>
            <Form.Item
              name="cid"
              label="หมายเลขประจำตัวประชาชน"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: 'กรุณาระบุข้อมูล' },
                { required: true, pattern: new RegExp(/^[0-9]*$/g), message: 'ตัวเลขเท่านั้น' }
              ]}
            >
              <Input name="cid" placeholder="กรุณาระบุหมายเลขประจำตัวประชาชน" />
            </Form.Item>
          </Col>
          <Col span={12} xs={24} md={12}>
            <Form.Item
              name="mobile"
              label="หมายเลขโทรศัพท์"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: 'กรุณาระบุหมายเลขโทรศัพท์' },
                { required: true, pattern: new RegExp(/^[0-9]*$/g), message: 'ตัวเลขเท่านั้น' }
              ]}
            >
              <Input name="mobile" placeholder="กรุณาระบุหมายเลขโทรศัพท์" />
            </Form.Item>
          </Col>
          <Col span={12} xs={24} md={12}>
            <Form.Item
              name="email"
              label="อีเมลล์"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: 'กรุณาระบุอีเมลล์' },
                { required: true, pattern: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g), message: 'อีเมลล์ผิดรูปแบบ' }
              ]}
            >
              <Input name="email" type="email" placeholder="กรุณาระบุอีเมลล์" />
            </Form.Item>
          </Col>
          {/* <Col span={12} xs={24} md={12}>
            <Form.Item
              name="password"
              label="รหัสผ่าน"
              validateTrigger="onBlur"
              rules={[{ required: true, message: 'กรุณากำหนดรหัสผ่าน' },{min:6,message:"อย่างน้อย 6 ตัวอักษร"}]}
            >
              <Input name="password" type="password" placeholder="กรุณากำหนดรหัสผ่าน"/>
            </Form.Item>
          </Col> */}
          <Col span={8} xs={24} md={12}>
            <Form.Item
              name="changwat"
              label="จังหวัด"
              initialValue="ทั้งหมด"
              rules={[{ required: true, message: 'กรุณาเลือกจังหวัด' }]}
            >
              <Select
                showSearch
                size="middle"
                placeholder="เลือกจังหวัด"
                optionFilterProp="children"
                onChange={(e, option) => onChange({ name: "chw", value: e, option: option })}
                filterOption={(input: string, option) => {
                  return (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase());
                }}
              >
                {changwats}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} md={12}>
            <Form.Item
              name="amphur"
              label="อำเภอ"
              initialValue="ทั้งหมด"
              rules={[{ required: true, message: 'กรุณาเลือกอำเภอ' }]}
            >
              <Select
                showSearch
                placeholder="เลือกอำเภอ"
                optionFilterProp="children"
                onChange={(e, option) => onChange({ name: "amp", value: e, option: option })}
                filterOption={(input: string, option) =>
                  (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }
              >
                {ampurs}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} md={12}>
            <Form.Item
              name="department"
              label="หน่วยงาน"
              initialValue="ทั้งหมด"
              rules={[{ required: true, message: 'กรุณาเลือกหน่วยงาน' }]}
            >
              <Select
                showSearch
                placeholder="เลือกหน่วยงาน"
                optionFilterProp="children"
                onChange={(e, option) => onChange({ name: "hos", value: e, option: option })}
                filterOption={(input: string, option) => {
                  return (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase());
                }}
              >
                {hospitals}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Register;
