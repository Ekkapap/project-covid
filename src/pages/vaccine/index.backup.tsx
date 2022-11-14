import { Breadcrumb, Col, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
// import { getVaccineData, getVaccineReport } from 'src/reducers/selectors/vaccine';
import CovidReport from 'src/pages/vaccine/CovidReport';
// import VaccineRate from 'src/pages/vaccine/VaccineRate';
// import VaccineReport from 'src/pages/vaccine/VaccineReport';

interface Props {
  getData: any[];
  getDataReport: any;
}
class VaccinePage extends Component<Props> {
  render() {
    // const { getData, getDataReport } = this.props;
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Vaccinations</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className='gutter-row' span={24}>
            {/* <VaccineReport data={getDataReport} /> */}
          </Col>
          <Col className='gutter-row' span={24} style={{ margin: '16px 0' }}>
            <CovidReport />
          </Col>
          <Col className='gutter-row' span={24} style={{ margin: '16px 0' }}>
            {/* <VaccineRate data={getData} /> */}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    // getData: getVaccineData(state),
    // getDataReport: getVaccineReport(state),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VaccinePage);
