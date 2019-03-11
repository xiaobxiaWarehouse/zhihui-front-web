import { request, config } from 'utils';

const { api } = config;
const {
  GEI_MONITOR_CHUANG,
  GEI_MONITOR_CHUANGDIAN,
  GEI_MONITOR_DUOTIZHENG,
  GET_MONITOR_DETAIL,
  GET_SHISHI_ZNC,
  GET_SHUIMIAN_ZNC,
  GET_ZAILICHUANG_ZNC,
  GET_LISHI_ZNC,
  GET_SHISHI_ZNCD,
  GET_SHUIMIAN_ZNCD,
  GET_ZAILICHUANG_ZNCD,
  GET_LISHI_ZNCD,
  GET_ZUIJIN_DTZ,
  GET_LISHIBIAODAN_DTZ,
  GET_LISHITUBIAO_DTZ,
  GET_CHUANG_BAOBIAO,
  GET_CHUANGDIAN_BAOBIAO,
  GET_DUOTIZHENG_BAOBIAO,
  GET_CHAXUN_ALLLOUHAO,
  GET_CHAXUN_ALLLOUCENG,
  GET_YICHANG_YICHANGSHUJU,
  GET_CHUANG_STATE,
  GET_CHUANGDIAN_STATE,
  GET_DUOTIZHENG_STATE,
  GET_RENYUAN_RUYUANSHENQING,
} = api;

export async function query(params) {
  return request({
    url: GET_YICHANG_YICHANGSHUJU,
    method: 'GET',
    data: params,
  });
}

export async function getChuang(params) {
  return request({
    url: GEI_MONITOR_CHUANG,
    method: 'GET',
    data: params,
  });
}

export async function getChuangdian(params) {
  return request({
    url: GEI_MONITOR_CHUANGDIAN,
    method: 'GET',
    data: params,
  });
}

export async function getDuotizheng(params) {
  return request({
    url: GEI_MONITOR_DUOTIZHENG,
    method: 'GET',
    data: params,
  });
}

export async function alllouhao(params) {
  return request({
    url: GET_CHAXUN_ALLLOUHAO,
    method: 'GET',
    data: params,
  });
}

export async function alllouceng(params) {
  return request({
    url: GET_CHAXUN_ALLLOUCENG,
    method: 'GET',
    data: params,
  });
}

export async function getMonitorDetail(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_MONITOR_DETAIL.replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}

export async function getShishiZnc(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_SHISHI_ZNC.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getShumianZnc(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_SHUIMIAN_ZNC.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZailichuangZnc(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_ZAILICHUANG_ZNC.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getLishiZnc(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_LISHI_ZNC.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getShishiZncd(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_SHISHI_ZNCD.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getShumianZncd(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_SHUIMIAN_ZNCD.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZailichuangZncd(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_ZAILICHUANG_ZNCD.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getLishiZncd(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_LISHI_ZNCD.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getZuijinDtz(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_ZUIJIN_DTZ.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getLishibiaodanDtz(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_LISHIBIAODAN_DTZ.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getLishitubiaoDtz(params) {
  const { jigou, id, ...restParams } = params;
  return request({
    url: GET_LISHITUBIAO_DTZ.replace(':jigou', jigou).replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getSuoyinDetail(params) {
  const { id, ...restParams } = params;
  return request({
    url: GET_RENYUAN_RUYUANSHENQING.replace(':suoyin', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getChuangBaobiao(params) {
  const { jigou, ...restParams } = params;
  return request({
    url: GET_CHUANG_BAOBIAO.replace(':jigou', jigou),
    method: 'GET',
    data: restParams,
  });
}

export async function getChuangdianBaobiao(params) {
  const { jigou, ...restParams } = params;
  return request({
    url: GET_CHUANGDIAN_BAOBIAO.replace(':jigou', jigou),
    method: 'GET',
    data: restParams,
  });
}

export async function getduotizhengBaobiao(params) {
  const { jigou, ...restParams } = params;
  return request({
    url: GET_DUOTIZHENG_BAOBIAO.replace(':jigou', jigou),
    method: 'GET',
    data: restParams,
  });
}

export async function getChuangState(params) {
  const { jigou, ...restParams } = params;
  return request({
    url: GET_CHUANG_STATE.replace(':jigou', jigou),
    method: 'GET',
    data: restParams,
  });
}

export async function getChuangdianState(params) {
  const { jigou, ...restParams } = params;
  return request({
    url: GET_CHUANGDIAN_STATE.replace(':jigou', jigou),
    method: 'GET',
    data: restParams,
  });
}

export async function getDuotizhengState(params) {
  const { jigou, ...restParams } = params;
  return request({
    url: GET_DUOTIZHENG_STATE.replace(':jigou', jigou),
    method: 'GET',
    data: restParams,
  });
}
