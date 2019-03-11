import {request, config} from 'utils';

const {api} = config;
const {
  GET_YUANGONG,
  ADD_YUANGONG,
  MODIFY_YUANGONG,
  DEL_YUANGONG,
  RESET_PASSWORD,
  MODIFY_YUANGONG_ZHUANGTAI,
  GET_YUANGONG_DETAIL,
  GET_ALL_ROLE,
  MODIFY_YUANGONG_ROLE,
} = api;

export async function query(params) {
  return request({
    url: GET_YUANGONG,
    method: 'GET',
    data: params,
  });
}

export async function addYuangong(params) {
  return request({
    url: ADD_YUANGONG,
    method: 'POST',
    data: params,
  });
}

export async function modifyYuangong(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_YUANGONG.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function delYuangong(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: DEL_YUANGONG.replace(':id', id),
    method: 'DELETE',
    data: restParams,
  });
}

export async function resetPassword(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: RESET_PASSWORD.replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}

export async function modifyYuangongStatus(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_YUANGONG_ZHUANGTAI.replace(':id', id),
    method: 'PATCH',
    data: restParams,
  });
}

export async function getYuangongDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_YUANGONG_DETAIL.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

// export async function getYuangongRole(params) {
//   const {
//     id,
//     ...restParams
//   } = params;
//   return request({
//     url: GET_YUANGONG_ROLE.replace(':id', id),
//     method: 'POST',
//     data: restParams,
//   });
// }

export async function getallRole(params) {
  return request({
    url: GET_ALL_ROLE,
    method: 'GET',
    data: params,
  });
}

export async function modifyYuangongRole(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_YUANGONG_ROLE.replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}
