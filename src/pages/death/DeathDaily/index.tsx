/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton, Col, Row, Radio, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { getReportChart } from 'src/reducers/selectors/screening';
import { screeningData } from 'src/constants/screening';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import 'src/pages/style.less';
import { DualAxes } from '@ant-design/plots';
import dayjs from 'dayjs';
import Tools from 'src/components/Tools';

interface IProps {
  getReportChart: any;
}
interface IState {
  nationality: string;
}

class DeathDaily extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { nationality: 'THAI' };
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ nationality: e.target.value });
  };

  render() {
    const { getReportChart } = this.props;

    const config = {
      data: [getReportChart, getReportChart],
      xField: 'date',
      yField: ['pos_all', 'rate_pos_seven'],

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
            return item.value === 'pos_all' ? 'ผลการตรวจคัดกรองไวรัส' : 'ผลการตรวจคัดกรองไวรัส (7 เฉลี่ย)';
          },
        },
      },
    };
    return (
      <div>
        <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
          <Col xs={24} md={12}>
            <label className='text-header'>เสียชีวิตจากโควิด-19 รายวัน</label>
          </Col>
          <Col xs={24} md={12} className='radio-nation'>
            <Radio.Group onChange={this.onChange} value={this.state.nationality}>
              <Radio className='fs14' value='THAI'>
                คนไทย
              </Radio>
              <Radio className='fs14' value='FOREIGNER'>
                ชาวต่างชาติ
              </Radio>
            </Radio.Group>
          </Col>
          <Col xs={24} md={16}>
            <label className='fs14'>
              จำนวนผู้เสียชีวิตรายวันที่มีระบุว่า โควิด-19 เป็นหนึ่งในสาเหตุ และค่าเฉลี่ยต่อเนื่อง 7 วัน มีความล่าช้า
              ในการรายงานอย่างน้อย 11 วัน เนื่องจากข้อมูลมาจากการขึ้นทะเบียนการตาย ข้อมูลแสดงตามวันที่เสียชีวิต
            </label>
          </Col>
          <Col xs={24} md={24} className='data-filter'>
            <Row gutter={[8, 8]}>
              <Col xs={5} md={2}>
                <Button type='link'>รายวัน</Button>
              </Col>
              <Col xs={4} md={2}>
                <Button type='link'>ข้อมูล</Button>
              </Col>
              <Col xs={8} md={3}>
                <Button type='link'>เกี่ยวกับกราฟนี้</Button>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={24}>
            <DualAxes {...config} />
          </Col>
        </Row>
        <Tools xs={8} md={3} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    getReportChart: getReportChart(screeningData),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeathDaily);
