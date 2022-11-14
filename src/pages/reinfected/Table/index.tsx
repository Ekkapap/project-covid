/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { Col, Row, Skeleton } from 'antd';
import _ from 'lodash';
import { ReinfectedRequest, ReinfectedData } from 'src/types';
import ChwRaw from './ChwRowNew';

interface IProps {
  reinfected: ReinfectedRequest;
}

class Table extends Component<IProps> {
  render() {
    const { reinfected } = this.props;

    const chw = _.groupBy(reinfected.data, 'chw');

    // console.log('chw', chw);

    const chwcode = ['38', '39', '41', '42', '43', '47', '48'];

    return (
      <div>
        <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
          <Col xs={24}>
            <table width='100%' style={{ fontSize: 16 }}>
              <thead>
                <tr style={{ background: '#F0980B', color: 'white' }}>
                  <th>จังหวัด</th>
                  <th style={{ width: '13%', verticalAlign: 'middle', fontSize: 14 }}>การติดเชื้อสะสม</th>
                  <th style={{ width: '13%', verticalAlign: 'middle', fontSize: 14 }}>การติดเชื้อซ้ำสะสม</th>
                  <th style={{ width: '13%', verticalAlign: 'middle', fontSize: 14 }}>
                    การติดเชื้อสะสม ครั้งแรก (สัปดาห์ก่อนหน้า)
                  </th>
                  <th style={{ width: '13%', verticalAlign: 'middle', fontSize: 14 }}>การติดซ้ำ (สัปดาห์ก่อนหน้า)</th>
                  <th style={{ width: '13%', verticalAlign: 'middle', fontSize: 14 }}>
                    อัตราการติดเชื้อซ้ำ สะสมต่อ 100k (สัปดาห์ก่อนหน้า)
                  </th>
                  <th style={{ width: '13%', verticalAlign: 'middle', fontSize: 14 }}>
                    การติดเชื้อซ้ำ สะสมต่อ 100k (สัปดาห์ก่อนหน้า)
                  </th>
                </tr>
              </thead>
              <tbody>
                {chwcode.map((x) => (
                  <ChwRaw chw={x} />
                ))}
                {/* {Object.keys(chw).map((key) => (
                  <ChwRaw chw={key} data={chw[key]} />
                ))} */}
              </tbody>
            </table>
            {/* <Skeleton /> */}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    reinfected: state.reinfected,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
