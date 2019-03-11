import {request, config} from 'utils';

const {api} = config;
const {
  GET_HUODONGJILU,
  ADD_HUODONGJILU,
  GET_HUODONGJILU_DETAIL,
  GET_SUOYIN,
  GET_YUANGONG,
  MODIFY_HUODONGJILU,
} = api;


export async function query(params) {
  return request({
    url: GET_HUODONGJILU,
    method: 'GET',
    data: params,
  });
}

export async function addHuodongjilu(params) {
  return request({
    url: ADD_HUODONGJILU,
    method: 'POST',
    data: params,
  });
}

export async function getHuodongjiluDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_HUODONGJILU_DETAIL.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getSuoyin(params) {
  return request({
    url: GET_SUOYIN,
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

export async function modifyHuodongjilu(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_HUODONGJILU.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}
