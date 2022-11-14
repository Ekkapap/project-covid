/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton, Col, Row, Radio, Button } from 'antd';
import React, { Component,createRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { getReportChart } from 'src/reducers/selectors/screening';
import { screeningData } from 'src/constants/screening';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { getDataArea } from 'src/reducers/selectors/screening';
import 'src/pages/style.less';
import 'src/pages/screening/ScreeningByArea/index.less';
import DeathTable from './Table';
import Tools from 'src/components/Tools';
import { Trans, withTranslation } from 'react-i18next';
interface IProps {
  DataArea: any;
  t: any;
}

interface IState {
  filter: string;
}

class DeathIn28dayByArea extends Component<IProps, IState> {
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
    const dispatchDataArea = (x: any) => {
      this.props.DataArea(x);
    };
    const { t } = this.props;
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.death.chart.28DailyArea.title'),
    };
    return (
      <div>
        <div ref={ref}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}
            style={{
              display: "flex",
              flexDirection: "column"
            }}>
            <Col>
              <label className='text-header'><Trans>pages.death.chart.28DailyArea.title</Trans></label>
            </Col>
            <Col>
              <label className='fs14'>
                <Trans>pages.death.chart.28DailyArea.detail</Trans>
              </label>
            </Col>
            <Col xs={24} md={24} className='data-filter' style={{width:"100%"}}>
              <Row gutter={[8, 8]}>
                <Col xs={4} md={3}>
                  <Button type='link' onClick={() => this.handleChangeFilter('krung_thep_maha_nakhon')}>
                    <Trans>chart.bkk</Trans>
                  </Button>
                </Col>
                <Col xs={6} md={4}>
                  <Button type='link' onClick={() => this.handleChangeFilter('central')}>
                    <Trans>chart.central</Trans>
                  </Button>
                </Col>
                <Col xs={14} md={4}>
                  <Button type='link' onClick={() => this.handleChangeFilter('north')}>
                    <Trans>chart.north</Trans>
                  </Button>
                </Col>
                <Col xs={13} md={8}>
                  <Button type='link' onClick={() => this.handleChangeFilter('north_east')}>
                    <Trans>chart.northeast</Trans>
                  </Button>
                </Col>
                <Col xs={10} md={3}>
                  <Button type='link' onClick={() => this.handleChangeFilter('south')}>
                    <Trans>chart.south</Trans>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24} style={{width:"100%"}}>
              <DeathTable filter={this.state.filter} t={t} />
            </Col>
          </Row>
          <Tools xs={8} md={5} chartData={chartData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    DataArea: (x: any) => getDataArea(x),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DeathIn28dayByArea));
