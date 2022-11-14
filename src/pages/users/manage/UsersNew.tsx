/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/reducers';
import { Col, Row, Table, Tooltip, Modal, Select, notification, DatePicker, Drawer, Form, Input, Space } from 'antd';
import Button from "antd-button-color";
import { SafetyOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig, } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMediaQuery } from 'react-responsive';
import { api } from 'src/services';
import { roles } from 'src/constants/roles';
import './usermanage.scss';
import moment from 'moment';
import { FixedHandleTokenErrors } from 'src/services/errors/error.service';
import { Trans } from 'react-i18next';
import qs from 'qs';
interface DataType {
  id: string;
  fullname: string;
  email: string;
  role: string;
  hos_name: string;
  changwat: { changwatname: string; };
}
interface Params {
  pagination?: TablePaginationConfig;
  sorter?: SorterResult<any> | SorterResult<any>[];
  filters?: Record<string, FilterValue>;
  total?: number;
  sortField?: string;
  sortOrder?: string;
}
interface CustomType {
  filter?: {
    where: { app: string; },
    include: {
      relation: string,
      scope: {
        where: {
          application: { in: [string]; };
        };
      };
    },
    order: string;
  };
  level?: string;
  rerender: boolean;
  setRerender: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const openNotificationWithIcon = (message: string, type: NotificationType) => {
  let status = '';
  switch (type) {
    case 'success': status = 'สำเร็จ'; break;
    case 'error': status = 'ไม่สำเร็จ'; break;
    default: status = '';
  }
  notification[type]({
    message: '',
    duration: 4,
    placement: 'bottomRight',
    description: message + status
  });
};
const UserNew: FC<CustomType> = ({ rerender, setRerender }) => {
  const globalState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [modalRole, setModalRole] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10 });
  const [currentUserEvent, setCurrentUserEvent] = useState<any>({});
  const [newRole, setNewRole] = useState<any>('');
  const token = globalState.auth.authToken || '';
  const columns: ColumnsType<DataType> = [
    {
      title: <Trans>pages.user_manage.col1</Trans>,
      dataIndex: 'fullname',
    },
    {
      title: <Trans>pages.user_manage.col2</Trans>,
      dataIndex: 'position',
      width: '25%',
    },
    {
      title: <Trans>pages.user_manage.col3</Trans>,
      dataIndex: 'email',
      width: '20%',
      responsive: ['md'],
    },
    {
      title: <Trans>pages.user_manage.col4</Trans>,
      dataIndex: ['hospital', 'hos_name'],
      width: '20%',
    },
    {
      title: <Trans>pages.user_manage.col6</Trans>,
      key: 'manage',
      dataIndex: 'manage',
      width: '60px',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="กำหนดสิทธิ์" overlayClassName="tooltipBtn" mouseLeaveDelay={0}>
            <Button
              size="small"
              type="success"
              with="link"
              icon={<SafetyOutlined />}
              onClick={() => {
                setCurrentUserEvent(record);
                setModalRole(true);
              }}>
            </Button>
          </Tooltip>
          <Tooltip title="ลบผู้ใช้งาน" overlayClassName="tooltipBtn" mouseLeaveDelay={0}>
            <Button
              size="small"
              type="danger"
              with="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                setCurrentUserEvent(record);
                confirmDelete(record.id);
              }}>
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  const getData = useCallback((params: Params = {}) => {
    if (token) {
      setLoading(true);
      const param = {
        filter: {
          include: {
            relation: "hospital",
            scope: {
              fields: {
                hos_id: true,
                hos_name: true,
                hos_fullname: true,
                hos_proid: true,
                hos_ampid: true,
                hos_tumid: true
              },
              include: [
                { relation: "changwat", scope: { fields: { changwatcode: true, changwatname: true } } },
                { relation: "amphur", scope: { fields: { amphur_id: true, amphur_name: true } } },
                { relation: "tambol", scope: { fields: { addressid: true, name: true } } }
              ]
            }
          }
        }
      };
      // console.log("getUsersNew Param",JSON.stringify(param));
      api.getUsersNew(param, token).then((results) => {
        // console.log("getUsersNew", results);
        if (results.success) {
          const data = results.response.data;
          setData(data);
          setLoading(false);
          setPagination({
            ...params.pagination,
            total: data.length,
          });
        }
      }).catch((response: any) => FixedHandleTokenErrors(response, dispatch));
    }
  }, [rerender]);
  const getRoles = useCallback(() => {
    const op = Object.keys(roles).filter(key => (roles[key]["status"])).map(function (key: string) {
      return <Option key={roles[key].roleId} value={roles[key].name}>{roles[key].displayName}</Option>;
    });
    return op;
  }, [roles]);
  const checkUser = useCallback((user) => {
    // console.log("checkUser",user);
    setLoading(true);
    if (token) {
      api.getUser({ filter: { where: { email: user.email } } }, token).then((results) => {
        // console.log("getUser", results);
        if (results.success) {
          const checkData = results.response.data;
          if (checkData.length > 0) {
            const userId = results.response.data[0].id;
            const application = results.response.data[0].application;
            const informConsent = results.response.data[0].informConsent;
            updateUser(user, userId, application, informConsent);
          } else {
            insertUser(user);
          }
        } else {
          console.log(results.error);
          setLoading(false);
        }
      }).catch((response: any) => FixedHandleTokenErrors(response, dispatch));
    } else {
      console.log("No Token");
    }
  }, [newRole]);
  const insertUser = useCallback(async (UIF: any = null) => {
    // เตรียมข้อมูลสำหรับเพิ่ม Teamuser
    const registerId = UIF.id;
    let userInfo = Object.assign({}, UIF);
    const hospital = userInfo.hospital;
    delete userInfo.hospital;
    userInfo.password = userInfo.cid;
    userInfo.department = {
      hcode: hospital.hos_id,
      hos_name: hospital.hos_name,
      hos_fullname: hospital.hos_fullname
    };
    userInfo.changwat = {
      changwatcode: hospital.changwat.changwatcode,
      changwatname: hospital.changwat.changwatname
    };
    userInfo.amphur = {
      amphur_id: hospital.amphur.amphur_id,
      amphur_name: hospital.amphur.amphur_name
    };
    userInfo.tambon = {
      tambon_id: hospital.tambol.addressid,
      tambon_name: hospital.tambol.name
    };
    userInfo.application = ["CovidCenter"];
    userInfo.updateDatetime = moment().format('YYYY-MM-DD HH:mm:ss');
    delete userInfo.id;
    console.log("insertUser Param", userInfo);
    api.insertUser(token, userInfo).then((R1) => {// เพิ่มข้อมูล user ใน teamuser
      console.log("insertUser", R1);
      if (R1.success) {
        const newUserId = R1.response.data.id;
        const userRoles = {
          principalType: "CovidCenter",
          principalId: newUserId,
          roleId: newRole.key,
          approveBy: globalState.user.user_id,
          approveDateTime: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        // console.log("insertUserRole Param", userRoles);
        api.insertUserRole(token, userRoles).then((R2) => { // เพิ่ม UserRole ใหม่เข้าไป
          console.log("insertUserRole", R2);
          if (R2.success) {
            const deleteParam = { id: registerId, token: token };
            // console.log("deleteRegister Param", deleteParam);
            api.deleteRegister(deleteParam).then((R3) => {// ลบข้อมูลการลงทะเบียนใน register_temp
              let html = "<span style='font-weight:bold;'>ผู้ดูแลระบบได้อนุมัติการใช้งานให้คุณเรียบร้อยแล้ว</span><br><br>";
              html += "Username คือ อีเมลล์<br>";
              html += "Password คือ หมายเลขบัตรประชาชน<br><br>";
              html += "คุณสามารถเข้าสู่ระบบได้โดย <a href='https://cloud-npm.moph.go.th' target='_blank'>คลิกที่นี่</a><br><br>";
              const paramSendEMail = {
                to: userInfo.email,
                subject: "แจ้งอนุมัติการใช้งาน",
                text: "",
                html: html,
                access_token: token
              };
              const params = qs.stringify(paramSendEMail, { arrayFormat: 'repeat' });
              api.sendEmail(params, token).then((result: any) => {
                // console.log(result);
              }).catch((response: any) => { console.log(response); FixedHandleTokenErrors(response, dispatch); });
              getData({ pagination });
              setModalRole(false);
            }).catch((err) => {
              console.log(err);
              setLoading(false);
            });
          } else {
            console.log(R2.error);
            setLoading(false);
          }
        }).catch((response: any) => { setLoading(false); FixedHandleTokenErrors(response, dispatch); });
      } else {
        console.log(R1.error);
        setLoading(false);
      }
    }).catch((response: any) => { setLoading(false); FixedHandleTokenErrors(response, dispatch); });
  }, [newRole]);
  const updateUser = useCallback(async (UIF: any = null, UID: string, APP: Array<string>, IC: any) => {
    const registerId = UIF.id;
    let userInfo = Object.assign({}, UIF);
    // console.log("updateUser",userInfo);
    const hospital = userInfo.hospital;
    APP.push("CovidCenter");
    delete userInfo.hospital;
    userInfo.password = userInfo.cid;
    userInfo.department = {
      hcode: hospital.hos_id,
      hos_name: hospital.hos_name,
      hos_fullname: hospital.hos_fullname
    };
    userInfo.amphur = {
      amphur_id: hospital.amphur.amphur_id,
      amphur_name: hospital.amphur.amphur_name
    };
    userInfo.tambon = {
      tambon_id: hospital.tambol.addressid,
      tambon_name: hospital.tambol.name
    };
    userInfo.application = APP;
    userInfo.informConsent = ({ ...IC, CovidCenter: { inform: { result: true } } });
    delete userInfo.id;
    const updateUserParam = {
      userId: UID,
      token: token,
      data: userInfo
    };
    // console.log("updateUser Param", updateUserParam);
    api.updateUser(updateUserParam).then((R1) => {
      // console.log("updateUser", R1);
      if (R1.success) {
        const insertUserRoleParam = {
          principalType: "CovidCenter",
          principalId: UID,
          roleId: newRole.key,
          approveBy: globalState.user.user_id,
          approveDateTime: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        // console.log("insertUserRole Param", insertUserRoleParam);
        api.insertUserRole(token, insertUserRoleParam).then((R2) => { // เพิ่ม UserRole ใหม่เข้าไป
          // console.log("insertUserRole", R2);
          if (R2.success) {
            const deleteParam = { id: registerId, token: token };
            // console.log("deleteRegister Param", deleteParam);
            api.deleteRegister(deleteParam).then((R3) => {// ลบข้อมูลการลงทะเบียนใน register_temp
              // console.log("deleteRegister", R3);
              if (R3.success) {
                let html = "<span style='font-weight:bold;'>ผู้ดูแลระบบได้อนุมัติการใช้งานให้คุณเรียบร้อยแล้ว</span><br><br>";
                html += "Username คือ อีเมลล์<br>";
                html += "Password คือ หมายเลขบัตรประชาชน<br><br>";
                html += "คุณสามารถเข้าสู่ระบบได้โดย <a href='https://cloud-npm.moph.go.th' target='_blank'>คลิกที่นี่</a><br><br>";
                const paramSendEMail = {
                  to: userInfo.email,
                  subject: "แจ้งอนุมัติการใช้งาน",
                  text: "",
                  html: html,
                  access_token: token
                };
                const params = qs.stringify(paramSendEMail, { arrayFormat: 'repeat' });
                api.sendEmail(params, token).then((result: any) => {
                  // console.log(result);
                }).catch((response: any) => { console.log(response); FixedHandleTokenErrors(response, dispatch); });
                getData({ pagination });
                setModalRole(false);
              } else {
                console.log(R3.error);
                setLoading(false);
              }
            }).catch((response: any) => { console.log(response); setLoading(false); FixedHandleTokenErrors(response, dispatch); });
          } else {
            console.log(R2.error);
            setLoading(false);
          }
        }).catch((response: any) => { console.log(response); setLoading(false); FixedHandleTokenErrors(response, dispatch); });
      } else {
        console.log(R1.error);
        setLoading(false);
      }
    }).catch((response: any) => { console.log(response); setLoading(false); FixedHandleTokenErrors(response, dispatch); });
  }, [newRole]);
  const deleteUser = (userId: string) => {
    setBtnLoading(true);
    api.deleteRegister({ id: userId, token: token }).then((R1) => {
      console.log("deleteRegisterTemp", R1);
      if (R1.success) {
        getData({ pagination });
        setBtnLoading(false);
      } else {
        console.log(R1.error);
        setBtnLoading(false);
      }
    }).catch((err) => {
      console.log(err);
      setBtnLoading(false);
    });
  };
  const confirmDelete = (userId: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      icon: <ExclamationCircleOutlined />,
      content: 'คุณต้องการลบคำขอลงทะเบียนนี้ใช่หรือไม่',
      okText: 'ลบ',
      okButtonProps: { loading: btnLoading },
      cancelText: 'ยกเลิก',
      onOk: () => deleteUser(userId),

    });
  };
  useEffect(() => {
    if (rerender) {
      // console.log("Rerender Table UserNew ", rerender);
      getData({ pagination });
    }
    return () => { setRerender(false); };
  }, [rerender]);

  useEffect(() => { getData({ pagination }); }, []);

  // const handleTableChange = (params: Params) => getData(params);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            // onChange={handleTableChange}
            expandable={(isMobile) ? {
              expandedRowRender: (record) => {
                let level = '';
                switch (record.role) {
                  case 'AdminR8': level = 'ผู้ดูแลระบบ'; break;
                  case 'Board': level = 'ผู้บริหาร'; break;
                  case 'Guest': level = 'ผู้ใช้งานทั่วไป'; break;
                  default: level = '';
                }
                return (<div style={{ margin: '0 0 0 27px' }}>
                  อีเมลล์ : {record.email}<br />
                  จังหวัด : {record.changwat.changwatname}<br />
                  สิทธิ์การใช้งาน : {level}<br />
                </div>);
              }
            } : {}}
          />
        </Col>
      </Row>
      <Modal
        title="อนุมัติการใช้งาน"
        centered
        width={300}
        visible={modalRole}
        afterClose={() => setCurrentUserEvent({})}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" size="small" onClick={() => { setLoading(false); setModalRole(false); }}>ยกเลิก</Button>,
          <Button key="submit" size="small" type="primary" loading={loading} onClick={() => checkUser(currentUserEvent)}>บันทึก</Button>
        ]}
      >
        <Select
          placeholder="เลือกระดับสิทธิ์การใช้งาน"
          onChange={(_, op) => setNewRole(op)}
          value={currentUserEvent.role}
          defaultValue={currentUserEvent.role}
          allowClear
        >
          {getRoles()}
        </Select>
      </Modal>
    </div>
  );
};
export default UserNew;