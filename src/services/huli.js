import {request, config} from 'utils';

const {api} = config;
const {
  GET_HULI,
  ADD_HULI,
  DEL_HULI,
  GET_HULI_DETAIL_BY_SUOYIN,
  GET_YUANGONG,
  GET_HULI_SUOYIN,
  EXPOTR_HULIJILU,
} = api;


export async function query(params) {
  return request({
    url: GET_HULI,
    method: 'GET',
    data: params,
  });
}

export async function addHuli(params) {
  return request({
    url: ADD_HULI,
    method: 'POST',
    data: params,
  });
}

export async function delHuli(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: DEL_HULI.replace(':id', id),
    method: 'DELETE',
    data: restParams,
  });
}

export async function getSuoyin(params) {
  const {
    suoyin,
    ...restParams
  } = params;
  return request({
    url: GET_HULI_SUOYIN.replace(':suoyin', suoyin),
    method: 'GET',
    data: restParams,
  });
}

export async function getHuliDetailBySuoyin(params) {
  return request({
    url: GET_HULI_DETAIL_BY_SUOYIN,
    method: 'GET',
    data: params,
  });
}

export async function getYuangong(params) {
  return request({
    url: GET_YUANGONG,
    method: 'GET',
    data: params,
  });
}

export async function exportHulijilu(params) {
  return request({
    url: EXPOTR_HULIJILU,
    method: 'POST',
    data: params,
  });
}
