/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Skeleton, Col, Row, Radio, Button, Table } from 'antd';
import React, { Component,createRef } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

import 'src/pages/style.less';
import 'src/pages/screening/ScreeningByArea/index.less';
import _ from 'lodash';
import Tools from 'src/components/Tools';
import { getNewData } from 'src/reducers/selectors/vaccine';
import { Trans, withTranslation } from 'react-i18next';
interface IProps {
  getDataChart: any;
  t: any;
}

interface IState {
  filter: string;
}



class VaccineLatest extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      filter: 'north_east',
    };
  }

  handleChangeFilter = (filter: string) => {
    this.setState({ filter });
  };

  render() {
    const { getDataChart, t } = this.props;
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.vaccine.chart.latestVac.title'),
    };
    const columns = [
      {
        title: t("pages.vaccine.chart.latestVac.table.date"),
        dataIndex: 'date',
      },
      {
        title: t("pages.vaccine.chart.latestVac.table.c1"),
        dataIndex: 'percent_dose1',
        className: 'fix-right',
      },
      {
        title: t("pages.vaccine.chart.latestVac.table.c2"),
        dataIndex: 'percent_dose2',

        className: 'fix-right',
      },
      {
        title: t("pages.vaccine.chart.latestVac.table.c3"),
        dataIndex: 'percent_booster',

        className: 'fix-right',
      },
    ];
    return (
      <div>
        <div ref={ref}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]} style={{ minHeight: '500px' }}>
            <Col xs={24} md={12}>
              <label className='text-header'><Trans>pages.vaccine.chart.latestVac.title</Trans></label>
            </Col>

            <Col xs={24} md={24}>
              <label className='fs14'>
                <Trans>pages.vaccine.chart.latestVac.detail</Trans>
              </label>
            </Col>
            <Col xs={24} md={24} className='data-filter'>
              <Row gutter={[8, 8]}>
                <Col xs={4} md={3}>
                  <Button type='link' size='small'>
                    <Trans>chart.daily</Trans>
                  </Button>
                </Col>
                <Col xs={6} md={4}>
                  <Button
                    type='link'
                    //style={{ color: this.state.filter === 'central' ? 'red' : 'yellow' }}
                    size='small'>
                    <Trans>chart.about</Trans>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24}>
              <Table
                className='componentcase'
                columns={columns}
                dataSource={_.orderBy(getDataChart, 'date', 'desc')}
                size='small'
                bordered={false}
                rowKey='date'
                pagination={{ pageSize: 9 }}
              />
            </Col>
          </Row>
          <Tools xs={8} md={5} chartData={chartData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selectorGetChart = getNewData(state);
  return {
    getDataChart: selectorGetChart(state),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(VaccineLatest));
