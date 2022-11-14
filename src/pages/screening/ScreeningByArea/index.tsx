/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, createRef } from 'react';
import { Col, Row, Button } from 'antd';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { getDataArea } from 'src/reducers/selectors/screening';
import 'src/pages/style.less';
import 'src/pages/screening/ScreeningByArea/index.less';
import ScreeningTable from './Table';
import Tools from 'src/components/Tools';
import { Trans, withTranslation } from 'react-i18next';
interface IProps {
  DataArea: any;
  t: any;
}

interface IState {
  filter: string;
}

class ScreeningByArea extends Component<IProps, IState> {
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
      name: t('pages.screening.chart.screeningArea.name')
    };
    return (
      <div>
        <div ref={ref}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
            <Col>
              <label className='text-header'>{chartData.name}</label>
            </Col>
            <Col>
              <label className='fs14'>
                <Trans>pages.screening.chart.screeningArea.detail</Trans>
              </label>
            </Col>
            <Col xs={24} md={24} className='data-filter'>
              <Row gutter={[8, 8]}>
                <Col xs={4} md={3}>
                  <Button
                    type='link'
                    //style={{ color: this.state.filter === 'krung_thep_maha_nakhon' ? 'red' : 'yellow' }}
                    onClick={() => this.handleChangeFilter('krung_thep_maha_nakhon')}>
                    <Trans>chart.bkk</Trans>
                  </Button>
                </Col>
                <Col xs={6} md={4}>
                  <Button
                    type='link'
                    //style={{ color: this.state.filter === 'central' ? 'red' : 'yellow' }}
                    size='small'
                    onClick={() => this.handleChangeFilter('central')}>
                    <Trans>chart.central</Trans>
                  </Button>
                </Col>
                <Col xs={14} md={4}>
                  <Button
                    type='link'
                    //style={{ color: this.state.filter === 'north' ? 'red' : 'yellow' }}
                    onClick={() => this.handleChangeFilter('north')}>
                    <Trans>chart.north</Trans>
                  </Button>
                </Col>
                <Col xs={13} md={8}>
                  <Button
                    type='link'
                    //style={{ color: this.state.filter === 'north_east' ? 'red' : 'yellow' }}
                    onClick={() => this.handleChangeFilter('north_east')}>
                    <Trans>chart.northeast</Trans>
                  </Button>
                </Col>
                <Col xs={10} md={3}>
                  <Button
                    type='link'
                    //style={{ color: this.state.filter === 'south' ? 'red' : 'yellow' }}
                    onClick={() => this.handleChangeFilter('south')}>
                    <Trans>chart.south</Trans>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24}>
              <ScreeningTable filter={this.state.filter} t={t} />
            </Col>
          </Row>
        </div>
        <Tools xs={8} md={5} chartData={chartData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreeningByArea));
