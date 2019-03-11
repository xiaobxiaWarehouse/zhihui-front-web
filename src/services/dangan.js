import {request, config} from 'utils';

const {api} = config;
const {
  GET_DANGAN,
  GET_DANGAN_DETAIL,
  GET_RUYUAN_DETAIL,
  GET_YUYUE_DETAIL,
  GET_YUDING_DETAIL,
  GET_DANAN,
  GET_HULI_DETAIL_BY_SUOYIN,
  POST_RUYUANEMAIL,
  POST_YUDINGEMAIL,
  POST_YUYUEEMAIL,
  SEND_DANGANEMAIL,
} = api;


export async function query(params) {
  return request({
    url: GET_DANGAN,
    method: 'GET',
    data: params,
  });
}

export async function getDanganDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_DANGAN_DETAIL.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function postRuyuanEmail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: POST_RUYUANEMAIL.replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}

export async function postYudingEmail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: POST_YUDINGEMAIL.replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}

export async function postyuyueEmail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: POST_YUYUEEMAIL.replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}

export async function getRuyuanDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_RUYUAN_DETAIL.replace(':id', id),
    method: 'GET',
    data: restParams,
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

export async function getDangan(params) {
  const {
    id,
    suoyin,
    ...restParams
  } = params;
  return request({
    url: GET_DANAN.replace(':id', id).replace(':suoyin', suoyin),
    method: 'GET',
    data: restParams,
  });
}

export async function sendEmail(params) {
  const {
    id,
    suoyin,
    ...restParams
  } = params;
  return request({
    url: SEND_DANGANEMAIL.replace(':suoyin', suoyin).replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}

export async function getHuliDetail(params) {
  return request({
    url: GET_HULI_DETAIL_BY_SUOYIN,
    method: 'GET',
    data: params,
  });
}
