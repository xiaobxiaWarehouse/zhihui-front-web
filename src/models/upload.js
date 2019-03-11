import modelExtend from 'dva-model-extend';
import {upload, config} from 'utils';
import {getUploadConfig} from 'services/upload';
import {pageSizeModel} from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'upload',
  state: {
  },
  effects: {
    * getConfig({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const data = yield call(getUploadConfig, payload);
      yield put({ type: 'app/loading', payload: false });
      if (data.success) {
        const {result} = data;
        if (callback) {
          callback(result);
        }
      }
    },
  },
  reducers: {
  },
});
