import {request, config} from 'utils';

const {api} = config;
const {
  GET_CHUANGWEI,
  ADD_CHUANGWEI,
  MODIFY_CHUANGWEI,
  DEL_CHUANGWEI,
  MODIFY_CHUANGWEI_ZHUANGTAI,
  GET_CHUANGWEI_DETAIL,
  GET_QRCODE,
  SEND_QRCODE,
} = api;

export async function query(params) {
  return request({
    url: GET_CHUANGWEI,
    method: 'GET',
    data: params,
  });
}

export async function addChuangwei(params) {
  return request({
    url: ADD_CHUANGWEI,
    method: 'POST',
    data: params,
  });
}

export async function modifyChuangwei(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_CHUANGWEI.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function delChuangwei(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: DEL_CHUANGWEI.replace(':id', id),
    method: 'DELETE',
    data: restParams,
  });
}

export async function modifyChuangweiStatus(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_CHUANGWEI_ZHUANGTAI.replace(':id', id),
    method: 'PATCH',
    data: restParams,
  });
}

export async function getChuangweiDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_CHUANGWEI_DETAIL.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getQrcode(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_QRCODE.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function sendQrcode(params) {
  const {
    louhao,
    ...restParams
  } = params;
  return request({
    url: SEND_QRCODE.replace(':louhao', louhao),
    method: 'POST',
    data: restParams,
  });
}
