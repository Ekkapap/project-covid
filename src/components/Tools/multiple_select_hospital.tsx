/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/reducers';
import { filterAction } from 'src/actions/filter/filter.action';
import { getHospitals } from 'src/services/api';
import { FixedHandleTokenErrors } from 'src/services/errors/error.service';
import { Trans, useTranslation } from 'react-i18next';
interface HospitalTypes {
  hos_id: string;
  hos_name: string;
}
const Hospitals: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'filter.ex' });
  const dispatch = useDispatch();
  const globalState = useSelector((state: RootState) => state);
  const token = globalState.auth.authToken || '';
  const filter = globalState.filter || '';
  const [open, setOpen] = useState(false);
  const getHos = useCallback(() => {
    getHospitals(token).then(async (result: any) => {
      if (result.success) {
        dispatch(filterAction.setHOS({
          selectedItemsCode: [],
          selectedItemsName: [],
          dataOptions: result.response.data,
          filteredItems: result.response.data
        }));
      }
    }).catch((response: any) => { FixedHandleTokenErrors(response, dispatch); });
  }, [filter]);

  const onChange = (value: any, options: any) => {
    const selectedItemsCode = filter.hospart.dataOptions.filter((item: any) => {
      return value.includes(item.hos_name);
    }).map((item: any) => {
      return item.hos_id;
    });
    dispatch(filterAction.setHOS({
      ...filter.hospart,
      selectedItemsCode: selectedItemsCode,
      selectedItemsName: value,
      filteredItems: filter.hospart.dataOptions.filter((item: any) => !value.includes(item.hos_name))
    }));
    if (filter.chwpart.selectedItemsCode?.length > 0) {
      const newData = {
        ...filter.chwpart,
        selectedItemsCode: [],
        selectedItemsName: [],
        filteredItems: filter.chwpart.dataOptions
      };
      dispatch(filterAction.setCHW(newData));
    }
  };

  useEffect(() => { getHos(); }, []);

  return (
    <div>
      <label className='text-header' style={{ fontSize: '.8em' }}><Trans>filter.ex.organization.label</Trans></label>
      <Select
        mode="tags"
        placeholder={t("organization.placeholder")}
        value={filter.hospart.selectedItemsName}
        onChange={onChange}
        onClick={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        open={open}
        allowClear={true}
        style={{ width: '100%' }}
      >
        {
          filter.hospart?.filteredItems?.map((item: HospitalTypes) =>
            (<Select.Option key={item.hos_id} code={item.hos_id} value={item.hos_name}>{item.hos_name}</Select.Option>)
          )
        }
      </Select>
    </div>
  );
};

export default Hospitals;