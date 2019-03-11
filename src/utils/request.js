/* global window */
import axios from 'axios';
import AppError from './AppError';

const HTTPTYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

const FORM = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  X_FORM: 'application/x-www-form-urlencoded',
};

// http封装
const fetch = (options) => {
  const {
    method = HTTPTYPE.GET, type = FORM.JSON, data, url,
  } = options;
  const cloneData = data;
  switch (method.toUpperCase()) {
    case HTTPTYPE.GET:
      return axios.get(url, { params: { ...cloneData } });
    case HTTPTYPE.DELETE:
      return axios.delete(url, { ...cloneData });
    case HTTPTYPE.POST:
      if (type === FORM.FORM_DATA) {
        return axios.post(url, cloneData, {
          headers: {
            'Content-Type': type,
          },
        });
      } else {
        return axios.post(url, cloneData, {
          headers: {
            'Content-Type': type,
          },
        });
      }
    case HTTPTYPE.PUT:
      return axios.put(url, { ...cloneData });
    case HTTPTYPE.PATCH:
      return axios.patch(url, { ...cloneData });
    default:
      return axios(options);
  }
};

const signatureParams = function(params) {
  // TODO 是否需要签名参数
};

const request = function(options) {
  const { data: params, sign, ...opts } = options;

  let signature;
  // TODO 是否需要签名参数
  if (sign) {
    signature = signatureParams(params);
  }

  const option = {
    ...opts,
    data: {
      sign: signature,
      ...params,
    },
  };
  return fetch(option).then((response) => {
    const { statusText, status } = response;
    let { data } = response;
    // let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data;
    // hook for mock
    if (data instanceof Array) {
      data = {
        list: data,
      };
    }

    let throwErrorCode = ['10106', '10203', '10303', '10202'];
    if (!data.success && throwErrorCode.indexOf(data.errorCode) === -1) {
      const { errorCode, errorMessage } = data;
      // 非网络级错误处理，使用AppError统一封装
      throw new AppError(errorMessage, errorCode);
    }

    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    };
    // }).catch((error) => {
    //   // 统一的错误处理
    //   // console.log('in request error', error);
    //   // 在app层捕捉
    //   if (error.response && error.response.status === 504) {
    //     throw error;
    //   } else {
    //     // return Promise.reject(error);
    //     throw error;
    //   }
  });
};

export { FORM, request };
