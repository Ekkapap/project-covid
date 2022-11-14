/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Skeleton } from 'antd';
import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import ScreeningPositive from './ScreeningPositive';
import ScreeningPositiveSevenDay from './ScreeningPositiveSevenDay';
import ScreeningPositivePercent from './ScreeningPositivePercent';
import ScreeningReport from './ScreeningReport';
import ReportHeader from './ScreeningReport/ReportHeader';
import ScreeningType from './ScreeningType';
import ScreeningByArea from './ScreeningByArea';
import ScreeningByRegion from './ScreeningByRegion';
import Filter from 'src/components/Filter';
import { Trans } from 'react-i18next';

interface IProps {
  getScreening: any;
}

class ScreeningPage extends Component<IProps> {
  render() {
    const { getScreening } = this.props;
    return (
      <div style={{ paddingBottom: '48px' }}>
        {' '}
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} className='text-header-main'>
            <Trans>pages.screening.title</Trans>
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col
            xs={24}
            md={24}
            style={{ padding: 3, backgroundColor: '#e4f5ff', fontSize: 13, display: 'flex', alignItems: 'center' }}>
            <Trans>pages.screening.detail</Trans>
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24}>
            <Filter />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <ReportHeader />
          </Col>
          <Col xs={24} md={24}>
            <ScreeningReport />
          </Col>
          <Col xs={24} md={24}>
            <ScreeningType />
          </Col>
          <Col xs={24} md={24} style={{ marginTop: '1rem' }}>
            <ScreeningPositive />
          </Col>
          <Col xs={24} md={12}>
            <ScreeningPositiveSevenDay />
          </Col>
          <Col xs={24} md={12}>
            <ScreeningPositivePercent />
          </Col>
          <Col xs={24} md={12}>
            <ScreeningByArea />
          </Col>
          <Col xs={24} md={12}>
            <ScreeningByRegion />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    getScreening: state.screening,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreeningPage);
