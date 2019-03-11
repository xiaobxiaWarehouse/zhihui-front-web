/* global window */
import oss from './oss';

// 类型
const TYPE = {
  OSS: Symbol('OSS'),
};


const upload = (config, files, callback, type = TYPE.OSS) => {
  return oss.upload(config, files, callback);
};

export default {
  TYPE,
  upload,
};
