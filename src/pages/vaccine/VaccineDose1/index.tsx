/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Skeleton, Col, Row, Radio, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import React, { Component,createRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import 'src/pages/style.less';
import dayjs from 'dayjs';
import { DualAxes } from '@ant-design/plots';
import Tools from 'src/components/Tools';
import { getNewData, getVaccineReport } from 'src/reducers/selectors/vaccine';
import { Trans, withTranslation } from 'react-i18next';
interface IProps {
  getDataReport: any;
  getDataChart: any;
  t: any;
}
interface IState {
  nationality: string;
}

class VaccineDose1 extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { nationality: 'THAI' };
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ nationality: e.target.value });
  };

  render() {
    const { getDataReport, getDataChart, t } = this.props;
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.vaccine.chart.dose1.title'),
    };
    const config = {
      data: [getDataChart, getDataChart],
      xField: 'date',
      yField: ['dose1', 'weekly_dose1'],

      limitInPlot: false,
      slider: {},
      meta: {
        time: {
          sync: false,
        },
      },

      geometryOptions: [
        {
          geometry: 'column',
          color: '#586bce',
        },
        {
          geometry: 'line',
          color: 'red',
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
      },

      legend: {
        itemName: {
          formatter: (text: any, item: any) => {
            return item.value === 'dose1' ? 
              t("pages.vaccine.chart.dose1.bar") : 
              t("pages.vaccine.chart.dose1.line");
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
            <div class="custom-tooltip-item">${t('pages.vaccine.chart.dose1.tooltip.date')} : ${data.date}</div>
            <div class="custom-tooltip-item">${t('pages.vaccine.chart.dose1.tooltip.t1')} : ${data.dose1}</div>
            <div class="custom-tooltip-item">${t('pages.vaccine.chart.dose1.tooltip.t2')} : ${data.weekly_dose1}</div>`;
        },
      },
    };

    return (
      <div>
        <div ref={ref}>
          <Row style={{ marginBottom: '1rem' }}>
            <Col xs={24} md={24}>
              <Row gutter={[8, { xs: 16, md: 8 }]}>
                <Col xs={24} md={12}>
                  <Row>
                    <Col xs={15} md={12} className='text-header'>
                      <Trans>pages.vaccine.title2</Trans>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8} md={8} className='number-link-label'>
                      <Trans>chart.dose1</Trans>
                    </Col>
                    <Col xs={8} md={8} className='number-link-label'>
                      <Trans>chart.dose2</Trans>
                    </Col>
                    <Col xs={8} md={8} className='number-link-label'>
                      <Trans>chart.booster</Trans>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={8} md={8}>
                      <span className='number-link'>{getDataReport.total_vaccine.dose1.toLocaleString()}</span>
                    </Col>
                    <Col xs={8} md={8}>
                      <span className='number-link'>{getDataReport.total_vaccine.dose2.toLocaleString()}</span>
                    </Col>
                    <Col xs={8} md={8}>
                      <span className='number-link'>{getDataReport.total_vaccine.booster.toLocaleString()}</span>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={12} className='text-header'>
                  <Row>
                    <Col className='text-header'><Trans>pages.vaccine.title3</Trans></Col>
                  </Row>
                  <Row>
                    <Col className='number-link-label'><Trans>chart.grandTotal</Trans></Col>
                  </Row>
                  <Row>
                    <Col xs={24} md={12}>
                      <span className='number-link'>
                        {(
                          getDataReport.total_vaccine.dose1 +
                          getDataReport.total_vaccine.dose2 +
                          getDataReport.total_vaccine.booster
                        ).toLocaleString()}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
            <Col xs={24} md={12}>
              <label className='text-header'><Trans>pages.vaccine.chart.dose1.title</Trans></label>
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
            <Col xs={24} md={24}>
              <label className='fs14'>
                <Trans>pages.vaccine.chart.dose1.detail</Trans>
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
  const selectorGetReport = getVaccineReport(state);
  const selectorGetChart = getNewData(state);

  return {
    getDataReport: selectorGetReport(state),
    getDataChart: selectorGetChart(state),
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(VaccineDose1));
