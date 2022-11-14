/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton, Col, Row, Radio, Button } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { getReportChart } from 'src/reducers/selectors/screening';
import { screeningData } from 'src/constants/screening';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
//dummy
import { getDataArea } from 'src/reducers/selectors/screening';
import 'src/pages/style.less';
import 'src/pages/screening/ScreeningByArea/index.less';
import ScreeningTable from './Table';
import Tools from 'src/components/Tools';

interface IProps {
  DataArea: any;
}

interface IState {
  filter: string;
}
class DeathByArea extends Component<IProps, IState> {
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
    return (
      <div>
        <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
          <Col>
            <label className='text-header'>ผู้เสียชีวิตจากโรคโควิด-19 แยกตามพื้นที่</label>
          </Col>
          <Col>
            <label className='fs14'>
              จำนวนผู้เสียชีวิตรายสัปดาห์ที่มีระบุว่า โควิด-19 เป็นหนึ่งในสาเหตุ ตั้งแต่เริ่มแพร่ระบาด
              ข้อมูลจะมีความล่าช้าในการรายงานอย่างน้อย 11 วัน เนื่องจากข้อมูลมาจากการขึ้นทะเบียนการเสียชีวิตของผู้ป่วย
            </label>
          </Col>
          <Col xs={24} md={24} className='data-filter'>
            <Row gutter={[8, 8]}>
              <Col xs={4} md={3}>
                <Button type='link'>กทม</Button>
              </Col>
              <Col xs={6} md={4}>
                <Button type='link'>ภาคกลาง</Button>
              </Col>
              <Col xs={14} md={4}>
                <Button type='link'>ภาคเหนือ</Button>
              </Col>
              <Col xs={13} md={8}>
                <Button type='link'>ภาคตะวันออกเฉียงเหนือ</Button>
              </Col>
              <Col xs={10} md={3}>
                <Button type='link'>ภาคใต้</Button>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={24}>
            <ScreeningTable filter={this.state.filter} />
          </Col>
        </Row>
        <Tools xs={8} md={5}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeathByArea);
