import {request, config} from 'utils';

const {api} = config;
const {
  GET_RUYUAN,
  ADD_RUYUAN,
  GET_RUYUAN_DETAIL,
  MODIFY_RUYUAN,
  GET_MUBAN,
  ADD_DANAN,
  GET_DANAN,
  GET_BANLI,
  UNTIE_ZNC,
  UNTIE_ZNCD,
  UNTIE_DTZ,
  UNTIE_ZHX,
  ADD_BANGDING_ZNC,
  ADD_BANGDING_ZNCD,
  ADD_BANGDING_DTZ,
  ADD_BANGDING_ZHX,
  GET_SHEBEI_ZNCXIANGQING,
  GET_SHEBEI_ZNCDXIANGQING,
  GET_SHEBEI_DTZXIANGQING,
  GET_RENYUAN_RUYUANSHENQING,
  MODIFY_ZNC,
  MODIFY_ZNCD,
  MODIFY_DTZ,
  MODIFY_ZHX,
} = api;


export async function query(params) {
  return request({
    url: GET_RUYUAN,
    method: 'GET',
    data: params,
  });
}

export async function addRuyuan(params) {
  return request({
    url: ADD_RUYUAN,
    method: 'POST',
    data: params,
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

export async function modifyRuyuan(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_RUYUAN.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function getMUban(params) {
  const {
    leixing,
    ...restParams
  } = params;
  return request({
    url: GET_MUBAN.replace(':leixing', leixing),
    method: 'GET',
    data: restParams,
  });
}

export async function addDanan(params) {
  const {
    suoyin,
    ...restParams
  } = params;
  return request({
    url: ADD_DANAN.replace(':suoyin', suoyin),
    method: 'POST',
    data: restParams,
  });
}

export async function getDanan(params) {
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

export async function modifyDanan(params) {
  const {
    id,
    suoyin,
    ...restParams
  } = params;
  return request({
    url: GET_DANAN.replace(':id', id).replace(':suoyin', suoyin),
    method: 'PUT',
    data: restParams,
  });
}

export async function getBanli(params) {
  const {
    shenqingId,
    ...restParams
  } = params;
  return request({
    url: GET_BANLI.replace(':id', shenqingId),
    method: 'GET',
    data: restParams,
  });
}

export async function modifyBanli(params) {
  const {
    shenqingId,
    ...restParams
  } = params;
  return request({
    url: GET_BANLI.replace(':id', shenqingId),
    method: 'PUT',
    data: restParams,
  });
}

export async function untieZnc(params) {
  const { bianhao, id, ...restParams } = params;
  return request({
    url: UNTIE_ZNC.replace(':bianhao', bianhao).replace(':id', id),
    method: 'PATCH',
    data: restParams,
  });
}

export async function untieZncd(params) {
  const { bianhao, id, ...restParams } = params;
  return request({
    url: UNTIE_ZNCD.replace(':bianhao', bianhao).replace(':id', id),
    method: 'PATCH',
    data: restParams,
  });
}

export async function untieDtz(params) {
  const { bianhao, id, ...restParams } = params;
  return request({
    url: UNTIE_DTZ.replace(':bianhao', bianhao).replace(':id', id),
    method: 'PATCH',
    data: restParams,
  });
}

export async function untieZhx(params) {
  const { bianhao, id, ...restParams } = params;
  return request({
    url: UNTIE_ZHX.replace(':bianhao', bianhao).replace(':id', id),
    method: 'PATCH',
    data: restParams,
  });
}

export async function addBangdingZnc(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: ADD_BANGDING_ZNC.replace(':bianhao', bianhao),
    method: 'POST',
    data: restParams,
  });
}

export async function addBangdingZncd(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: ADD_BANGDING_ZNCD.replace(':bianhao', bianhao),
    method: 'POST',
    data: restParams,
  });
}

export async function addBangdingDtz(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: ADD_BANGDING_DTZ.replace(':bianhao', bianhao),
    method: 'POST',
    data: restParams,
  });
}

export async function addBangdingZhx(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: ADD_BANGDING_ZHX.replace(':bianhao', bianhao),
    method: 'POST',
    data: restParams,
  });
}

export async function modifyZnc(params) {
  const { bianhao, id, ...restParams } = params;
  return request({
    url: MODIFY_ZNC.replace(':bianhao', bianhao).replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function modifyZncd(params) {
  const { bianhao, id, ...restParams } = params;
  return request({
    url: MODIFY_ZNCD.replace(':bianhao', bianhao).replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function modifyDtz(params) {
  const { bianhao, id, ...restParams } = params;
  return request({
    url: MODIFY_DTZ.replace(':bianhao', bianhao).replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function modifyZhx(params) {
  const { bianhao, id, ...restParams } = params;
  return request({
    url: MODIFY_ZHX.replace(':bianhao', bianhao).replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function zncXQ(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: GET_SHEBEI_ZNCXIANGQING.replace(':bianhao', bianhao),
    method: 'GET',
    data: restParams,
  });
}

export async function zncdXQ(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: GET_SHEBEI_ZNCDXIANGQING.replace(':bianhao', bianhao),
    method: 'GET',
    data: restParams,
  });
}

export async function dtzXQ(params) {
  const { bianhao, ...restParams } = params;
  return request({
    url: GET_SHEBEI_DTZXIANGQING.replace(':bianhao', bianhao),
    method: 'GET',
    data: restParams,
  });
}

export async function ruyuanshengqingXQ(params) {
  const { suoyin, ...restParams } = params;
  return request({
    url: GET_RENYUAN_RUYUANSHENQING.replace(':suoyin', suoyin),
    method: 'GET',
    data: restParams,
  });
}
