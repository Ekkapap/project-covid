/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row } from 'antd';
import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import VisitPatient from './VisitPatient';
import IpdPatient from './IpdPatient';
import VentilatorUsing from './VentilatorUsing';
import Filter from 'src/components/Filter';
import { Dispatch } from 'redux';
import { getScreeningRequest } from 'src/actions/screening';
import { Trans } from 'react-i18next';
import { getIpdReport, getIpdChart } from 'src/reducers/selectors/ipd';
interface IProps {
  dispatchGetScreening: () => void;
  getReport: any;
  getChart: any;
}

class InfectPatientPage extends Component<IProps> {
  render() {
    return (
      <div style={{ paddingBottom: '48px' }}>
        {' '}
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} className='text-header-main'>
            <Trans>pages.infected.title1</Trans>
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} style={{ fontSize: '0.8rem' }}>
            <div
              style={{ padding: 3, backgroundColor: '#e4f5ff', fontSize: 13, display: 'flex', alignItems: 'center' }}>
              <Trans>pages.infected.detail</Trans>
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
            <VisitPatient getReport={this.props.getReport} getChart={this.props.getChart} />
          </Col>
          <Col xs={24} md={24}>
            <IpdPatient getChart={this.props.getChart} />
          </Col>
          <Col xs={24} md={24}>
            <VentilatorUsing getChart={this.props.getChart} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const IpdReport = getIpdReport(state);
  const IpdChartReport = getIpdChart(state);
  return {
    getReport: IpdReport(state),
    getChart: IpdChartReport(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfectPatientPage);
