import axios from 'axios';
import * as endPoints from '../../constants/end-points';

export const fetchItemList = (params) =>
  axios.get(`${endPoints.FETCH_ITEM_HANDLER}`, { params });
export const fetchItemDetail = (params) =>
  axios.get(`${endPoints.FETCH_ITEM_HANDLER}/${params}`);
