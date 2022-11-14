/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDataArea } from 'src/reducers/selectors/screening';
import { Table } from 'antd';
import { screeningData } from 'src/constants/screening';
import 'src/pages/style.less';
import { RootState } from 'src/reducers';
import { compose } from 'recompose';
import { chwpart } from 'src/constants/thaiaddress';
import { withTranslation } from 'react-i18next';
import 'src/pages/screening/ScreeningByArea/index.less';
interface IProps {
  dataArea: any;
}

interface EXProps {
  filter?: string;
  t: any;
}

type TProps = IProps & EXProps;



class ScreeningTable extends Component<TProps> {
  render() {
    const { dataArea, t } = this.props;
    const columns = [
      {
        title: t('chart.area'),
        dataIndex: 'chwpart',
        filters: [],
        onFilter: (value: any, record: any) => record.name.startsWith(value),
        filterSearch: true,
        render: (x: any) => chwpart[x],
      },
      {
        title: t('chart.case'),
        dataIndex: 'positive_seven',
        sorter: (a: any, b: any) => a.age - b.age,
        className: 'fix-right',
      },
      {
        title: t('chart.rate'),
        dataIndex: 'rate_positive_seven',
        sorter: (a: any, b: any) => a.age - b.age,
        className: 'fix-right',
      },
    ];
    return (
      <div>
        <Table
          className='componentcase'
          columns={columns}
          dataSource={dataArea.seven_day}
          size='small'
          bordered={false}
          rowKey='chwpart'
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: TProps) => {
  const selector = getDataArea(state, ownProps.filter);
  return {
    dataArea: selector(state),
  };
};

const mapDispatchToProps = {};

export default compose<TProps, EXProps>(connect(mapStateToProps, mapDispatchToProps))((ScreeningTable));
