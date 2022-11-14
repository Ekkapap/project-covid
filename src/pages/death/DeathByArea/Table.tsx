import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDataArea } from 'src/reducers/selectors/screening';
// import { RootState } from 'src/reducers';
import { Table } from 'antd';
import { screeningData } from 'src/constants/screening';
import 'src/pages/style.less';
import { RootState } from 'src/reducers';
import { compose } from 'recompose';
import { chwpart } from 'src/constants/thaiaddress';

import 'src/pages/screening/ScreeningByArea/index.less';

interface IProps {
  dataArea: any;
}

interface EXProps {
  filter?: string;
}

type TProps = IProps & EXProps;

const columns = [
  {
    title: 'พื้นที่',
    dataIndex: 'chwpart',
    filters: [],
    onFilter: (value: any, record: any) => record.name.startsWith(value),
    filterSearch: true,
    render: (x: any) => chwpart[x],
  },
  {
    title: 'จำนวนเคส',
    dataIndex: 'positive',
    sorter: (a: any, b: any) => a.age - b.age,
    className: 'fix-right',
  },
  {
    title: 'อัตราต่อประชากร 100,000 คน',
    dataIndex: 'rate_positive',
    sorter: (a: any, b: any) => a.age - b.age,
    className: 'fix-right',
  },
];

class ScreeningTable extends Component<TProps> {
  render() {
    const { dataArea } = this.props;
    return (
      <div>
        <Table
          className='componentcase'
          columns={columns}
          dataSource={dataArea.all}
          size='small'
          bordered={false}
          rowKey='chwpart'
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: TProps) => {
  const selector = getDataArea(screeningData, ownProps.filter);

  return {
    dataArea: selector(screeningData),
  };
};

const mapDispatchToProps = {};

export default compose<TProps, EXProps>(connect(mapStateToProps, mapDispatchToProps))(ScreeningTable);
