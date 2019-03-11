import {request, config} from 'utils';

const {api} = config;
const {
  GET_ROLE,
  ADD_ROLE,
  GET_ALL_ROLE,
  MODIFY_ROLE,
  DEL_ROLE,
  GET_ROLE_DETAIL,
  GET_ROLE_PRIV,
  // GET_PRIV,
  MODIFY_ROLE_PRIV,
} = api;

export async function query(params) {
  return request({
    url: GET_ROLE,
    method: 'GET',
    data: params,
  });
}

export async function addRole(params) {
  return request({
    url: ADD_ROLE,
    method: 'POST',
    data: params,
  });
}

export async function modifyRole(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_ROLE.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function delRole(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: DEL_ROLE.replace(':id', id),
    method: 'DELETE',
    data: restParams,
  });
}

export async function getRoleDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_ROLE_DETAIL.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function getRolePriv(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_ROLE_PRIV.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

// export async function getPriv(params) {
//   return request({
//     url: GET_PRIV,
//     method: 'POST',
//     data: params,
//   });
// }

export async function modifyRolePriv(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_ROLE_PRIV.replace(':id', id),
    method: 'POST',
    data: restParams,
  });
}
