import {request, config} from 'utils';

const {api} = config;
const {
  GET_YUYUE,
  ADD_YUYUE,
  GET_YUYUE_DETAIL,
  GET_SUOYIN,
  GET_YUANGONG,
  MODIFY_YUYUE,
} = api;


export async function query(params) {
  return request({
    url: GET_YUYUE,
    method: 'GET',
    data: params,
  });
}

export async function addYuyue(params) {
  return request({
    url: ADD_YUYUE,
    method: 'POST',
    data: params,
  });
}

export async function getYuyueDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_YUYUE_DETAIL.replace(':id', id),
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

export async function modifyYuyue(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_YUYUE.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}
