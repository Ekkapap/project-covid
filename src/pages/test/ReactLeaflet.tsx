import React from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import { Button } from '@material-ui/core';
// import { PROVINCE } from 'src/constants/geo/province_wgs84_z47_006';
// import level1 from 'src/constants/geo/amphur_wgs84_z47_006.json';
// import { TAMBON } from 'src/constants/geo/tambol_wgs84_z47';

import 'leaflet/dist/leaflet.css';
import './map.css';

const position: any = [17.5, 102];

interface IProps {
  onChangwatClick: (chwpart: string) => void;
}
interface LastParams {
  params: string;
  bounds: any;
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
}

export default class ReactLeaflet extends React.Component<IProps, IState> {
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
    };

    this.mapRef = React.createRef();
    this.geojsonRef = React.createRef();
  }

  componentDidMount() {
    fetch('provinces.geojson')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ prvJsonData: data });
      });

    fetch('districts.geojson')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ampJsonData: data });
      });

    fetch('subdistricts.geojson')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tmbJsonData: data });
      });
  }
  // const [map, setMap]: any = useState(null);
  // const [mapDistLevel, setMapDistLevel]: any = useState(0);

  // const [mapZoom, setMapZoom]: any = useState(5);
  // const [mapData, setMapData]: any = useState(PROVINCE);
  // const geojsonRef: any = useRef();

  // const [featureId, setFeatureId]: any = useState(null);
  handleDecrementMapLevel = () => {
    const { mapParams, mapTitles } = this.state;
    mapParams.splice(-1);

    mapTitles.splice(-1);

    this.setState(
      (prevState: IState) => ({
        mapLevel: prevState.mapLevel > 0 ? prevState.mapLevel - 1 : 0,
        mapParams: mapParams,
        mapTitles,
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
          this.mapRef.setZoom(7);
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

          this.mapRef.setZoom(8);
          this.geojsonRef.clearLayers();
          this.geojsonRef.addData(ampData);
          // this.mapRef.setView(position);

          // this.mapRef.fitBounds(e.target.getBounds());
          // this.setState((prevState: IState) => ({
          //   featureId: mapParams[0],
          //   mapLevel: prevState.mapLevel + 1,
          //   mapParams: [...prevState.mapParams, mapParams[0]],
          // }));
        }
        break;
      case 2:
        // console.log(feature.properties.TAM_NAM_T);
        break;
      default:
        break;
    }
  };

  handleEachFeature = (feature: any, layer: any) => {
    // const { onChangwatClick } = this.props;
    const excludeMap = !['38', '39', '41', '42', '43', '47', '48'].includes(feature.properties.pro_code);

    layer.on({
      mouseover: function () {
        if (excludeMap) {
          return;
        }

        this.setStyle({
          fillColor: '#b45501',
        });
      },
      mouseout: function () {
        if (excludeMap) {
          return;
        }

        this.setStyle({
          fillColor: '#00FF00',
        });
      },
      click: (e: any) => {
        const { mapLevel, ampJsonData, tmbJsonData } = this.state;

        if (excludeMap) {
          return;
        }

        switch (mapLevel) {
          case 0:
            {
              const ampData = {
                features: ampJsonData?.features.filter(
                  (x: any) => x.properties.pro_code === feature.properties.pro_code,
                ),
                type: 'FeatureCollection',
              };
              this.geojsonRef.clearLayers();
              this.geojsonRef.addData(ampData);
              this.mapRef.fitBounds(e.target.getBounds());

              this.setState((prevState: IState) => {
                const mapTitle = [...prevState.mapTitles];
                mapTitle.push(feature.properties.pro_th);
                return {
                  featureId: feature.properties.pro_code,
                  mapLevel: prevState.mapLevel + 1,
                  mapParams: [
                    ...prevState.mapParams,
                    {
                      params: feature.properties.pro_code,
                      bounds: e.target.getBounds(),
                    },
                  ],
                  mapTitles: mapTitle,
                };
              });
            }
            break;
          case 1:
            {
              //pro_en //AMpro_en
              const tambonData = {
                features: tmbJsonData?.features.filter(
                  (x: any) =>
                    x.properties.pro_code === feature.properties.pro_code &&
                    x.properties.amp_code === feature.properties.amp_code,
                ),
                type: 'FeatureCollection',
              };

              this.geojsonRef.clearLayers();
              this.geojsonRef.addData(tambonData);
              this.mapRef.fitBounds(e.target.getBounds());

              this.setState((prevState: IState) => {
                const mapTitle = [...prevState.mapTitles];
                mapTitle.push(feature.properties.amp_th);
                return {
                  featureId: feature.properties.pro_code,
                  mapLevel: prevState.mapLevel + 1,
                  mapParams: [
                    ...prevState.mapParams,
                    {
                      params: feature.properties.amp_code,
                      bounds: e.target.getBounds(),
                    },
                  ],
                  mapTitles: mapTitle,
                };
              });
            }
            break;
          case 2:
            // console.log(feature.properties.tam_th);
            break;
          default:
            break;
        }
      },
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

    // ;

    // const aa = L.marker([-37.7772, 175.2606]).bindLabel('Look revealing label!');

    layer.setStyle({
      fillOpacity: 1,
      weight: 1,
      color: 'white',
      fillColor: ['38', '39', '41', '42', '43', '47', '48'].includes(feature.properties.pro_code)
        ? '#00FF00' /// level
        : '#00FF0055',
      stroke: true,
      strokeColor: 'black',
    });
  };

  render() {
    const { mapLevel, prvJsonData, mapTitles, hoverName } = this.state;

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
    return (
      <MapContainer
        {...options}
        center={position}
        zoom={7}
        whenCreated={(refs: any) => (this.mapRef = refs)}
        style={{ height: '400px', width: '100%', backgroundColor: 'white' }}>
        <div>{hoverName}</div>
        {mapLevel > 0 && (
          <Button
            variant='contained'
            style={{ zIndex: 999, position: 'absolute' }}
            size='small'
            onClick={this.handleDecrementMapLevel}>
            {mapTitles.join('>')}
          </Button>
        )}

        {prvJsonData && (
          <GeoJSON
            ref={(refs: any) => (this.geojsonRef = refs)}
            data={prvJsonData as any}
            onEachFeature={this.handleEachFeature}
          />
        )}
      </MapContainer>
    );
  }
}
