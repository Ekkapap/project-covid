/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { Card, Col, Row, Statistic, Button, Space } from 'antd';
import React, { Component } from 'react';
import DeathChart from './DeathChart';
import { useMediaQuery } from 'react-responsive';
import './style.less';

const CovidChart = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 576px)'
  });
  return (
    <div>
      <Row gutter={[4, 4]} style={{ marginTop: 20, justifyContent: 'flex-end' }}>
        <Col xs={6} md={2}><Button type='default' className={isMobile ? 'isMobile' : ''}>All Time</Button></Col>
        <Col xs={6} md={2}><Button type='default' className={isMobile ? 'isMobile' : ''}>6 เดือน</Button></Col>
        <Col xs={6} md={2}><Button type='ghost' className={isMobile ? 'isMobile' : ''} danger>2 เดือน</Button></Col>
        <Col xs={6} md={2}><Button type='default' className={isMobile ? 'isMobile' : ''}>2 สัปดาห์</Button></Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col xs={24} md={8}>
          <Card size='small' title='COVID-19 Deaths by Date of Death'>
            <Statistic title='Total - Deaths' value={35353} valueStyle={{ fontWeight: 'bold' }} />
            <DeathChart />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size='small' title='COVID-19 Patients Ventilated'>
            <Row>
              <Col xs={24} md={12}>
                <Statistic title='Active - Ventilated' value={33} valueStyle={{ fontWeight: 'bold' }} />
              </Col>
              <Col xs={24} md={12}>
                <Statistic
                  title='Utilisation (Overall)'
                  value={34.8}
                  suffix='%'
                  valueStyle={{ fontWeight: 'bold' }}
                />
              </Col>
            </Row>
            <DeathChart />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size='small' title='COVID-19 Patients in ICU'>
            <Row>
              <Col xs={24} md={8}>
                <Statistic title='Active - ICU' value={42} valueStyle={{ fontWeight: 'bold' }} />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title='Utilisation (Overall)'
                  value={55.8}
                  suffix='%'
                  valueStyle={{ fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic title='Utilisation (COVID)' value={6.5} suffix='%' valueStyle={{ fontWeight: 'bold' }} />
              </Col>
            </Row>
            <DeathChart />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size='small' title='COVID-19 Hospital Admissions'>
            <Row>
              <Col xs={24} md={8}>
                <Statistic title='Daily - Admissions' value={511} valueStyle={{ fontWeight: 'bold' }} />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title='Utilisation (Overall)'
                  value={64.8}
                  suffix='%'
                  valueStyle={{ fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic title='Utilisation (COVID)' value={14.0} suffix='%' valueStyle={{ fontWeight: 'bold' }} />
              </Col>
            </Row>
            <DeathChart />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size='small' title='Confirmed COVID-19 Cases'>
            <Row>
              <Col xs={24} md={12}>
                <Statistic title='Daily - Cases' prefix='+' value={8765} valueStyle={{ fontWeight: 'bold' }} />
              </Col>
              <Col xs={24} md={12}>
                <Statistic title='Total - Cases' value={2345623} valueStyle={{ fontWeight: 'bold' }} />
              </Col>
            </Row>
            <DeathChart />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size='small' title='COVID-19 Tests Conducted'>
            <Row>
              <Col xs={24} md={12}>
                <Statistic title='Daily - Tests' prefix='+' value={63726} valueStyle={{ fontWeight: 'bold' }} />
              </Col>
              <Col xs={24} md={12}>
                <Statistic title='Positivity Rate' value={3.6} suffix='%' valueStyle={{ fontWeight: 'bold' }} />
              </Col>
            </Row>
            <DeathChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CovidChart;