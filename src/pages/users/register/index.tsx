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
import { FixedHandleTokenErrors } from 'src/services/errors/error.service';
import { logoutAction } from 'src/actions/auth/auth.action';
interface ParentProps {
  showModalRegister: boolean;
  setShowModalRegister: Dispatch<SetStateAction<boolean>>;
  editStatus: boolean;
  setEditStatus: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;
const Register: FC<ParentProps> = ({ showModalRegister, setShowModalRegister, editStatus, setEditStatus }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const globalState = useSelector((state: RootState) => state);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const userInfo = globalState.user;
  const dispatch = useDispatch();
  const { hospitalpart } = address;
  // const [changwats, setChangwats] = useState<ReactNode>("ทั้งหมด");
  // const [ampurs, setAmpurs] = useState<ReactNode>("ทั้งหมด");
  const [hospitals, setHospitals] = useState<ReactNode>("ทั้งหมด (พิมพ์ค้นหาได้)");
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    department: { hcode: "", hos_name: "ทั้งหมด (พิมพ์ค้นหาได้)", hos_fullname: "" }
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
  // const genChangwatOptions = useCallback(async () => {
  //   const chw = Object.keys(changwatpart).map(function (key: string) { return <Option key={key} value={changwatpart[key]["chwcode"]}>{changwatpart[key]["chwname"]}</Option>; });
  //   setChangwats(chw);
  // }, [setChangwats, changwatpart]);
  // const genAmpurOptions = useCallback(async (filter: any) => {
  //   let amp: ReactNode = undefined;
  //   if (filter) {
  //     amp = Object.keys(filter).map(function (key: string) { return <Option key={key} value={filter[key]["ampcode"]}>{filter[key]["ampname"]}</Option>; });
  //   } else {
  //     amp = Object.keys(ampurpart).map(function (key: string) { return <Option key={key} value={ampurpart[key]["ampcode"]}>{ampurpart[key]["ampname"]}</Option>; });
  //   }
  //   setAmpurs(amp);
  // }, [setAmpurs, ampurpart]);
  const genHospitalOptions = useCallback(async (filter: any = null) => {
    let hos: ReactNode = undefined;
    if (filter) {
      hos = Object.keys(filter).filter((key) => {
        console.log(key)
      }).map(function (key: string) {
        return <Option key={key} value={filter[key]["hcode"]}>{prefix("hos", filter[key]["hname"])}</Option>; 
      });
    } else {
      hos = Object.keys(hospitalpart).filter((key) => {
          if(['38', '39', '41', '42', '43', '47','48'].includes(hospitalpart[key]["chw"])){
            return hospitalpart[key];
          }
        }).sort((a: any, b: any) => {
          return hospitalpart[a]["chw"] + hospitalpart[a]["hcode"] > hospitalpart[b]["chw"] + hospitalpart[b]["hcode"] ? 1 : -1;
        })
        .map(function (key: string) {
          return <Option key={key} value={hospitalpart[key]["hcode"]}>{hospitalpart[key]["hcode"] + ":" + prefix("hos", hospitalpart[key]["hname"])}</Option>;
        });
    }
    setHospitals(hos);
  }, [setHospitals, hospitalpart]);

  const onChange = (e: any) => {
    // if (e.name == "chw") {
    //   const ampursFilter = Object.fromEntries(Object.entries(ampurpart).filter(([key]) => {
    //     if (ampurpart[key]["chwcode"] == "") {
    //       return true;
    //     } else {
    //       return (ampurpart[key]["chwcode"] == e.value);
    //     }
    //   }));
    //   setFormData({
    //     ...formData,
    //     changwat: { changwatcode: e.value, changwatname: e.option.children },
    //     amphur: { amphur_id: "", amphur_name: "" },
    //     department: { hcode: "", hos_name: "", hos_fullname: "" }
    //   });
    //   setHospitals(null);
    //   genAmpurOptions(ampursFilter);
    //   form.setFieldsValue({ amphur: "ทั้งหมด", department: "ทั้งหมด" });
    // }
    // if (e.name == 'amp') {
    //   const filterAmphurcodefull = formData.changwat.changwatcode + e.value;
    //   const hospitalsFilter = Object.fromEntries(Object.entries(hospitalpart).filter(([key]) => {
    //     const amphurcodefull = hospitalpart[key]["chw"] + hospitalpart[key]["amp"];
    //     return (amphurcodefull == filterAmphurcodefull);
    //   }));
    //   genHospitalOptions(hospitalsFilter);
    //   setFormData({
    //     ...formData,
    //     amphur: { amphur_id: e.value, amphur_name: e.option.children },
    //     department: { hcode: "", hos_name: "", hos_fullname: "" }
    //   });
    //   form.setFieldsValue({ department: "ทั้งหมด" });
    // }
    if (e.name == 'hos') {
      const hosfullname = prefix("hoslong", e.option.children) || '';
      setFormData({ ...formData, department: { hcode: e.value, hos_name: e.option.children.trim(), hos_fullname: hosfullname.trim() } });
    }
  };

  const onFinish = async (formValue: any) => {
    // console.log(editStatus);
    if (editStatus) {
      const token = globalState.auth.authToken || '';
      const updateId = globalState.user.user_id;
      const formDataFinal = {
        fullname: formValue.fullname,
        position: formValue.position,
        cid: formValue.cid,
        mobile: formValue.mobile,
        email: formValue.email.toLowerCase(),
        hos_id: form.getFieldValue("department"),
        department: {},
        changwat: {},
        amphur: {},
        tambon: {},
        updateDatetime: moment().format('YYYY-MM-DD HH:mm:ss')
      };

      api.getHospital(token, formDataFinal.hos_id).then((response) => {
        // console.log(response);
        if (response.success) {
          const hospital = response.response.data[0];
          formDataFinal.department = {
            hcode: hospital.hos_id,
            hos_name: hospital.hos_name,
            hos_fullname: hospital.hos_fullname
          };
          formDataFinal.changwat = {
            changwatcode: hospital.changwat.changwatcode,
            changwatname: hospital.changwat.changwatname
          };
          formDataFinal.amphur = {
            amphur_id: hospital.amphur.amphur_id,
            amphur_name: hospital.amphur.amphur_name
          };
          formDataFinal.tambon = {
            tambon_id: hospital.tambol.addressid,
            tambon_name: hospital.tambol.name
          };
          // console.log(formDataFinal);
          const updateUserParam = {
            userId: updateId,
            token: token,
            data: formDataFinal
          };
          // console.log("updateUser Param", updateUserParam);
          api.updateUser(updateUserParam).then((R1) => {
            if (R1.success) {
              setBtnLoading(false);
              dispatch(logoutAction.request(token));
            }
          }).catch((response: any) => { setBtnLoading(false); FixedHandleTokenErrors(response, dispatch); });
        }
      }).catch((response: any) => { setBtnLoading(false); FixedHandleTokenErrors(response, dispatch); });
      setBtnLoading(false);
    } else {
      const formDataFinal = {
        fullname: formValue.fullname,
        position: formValue.position,
        cid: formValue.cid,
        mobile: formValue.mobile,
        email: formValue.email.toLowerCase(),
        hos_id: formData.department.hcode,
        informConsent: {
          CovidCenter: {
            inform: { register: true }
          }
        },
        updateDatetime: moment().format('YYYY-MM-DD HH:mm:ss')
      };
      // console.log(formData);
      // console.log(formDataFinal);
      api.insertRegister(formDataFinal).then((result) => {
        if (result.success) {
          form.resetFields();
          setShowModalRegister(false);
          setStatusModal(true);
        } else {
          console.log(result.error);
        }
      }).catch((error) => console.log(error));
    }
  };
  const resetForm = () => {
    form.resetFields();
    // setAmpurs("ทั้งหมด");
    // setHospitals("ทั้งหมด (พิมพ์ค้นหาได้)");
    setFormData({
      department: { hcode: "", hos_name: "", hos_fullname: "" }
    });
    form.setFieldsValue({ department: "ทั้งหมด (พิมพ์ค้นหาได้)" });
  };
  const onCancel = () => {
    resetForm();
    setBtnLoading(false);
    setEditStatus(false);
    setShowModalRegister(false);
  };

  useEffect(() => {
    if (editStatus) {
      genHospitalOptions();
      form.setFieldsValue({
        fullname: userInfo.name,
        position: userInfo.position,
        cid: userInfo.cid,
        mobile: userInfo.mobile,
        email: userInfo.email?.toLowerCase(),
        department: userInfo.department.hoscode
      });
    } else {
      genHospitalOptions();
    }
    // return () => setEditStatus(false);
    return () => setHospitals("ทั้งหมด (พิมพ์ค้นหาได้)");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editStatus, userInfo, form, genHospitalOptions]);
  return (
    <div>
      <Modal
        title={(editStatus) ? "แก้ไขข้อมูลส่วนตัว" : "ลงทะเบียน"}
        centered
        visible={showModalRegister}
        maskClosable={false}
        okText="บันทึก"
        cancelText="ยกเลิก"
        okButtonProps={{ size: "middle", style: { fontSize: '.7em' }, loading: false }}
        cancelButtonProps={{ size: "middle", style: { fontSize: '.7em' } }}
        footer={[
          <Button key="cancel" size="middle" onClick={() => onCancel()}>ยกเลิก</Button>,
          <Button key="submit" size="middle" type="primary" loading={btnLoading} onClick={() => form.submit()}>{(editStatus) ? "บันทึกการแก้ไข" : "บันทึก"}</Button>
        ]}
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
                  // value={form.getFieldValue("department")}
                  onChange={(e, option) => onChange({ name: "hos", value: e, option: option })}
                  filterOption={(input: string, option) => {
                    return (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase());
                  }}
                >
                  {hospitals}
                </Select>
              </Form.Item>
            </Col>
            {(editStatus) && (
              <Col span={12} xs={24} md={24} style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <span style={{ color: "red" }}>หลังจากแก้ไขข้อมูลสำเร็จ จะต้องเข้าสู่ระบบใหม่</span>
              </Col>
            )}
          </Row>
        </Form>
      </Modal>
      <Modal
        title=""
        centered
        visible={statusModal}
        onCancel={()=>setStatusModal(false)}
        footer={null}
      >
        <Row gutter={12} style={{margin:"1rem 0 1rem 0"}}>
          <Col span={12} xs={24} md={24} style={{textAlign:"center"}}>
            <p style={{color:"green"}}>ลงทะเบียนสำเร็จแล้ว</p>
            <p style={{color:"green"}}>กรุณารอผู้ดูแลระบบอนุมัติการใช้งาน</p>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Register;
