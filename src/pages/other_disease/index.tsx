/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checkbox, Col, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import Filter from 'src/components/Filter';
import Report from './Report';
import DiseaseRegion from './diseaseRegion';
import { Trans, withTranslation } from 'react-i18next';
interface IProps {
  getReport: any;
  data: any;
  t:any;
}
interface IState {
  nationality: string;
  i_dengue: boolean;
  i_covid19: boolean;
}

class OtherDisease extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      nationality: 'THAI',
      i_dengue: true,
      i_covid19: true,
    };
  }

  render() {
    const { i_dengue, i_covid19 } = this.state;
    const { t } = this.props;
    const cc = (a: any) => {
      this.setState({ ...a });
    };

    return (
      <div style={{ paddingBottom: '48px' }}>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} className='text-header-main'>
            <Trans>pages.other_disease.title</Trans>
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} style={{ fontSize: '0.8rem' }}>
            <div style={{ padding: 3, backgroundColor: '#e4f5ff', fontSize: 13 }}>
              <Trans>pages.other_disease.desc</Trans>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24}>
            <Filter />
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={12}>
            <label className='text-header'><Trans>pages.other_disease.filter.a</Trans></label>
            &nbsp;&nbsp;&nbsp;
            <Checkbox checked={i_dengue} onChange={(e) => this.setState({ i_dengue: e.target.checked })}>
              <Trans>pages.other_disease.filter.d</Trans>
            </Checkbox>
            <Checkbox checked={i_covid19} onChange={(e) => this.setState({ i_covid19: e.target.checked })}>
              <Trans>pages.other_disease.filter.c</Trans>
            </Checkbox>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24}>
            <Report showCovid={i_covid19} showDengue={i_dengue} />
          </Col>
          {this.state.i_dengue && (
            <Col xs={24} md={12}>
              <DiseaseRegion title={t('pages.other_disease.table.title1')} type="Dengue" />
            </Col>
          )}
          {this.state.i_covid19 && (
            <Col xs={24} md={12}>
              <DiseaseRegion title={t('pages.other_disease.table.title2')} type="Covid19"/>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OtherDisease));
