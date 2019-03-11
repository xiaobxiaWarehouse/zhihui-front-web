import {request, config} from 'utils';

const {api} = config;
const {
  GET_PRIV,
  ADD_PRIV,
  MODIFY_PRIV,
  GET_PRIV_DETAIL,
} = api;

export async function query(params) {
  return request({
    url: GET_PRIV,
    method: 'POST',
    data: params,
  });
}

export async function addPriv(params) {
  return request({
    url: ADD_PRIV,
    method: 'POST',
    data: params,
  });
}

export async function modifyPriv(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_PRIV.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}

export async function getPrivDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_PRIV_DETAIL.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}
