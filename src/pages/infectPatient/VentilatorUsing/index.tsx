/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Radio, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import React, { Component,createRef } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
// import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

import 'src/pages/style.less';
import { DualAxes } from '@ant-design/plots';
import dayjs from 'dayjs';
import Tools from 'src/components/Tools';
import { Trans, withTranslation } from 'react-i18next';
interface IProps {
  getChart: any;
  t: any;
}
type IState = {
  data: any;
  nationality: string;
};

class VentilatorUsing extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { data: [], nationality: 'THAI' };
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ ...this.state, nationality: e.target.value });
  };
  render() {
    const { getChart, t } = this.props;
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.infected.chart.ventilator.title'),
    };
    const config = {
      data: [getChart, getChart],
      xField: 'date',
      yField: ['vent', 'weekly_vent'],

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
        //tickCount: getReportChart.length / 2,
        tickCount: 5,
        grid: null,
      },

      legend: {
        itemName: {
          formatter: (text: any, item: any) => {
            return item.value === 'vent'
              ? t('pages.infected.chart.ventilator.bar')
              : t('pages.infected.chart.ventilator.line');
          },
        },
      },
      tooltip: {
        showMarkers: false,
        enterable: true,
        domStyles: {'g2-tooltip': {width: "auto",padding: "8px"}},
        customContent: (title: string, items: any[]) => {
          const data = items[0]?.data || {};
          console.log(data);
          return `
            <div class="custom-tooltip-item">${t('pages.infected.chart.ventilator.tooltip.date')} : ${data.date}</div>
            <div class="custom-tooltip-item">${t('pages.infected.chart.ventilator.tooltip.t1')} : ${data.vent}</div>
            <div class="custom-tooltip-item">${t('pages.infected.chart.ventilator.tooltip.t2')} : ${data.weekly_vent}</div>`;
        },
      },
    };
    return (
      <div>
        <div ref={ref}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
            <Col xs={24} md={16}>
              <label className='text-header'>
                <Trans>pages.infected.chart.ventilator.title</Trans>
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
                <Trans>pages.infected.chart.ventilator.detail</Trans>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(VentilatorUsing));
