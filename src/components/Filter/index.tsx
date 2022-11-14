import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/reducers';
import { Select, Col, Row } from 'antd';
import { address } from 'src/constants/thaiaddress';
import { filterAction } from 'src/actions/filter/filter.action';
import './style.less';

const Filter = () => {
  const { Option } = Select;
  const globalState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { changwatpart, ampurpart, tambonpart, hospitalpart } = address; // Constants
  const [changwats, setChangwats] = useState<ReactNode>('ทุกจังหวัด');
  const [ampurs, setAmpurs] = useState<ReactNode>('ทุกอำเภอ');
  const [tambons, setTambons] = useState<ReactNode>('ทุกตำบล');
  const [hospitals, setHospitals] = useState<ReactNode>('ทุกหน่วยงาน');

  const prefix = (type: string, value: string) => {
    if (type == 'chw') {
      return value != 'กรุงเทพมหานคร' && value != 'ทุกจังหวัด' ? 'จ.' + value : value;
    }
    if (type == 'amp') {
      return value != 'ทุกอำเภอ' ? 'อ.' + value : value;
    }
    if (type == 'tmb') {
      return value != 'ทุกตำบล' ? 'ต.' + value : value;
    }
    if (type == 'hos') {
      type mapObjType = { [key: string]: string; };
      const mapObj: mapObjType = {
        โรงพยาบาลส่งเสริมสุขภาพตำบล: 'รพ.สต.',
        โรงพยาบาลสมเด็จพระยุพราช: 'รพร.',
        โรงพยาบาล: 'รพ.',
        ศูนย์สุขภาพชุมชนเมือง: 'ศสม.',
        ศูนย์สุขภาพชุมชน: 'ศสช.',
      };
      const reg =
        /โรงพยาบาลส่งเสริมสุขภาพตำบล|โรงพยาบาลสมเด็จพระยุพราช|โรงพยาบาล|ศูนย์สุขภาพชุมชนเมือง|ศูนย์สุขภาพชุมชน/g;
      // const val = (typeof value !== 'undefined')?value:"";
      return value.replace(reg, (matched) => mapObj[matched]).split(/\s(.+)/)[0];
    }
  };

  const genChangwatOptions = useCallback(async () => {
    const chw = Object.keys(changwatpart).map(function (key: string) {
      return (
        <Option key={key} value={changwatpart[key]['chwcode']}>
          {prefix('chw', changwatpart[key]['chwname'])}
        </Option>
      );
    });
    setChangwats(chw);
  }, [setChangwats, changwatpart, Option]);

  const genAmpurOptions = useCallback(
    async (filter: any) => {
      let amp: ReactNode = undefined;
      if (filter) {
        amp = Object.keys(filter).map(function (key: string) {
          return (
            <Option key={key} value={filter[key]['ampcode']}>
              {prefix('amp', filter[key]['ampname'])}
            </Option>
          );
        });
      } else {
        amp = Object.keys(ampurpart).map(function (key: string) {
          return (
            <Option key={key} value={ampurpart[key]['ampcode']}>
              {prefix('amp', ampurpart[key]['ampname'])}
            </Option>
          );
        });
      }
      setAmpurs(amp);
    },
    [setAmpurs, ampurpart, Option],
  );

  const genTambonOptions = useCallback(
    async (filter: any) => {
      let tmb: ReactNode = undefined;
      if (filter) {
        tmb = Object.keys(filter).map(function (key: string) {
          return (
            <Option key={key} value={filter[key]['tmbcode']}>
              {prefix('tmb', filter[key]['tmbname'])}
            </Option>
          );
        });
      } else {
        tmb = Object.keys(tambonpart).map(function (key: string) {
          return (
            <Option key={key} value={tambonpart[key]['tmbcode']}>
              {prefix('tmb', tambonpart[key]['tmbname'])}
            </Option>
          );
        });
      }
      setTambons(tmb);
    },
    [setTambons, tambonpart, Option],
  );

  const genHospitalOptions = useCallback(
    async (filter: any) => {
      let hos: ReactNode = undefined;
      if (filter) {
        hos = Object.keys(filter).map(function (key: string) {
          return (
            <Option key={key} value={filter[key]['hcode']}>
              {prefix('hos', filter[key]['hname'])}
            </Option>
          );
        });
      } else {
        hos = Object.keys(hospitalpart).map(function (key: string) {
          return (
            <Option key={key} value={hospitalpart[key]['hcode']}>
              {prefix('hos', hospitalpart[key]['hname'])}
            </Option>
          );
        });
      }
      setHospitals(hos);
    },
    [setHospitals, hospitalpart, Option],
  );

  const onChange = (e: any) => {
    if (e.name == 'chw') {
      const ampursFilter = Object.fromEntries(
        Object.entries(ampurpart).filter(([key]) => {
          return ampurpart[key]['chwcode'] == e.value;
        }),
      );
      genAmpurOptions(ampursFilter);
      dispatch(filterAction.setCHW(e.value));
      setTambons(null);
      setHospitals(null);
    }
    if (e.name == 'amp') {
      const tambonsFilter = Object.fromEntries(
        Object.entries(tambonpart).filter(([key]) => {
          return tambonpart[key]['tmbcodefull'].substring(0, 4) == globalState.filter.chwpart + e.value;
        }),
      );
      genTambonOptions(tambonsFilter);
      dispatch(filterAction.setAMP(e.value));
      const hospitalsFilter = Object.fromEntries(
        Object.entries(hospitalpart).filter(([key]) => {
          return hospitalpart[key]['chw'] + hospitalpart[key]['amp'] == globalState.filter.chwpart + e.value;
        }),
      );
      genHospitalOptions(hospitalsFilter);
    }
    if (e.name == 'tmb') {
      const hospitalsFilter = Object.fromEntries(
        Object.entries(hospitalpart).filter(([key]) => {
          const tamboncodefull = hospitalpart[key]['chw'] + hospitalpart[key]['amp'] + hospitalpart[key]['tmb'];
          const filterTamboncodefull = globalState.filter.chwpart + globalState.filter.amppart + e.value;
          return tamboncodefull == filterTamboncodefull;
        }),
      );
      genHospitalOptions(hospitalsFilter);
      dispatch(filterAction.setTMB(e.value));
    }
    if (e.name == 'hos') {
      dispatch(filterAction.setHOS(e.value));
    }
  };

  useEffect(() => {
    genChangwatOptions();
    return () => {
      setChangwats('ทุกจังหวัด');
    };
  }, [genChangwatOptions]);

  return (
    <Row gutter={[8, { xs: 8, md: 0 }]}>
      <Col xs={12} md={6}>
        <Select
          showSearch
          // allowClear
          // open
          size='middle'
          placeholder='จังหวัด'
          optionFilterProp='children'
          defaultValue={globalState.filter.chwpart}
          onChange={(e) => onChange({ name: 'chw', value: e })}
          filterOption={(input: string, option) => {
            return (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase());
          }}>
          {changwats}
        </Select>
      </Col>
      <Col xs={12} md={6}>
        <Select
          // open
          showSearch
          placeholder='อำเภอ'
          optionFilterProp='children'
          value={ampurs ? globalState.filter.amppart : ''}
          onChange={(e) => onChange({ name: 'amp', value: e })}
          filterOption={(input: string, option) =>
            (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
          }>
          {ampurs}
        </Select>
      </Col>
      <Col xs={12} md={6}>
        <Select
          // open
          showSearch
          placeholder='ตำบล'
          optionFilterProp='children'
          value={globalState.filter.tmbpart}
          onChange={(e) => onChange({ name: 'tmb', value: e })}
          filterOption={(input: string, option) => {
            return (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase());
          }}>
          {tambons}
        </Select>
      </Col>
      <Col xs={12} md={6}>
        <Select
          showSearch
          // open
          placeholder='หน่วยงาน'
          optionFilterProp='children'
          value={globalState.filter.hospart}
          onChange={(e) => onChange({ name: 'hos', value: e })}
          filterOption={(input: string, option) => {
            return (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase());
          }}>
          {hospitals}
        </Select>
      </Col>
    </Row>
  );
};

export default Filter;
