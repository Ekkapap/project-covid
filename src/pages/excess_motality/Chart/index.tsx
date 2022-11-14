/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { Col, Row } from 'antd';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Line, LineConfig } from '@ant-design/plots';
import { Death } from 'src/types';
import { getExcessMortalityDeathSelector } from 'src/reducers/selectors/death';
import { compose } from 'recompose';
import Hospitals from 'src/components/Tools/multiple_select_hospital';
import Changwats from 'src/components/Tools/multiple_select_changwat';
import { hospitalpart } from 'src/constants/hospital';
interface DeathTransform {
  date: string;
  prev_count: number;
  count: number;
  percent: number;
}

interface IProps {
  death: any[];
}
interface EXProps {
  t: any;
}

type TProps = IProps & EXProps;

class ExChart extends Component<TProps> {
  constructor(props: TProps) {
    super(props);
  }
  render() {
    const { death, t } = this.props;

    const label = t('pages.excess_mortality.header');
    const config: LineConfig = {
      data: death,
      xField: 'date',
      yField: 'percent',
      seriesField: 'hcode',
      label: {
        offsetX: -40,
        offsetY: 16,
        content: (aa) => {
          const data = _(death)
            .filter((x) => x.hcode === aa.hcode)
            .orderBy('date', 'desc')
            .first();

          if (aa.date === data.date) {
            return _.filter(hospitalpart, (x) => x.hcode === aa.hcode).find((x) => 1 === 1)?.hname;
          }
          return '';
        },

        style: {},

        position: 'middle',
      },
      slider: {},
      point: {
        size: 2,
        shape: 'diamond',
      },

      xAxis: {
        type: 'timeCat',

        label: {
          autoRotate: true,
          autoHide: false,
          autoEllipsis: false,
          formatter: (text: string) => dayjs(text).format('MMM-YYYY'),
        },
        // tickCount: 1,
      },
      legend: false,
      yAxis: {
        // legend: false,
        label: {
          formatter: (v: any) => `${v}%`,
        },
      },

      smooth: false,
      interactions: [
        {
          type: 'marker-active',
        },
      ],
      tooltip: {
        // title: (date: string) => dayjs(date).format('MMM YYYY'),
        // formatter: (datum: any) => {
        //   return { name: 'อัตรา', value: datum.percent + '%' };
        // },
        showMarkers: false,
        enterable: true,
        domStyles: {
          'g2-tooltip': {
            // width: '150px',
            padding: 0,
          },
        },
        customContent: (title: string, items: any[]) => {
          const data = items[0]?.data || {};

          const titleDom = `<div class ="custom-tooltip-title">${dayjs(data.date).format('MMM YYYY')}</div>`;
          let result: string[] = [];
          items.forEach((x) => {
            result.push(`<div class ="custom-tooltip-item">${x.data.hcode} : ${x.data.percent} %</div>`);
          });

          if (items.length === 1) {
            result = [];
            result.push(`<div class ="custom-tooltip-item">${label} : ${data.percent} %</div>`);
          }

          return `<div class="custom-tooltip">${titleDom}${result.join('')}</div>`;
        },
      },
      annotations: [
        // {
        //   type: 'regionFilter',
        //   start: ['min', 'max'],
        //   end: ['max', '0'],
        //   color: '#F4664A',
        // },
        // {
        //   type: 'regionFilter',
        //   start: ['min', 'min'],
        //   end: ['max', '0'],
        //   color: '#00FF00',
        // },

        {
          type: 'line',
          start: ['min', '0'],
          end: ['max', '0'],
          style: {
            stroke: '#F4664A',
            lineDash: [2, 2],
          },
        },
      ],
    };

    return (
      <div>
        <Row
          className='tools'
          gutter={[
            { xs: 0, md: 16 },
            { xs: 16, md: 8 },
          ]}
          style={{ flexFlow: 'row wrap' }}>
          <Col xs={24} md={12}>
            <Hospitals />
          </Col>
          <Col xs={24} md={12}>
            <Changwats />
          </Col>
        </Row>
        <Row
          className='tools'
          gutter={[
            { xs: 0, md: 16 },
            { xs: 16, md: 8 },
          ]}
          style={{ flexFlow: 'row wrap' }}>
          <Col xs={24} md={24}>
            <Line {...config} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    death: getExcessMortalityDeathSelector(state),
  };
};

const mapDispatchToProps = {};

export default compose<TProps, EXProps>(connect(mapStateToProps, mapDispatchToProps))(ExChart);
