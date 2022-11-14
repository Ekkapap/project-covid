/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/reducers';
import { Col, Row, Table, Tooltip, Modal, Select, notification, DatePicker, Drawer, Form, Input, Space } from 'antd';
import Button from 'antd-button-color';
import { SafetyOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMediaQuery } from 'react-responsive';
import { api } from 'src/services';
import './usermanage.scss';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FixedHandleTokenErrors } from 'src/services/errors/error.service';
import { roles } from 'src/constants/roles';
import { Trans, useTranslation } from 'react-i18next';
interface DataType {
  id: string;
  fullname: string;
  email: string;
  role: { id: string, roleMappingId: string; };
  roleId: string;
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
    where: { app: string; };
    include: {
      relation: string;
      scope: {
        where: {
          application: { in: [string]; };
        };
      };
    };
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
    case 'success':
      status = 'สำเร็จ';
      break;
    case 'error':
      status = 'ไม่สำเร็จ';
      break;
    default:
      status = '';
  }
  notification[type]({
    message: '',
    duration: 4,
    placement: 'bottomRight',
    description: message + status,
  });
};
const UserAll: FC<CustomType> = ({ rerender, setRerender }) => {
  const dispatch = useDispatch();
  const globalState = useSelector((state: RootState) => state);
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [modalRole, setModalRole] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10 });
  const token = globalState.auth.authToken || '';
  const [currentUserEvent, setCurrentUserEvent] = useState<any>({});
  const [newRole, setNewRole] = useState<any>('');
  const { t } = useTranslation('translation', { keyPrefix: 'pages.user_manage.modal.role' });
  const columns: ColumnsType<DataType> = [
    {
      title: <Trans>pages.user_manage.col1</Trans>,
      dataIndex: 'fullname',
    },
    {
      title: <Trans>pages.user_manage.col2</Trans>,
      dataIndex: 'email',
      width: '20%',
      responsive: ['md'],
    },
    {
      title: <Trans>pages.user_manage.col3</Trans>,
      dataIndex: ['department', 'hos_name'],
      width: '20%',
    },
    {
      title: <Trans>pages.user_manage.col4</Trans>,
      dataIndex: ['changwat', 'changwatname'],
      width: '15%',
      responsive: ['md'],
      render: (text) => 'จ.' + text,
    },
    {
      title: <Trans>pages.user_manage.col5</Trans>,
      dataIndex: ['role', 'id'],
      width: '12%',
      responsive: ['md'],
      render: (roleId) => {
        const roleText = getRole(roleId);
        return roleText;
      },
    },
    {
      title: <Trans>pages.user_manage.col6</Trans>,
      key: 'manage',
      dataIndex: 'manage',
      width: '60px',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title={<Trans>pages.user_manage.roleBtn</Trans>} overlayClassName='tooltipBtn' mouseLeaveDelay={0}>
            <Button
              size='small'
              type='success'
              with='link'
              icon={<SafetyOutlined />}
              onClick={() => {
                setCurrentUserEvent(record);
                setModalRole(true);
              }}></Button>
          </Tooltip>
          {/* <Tooltip title="แกไขผู้ใช้งาน" overlayClassName="tooltipBtn" mouseLeaveDelay={0}>
            <Button
              size="small"
              type="warning"
              with="link"
              icon={<EditOutlined />}
              onClick={showDrawer}>
            </Button>
          </Tooltip> */}
          <Tooltip title={<Trans>pages.user_manage.delBtn</Trans>} overlayClassName='tooltipBtn' mouseLeaveDelay={0}>
            <Button
              size='small'
              type='danger'
              with='link'
              icon={<DeleteOutlined />}
              onClick={() => {
                setCurrentUserEvent(record);
                confirmDelete(record);
              }}></Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  const getRole = useCallback((roleId) => {
    return Object.keys(roles).filter(key => (roles[key]["roleId"] == roleId)).map(function (key: string) {
      return roles[key].displayName;
    });
  }, [roles]);
  const getRoles = useCallback(() => {
    const op = Object.keys(roles).filter(key => (roles[key]["status"])).map(function (key: string) {
      return <Option key={roles[key].roleId} value={roles[key].name}>{t(roles[key].name)}</Option>;
    });
    return op;
  }, [roles]);
  const getData = useCallback((params: Params = {}) => {
    setLoading(true);
    const param = {
      filter: {
        fields: {
          id: true,
          fullname: true,
          position: true,
          cid: true,
          email: true,
          mobile: true,
          application: true,
          principalId: true,
          roleId: true,
          hos_id: true
        },
        where: { application: { in: ["CovidCenter"] } },
        include: [
          {
            relation: "RoleMapping",
            scope: {
              where: { principalType: "CovidCenter" },
              include: {
                relation: "Role",
                scope: {
                  fields: { id: true, name: true, created: true, modified: true }
                }
              }
            }
          },
          {
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
        ]
      },
      order: 'dupdate DESC',
    };
    api.getUsers(param, token).then((results) => {
      if (results.success) {
        const response = results.response.data;
        const dataTable = Object.keys(response).map(function (key: string) {
          const userData = response[key];
          userData.role = response[key].RoleMapping.Role;
          userData.role.roleMappingId = response[key].RoleMapping.id;
          userData.department = {
            hos_id: response[key].hospital.hos_id,
            hos_name: response[key].hospital.hos_name,
            hos_fullname: response[key].hospital.hos_fullname
          };
          userData.changwat = response[key].hospital.changwat;
          userData.amphur = response[key].hospital.amphur;
          userData.tambon = response[key].hospital.tambol;
          delete userData.hospital;
          delete userData.RoleMapping;
          return userData;
        });
        // console.log(dataTable);
        setData(dataTable);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: dataTable.length,
        });
      }
    }).catch((response: any) => { setLoading(false); setBtnLoading(false); FixedHandleTokenErrors(response, dispatch); });
  }, []);
  const deleteUser = (USERINFO: any) => {
    setBtnLoading(true);
    const APP = USERINFO.application;
    const UID = USERINFO.id;
    const ROLEMAPPINGID = USERINFO.role.roleMappingId;

    if (APP.length == 1 && APP[0] == "CovidCenter") { // user มี app covidcenter อย่างเดียว ให้ลบออกจาก teamuser ได้เลย
      api.deleteUser({ id: UID, token: token }).then((R1) => {
        console.log('deleteUser', R1);
        if (R1.success) {
          api.deleteUserRole({ roleMappingId: ROLEMAPPINGID, token: token }).then((R2) => {
            console.log('deleteUserRole', R2);
            if (R2.success) {
              getData({ pagination });
            } else {
              console.log(R2.error);
            }
            setBtnLoading(false);
          }).catch((response: any) => { setBtnLoading(false); FixedHandleTokenErrors(response, dispatch); });
        } else {
          console.log(R1.error);
          setBtnLoading(false);
        }
      }).catch((response: any) => { setBtnLoading(false); FixedHandleTokenErrors(response, dispatch); });
    } else { // user มี  app อื่นๆ ด้วย ให้ลบ CovidCenter ออกจาก Application ไม่ต้องลบออกจาก teamuser
      const updateUserParam = {
        userId: UID,
        token: token,
        data: { application: APP.filter((obj: any) => (obj !== "CovidCenter")) }
      };
      console.log("updateUser Param", updateUserParam);
      api.updateUser(updateUserParam).then((R1) => {
        console.log("updateUser", R1);
        if (R1.success) {
          api.deleteUserRole({ roleMappingId: ROLEMAPPINGID, token: token }).then((R2) => {
            console.log('deleteUserRole', R2);
            if (R2.success) {
              getData({ pagination });
            } else {
              console.log(R2.error);
            }
            setBtnLoading(false);
          }).catch((response: any) => { setBtnLoading(false); FixedHandleTokenErrors(response, dispatch); });
        }
      }).catch((response: any) => { setBtnLoading(false); FixedHandleTokenErrors(response, dispatch); });
    }

  };
  useEffect(() => {
    if (rerender) {
      // console.log('Rerender Table UserAll ', rerender);
      getData({ pagination });
    }
    return () => {
      setRerender(false);
    };
  }, [rerender]);
  useEffect(() => {
    getData({ pagination });
  }, []);
  // useEffect(() => { //DEBUG
  //   console.log("currentUserEvent",currentUserEvent);
  // }, [currentUserEvent]);
  // const handleTableChange = (params: Params) => getData(params);
  const handleRoleSave = async () => {
    setBtnLoading(true);
    const param = { userId: currentUserEvent.id, token: globalState.auth.authToken };
    api.getUserRoles(null, param).then((response) => {
      if (response.success) {
        const roleMapping = response.response.data[0];
        const roleMappingId = roleMapping.id;
        delete roleMapping.id;
        delete roleMapping.Role;
        roleMapping.roleId = newRole.key;
        roleMapping.approveBy = globalState.user.user_id;
        roleMapping.approveDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const payload = {
          roleMappingId: roleMappingId,
          token: globalState.auth.authToken,
          data: roleMapping,
        };
        api.updateUserRole(payload).then((response) => {
          if (response.success) {
            openNotificationWithIcon('บันทึกสิทธิ์การใช้งาน', 'success');
            getData({ pagination });

          } else {
            openNotificationWithIcon('บันทึกสิทธิ์การใช้งาน', 'error');
            console.log(response.error);
          }
          setBtnLoading(false);
          setModalRole(false);
        }).catch((response: any) => { setBtnLoading(false); FixedHandleTokenErrors(response, dispatch); });
      } else {
        setBtnLoading(false);
        openNotificationWithIcon('บันทึกสิทธิ์การใช้งาน', 'error');
        console.log(response.error);
      }
    }).catch((response: any) => { setBtnLoading(false); FixedHandleTokenErrors(response, dispatch); });
  };
  const confirmDelete = (record: any) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      icon: <ExclamationCircleOutlined />,
      content: 'คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่',
      okText: 'ลบผู้ใช้งาน',
      okButtonProps: { loading: btnLoading },
      cancelText: 'ยกเลิก',
      onOk: () => deleteUser(record),
    });
  };
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            // onChange={handleTableChange}
            expandable={
              isMobile
                ? {
                  expandedRowRender: (record) => {
                    const roleText = getRole(record.role.id);
                    return (
                      <div style={{ margin: '0 0 0 27px' }}>
                        อีเมลล์ : {record.email}
                        <br />
                        จังหวัด : {record.changwat.changwatname}
                        <br />
                        สิทธิ์การใช้งาน : {roleText}
                        <br />
                      </div>
                    );
                  },
                }
                : {}
            }
          />
        </Col>
      </Row>
      <Modal
        title={<Trans>pages.user_manage.modal.header</Trans>}
        centered
        width={300}
        visible={modalRole}
        okText='บันทึก'
        cancelText='ปิด'
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
        afterClose={() => setCurrentUserEvent({})}
        footer={[
          <Button key="cancel" size="small" onClick={() => { setLoading(false); setModalRole(false); }}><Trans>pages.user_manage.modal.btn.cancel</Trans></Button>,
          <Button key="submit" size="small" type="primary" loading={loading} onClick={() => handleRoleSave()}><Trans>pages.user_manage.modal.btn.save</Trans></Button>
        ]}
        destroyOnClose={true}>
        <Select
          placeholder='เลือกระดับสิทธิ์การใช้งาน'
          onChange={(_, op) => setNewRole(op)}
          // value={currentUserEvent.role?.name||""}
          defaultValue={currentUserEvent.role?.name || ""}
          allowClear>
          {getRoles()}
        </Select>
      </Modal>
    </div>
  );
};
export default UserAll;
