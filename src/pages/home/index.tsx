/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, Dispatch } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
// import PopulationVaccinated from './PopulationVaccinated';
// import Utilisation from './Utilisation';
// import CovidChart from './CovidChart';
// import SummaryWrapper from './Summary';
import CovidReport from './CovidReport';
import VaccineReport from './VaccineReport';
import { getVaccineReport } from 'src/reducers/selectors/vaccine';
import { RootState } from 'src/reducers';
import Filter from 'src/components/Filter';
// import i18n from 'src/i18n';

// import compose from 'recompose/compose';
// import { IconProps } from '@material-ui/core';

import { getScreeningRequest } from 'src/actions/screening';
import { getVaccineRequest } from 'src/actions/vaccine';
import { getIpdRequest } from 'src/actions/ipd';
import { getDeathRequest, getExcessMortalityDeathRequest } from 'src/actions/death';
import { getOtherDiseaseRequest } from 'src/actions/other_disease';
import { getReinfectedRequest } from 'src/actions/reinfected';

interface IProps {
  getData: any[];
  getDataReport: any;
  dispatchGetScreening: () => void;
  dispatchGetVaccine: () => void;
  dispatchGetIpd: () => void;
  dispatchGetDeath: () => void;
  dispatchGetExcessMortalityDeath: () => void;
  dispatchGetOtherDisease: () => void;
  dispatchGetReinfected: () => void;
}

type TProps = IProps;

class HomePage extends Component<TProps> {
  componentDidMount() {
    const {
      dispatchGetScreening,
      dispatchGetVaccine,
      dispatchGetDeath,
      dispatchGetExcessMortalityDeath,
      dispatchGetIpd,
      dispatchGetOtherDisease,
      dispatchGetReinfected,
    } = this.props;
    dispatchGetScreening();
    dispatchGetVaccine();
    dispatchGetIpd();
    dispatchGetDeath();
    dispatchGetExcessMortalityDeath();
    dispatchGetOtherDisease();
    dispatchGetReinfected();
  }
  render() {
    const { getDataReport } = this.props;

    return (
      <div style={{ paddingBottom: '1rem' }}>
        <Row style={{ margin: '0 0 1rem 0px' }}>
          <Col xs={24} md={24} style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>
            <Trans>pages.home.summary_resource_incountry</Trans>
          </Col>
          <Col xs={24} md={24} style={{ fontSize: '0.8rem' }}>
            <Trans>pages.home.web_description</Trans>
          </Col>
          <Col xs={24} md={24} style={{ fontSize: '0.8rem' }}>
            See the <Link to='/'>simple summary</Link> for the Thai.
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24}>
            <Filter />
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24}>
            <VaccineReport data={getDataReport} />
          </Col>
        </Row>
        <Row style={{ marginTop: '1rem' }}>
          <Col xs={24} md={24}>
            <CovidReport />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selector = getVaccineReport(state);
  return {
    getDataReport: selector(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatchGetScreening: () => dispatch(getScreeningRequest.request()),
    dispatchGetVaccine: () => dispatch(getVaccineRequest.request()),
    dispatchGetIpd: () => dispatch(getIpdRequest.request()),
    dispatchGetDeath: () => dispatch(getDeathRequest.request()),
    dispatchGetExcessMortalityDeath: () => dispatch(getExcessMortalityDeathRequest.request()),
    dispatchGetOtherDisease: () => dispatch(getOtherDiseaseRequest.request()),
    dispatchGetReinfected: () => dispatch(getReinfectedRequest.request()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
