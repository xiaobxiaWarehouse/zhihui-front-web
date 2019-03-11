/**
 * Created by alphabeta on 18-1-21.
 */
import co from 'co';
import OSS from 'ali-oss';
// import OSS from 'ali-oss/dist/aliyun-oss-sdk.js';
import {randomFileName} from './fileUtil';

const init = ({
  bucketName, accessKeyId, accessKeySecret, stsToken, bucketRegion, apiVersion,
}) => {
  const client = new OSS({
    region: bucketRegion,
    accessKeyId,
    accessKeySecret,
    stsToken,
    bucket: bucketName,
  });
  return client;
};

const ACL = {
  PUBLIC_READ: 'public-read',
};

const options = {
  partSize: 10 * 1024 * 1024,
};

const uploadFile = (config, files, callback) => {
  let tempFiles = [];
  // 配置
  const uploadConfig = {
    bucketName: config.bucket,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    stsToken: config.securityToken,
    bucketRegion: `oss-${config.region}`,
    apiVersion: config.apiVersion,
    path: config.path,
    tempPath: config.tempPath,
  };
  const pathName = uploadConfig.path ? `${uploadConfig.path}/` : '';
  const tempPathName = uploadConfig.tempPath ? `${uploadConfig.tempPath}/` : '';
  const client = init(uploadConfig);

  co(function* () {
    for (let item in files) {
      if (files[item]) {
        const file = files[item];
        let filename = randomFileName(file.name);
        const result = yield client.multipartUpload(tempPathName + filename, file, {
          ...options,
          headers: {
            'Content-Disposition': `attachment;filename="${encodeURIComponent(file.name)}";filename*=utf-8''${encodeURIComponent(file.name)}`,
          },
        });
        tempFiles.push(result);
        if (tempFiles.length === files.length) {
          if (callback && callback instanceof Function) {
            callback(tempFiles);
          }
        }
      }
    }
  }).catch((err) => {
    if (callback && callback instanceof Function) {
      callback(err);
    }
  });
};

export default {
  upload: uploadFile,
};
