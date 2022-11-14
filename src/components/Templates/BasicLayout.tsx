/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Col, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, IdcardOutlined, KeyOutlined, CarryOutOutlined } from '@ant-design/icons';
import './style.less';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducers';
import { useMediaQuery } from 'react-responsive';
import { MenuOutlined } from '@ant-design/icons';
import { sideMenu } from 'src/constants/menu';
import moment from 'moment';
import i18n from 'src/i18n';
import { Link } from 'react-router-dom';
import InFormRegister from 'src/pages/users/consent/inform_register';
import InFormLogin from 'src/pages/users/consent/inform_login';
const { Header, Content, Footer, Sider } = Layout;

const BasicLayout = (props: any) => {
  const { children, appstore, location, appconfig } = props;
  const { auth, user } = useSelector((state: RootState) => state);
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [collapsed, setcollapsed] = useState(isMobile ? true : false);
  const root = '/' + location.pathname.split('/')[1];
  const [showModalInformRegister, setShowModalInformRegister] = useState(false);
  const [showModalInformLogin, setShowModalInformLogin] = useState(false);
  const menu = (
    <Menu
      style={{ padding: '6px' }}
      items={[
        {
          key: '1',
          label: (
            <Link to='/profile' style={{ fontSize: '.85em' }}>
              <IdcardOutlined /> ข้อมูลส่วนตัว
            </Link>
          ),
        },
        // {
        //   key: '2',
        //   label: (
        //     <Link
        //       to='#'
        //       onClick={(e) => {
        //         e.preventDefault();
        //         setShowModalConsent(true);
        //       }}
        //       style={{ fontSize: '.85em' }}>
        //       <CarryOutOutlined /> Inform
        //     </Link>
        //   ),
        // },
        {
          key: '3',
          label: (
            <Link to='/chpass' style={{ fontSize: '.85em' }}>
              <KeyOutlined /> เปลี่ยนรหัสผ่าน
            </Link>
          ),
        },
        {
          key: '4',
          label: (
            <Link to='/logout' style={{ fontSize: '.85em' }}>
              <LogoutOutlined /> ออกจากระบบ
            </Link>
          ),
        },
      ]}
    />
  );
  useEffect(() => {
    if (isMobile) {
      setcollapsed(true);
    } else {
      setcollapsed(false);
    }
  }, [isMobile]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    props.onLanguageChangd(lng);
  };
  useEffect(() => {
    if (auth.loggedInSuccess && user.informConsent?.CovidCenter?.inform?.register !== true) {
      setShowModalInformRegister(true);
    } else {
      setShowModalInformRegister(false);
    }
  }, [showModalInformRegister, auth.loggedInSuccess, user.informConsent]);
  useEffect(() => {
    if (auth.loggedInSuccess && user.informConsent?.CovidCenter?.inform?.login !== true) {
      setShowModalInformLogin(true);
    } else {
      setShowModalInformLogin(false);
    }
  }, [showModalInformLogin, auth.loggedInSuccess, user.informConsent]);
  return (
    <Layout id='components-layout-demo-fixed'>
      <Header
        style={{
          position: 'fixed',
          zIndex: 2,
          width: '100%',
          backgroundColor: 'black',
          borderBottom: '8px solid #1c58a5',
          padding: isMobile ? '0 15px' : undefined,
        }}>
        <Row>
          <Col xs={22} md={22} className='logo-text' style={{ fontSize: isMobile ? '1.1em' : undefined }}>
            {isMobile && <MenuOutlined style={{ marginRight: 15 }} onClick={() => setcollapsed(!collapsed)} />}
            THAILAND Coronavirus (COVID-19)
          </Col>
          {auth.loggedInSuccess && (
            <Col id='user' xs={2} md={2} style={{ textAlign: 'right', marginTop: '-4px' }}>
              <Dropdown
                overlay={menu}
                placement='bottomRight'
                align={{ offset: [21, 6] }}
                arrow={{ pointAtCenter: true }}
                trigger={['click']}>
                <Link to='#' onClick={(e) => e.preventDefault}>
                  <Avatar icon={<UserOutlined />} />
                </Link>
              </Dropdown>
            </Col>
          )}
        </Row>
      </Header>
      <Content style={{ position: 'fixed', zIndex: 1, paddingTop: '4.5rem', backgroundColor: 'white', width: '100%' }}>
        <Row>
          <Col xs={24} md={24} style={{ fontSize: '0.8em', paddingLeft: isMobile ? '1rem' : '1.5rem' }}>
            {i18n.t('data_as', { date: moment().toDate() })}
          </Col>
        </Row>
      </Content>
      <Content>
        <Layout className='site-layout-background'>
          <Sider
            breakpoint='lg'
            collapsed={collapsed}
            collapsedWidth='0'
            className='site-layout-background ant-menu-sider'
            style={{ padding: isMobile ? '1rem 0' : undefined, top: isMobile ? '4rem' : undefined }}
            width={280}>
            <Menu defaultSelectedKeys={['covidtoday']} selectedKeys={[root]} items={sideMenu(appconfig?.lang, auth)} />
            <div style={{ margin: '1rem 0 0 15px' }}>
              <Button
                size='small'
                type={appconfig?.lang === 'th' ? 'primary' : 'dashed'}
                style={{ fontSize: 12, marginRight: 4 }}
                onClick={() => changeLanguage('th')}
              // shape='circle'
              >
                TH
              </Button>
              <Button
                size='small'
                type={appconfig?.lang === 'en' ? 'primary' : 'dashed'}
                style={{ fontSize: 12, marginRight: 4 }}
                onClick={() => changeLanguage('en')}
              // shape='circle'
              >
                EN
              </Button>
            </div>
          </Sider>
          <Content
            style={{
              // height: '100vh',
              minHeight: 280,
              padding: '7rem 1rem 3rem 1rem',
              marginLeft: isMobile ? '0' : '280px',
            }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <InFormRegister showModalConsent={showModalInformRegister} setShowModalConsent={setShowModalInformRegister} />
      <InFormLogin showModalConsent={showModalInformLogin} setShowModalConsent={setShowModalInformLogin} />
    </Layout>
  );
};

export default BasicLayout;
