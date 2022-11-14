import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDeathArea } from 'src/reducers/selectors/death';
// import { RootState } from 'src/reducers';
import { Table } from 'antd';
import 'src/pages/style.less';
import { RootState } from 'src/reducers';
import { compose } from 'recompose';
import { chwpart } from 'src/constants/thaiaddress';

import 'src/pages/screening/ScreeningByArea/index.less';

interface IProps {
  getDataArea: any;
  filter?: string;
}

interface EXProps {
  filter?: string;
  t: any;
}

type TProps = IProps & EXProps;

class DeathTable extends Component<TProps> {

  render() {
    const { getDataArea, t } = this.props;
    const columns = [
      {
        title: t("pages.death.chart.28DailyArea.table.c1"),
        dataIndex: 'chwpart',
        filters: [],
        onFilter: (value: any, record: any) => record.name.startsWith(value),
        filterSearch: true,
        render: (x: any) => chwpart[x],
      },
      {
        title: t("pages.death.chart.28DailyArea.table.c2"),
        dataIndex: 'death28',
        sorter: (a: any, b: any) => a.age - b.age,
        className: 'fix-right',
      },
      {
        title: t("pages.death.chart.28DailyArea.table.c3"),
        dataIndex: 'rate_death28',
        sorter: (a: any, b: any) => a.age - b.age,
        className: 'fix-right',
      },
    ];
    return (
      <div>
        <Table
          className='componentcase'
          columns={columns}
          dataSource={getDataArea.death28}
          size='small'
          bordered={false}
          rowKey='chwpart'
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: TProps) => {
  const selector = getDeathArea(state, ownProps.filter);

  return {
    getDataArea: selector(state),
  };
};

const mapDispatchToProps = {};

export default compose<TProps, EXProps>(connect(mapStateToProps, mapDispatchToProps))(DeathTable);
