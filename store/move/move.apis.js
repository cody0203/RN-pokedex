import axios from 'axios';
import * as endPoints from '../../constants/end-points';

export const fetchMoveList = (params) => axios.get(`${endPoints.HANDLE_MOVE_API}`, { params });
export const fetchMoveDetails = (params) => axios.get(`${endPoints.HANDLE_MOVE_API}/${params}`);
