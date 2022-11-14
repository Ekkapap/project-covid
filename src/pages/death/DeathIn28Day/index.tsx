/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton, Col, Row, Radio, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import React, { Component,createRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import 'src/pages/style.less';
import dayjs from 'dayjs';
import { Area, DualAxes } from '@ant-design/plots';
import Tools from 'src/components/Tools';
import { getDeathChart, getDeathData } from 'src/reducers/selectors/death';
import { Trans, withTranslation } from 'react-i18next';
interface IProps {
  getReport: any;
  getChart: any;
  t: any;
}
interface IState {
  nationality: string;
}

class DeathIn28day extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { nationality: 'THAI' };
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ nationality: e.target.value });
  };

  render() {
    const { getReport, getChart, t } = this.props;
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.death.chart.28days.title1'),
    };
    const config = {
      data: getChart,
      xField: 'date',
      yField: 'death28',
      xAxis: {
        range: [0, 1],
      },
      tooltip: {
        showMarkers: false,
        enterable: true,
        domStyles: {'g2-tooltip': {width: "auto",padding: "8px"}},
        customContent: (title: string, items: any[]) => {
          const data = items[0]?.data || {};
          return `
            <div class="custom-tooltip-item">${t('pages.death.chart.28days.tooltip.date')} : ${data.date}</div>
            <div class="custom-tooltip-item">${t('pages.death.chart.28days.tooltip.t1')} : ${data.death28}</div>`;
        },
      },
    };
    return (
      <div>
        <div ref={ref}>
        <Row style={{ marginBottom: '1rem' }}>
          <Col xs={24} md={24}>
            <Row gutter={[8, { xs: 16, md: 8 }]}>
              <Col xs={24} md={8}>
                <Row>
                  <Col xs={24} md={24} className='text-header'>
                    <Trans>pages.death.chart.28days.title1</Trans>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} md={24} className='number-link-label'>
                    <Trans>chart.total</Trans>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} md={24}>
                    <span className='number-link'>{getReport.death28}</span>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={6} className='text-header'>
                <Row>
                  <Col className='text-header'><Trans>pages.death.chart.28days.title2</Trans></Col>
                </Row>
                <Row>
                  <Col xs={8} md={12} className='number-link-label'>
                    <Trans>chart.weekly</Trans>
                  </Col>
                  <Col xs={8} md={12} className='number-link-label'>
                    <Trans>chart.correct</Trans>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8} md={12}>
                    <span className='number-link'>{getReport.death7day}</span>
                  </Col>
                  <Col xs={8} md={12}>
                    <span className='number-link'>{getReport.deathAll}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
          <Col xs={24} md={12}>
            <label className='text-header'><Trans>pages.death.chart.28days.title1</Trans></label>
          </Col>
          {/* <Col xs={24} md={12} className='radio-nation'>
            <Radio.Group onChange={this.onChange} value={this.state.nationality}>
              <Radio className='fs14' value='THAI'>
                <Trans>chart.thai</Trans>
              </Radio>
              <Radio className='fs14' value='FOREIGNER'>
                <Trans>chart.foreigner</Trans>
              </Radio>
            </Radio.Group>
          </Col> */}
          <Col xs={24} md={16}>
            <label className='fs14'>
              <Trans>pages.death.chart.28days.detail</Trans>
            </label>
          </Col>
          <Col xs={24} md={24} className='data-filter'>
            <Row gutter={[8, 8]}>
              <Col xs={5} md={2}>
                <Button type='link'><Trans>chart.daily</Trans></Button>
              </Col>
              <Col xs={7} md={2}>
                <Button type='link'><Trans>chart.correct</Trans></Button>
              </Col>
              <Col xs={4} md={2}>
                <Button type='link'><Trans>chart.table</Trans></Button>
              </Col>
              <Col xs={8} md={3}>
                <Button type='link'><Trans>chart.about</Trans></Button>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={24}>
            <Area {...config} />;
          </Col>
        </Row>
        <Tools xs={8} md={3} chartData={chartData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selectorReport = getDeathData(state);
  const selectorChart = getDeathChart(state);
  return {
    getReport: selectorReport(state),
    getChart: selectorChart(state),
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DeathIn28day));
