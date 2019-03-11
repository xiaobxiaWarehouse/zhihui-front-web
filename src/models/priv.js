import qs from 'qs';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import { Modal, notification, message } from 'antd';
import modelExtend from 'dva-model-extend';
import {config} from 'utils';
import {query as getPrivList, addPriv, modifyPriv, getPrivDetail} from 'services/priv';
import {pageSizeModel} from './common';

const {prefix} = config;


export default modelExtend(pageSizeModel, {
  namespace: 'priv',
  state: {
    modalVisible: false,
    addModalVisible: false,
    editData: null,
    selectedRowKeys: [],
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/priv/list') {
          dispatch({
            type: 'query',
            payload: query,
          });
        }
      });
    },
  },
  effects: {
    * query ({payload = {}}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      let param = {};
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      const res = yield call(getPrivList, param);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        const {list, ...page} = result;
        yield put({
          type: 'querySuccess',
          payload: {
            list,
            page,
          },
        });
      }
    },
    * addPriv ({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addPriv, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyPriv({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyPriv, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyPrivStatus({payload, callback}, {call, put}) {
      const {id, zhuangtai} = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyPriv, {id, zhuangtai: zhuangtai === 1 ? 1 : 2 });
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * getPrivDetail({payload, callback}, {call, put}) {
      const {id} = payload;
      if (id) {
        yield put({ type: 'app/loading', payload: true });
        const res = yield call(getPrivDetail, payload);
        yield put({ type: 'app/loading', payload: false });
        if (res.success) {
          const {result} = res;
          yield put({type: 'updateEditData', payload: result});
          yield put({type: 'getPrivPriv', payload: { id }});
          if (callback) {
            callback(res);
          }
        } else {
          yield put({type: 'updateEditData', payload: null});
          yield put({type: 'getPrivPriv', payload: {}});
        }
      } else {
        yield put({type: 'updateEditData', payload: null});
        yield put({type: 'getPrivPriv', payload: {}});
      }
    },
  },
  reducers: {
    showModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },
    hideModal (state) {
      return {
        ...state,
        modalVisible: false,
      };
    },
    showAddModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        addModalVisible: true,
      };
    },
    hideAddModal (state) {
      return {
        ...state,
        addModalVisible: false,
      };
    },
    updateEditData (state, {payload: editData}) {
      return {
        ...state,
        editData,
      };
    },
    updateSelectedRowKeys (state, {payload}) {
      const {selectedRowKeys} = payload;
      return {
        ...state,
        selectedRowKeys,
      };
    },
  },
});
