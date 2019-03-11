import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import { query as getHuodongjihuaList, addHuodongjihua, getHuodongjihuaDetail, modifyHuodongjihua, delHuodongjihua } from 'services/huodongjihua';
import {pageSizeModel} from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'huodongjihua',
  state: {
    modalVisible: false,
    addModalVisible: false,
    editData: null,
    isEdit: false,
    loading: false,
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/huodongjihua/list') {
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
      param.zhuangtai = Number(payload.zhuangtai) || -1;
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      const res = yield call(getHuodongjihuaList, param);
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

    * addHuodongjihua ({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(addHuodongjihua, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyHuodongjihua({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(modifyHuodongjihua, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyHuodongjihuaStatus({payload, callback}, {call, put}) {
      const {id, zhuangtai} = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyHuodongjihua, {id, zhuangtai: zhuangtai === 1 ? 1 : 2 });
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * getHuodongjihuaDetail({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(getHuodongjihuaDetail, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({type: 'updateEditData', payload: result});
        if (callback) {
          callback(res);
        }
      }
    },

    * delHuodongjihua({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(delHuodongjihua, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },
  },
  reducers: {
    loading (state, {payload: loading}) {
      return {
        ...state,
        loading,
      };
    },
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
    updateEditData (state, {payload}) {
      return {
        ...state,
        editData: payload,
      };
    },
    updateIsEdit (state, {payload}) {
      const {isEdit} = payload;
      return {
        ...state,
        isEdit,
      };
    },
  },
});
