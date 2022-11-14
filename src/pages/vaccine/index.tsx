import { Col, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { RootState } from 'src/reducers';
import VaccineDose1 from './VaccineDose1';
import VaccineDose2 from './VaccineDose2';
import VaccineBooster from './VaccineBooster';
import VaccineLatest from './VaccineLatest';
import VaccineByReportDate from './VaccineByReportDate';
import VaccineDaily from './VaccineDaily';
import Filter from 'src/components/Filter';
import { Trans } from 'react-i18next';
interface IProps {
  newData: any;
  getDataReport: any;
  dataVaccine: any;
}

class DeathPage extends Component<IProps> {
  render() {
    // const { newData, getDataReport, dataVaccine } = this.props;

    return (
      <div style={{ paddingBottom: '48px' }}>
        {' '}
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} className='text-header-main'>
            <Trans>pages.vaccine.title1</Trans>
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} style={{ fontSize: '0.8rem' }}>
            <div style={{ height: 30, padding: 3, backgroundColor: '#e4f5ff', fontSize: 13 }}>
              <Trans>pages.vaccine.detail</Trans>
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
            <VaccineDose1 />
          </Col>
          <Col xs={24} md={24}>
            <VaccineDose2 />
          </Col>
          <Col xs={24} md={24}>
            <VaccineBooster />
          </Col>
          <Col xs={24} md={12}>
            <VaccineLatest />
          </Col>
          <Col xs={24} md={12}>
            <VaccineByReportDate />
          </Col>
          <Col xs={24} md={24}>
            <VaccineDaily />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeathPage);
