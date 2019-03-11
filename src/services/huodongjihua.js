import {request, config} from 'utils';

const {api} = config;
const {
  GET_HUODONGJIHUA,
  ADD_HUODONGJIHUA,
  GET_HUODONGJIHUA_DETAIL,
  MODIFY_HUODONGJIHUA,
  DEL_HUODONGJIHUA,
} = api;


export async function query(params) {
  return request({
    url: GET_HUODONGJIHUA,
    method: 'GET',
    data: params,
  });
}

export async function addHuodongjihua(params) {
  return request({
    url: ADD_HUODONGJIHUA,
    method: 'POST',
    data: params,
  });
}

export async function getHuodongjihuaDetail(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: GET_HUODONGJIHUA_DETAIL.replace(':id', id),
    method: 'GET',
    data: restParams,
  });
}

export async function modifyHuodongjihua(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: MODIFY_HUODONGJIHUA.replace(':id', id),
    method: 'PUT',
    data: restParams,
  });
}


export async function delHuodongjihua(params) {
  const {
    id,
    ...restParams
  } = params;
  return request({
    url: DEL_HUODONGJIHUA.replace(':id', id),
    method: 'DELETE',
    data: restParams,
  });
}
