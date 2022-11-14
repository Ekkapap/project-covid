/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useState } from 'react';
import { Col, Row, Tabs, Button } from 'antd';
import './usermanage.scss';
import UserAll from './UsersManage';
import UserNew from './UsersNew';
import { Trans } from 'react-i18next';
const { TabPane } = Tabs;

const UserManage: FC = () => {
  // const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [userAll, setUserAll] = useState(false);
  const [userNew, setUserNew] = useState(false);
  return (
    <div id="usermanage" style={{ paddingBottom: '48px' }}>
      {' '}
      <Row style={{ marginBottom: '0.8rem' }}>
        <Col xs={24} md={24} className="text-header-main">
          <Trans>pages.user_manage.header</Trans>
        </Col>
      </Row>
      <Row style={{ marginBottom: '1.6rem' }}>
        <Col xs={24} md={24} style={{ fontSize: '0.8rem' }}>
          <div style={{ padding: 3, backgroundColor: '#e4f5ff', fontSize: 13, display: 'flex', alignItems: 'center' }}>
            <Trans>pages.user_manage.detail</Trans>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Tabs defaultActiveKey="2" type="card" size="middle" style={{ margin: '0 8px 16px 8px', width: '100%' }}>
          <TabPane tab={<Button type="text" onClick={() => setUserNew(true)}><Trans>pages.user_manage.tab1</Trans></Button>} key="1">
            <UserNew rerender={userNew} setRerender={setUserNew} />
          </TabPane>
          <TabPane tab={<Button type="text" onClick={() => setUserAll(true)}><Trans>pages.user_manage.tab2</Trans></Button>} key="2">
            <UserAll rerender={userAll} setRerender={setUserAll} />
          </TabPane>
        </Tabs>
      </Row>
    </div >
  );
};
export default UserManage;