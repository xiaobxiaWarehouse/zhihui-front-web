import {request, config, rsa} from 'utils';

const {api} = config;
const {USER_LOGIN, GET_CONFIG} = api;
const {rsaEncrypt} = rsa;

export async function login(params) {
  params.mima = rsaEncrypt(params.mima);
  return request({
    url: USER_LOGIN,
    method: 'POST',
    data: params,
  });
}

export async function getConfig(params) {
  return request({
    url: GET_CONFIG,
    method: 'GET',
    data: params,
  });
}
