import queryString from 'query-string';
import modelExtend from 'dva-model-extend';
import { config } from 'utils';
import {
  query as getChuangweiList,
  addChuangwei,
  modifyChuangwei,
  delChuangwei,
  modifyChuangweiStatus,
  getChuangweiDetail,
  sendQrcode,
} from 'services/chuangwei';
import { alllouhao, alllouceng } from 'services/monitor';
import { pageSizeModel } from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'chuangwei',
  state: {
    modalVisible: false,
    addModalVisible: false,
    allocateModalVisible: false,
    qrcodeModalVisible: false,
    editData: null,
    isEdit: false,
    loading: false,
    filter: {},
    louList: null,
    louhaoList: [],
    loucengList: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/chuangwei/list') {
          dispatch({
            type: 'query',
            payload: query,
          });
          dispatch({
            type: 'updateEditData',
          });
          dispatch({
            type: 'updateIsEdit',
            payload: {
              isEdit: false,
            },
          });
          dispatch({
            type: 'alllouhao',
            payload: {},
          });
          if (query.louhao) {
            dispatch({
              type: 'alllouceng',
              payload: {
                louhao: query.louhao,
              },
            });
          } else {
            dispatch({
              type: 'updateLouceng',
              payload: [],
            });
          }
          const { forceRefresh } = query;
          dispatch({
            type: 'updateFilter',
            payload: {
              filter: forceRefresh ? {} : {
                louceng: query.louceng || undefined,
                louhao: query.louhao || undefined,
                zhuangtai: query.zhuangtai || undefined,
              },
            },
          });
        }
      });
    },
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {};
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      param.zhuangtai = Number(payload.zhuangtai) || -1;
      if (payload.louhao) {
        param.louhao = payload.louhao;
      }
      if (payload.louceng) {
        param.louceng = payload.louceng;
      }
      const res = yield call(getChuangweiList, param);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const { list, ...page } = result;
        yield put({
          type: 'querySuccess',
          payload: {
            list,
            page,
          },
        });
      }
    },

    *alllouhao({payload = {}, callback}, {call, put}) {
      // yield put({ type: 'app/loading', payload: true });
      let param = { ...payload };
      param.zhuangtai = payload.zhuangtai ? payload.zhuangtai : -1;
      const res = yield call(alllouhao, param);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'updatalouList',
          payload: result,
        });
        if (callback) {
          callback(result);
        }
      }
    },

    *alllouceng({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = { ...payload };
      param.zhuangtai = payload.zhuangtai ? payload.zhuangtai : -1;
      const res = yield call(alllouceng, param);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateLouceng',
          payload: result,
        });
        if (callback) {
          callback();
        }
      }
    },

    *addChuangwei({ payload, callback }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(addChuangwei, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *modifyChuangwei({ payload, callback }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(modifyChuangwei, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *modifyChuangweiStatus({ payload, callback }, { call, put }) {
      const { id, zhuangtai } = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyChuangweiStatus, {
        id,
        zhuangtai: zhuangtai === 1 ? 1 : 5,
      });
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *delChuangwei({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(delChuangwei, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *getChuangweiDetail({ payload, callback }, { call, put }) {
      const { id } = payload;
      if (id) {
        yield put({ type: 'loading', payload: true });
        const res = yield call(getChuangweiDetail, payload);
        yield put({ type: 'loading', payload: false });
        if (res.success) {
          const { result } = res;
          yield put({ type: 'updateEditData', payload: result });
          if (callback) {
            callback(res);
          }
        } else {
          yield put({ type: 'updateEditData', payload: null });
        }
      } else {
        yield put({ type: 'updateEditData', payload: null });
      }
    },

    *sendQrcode({ payload, callback }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(sendQrcode, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },
  },
  reducers: {
    loading(state, { payload: loading }) {
      return {
        ...state,
        loading,
      };
    },
    showModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },
    hideModal(state) {
      return {
        ...state,
        modalVisible: false,
      };
    },
    showAddModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        addModalVisible: true,
      };
    },
    hideAddModal(state) {
      return {
        ...state,
        addModalVisible: false,
      };
    },
    showQrcodeModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        qrcodeModalVisible: true,
      };
    },
    hideQrcodeModal(state) {
      return {
        ...state,
        qrcodeModalVisible: false,
      };
    },
    updateEditData(state, { payload: editData }) {
      return {
        ...state,
        editData,
      };
    },
    updateIsEdit(state, { payload }) {
      const { isEdit } = payload;
      return {
        ...state,
        isEdit,
      };
    },
    updateFilter(state, { payload }) {
      const { filter } = payload;
      return {
        ...state,
        filter,
      };
    },
    updatalouList(state, { payload }) {
      return {
        ...state,
        louList: payload,
      };
    },
    updateLouceng(state, { payload }) {
      return {
        ...state,
        loucengList: payload,
      };
    },
  },
});
