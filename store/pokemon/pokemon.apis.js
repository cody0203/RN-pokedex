import * as endPoints from '../../constants/end-points';
import axios from 'axios';

export const fetchPokemonList = (params) =>
  axios.get(`${endPoints.FETCH_POKEMON_LIST}`, { params });

export const fetchPokemonDetail = (params) => {
  return axios.get(`${endPoints.FETCH_POKEMON_DETAIL}/${params}`);
};

export const fetchCustomUrl = (url) => axios.get(url);
