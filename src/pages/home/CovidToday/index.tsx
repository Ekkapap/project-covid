/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducers';
// import * as actions from '../../../actions';
import { api } from '../../../services';
import { DDCMOPH_API } from '../../../constants';

const CovidToday = () => {
  const callAPI = async () => {
    const params = {};
    const response = await api.getCovidToday({});
    // let result = [];
    // return await Promise.all(result);
  };
  const getData = useCallback(async () => {
    await callAPI().then(() => {
      // if (Object.keys(result).length > 0) {
      //   // MakeRows(result);
      // } else {
      //   // setOpenBackdrop(false);
      // }
    });
  }, []);
  // const dispatch = useDispatch();
  // const globalState = useSelector((state: RootState) => state);
  // dispatch(actions.LOGIN);

  useEffect(() => {
    // console.log("API : ", DDCMOPH_API);
    getData();
  }, []);
  return <>Covid Today</>;
};
export default CovidToday;
