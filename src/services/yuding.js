import {request, config} from 'utils';

const {api} = config;
const {
  GET_YUDING,
  ADD_YUDING,
  GEI_CHUANGWEI,
  GEI_CHUANGWEI_YUDING,
  GET_YUDING_DETAIL,
  MODIFY_YUDING,
} = api;


export async function query(params) {
  return request({
    url: GET_YUDING,
    method: 'GET',
    data: params,
  });
}

export async function addYuDing(params) {
  return request({
    url: ADD_YUDING,
    method: 'POST',
    data: params,
  });
}

export async function getChuangwei(params) {
  return request({
    url: GEI_CHUANGWEI,
    method: 'GET',
    data: params,
  });
}

export async function getChuangweiYueding(params) {
  return request({
    url: GEI_CHUANGWEI_YUDING,
    method: 'GET',
    data: params,
  });
}

export async function getYudingDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_YUDING_DETAIL.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function modifyYuding(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_YUDING.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}
