import React, { Component } from 'react';
// import { Layout, Menu, Breadcrumb } from 'antd';
import { Layout, Menu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import './style.less';
import { useSelector } from 'react-redux';
import { RootState } from "src/reducers";

const { Header, Content, Footer } = Layout;

interface IProps { }

type TProps = IProps & RouteComponentProps;

class BasicLayout extends Component<TProps, {}> {
  render() {
    const { children } = this.props;
    return (
      <Layout id='components-layout-demo-fixed'>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Row gutter={[8, 8]}>
            <Col className="logo-text" xs={18} md={4}>
              R8-Covid Research
            </Col>
            <Col xs={6} md={20}>
              <Menu mode='horizontal' overflowedIndicator={<MenuOutlined />} style={{ float: 'right' }}>
                <Menu.Item icon={<HomeOutlined />}>
                  <Link to='/home'>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<HomeOutlined />}>
                  <Link to='/vaccinations'>Vaccinations</Link>
                </Menu.Item>
                <Menu.Item icon={<HomeOutlined />}>Deaths</Menu.Item>
                <Menu.Item icon={<HomeOutlined />}>Ventilations</Menu.Item>
                <Menu.Item icon={<HomeOutlined />}>ICU</Menu.Item>
                <Menu.Item icon={<HomeOutlined />}>Hospitalisations</Menu.Item>
                <Menu.Item icon={<HomeOutlined />}>Cases</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content className='site-layout' style={{ marginTop: 64, padding: '0 25px' }}>
          <div className='site-layout-background' style={{ minHeight: 380 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#FFF' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
