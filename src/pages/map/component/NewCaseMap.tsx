import React from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import { Button, Box, Grid, Paper } from '@material-ui/core';
import _ from 'lodash';
import { PopulationRequest } from 'src/types/population';
import { Screening } from 'src/types';

import 'leaflet/dist/leaflet.css';
import './map.css';
import dayjs from 'dayjs';

const position: any = [17.5, 103.5];
const zoom: any = 9;
interface IProps {
  population?: PopulationRequest | undefined;
  screening?: Screening[];
  onChangwatClick: (chwpart: string) => void;
}
interface LastParams {
  params: string;
  bounds: any;
}

interface TagHistory {
  populationTag: string | number;
  positiveTag: string | number;
  positive7DayTag: string | number;
}
interface IState {
  mapLevel: number;
  mapParams: LastParams[];
  featureId: string | undefined;
  prvJsonData: any;
  ampJsonData: any;
  tmbJsonData: any;
  mapTitles: string[];
  hoverName: string;

  tagHistory: TagHistory[];
}

export default class NewCaseMap extends React.Component<IProps, IState> {
  mapRef: any;
  geojsonRef: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      mapLevel: 0,
      mapParams: [],
      featureId: undefined,
      prvJsonData: undefined,
      ampJsonData: undefined,
      tmbJsonData: undefined,
      mapTitles: [],
      hoverName: '',

      tagHistory: [],
    };

    this.mapRef = React.createRef();
    this.geojsonRef = React.createRef();
  }

  componentDidMount() {
    const { population, screening } = this.props;

    const substact7day = dayjs().subtract(7, 'day').format('YYYY-MM-DD');

    fetch('provinces.geojson')
      .then((res) => res.json())
      .then((data) => {
        const positiveData = _(screening)
          .groupBy('chw')
          .map((item: Screening[], key: any) => {
            return {
              chw: key,
              total_p: _.sumBy(item, 'total_p'),
              total_p_7d: _.sumBy(
                item.filter((x) => x.date && x.date > substact7day),
                'total_p',
              ),
            };
          })
          .value();

        const transform = {
          ...data,
          features: data.features.map((chw: any) => {
            const pop = population?.data.find((x) => x.changwatcode === chw.properties.pro_code);
            const positive = positiveData?.find((x) => x.chw === chw.properties.pro_code);
            return {
              ...chw,
              properties: {
                ...chw.properties,
                pop: pop ? pop.pop : 0,
                positive: positive ? positive.total_p : 0,
                positive7day: positive ? positive.total_p_7d : 0,
              },
            };
          }),
        };
        this.setState({ prvJsonData: transform });
      });

    fetch('districts.geojson')
      .then((res) => res.json())
      .then((data) => {
        const positiveData = _(screening)
          .groupBy((item) => {
            return `${item.chw}${item.amp}`;
          })
          .map((item: Screening[], key: any) => {
            return {
              amp: key,
              total_p: _.sumBy(item, 'total_p'),
              total_p_7d: _.sumBy(
                item.filter((x) => x.date && x.date > substact7day),
                'total_p',
              ),
            };
          })
          .value();

        const transform = {
          ...data,
          features: data.features.map((amp: any) => {
            const ampPop = population?.data
              .find((x) => x.changwatcode === amp.properties.pro_code)
              ?.amphur.find((x) => x.amphur_id === amp.properties.amp_code);

            const positive = positiveData?.find((x) => x.amp === amp.properties.amp_code);

            return {
              ...amp,
              properties: {
                ...amp.properties,
                pop: ampPop ? ampPop.pop : 0,
                positive: positive ? positive.total_p : 0,
                positive7day: positive ? positive.total_p_7d : 0,
              },
            };
          }),
        };

        this.setState({ ampJsonData: transform });
      });

    fetch('subdistricts.geojson')
      .then((res) => res.json())
      .then((data) => {
        const positiveData = _(screening)
          .groupBy((item) => {
            return `${item.chw}${item.amp}${item.tmb}`;
          })
          .map((item: Screening[], key: any) => {
            return {
              tmb: key,
              total_p: _.sumBy(item, 'total_p'),
              total_p_7d: _.sumBy(
                item.filter((x) => x.date && x.date > substact7day),
                'total_p',
              ),
            };
          })
          .value();

        const transform = {
          ...data,
          features: data.features.map((tmp: any) => {
            const tmpPop = population?.data
              .find((x) => x.changwatcode === tmp.properties.pro_code)
              ?.amphur.find((x) => x.amphur_id === tmp.properties.amp_code)
              ?.tambol.find((x) => x.addressid === tmp.properties.tam_code);

            const positive = positiveData?.find((x) => x.tmb === tmp.properties.tam_code);

            return {
              ...tmp,
              properties: {
                ...tmp.properties,
                pop: tmpPop ? tmpPop.pop : 0,
                positive: positive ? positive.total_p : 0,
                positive7day: positive ? positive.total_p_7d : 0,
              },
            };
          }),
        };

        this.setState({ tmbJsonData: transform });
      });
  }
  // const [map, setMap]: any = useState(null);
  // const [mapDistLevel, setMapDistLevel]: any = useState(0);

  // const [mapZoom, setMapZoom]: any = useState(5);
  // const [mapData, setMapData]: any = useState(PROVINCE);
  // const geojsonRef: any = useRef();

  // const [featureId, setFeatureId]: any = useState(null);
  handleDecrementMapLevel = () => {
    const { mapParams, mapTitles, tagHistory } = this.state;
    mapParams.splice(-1);

    mapTitles.splice(-1);

    tagHistory.splice(-1);

    this.setState(
      (prevState: IState) => ({
        mapLevel: prevState.mapLevel > 0 ? prevState.mapLevel - 1 : 0,
        mapParams: mapParams,
        mapTitles,
        tagHistory,
      }),
      this.renderMapLevel,
    );
  };

  renderMapLevel = () => {
    const { mapLevel, mapParams, prvJsonData, ampJsonData } = this.state;
    // this.mapRef.redraw();

    switch (mapLevel) {
      case 0:
        {
          this.mapRef.setZoom(zoom);
          this.geojsonRef.clearLayers();
          this.geojsonRef.addData(prvJsonData);
          // this.mapRef.setView(position);
        }
        break;
      case 1:
        {
          const ampData = {
            features: ampJsonData?.features.filter((x: any) => x.properties.pro_code === mapParams[0].params),
            type: 'FeatureCollection',
          };

          this.mapRef.setZoom(zoom);
          this.geojsonRef.clearLayers();
          this.geojsonRef.addData(ampData);
        }
        break;
      case 2:
        break;
      default:
        break;
    }
  };

  onMouseOver = (event: any) => {
    const excludeMap = !['38', '39', '41', '42', '43', '47', '48'].includes(event.target.feature.properties.pro_code);
    if (excludeMap) {
      return;
    }

    event.target.bringToFront();
    event.target.setStyle({
      color: 'black',
      weight: 3,
    });
  };

  onMouseOut = (event: any) => {
    const excludeMap = !['38', '39', '41', '42', '43', '47', '48'].includes(event.target.feature.properties.pro_code);
    if (excludeMap) {
      return;
    }

    event.target.bringToBack();
    event.target.setStyle({
      color: 'white',
      weight: 2,
    });
  };

  onClick = (event: any) => {
    const { mapLevel, ampJsonData, tmbJsonData } = this.state;

    const target = event.target.feature.properties;

    const excludeMap = !['38', '39', '41', '42', '43', '47', '48'].includes(target.pro_code);
    if (excludeMap) {
      return;
    }

    switch (mapLevel) {
      case 0:
        {
          const ampData = {
            features: ampJsonData?.features.filter((x: any) => x.properties.pro_code === target.pro_code),
            type: 'FeatureCollection',
          };

          this.setState((prevState: IState) => {
            const mapTitle = [...prevState.mapTitles];
            mapTitle.push(target.pro_th);
            return {
              featureId: target.pro_code,
              mapLevel: prevState.mapLevel + 1,
              mapParams: [
                ...prevState.mapParams,
                {
                  params: target.pro_code,
                  bounds: event.target.getBounds(),
                },
              ],
              mapTitles: mapTitle,
              tagHistory: [
                ...prevState.tagHistory,
                { populationTag: target.pop, positiveTag: target.positive, positive7DayTag: target.positive7day },
              ],
            };
          });

          this.geojsonRef.clearLayers();
          this.geojsonRef.addData(ampData);
          this.mapRef.fitBounds(event.target.getBounds());
        }
        break;
      case 1:
        {
          //pro_en //AMpro_en
          const tambonData = {
            features: tmbJsonData?.features.filter(
              (x: any) => x.properties.pro_code === target.pro_code && x.properties.amp_code === target.amp_code,
            ),
            type: 'FeatureCollection',
          };

          this.setState((prevState: IState) => {
            const mapTitle = [...prevState.mapTitles];
            mapTitle.push(target.amp_th);
            return {
              featureId: target.pro_code,
              mapLevel: prevState.mapLevel + 1,
              mapParams: [
                ...prevState.mapParams,
                {
                  params: target.amp_code,
                  bounds: event.target.getBounds(),
                },
              ],
              mapTitles: mapTitle,
              tagHistory: [
                ...prevState.tagHistory,
                { populationTag: target.pop, positiveTag: target.positive, positive7DayTag: target.positive7day },
              ],
            };
          });
          this.geojsonRef.clearLayers();
          this.geojsonRef.addData(tambonData);
          this.mapRef.fitBounds(event.target.getBounds());
        }
        break;
      case 2:
        // console.log(feature.properties.tam_th);
        break;
      default:
        break;
    }
    return '';
  };

  confirmedStyle(feature: any) {
    const target = feature.properties;
    const excludeMap = !['38', '39', '41', '42', '43', '47', '48'].includes(target.pro_code);

    if (excludeMap) {
      return {
        fillColor: '#eeeeee',
      };
    }

    // console.log('target.pop', target.pop);
    if (target.pop <= 0 || !target.pop) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: '#eeeeee',
      };
    }
    const percent = (target.positive / target.pop) * 100;

    if (percent > 20) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: 'orange',
      };
    } else if (percent > 10) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: 'yellow',
      };
    } else if (percent <= 10) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: 'green',
      };
    }

    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: 'green',
    };
  }

  handleEachFeature = (feature: any, layer: any) => {
    // const { onChangwatClick } = this.props;
    const excludeMap = !['38', '39', '41', '42', '43', '47', '48'].includes(feature.properties.pro_code);

    // const aa = L.marker([-37.7772, 175.2606]).bindLabel('Look revealing label!');

    layer.on({
      mouseover: this.onMouseOver,
      mouseout: this.onMouseOut,
      click: this.onClick,
    });

    if (!excludeMap) {
      if (feature.properties.tam_th) {
        layer.bindTooltip(feature.properties.tam_th, {
          direction: 'center',
          permanent: true,
          className: 'tamLabel',
        });
      } else if (feature.properties.amp_th) {
        layer.bindTooltip(feature.properties.amp_th, {
          direction: 'center',
          permanent: true,
          className: 'ampLabel',
        });
      } else {
        layer.bindTooltip(feature.properties.pro_th, {
          direction: 'center',
          permanent: true,
          className: 'proLabel',
        });
      }
    }

    layer.options.color = 'white';
    // layer.options.fillOpacity = 1;
    layer.options.weight = 2;
    layer.options.dashArray = 1;
    // layer.options.opacity = 1;
  };

  render() {
    const { mapLevel, prvJsonData, mapTitles, hoverName, tagHistory } = this.state;
    const { population } = this.props;
    const options = {
      doubleClickZoom: false,
      closePopupOnClick: false,
      dragging: true,
      trackResize: false,
      touchZoom: false,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,

      // onEachFeature: () => handleEachFeature,
    };

    const tag = tagHistory[tagHistory.length - 1];
    return (
      <MapContainer
        {...options}
        center={position}
        zoom={7}
        whenCreated={(refs: any) => (this.mapRef = refs)}
        style={{ height: '400px', width: '100%', backgroundColor: 'white' }}>
        <div>{hoverName}</div>
        {mapLevel > 0 && (
          <>
            <Button
              variant='contained'
              style={{ zIndex: 999, position: 'absolute' }}
              size='small'
              onClick={this.handleDecrementMapLevel}>
              Zoom Out
            </Button>
            <Box style={{ zIndex: 999, width: 160, position: 'absolute', bottom: 0 }}>
              <Grid container spacing={1} style={{}}>
                <Grid item xs={12}>
                  <Paper elevation={3} variant='outlined' square style={{ padding: 2 }}>
                    {mapTitles.join('>')}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={3} variant='outlined' square style={{ padding: 2 }}>
                    Population : {tag.populationTag}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={3} variant='outlined' square style={{ padding: 2 }}>
                    Positive: {tag.positiveTag}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={3} variant='outlined' square style={{ padding: 2 }}>
                    Positive (7 day) : {tag.positive7DayTag}
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </>
        )}

        {prvJsonData && population && population?.data.length > 0 && (
          <GeoJSON
            ref={(refs: any) => (this.geojsonRef = refs)}
            data={prvJsonData as any}
            onEachFeature={this.handleEachFeature}
            style={this.confirmedStyle}
          />
        )}
      </MapContainer>
    );
  }
}
