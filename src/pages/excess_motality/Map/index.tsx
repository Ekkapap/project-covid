/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { AreaMap, AreaMapConfig } from '@ant-design/maps';
import { Death, DeathRequest } from 'src/types';
import _ from 'lodash';
import dayjs from 'dayjs';
import { compose } from 'recompose';

interface EXProps {
  dayAgo: number;
}
interface IProps {
  death: DeathRequest;
}

type TProps = IProps & EXProps;

interface IState {
  prvJsonData: any;
}

const dayRanges = [7, 30, 365];

class ExMap extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      prvJsonData: { type: 'FeatureCollection', features: [] },
    };
  }

  componentDidMount() {
    const { death, dayAgo } = this.props;

    const deathData = _(death.data)
      .groupBy((x) => x.chw)
      .map((item: Death[], key: any) => {
        const oneYear = dayjs().subtract(dayRanges[dayAgo], 'day').format('YYYY-MM-DD');
        const twoYear = dayjs()
          .subtract(dayRanges[dayAgo] * 2, 'day')
          .format('YYYY-MM-DD');

        const year_death = _.sumBy(
          item.filter((x) => x.date >= oneYear),
          'count',
        );

        const prev_death = _.sumBy(
          item.filter((x) => x.date < oneYear && x.date >= twoYear),
          'count',
        );

        const excessmortality = ((year_death - prev_death) / prev_death) * 100;
        console.log(key, year_death, prev_death);

        return {
          chw: key,
          excessmortality,
        };
      })
      .value();

    fetch('provinces.geojson')
      .then((response) => response.json())
      .then((data) => {
        const transform = {
          ...data,
          features: data.features.map((chw: any) => {
            // const pop = population?.data.find((x) => x.changwatcode === chw.properties.pro_code);
            // const positive = positiveData?.find((x) => x.chw === chw.properties.pro_code);
            const chwdeath = deathData.find((x) => x.chw === chw.properties.pro_code);
            return {
              ...chw,
              properties: {
                ...chw.properties,
                excessmortality: chwdeath?.excessmortality,
              },
            };
          }),
        };

        this.setState({ prvJsonData: transform });
      });
  }

  colorScale = (value: any) => {
    if (!value?.excessmortality) return '';

    const color = ['#355FA2', '#639CC6', '#9CD0E2', '#FCFFBD', '#FCDA7D', '#FB9D50', '#ED5534', '#FF0000'].reverse();

    if (value.excessmortality >= 100) {
      return color[0];
    } else if (value.excessmortality >= 50) {
      return color[1];
    } else if (value.excessmortality >= 25) {
      return color[2];
    } else if (value.excessmortality >= 10) {
      return color[3];
    } else if (value.excessmortality >= 0) {
      return color[4];
    } else if (value.excessmortality >= -10) {
      return color[5];
    } else if (value.excessmortality >= -25) {
      return color[6];
    } else {
      return color[7];
    }
  };

  render() {
    const { prvJsonData } = this.state;

    const config: AreaMapConfig = {
      map: {
        type: 'mapbox',
        style: 'blank',
        center: [103.5, 17.5],
        zoom: 7,
        pitch: 0,
      },
      source: {
        data: prvJsonData,
        parser: {
          type: 'geojson',
        },
      },
      autoFit: false,
      color: {
        field: 'excessmortality',
        value: this.colorScale,
        scale: {
          type: 'quantile',
          range: [{ min: 200, max: 250 }],
        },
      },
      style: {
        opacity: 1,
        stroke: 'rgb(93,112,146)',
        lineType: 'dash',
        lineDash: [2, 2],
        lineWidth: 0.6,
        lineOpacity: 1,
      },
      state: {
        active: true,
        select: true,
      },
      tooltip: {
        items: [
          { field: 'pro_th', alias: 'จังหวัด' },
          {
            field: 'excessmortality',
            alias: 'อัตรา',
            customValue: (value) => `${value.toFixed(2)} %`,
          },
        ],
      },

      zoom: {
        position: 'bottomright',
      },
      legend: {
        position: 'bottomleft',
      },
    };

    return <AreaMap {...config} />;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    death: state.death.excessmortality,
  };
};

const mapDispatchToProps = {};

export default compose<TProps, EXProps>(connect(mapStateToProps, mapDispatchToProps))(ExMap);
