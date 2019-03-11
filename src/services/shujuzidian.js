import {request, config} from 'utils';

const {api} = config;
const {
  GET_SHUJUZIDIAN,
  ADD_SHUJUZIDIAN,
  MODIFY_SHUJUZIDIAN,
} = api;

export async function query(params) {
  return request({
    url: GET_SHUJUZIDIAN,
    method: 'GET',
    data: params,
  });
}

export async function addShujuzidian(params) {
  return request({
    url: ADD_SHUJUZIDIAN,
    method: 'POST',
    data: params,
  });
}

export async function modifyShujuzidian(params) {
  return request({
    url: MODIFY_SHUJUZIDIAN,
    method: 'POST',
    data: params,
  });
}

