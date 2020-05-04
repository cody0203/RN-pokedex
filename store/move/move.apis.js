import axios from 'axios';
import * as endPoints from '../../constants/end-points';

export const fetchMoveList = (params) =>
  axios.get(`${endPoints.FETCH_MOVE_LIST}`, { params });
export const fetchMoveDetails = (params) =>
  axios.get(`${endPoints.FETCH_MOVE_DETAIL}/${params}`);
