import { Col, Row, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const { Text, Link } = Typography;

interface IProps {
  data: any;
}

class VaccineReport extends Component<IProps> {
  render() {
    const { data } = this.props;

    return (
      <Row style={{ backgroundColor: 'white' }}>
        <Col xs={24} md={6} style={{ padding: 10 }}>
          <label>
            <Text type='secondary' style={{ fontSize: 14 }}>
              การฉีดวัคซีน
            </Text>
          </label>
          <br></br>
          <label>
            <Text strong style={{ fontSize: 16 }}>
              คนที่ได้รับวัคซีน
            </Text>
          </label>
          <br></br>
          <label>
            <Text type='secondary' style={{ fontSize: 14 }}>
              ถึงวันที่ 24 พฤษาคม 2565
            </Text>
          </label>
          <br></br>
          <label>
            <Link href='#' target='_blank' style={{ fontSize: 15 }}>
              ข้อมูลการฉีดวัคซีนทั้งหมด
            </Link>
          </label>
        </Col>
        <Col xs={24} md={6} style={{ padding: 10 }}>
          <label>
            <Text type='secondary' style={{ fontSize: 14 }}>
              7 วันที่ผ่านมา - เข็มแรก
            </Text>
          </label>
          <br></br>
          <label>
            <Text strong>{data.seven_day.dose1.toLocaleString()}</Text>
          </label>
          <br></br>
          <label>
            <Text type='secondary' style={{ fontSize: 14 }}>
              ผู้มาฉีดเข็มแรกทั้งหมด
            </Text>
          </label>
          <br></br>
          <label>
            <Text strong>{data.total_vaccine.dose1.toLocaleString()}</Text>
          </label>
        </Col>
        <Col xs={24} md={6} style={{ padding: 10 }}>
          <label>
            <Text type='secondary' style={{ fontSize: 14 }}>
              7 วันที่ผ่านมา - เข็มที่สอง
            </Text>
          </label>
          <br></br>
          <label>
            <Text strong>{data.seven_day.dose2.toLocaleString()}</Text>
          </label>
          <br></br>
          <label>
            <Text type='secondary' style={{ fontSize: 14 }}>
              ผู้มาฉีดเข็มที่สองทั้งหมด
            </Text>
          </label>
          <br></br>
          <label>
            <Text strong>{data.total_vaccine.dose2.toLocaleString()}</Text>
          </label>
        </Col>
        <Col xs={24} md={6} style={{ padding: 10 }}>
          <label>
            <Text type='secondary' style={{ fontSize: 14 }}>
              7 วันที่ผ่านมา - บูสเตอร์
            </Text>
          </label>
          <br></br>
          <label>
            <Text strong>{data.seven_day.booster.toLocaleString()}</Text>
          </label>
          <br></br>
          <label>
            <Text type='secondary' style={{ fontSize: 14 }}>
              ผู้ฉีดวัคซีนเข็มบูสเตอร์ทั้งหมด
            </Text>
          </label>
          <br></br>
          <label>
            <Text strong>{data.total_vaccine.booster.toLocaleString()}</Text>
          </label>
        </Col>
      </Row>
    );
  }
}

export default connect()(VaccineReport);
