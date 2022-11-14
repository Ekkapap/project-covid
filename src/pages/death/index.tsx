/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import DeathIn28day from './DeathIn28Day';
import DeathIn28Daily from './DeathIn28Daily';
import DeathDaily from './DeathDaily';
import DeathWeekly from './DeathWeekly';
import DeathIn28DailyByArea from './DeathIn28dayByArea';
import DeathByArea from './DeathByArea';
import Filter from 'src/components/Filter';
import { Trans } from 'react-i18next';
class DeathPage extends Component {
  render() {
    return (
      <div style={{ paddingBottom: '48px' }}>
        {' '}
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} className='text-header-main'>
            <Trans>pages.death.title</Trans>
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} style={{ fontSize: '0.8rem' }}>
            <div style={{ padding: 3, backgroundColor: '#e4f5ff', fontSize: 13 }}>
              <Trans>pages.death.detail</Trans>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24}>
            <Filter />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <DeathIn28day />
          </Col>
          <Col xs={24} md={12}>
            <DeathIn28Daily />
          </Col>
          <Col xs={24} md={12}>
            <DeathIn28DailyByArea />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeathPage);
