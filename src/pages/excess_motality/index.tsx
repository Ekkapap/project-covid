/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Col, Row, Tabs, Button } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import Filter from 'src/components/Filter';
import dayjs from 'dayjs';

import ExChart from './Chart';
import ExMap from './Map';
import ExTable from './Table';
import ExSource from './Source';

import { Death, DeathRequest } from 'src/types';
import './index.less';
import _ from 'lodash';
import { Trans, withTranslation } from 'react-i18next';
import { ShortDateThai } from 'src/utils/dateThai';
interface IProps {
  death: DeathRequest;
  t: any;
}

interface IState {
  mapRange: number;
}

const dayRanges = [7, 30, 365];

class OtherDisease extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      mapRange: 2,
    };
  }

  render() {
    const { mapRange } = this.state;
    const { death, t } = this.props;

    const dd = _(death.data)
      .groupBy((x) => dayjs(x.date).format('YYYY-MM-01'))
      .map((item: Death[], key: any) => {
        return {
          date: key,
          prev_count: 0,
          count: _.sumBy(item, 'count'),
        };
      })
      .value();

    const result = dd.map((x) => {
      const prev_count = dd.find((prev) => dayjs(x.date).subtract(1, 'year').isSame(prev.date))?.count;
      return {
        date: x.date,
        prev_count,
        count: x.count,
        percent: prev_count && Math.floor(((x.count - prev_count) / prev_count) * 100),
      };
    });

    // console.log('result', result);

    return (
      <div style={{ paddingBottom: '48px' }}>
        {' '}
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24} className='text-header-main'>
            <Trans>pages.excess_mortality.header</Trans>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24}>
            <div className='card-body' style={{ backgroundColor: 'unset' }}>
              {/* <Row gutter={[0, { xs: 16, md: 8 }]} style={{ flexFlow: 'row wrap' }}>
                <Col xs={24} md={24}>
                  <label className='text-header'><Trans>pages.excess_mortality.chart.header</Trans></label>
                </Col>
              </Row> */}

              <Row gutter={[0, { xs: 16, md: 8 }]} style={{ flexFlow: 'row wrap' }}>
                <Col xs={24} md={24}>
                  <Tabs defaultActiveKey='1' type='card' size='middle' tabBarGutter={0} tabPosition='bottom'>
                    <Tabs.TabPane tab='Chart' key='Chart'>
                      <Row gutter={[0, { xs: 16, md: 8 }]} style={{ flexFlow: 'row wrap' }}>
                        <Col xs={24} md={24}>
                          <label className='fs14'>
                            <Trans>pages.excess_mortality.chart.detail</Trans>
                          </label>
                        </Col>
                      </Row>
                      <ExChart t={t} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Map' key='Map'>
                      <Row gutter={[0, { xs: 16, md: 8 }]} style={{ flexFlow: 'row wrap' }}>
                        <Col xs={24} md={24}>
                          <label className='fs14'>
                            <Trans>pages.excess_mortality.chart.detail</Trans>
                          </label>
                        </Col>
                        <Col xs={24} md={24}>
                          <div style={{ height: 400, width: 'calc(100%)' }}>
                            <div
                              style={{
                                position: 'absolute',
                                zIndex: 999,
                                top: 10,
                                // height: 40,
                                // width: 200,

                                textAlign: 'center',
                                // display: 'flex',
                              }}>
                              <Space direction='horizontal'>
                                <Button
                                  size='small'
                                  type={mapRange === 0 ? 'primary' : 'default'}
                                  onClick={() => this.setState({ mapRange: 0 })}>
                                  7 วันล่าสุด
                                </Button>
                                <Button
                                  size='small'
                                  type={mapRange === 1 ? 'primary' : 'default'}
                                  onClick={() => this.setState({ mapRange: 1 })}>
                                  30 วันล่าสุด
                                </Button>
                                <Button
                                  size='small'
                                  type={mapRange === 2 ? 'primary' : 'default'}
                                  onClick={() => this.setState({ mapRange: 2 })}>
                                  ปีนี้
                                </Button>
                              </Space>
                            </div>

                            <div
                              style={{
                                position: 'absolute',
                                zIndex: 999,
                                bottom: 40,
                                height: 40,
                                width: 'calc(100%)',

                                textAlign: 'center',
                                display: 'flex',
                              }}>
                              <div>
                                <div style={{ textAlign: 'left', background: '#FFFFFF', fontSize: 12 }}>
                                  <div>
                                    ข้อมูล ณ วันที่{' '}
                                    {ShortDateThai(dayjs().subtract(dayRanges[mapRange], 'day').format('YYYY-MM-DD'))}{' '}
                                    ถึงวันที่ {ShortDateThai(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))}
                                  </div>
                                  <div>
                                    เปรียบเทียบกับ วันที่{' '}
                                    {ShortDateThai(
                                      dayjs()
                                        .subtract(dayRanges[mapRange] * 2, 'day')
                                        .format('YYYY-MM-DD'),
                                    )}{' '}
                                    ถึงวันที่{' '}
                                    {ShortDateThai(
                                      dayjs()
                                        .subtract(dayRanges[mapRange] + 1, 'day')
                                        .format('YYYY-MM-DD'),
                                    )}
                                  </div>
                                </div>
                                <table className='table-tooltip'>
                                  <tr>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                    <td width={25}></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td colSpan={2}>-25%</td>
                                    <td colSpan={2}>-10%</td>
                                    <td colSpan={2}>0%</td>
                                    <td colSpan={2}>10%</td>
                                    <td colSpan={2}>25%</td>
                                    <td colSpan={2}>50%</td>
                                    <td colSpan={2}>100%</td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{ border: '1px solid black', padding: 2, background: '#355FA2' }}>
                                      &nbsp;
                                    </td>
                                    <td
                                      colSpan={2}
                                      style={{ border: '1px solid black', padding: 2, background: '#639CC6' }}>
                                      &nbsp;
                                    </td>
                                    <td
                                      colSpan={2}
                                      style={{ border: '1px solid black', padding: 2, background: '#9CD0E2' }}>
                                      &nbsp;
                                    </td>
                                    <td
                                      colSpan={2}
                                      style={{ border: '1px solid black', padding: 2, background: '#FCFFBD' }}>
                                      &nbsp;
                                    </td>
                                    <td
                                      colSpan={2}
                                      style={{ border: '1px solid black', padding: 2, background: '#FCDA7D' }}>
                                      &nbsp;
                                    </td>
                                    <td
                                      colSpan={2}
                                      style={{ border: '1px solid black', padding: 2, background: '#FB9D50' }}>
                                      &nbsp;
                                    </td>
                                    <td
                                      colSpan={2}
                                      style={{ border: '1px solid black', padding: 2, background: '#ED5534' }}>
                                      &nbsp;
                                    </td>
                                    <td
                                      colSpan={2}
                                      style={{ border: '1px solid black', padding: 2, background: '#FF0000' }}>
                                      &nbsp;
                                    </td>
                                  </tr>
                                </table>
                              </div>

                              {/* <div style={{ textAlign: 'center', background: '#FF0000', margin: 2 }}>100%</div>
                              <div style={{ textAlign: 'center', background: '#ED5534', margin: 2 }}>50%</div>
                              <div style={{ textAlign: 'center', background: '#FB9D50', margin: 2 }}>25%</div>
                              <div style={{ textAlign: 'center', background: '#FCDA7D', margin: 2 }}>10%</div>
                              <div style={{ textAlign: 'center', background: '#FCFFBD', margin: 2 }}>0%</div>
                              <div style={{ textAlign: 'center', background: '#9CD0E2', margin: 2 }}>-10%</div>
                              <div style={{ textAlign: 'center', background: '#639CC6', margin: 2 }}>-25%</div>
                              <div style={{ textAlign: 'center', background: '#355FA2', margin: 2 }}>-</div> */}
                            </div>
                            <ExMap key={mapRange} dayAgo={mapRange} />
                          </div>
                        </Col>
                      </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Table' key='Table'>
                      <ExTable t={t} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Sources' key='Sources'>
                      <ExSource />
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
              {/* <Tools xs={8} md={3} /> */}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  death: state.death.excessmortality,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OtherDisease));
