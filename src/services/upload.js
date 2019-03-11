import {upload, request, config} from 'utils';

const {api} = config;
const {GET_UPLOAD_CONFIG} = api;

export async function getUploadConfig(params) {
  return request({
    url: GET_UPLOAD_CONFIG,
    method: 'GET',
    data: params,
  });
}
