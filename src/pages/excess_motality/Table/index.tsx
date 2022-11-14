/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { Table, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getExcessMortalityTableSelector } from 'src/reducers/selectors/death';
import { compose } from 'recompose';
import _ from 'lodash';
import Filter from 'src/components/Filter';
import { hospitalpart } from 'src/constants/hospital';
interface IProps {
  dataSource: any[];
}
interface EXProps {
  t: any;
}
type TProps = IProps & EXProps;
interface DataType {
  key: React.Key;
  title: string;
}
class ExTable extends Component<TProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { dataSource, t } = this.props;
    const columns: ColumnsType<DataType> = [
      {
        title: t('chart.hospital'),
        dataIndex: 'hcode',
        key: 'hcode',
        render: (text: string) => _.filter(hospitalpart, (x) => x.hcode === text).find((x) => 1 === 1)?.hname || text,
      },
      {
        title: '31 มี.ค. 2565',
        dataIndex: 'death_second_q',
        key: 'death_second_q',
        responsive: ['md'],
        render: (text: string) => `${text} %`,
      },
      {
        title: '30 ก.ย. 2565',
        dataIndex: 'death_first_q',
        key: 'death_first_q',
        responsive: ['md'],
        render: (text: string, row: any) => `${row.death_first_q} %`,
      },
      {
        title: t('chart.change'),
        dataIndex: 'death_second_q',
        key: 'death_second_q',
        responsive: ['md'],
        render: (text: string, row: any) =>
          `${row.death_first_q - row.death_second_q > 0 ? '+' : ''}${row.death_first_q - row.death_second_q} pp`,
      },
      {
        title: '%' + t('chart.change'),
        dataIndex: 'death_second_q',
        key: 'death_second_q',
        render: (text: string) => ` `,
      },
    ];
    return (
      <div>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24}>
            <Filter />
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24}>
            <Table
              dataSource={dataSource}
              rowKey='hcode'
              pagination={false}
              columns={columns}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    dataSource: getExcessMortalityTableSelector(state),
  };
};

const mapDispatchToProps = {};

export default compose<TProps, EXProps>(connect(mapStateToProps, mapDispatchToProps))(ExTable);
