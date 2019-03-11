import { request, config } from 'utils';

const { api } = config;
const {
  GET_STATISTICS_YEWU,
} = api;

export async function getStatistics(params) {
  return request({
    url: GET_STATISTICS_YEWU,
    method: 'GET',
    data: params,
  });
}
