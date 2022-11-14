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
import { Area } from '@ant-design/plots';
import Tools from 'src/components/Tools';
import { getVaccineData } from 'src/reducers/selectors/vaccine';
import _ from 'lodash';
import { Trans, withTranslation } from 'react-i18next';
interface IProps {
  getDataVaccine: any;
  t: any;
}
interface IState {
  nationality: string;
}

class VaccineByReportDate extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { nationality: 'THAI' };
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ nationality: e.target.value });
  };

  render() {
    const { getDataVaccine, t } = this.props;
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.vaccine.chart.dateVac.title'),
    };
    const data = _.orderBy(getDataVaccine, 'date', 'asc');
    const config = {
      data,
      xField: 'date',
      yField: 'percent',
      seriesField: 'type',
      isStack: true,
      //isPercent: true,
      smooth: true,
      startOnZero: true,
      legend: {
        itemName: {
          formatter: (text: any, item: any) => {
            if(item.name==="dose1"){
              return t("pages.vaccine.chart.dateVac.d1");
            }else if(item.name==="dose2"){
              return t("pages.vaccine.chart.dateVac.d2");
            }else{
              return t("pages.vaccine.chart.dateVac.d3");
            }
          },
        },
      },
      tooltip: {
        showMarkers: false,
        enterable: true,
        domStyles: {'g2-tooltip': {width: "auto",padding: "8px"}},
        customContent: (title: string, items: any[]) => {
          const d1 = items[0]?.data || {};
          const d2 = items[1]?.data || {};
          const d3 = items[2]?.data || {};
          return `
            <div class="custom-tooltip-item">${t('pages.vaccine.chart.dateVac.tooltip.date')} : ${d1.date}</div>
            <div class="custom-tooltip-item">${t('pages.vaccine.chart.dateVac.tooltip.t1')} : ${d1.percent}</div>
            <div class="custom-tooltip-item">${t('pages.vaccine.chart.dateVac.tooltip.t2')} : ${d2.percent}</div>
            <div class="custom-tooltip-item">${t('pages.vaccine.chart.dateVac.tooltip.t3')} : ${d3.percent}</div>`;
        },
      },
    };
    return (
      <div>
        <div ref={ref}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]} style={{ minHeight: '500px' }}>
            <Col xs={24} md={12}>
              <label className='text-header'><Trans>pages.vaccine.chart.dateVac.title</Trans></label>
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
                <Trans>pages.vaccine.chart.dateVac.detail</Trans>
              </label>
            </Col>
            <Col xs={24} md={24} className='data-filter'>
              <Row gutter={[8, 8]}>
                <Col xs={5} md={4}>
                  <Button type='link'><Trans>chart.daily</Trans></Button>
                </Col>
                <Col xs={7} md={5}>
                  <Button type='link'><Trans>chart.correct</Trans></Button>
                </Col>
                <Col xs={4} md={4}>
                  <Button type='link'><Trans>chart.table</Trans></Button>
                </Col>
                <Col xs={8} md={8}>
                  <Button type='link'><Trans>chart.about</Trans></Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24}>
              <Area {...config} />
            </Col>
          </Row>
          <Tools xs={8} md={5} chartData={chartData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selectorGetData = getVaccineData(state);

  return {
    getDataVaccine: selectorGetData(state),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(VaccineByReportDate));
