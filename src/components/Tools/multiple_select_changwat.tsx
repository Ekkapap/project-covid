/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/reducers';
import { filterAction } from 'src/actions/filter/filter.action';
import { getChangwat } from 'src/services/api';
import { FixedHandleTokenErrors } from 'src/services/errors/error.service';
import { Trans, useTranslation } from 'react-i18next';
interface ChangwatTypes {
  changwatcode: string;
  changwatname: string;
}

const Changwats: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'filter.ex' });
  const dispatch = useDispatch();
  const globalState = useSelector((state: RootState) => state);
  const token = globalState.auth.authToken || '';
  const filter = globalState.filter || '';
  const [open, setOpen] = useState(false);
  const getChw = useCallback(async () => {
    getChangwat(token).then((result: any) => {
      if (result.success) {
        dispatch(filterAction.setCHW({
          selectedItemsCode: [],
          selectedItemsName: [],
          dataOptions: result.response.data,
          filteredItems: result.response.data
        }));
      }
    }).catch((response: any) => { FixedHandleTokenErrors(response, dispatch); });
  }, [filter]);
  const onChange = (value: any, options: any) => {
    const selectedItemsCode = filter.chwpart.dataOptions.filter((item: any) => {
      return value.includes(item.changwatname);
    }).map((item: any) => {
      return item.changwatcode;
    });
    dispatch(filterAction.setCHW({
      ...filter.chwpart,
      selectedItemsCode: selectedItemsCode,
      selectedItemsName: value,
      filteredItems: filter.chwpart.dataOptions.filter((item: any) => !value.includes(item.changwatname))
    }));
    if (filter.hospart.selectedItemsCode?.length > 0) {
      const newData = {
        ...filter.hospart,
        selectedItemsCode: [],
        selectedItemsName: [],
        filteredItems: filter.hospart.dataOptions
      };
      dispatch(filterAction.setHOS(newData));
    }
  };

  useEffect(() => { getChw(); }, []);

  return (
    <div>
      <label className='text-header' style={{ fontSize: '.8em' }}><Trans>filter.ex.province.label</Trans></label>
      <Select
        mode="multiple"
        placeholder={t("province.placeholder")}
        value={filter.chwpart.selectedItemsName}
        onChange={onChange}
        onClick={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        open={open}
        allowClear={true}
        style={{ width: '100%' }}
      >
        {
          filter.chwpart?.filteredItems?.map((item: ChangwatTypes) =>
            (<Select.Option key={item.changwatname} code={item.changwatcode} value={item.changwatname}>{item.changwatname}</Select.Option>)
          )
        }
      </Select>
    </div>
  );
};

export default Changwats;