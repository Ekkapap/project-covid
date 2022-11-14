/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Radio, Button, Checkbox } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import 'src/pages/style.less';
import { Line } from '@ant-design/plots';
import Tools from 'src/components/Tools';
import { getReport } from 'src/reducers/selectors/otherDisease';
import _ from 'lodash';
import dayjs from 'dayjs';
import { json } from 'd3';
import { Trans, withTranslation } from 'react-i18next';
import moment from 'moment';
import i18n from 'src/i18n';
interface IProps {
  getReport: any;
  t: any;
}

interface IState {
  nationality: string;
}

interface EXProps {
  showDengue: boolean;
  showCovid: boolean;
}

type TProps = IProps & EXProps;

class Report extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      nationality: 'THAI',
    };
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ nationality: e.target.value });
  };
  // onChangeDisease = (e: string, ee: boolean) => {
  //   this.setState({ showDengue: false });
  // };
  render() {
    const { getReport, showDengue, showCovid, t } = this.props;
    const data = _.orderBy(getReport, 'date', 'asc');
    const config = {
      data,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      slider: {},
      xAxis: {
        type: 'timeCat',
        legend: false,
        label: {
          autoRotate: true,
          autoHide: false,
          autoEllipsis: false,
          formatter: (text: string) => {
            return i18n.t('pages.other_disease.chart.dateValue', { date: moment(text).toDate() });
          }
        },
        tickCount: 5,
      },
      yAxis: {
        label: {
          formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      smooth: true,
      legend: {
        selected: {
          "dengue": showDengue,
          "covid-19": showCovid,
        },
        itemName: {
          formatter: (text: any, item: any) => {
            return item.value === 'dengue' ? 
              t("pages.other_disease.chart.d") : 
              t("pages.other_disease.chart.c");
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
          if(typeof d1.value ==="undefined"){
            return `
            <div class="custom-tooltip-item">${t('pages.other_disease.chart.date')} : ${d2.date}</div>
            <div class="custom-tooltip-item">${t('pages.other_disease.chart.d')} : ${d2.value}</div>`;
          }else if(typeof d2.value ==="undefined"){
            return `
            <div class="custom-tooltip-item">${t('pages.other_disease.chart.date')} : ${d1.date}</div>
            <div class="custom-tooltip-item">${t('pages.other_disease.chart.c')} : ${d1.value}</div>`;
          }else{
            return `
            <div class="custom-tooltip-item">${t('pages.other_disease.chart.date')} : ${d2.date}</div>
            <div class="custom-tooltip-item">${t('pages.other_disease.chart.d')} : ${d1.value}</div>
            <div class="custom-tooltip-item">${t('pages.other_disease.chart.c')} : ${d2.value}</div>`;
          }
          
        },
      },
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },

      onReady: (plot: any) => {
        plot.on('legend-item:click', (args: any) => {});
      },
    };

    return (
      <div>
        <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
          <Col xs={24} md={12}>
            <label className='text-header'><Trans>pages.other_disease.chart.title</Trans></label>
            {/* &nbsp;&nbsp;&nbsp; */}
            {/* <Checkbox checked={showDengue} onChange={(e) => this.setState({ showDengue: e.target.checked })}>
              Dengue
            </Checkbox>
            <Checkbox checked={showCovid} onChange={(e) => this.setState({ showCovid: e.target.checked })}>
              Covid-19
            </Checkbox> */}
          </Col>
          {/* <Col xs={24} md={12} className='radio-nation'>
            <Radio.Group onChange={this.onChange} value={this.state.nationality}>
              <Radio className='fs14' value='THAI'>
                คนไทย
              </Radio>
              <Radio className='fs14' value='FOREIGNER'>
                ชาวต่างชาติ
              </Radio>
            </Radio.Group>
          </Col> */}
          <Col xs={24} md={16}>
            {/* <label className='fs14'>xxxxxxxxx</label> */}
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
            <Line {...config} />
          </Col>
        </Row>
        <Tools xs={8} md={3} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selectorReport = getReport(state);

  return {
    getReport: selectorReport(state),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Report));
