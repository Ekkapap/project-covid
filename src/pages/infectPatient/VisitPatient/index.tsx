/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton, Col, Row, Radio, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { screeningData } from 'src/constants/screening';

import 'src/pages/style.less';
import { DualAxes } from '@ant-design/plots';
import dayjs from 'dayjs';
import Tools from 'src/components/Tools';
import { Trans, withTranslation } from 'react-i18next';

interface IProps {
  getReport: any;
  getChart: any;
  t: any;
}
type IState = {
  data: any;
  nationality: string;
};

class VisitPatient extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { data: [], nationality: 'THAI' };
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ ...this.state, nationality: e.target.value });
  };

  render() {
    const ref = createRef<HTMLDivElement>();
    const { getReport, t, getChart } = this.props;
    const chartData = {
      ref: ref,
      name: t('pages.infected.chart.visit.title1'),
    };
    const config = {
      data: [getChart, getChart],
      xField: 'date',
      yField: ['admit', 'weekly_admit'],
      geometryOptions: [
        {
          geometry: 'column',
          color: '#586bce',
        },
        {
          geometry: 'line',
          color: '#29cae4',
        },
      ],
      xAxis: {
        type: 'timeCat',
        legend: false,
        label: {
          autoRotate: true,
          autoHide: false,
          autoEllipsis: false,
          formatter: (text: string) => dayjs(text).format('MMM'),
        },
        tickCount: 5,
        grid: null,
      },
      legend: {
        itemName: {
          formatter: (text: any, item: any) => {
            return item.value === 'admit' ? 
            t('pages.infected.chart.visit.bar') : 
            t('pages.infected.chart.visit.line');
          },
        },
      },
      tooltip: {
        showMarkers: false,
        enterable: true,
        domStyles: {'g2-tooltip': {width: "auto",padding: "8px"}},
        customContent: (title: string, items: any[]) => {
          const data = items[0]?.data || {};
          return `
            <div class="custom-tooltip-item">${t('pages.infected.chart.visit.tooltip.date')} : ${data.date}</div>
            <div class="custom-tooltip-item">${t('pages.infected.chart.visit.tooltip.t1')} : ${data.admit}</div>
            <div class="custom-tooltip-item">${t('pages.infected.chart.visit.tooltip.t2')} : ${data.weekly_admit}</div>`;
        },
      },
    };
    return (
      <div>
        <div ref={ref}>
          <Row style={{ marginBottom: '1rem' }}>
            <Col xs={24} md={24}>
              <Row gutter={[8, { xs: 16, md: 8 }]}>
                <Col xs={14} md={6}>
                  <Row>
                    <Col className='text-header'>
                      <Trans>pages.infected.chart.visit.title1</Trans>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={10} className='number-link-label'>
                      <Trans>chart.past7</Trans>
                    </Col>
                    <Col xs={12} md={10} className='number-link-label'>
                      <Trans>chart.total</Trans>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={10}>
                      <span className='number-link'>
                        {getReport.admit7day.toLocaleString('en', { useGrouping: true })}
                      </span>
                    </Col>
                    <Col xs={12} md={10}>
                      <span className='number-link'>{getReport.admit.toLocaleString('en', { useGrouping: true })}</span>
                    </Col>
                  </Row>
                </Col>
                <Col xs={10} md={4} className='text-header'>
                  <Row>
                    <Col className='text-header'>
                      <Trans>pages.infected.chart.visit.title2</Trans>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='number-link-label'>
                      <Trans>chart.latest</Trans>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className='number-link'>{getReport.ipt.toLocaleString('en', { useGrouping: true })}</span>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={14} className='text-header'>
                  <Row>
                    <Col className='text-header'>
                      <Trans>pages.infected.chart.visit.title3</Trans>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='number-link-label'>
                      <Trans>chart.latest</Trans>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className='number-link'>{getReport.vent.toLocaleString('en', { useGrouping: true })}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
            <Col xs={24} md={16}>
              <label className='text-header'>
                <Trans>pages.infected.chart.visit.title4</Trans>
              </label>
            </Col>
            {/* <Col xs={24} md={8} className='radio-nation'>
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
                <Trans>pages.infected.chart.visit.detail</Trans>
              </label>
            </Col>
            <Col xs={24} md={24} className='data-filter'>
              <Row gutter={[8, 8]}>
                <Col xs={4} md={2}>
                  <Button type='link'>
                    <Trans>chart.today</Trans>
                  </Button>
                </Col>
                <Col xs={6} md={3}>
                  <Button type='link'>
                    <Trans>chart.correct</Trans>
                  </Button>
                </Col>
                <Col xs={5} md={2}>
                  <Button type='link'>
                    <Trans>chart.daily</Trans>
                  </Button>
                </Col>
                <Col xs={9} md={3}>
                  <Button type='link'>
                    <Trans>chart.about</Trans>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24}>
              <DualAxes {...config} />
            </Col>
          </Row>
          <Tools xs={8} md={3} chartData={chartData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {};
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(VisitPatient));
