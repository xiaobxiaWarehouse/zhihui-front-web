import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import {message} from 'antd';
import { query as getYuyueList, addYuyue, getYuyueDetail, getSuoyin, getYuangong, modifyYuyue } from 'services/yuyue';
import {pageSizeModel} from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'yuyue',
  state: {
    modalVisible: false,
    selectModalVisible: false,
    suoyinModalVisible: false,
    editData: null,
    selectData: [],
    yuangongList: [],
    currentSelectData: null,
    selectSuoyin: null,
    onComposition: false,
    selectLoading: false,
    filterValue: {},
    scrollTop: 0,
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/yuyue/list') {
          const { forceRefresh } = query;
          // dispatch({
          //   type: 'query',
          //   payload: query,
          // });
          dispatch({
            type: 'initState',
          });
          dispatch({
            type: 'updataFilterValue',
            payload: forceRefresh ? {} : query,
          });
        } else if (pathname === '/yuyue/add') {
          dispatch({
            type: 'getYuangongList',
            payload: {
              zhuangtai: 1,
            },
          });
        } else if (pathname === '/yuyue/edit') {
          dispatch({
            type: 'updateEditData',
            payload: null,
          });
          dispatch({
            type: 'getYuyueDetail',
            payload: query,
          });
          dispatch({
            type: 'getYuangongList',
            payload: {
              zhuangtai: 1,
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
      param.zhuangtai = Number(payload.zhuangtai) || 2;
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      if (payload.canguanSj) {
        param.canguanSj = payload.canguanSj;
      }
      if (payload.zerenren) {
        param.zerenren = payload.zerenren;
      }
      const res = yield call(getYuyueList, param);
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

    * addYuyue ({payload, callback, failCallback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addYuyue, payload);
      yield put({ type: 'app/loading', payload: false });
      let throwErrorCode = ['10106', '10203', '10303', '10202'];
      if (throwErrorCode.indexOf(res.errorCode) > -1) {
        if (failCallback) {
          failCallback();
        }
      }
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * getYuyueDetail({payload, callback}, {call, put}) {
      yield put({ type: 'selectLoading', payload: true });
      const res = yield call(getYuyueDetail, payload);
      yield put({ type: 'selectLoading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updateEditData', payload: result});
        if (callback) {
          callback(res);
        }
      }
    },

    * getSuoyin({payload, callback}, {call, put}) {
      yield put({ type: 'selectLoading', payload: true });
      const res = yield call(getSuoyin, payload);
      yield put({ type: 'selectLoading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updataSelectData', payload: result});
        if (callback) {
          callback(result);
        }
      }
    },

    * getYuangongList({payload, callback}, {call, put}) {
      yield put({ type: 'selectLoading', payload: true });
      let param = {};
      // param.pageNum = payload.page ? Number(payload.page) : 1;
      // param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      param.zhuangtai = Number(payload.zhuangtai) || -1;
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      const res = yield call(getYuangong, param);
      yield put({ type: 'selectLoading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updateYuangongList', payload: result});
        if (callback) {
          callback(result);
        }
      }
    },

    * modifyYuyue({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyYuyue, payload);
      yield put({ type: 'app/loading', payload: false });
      let throwErrorCode = ['10106', '10203', '10303', '10202'];
      if (throwErrorCode.indexOf(res.errorCode) > -1) {
        message.error('该休养员已有相关入院申请单');
      }
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
    selectLoading (state, {payload: selectLoading}) {
      return {
        ...state,
        selectLoading,
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
    showSelectModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        selectModalVisible: true,
      };
    },
    hideSelectModal (state) {
      return {
        ...state,
        selectModalVisible: false,
      };
    },
    showSuoyinModalVisible (state) {
      return {
        ...state,
        suoyinModalVisible: true,
      };
    },
    hideSuoyinModalVisible (state) {
      return {
        ...state,
        suoyinModalVisible: false,
      };
    },
    updateEditData (state, {payload}) {
      return {
        ...state,
        editData: payload,
      };
    },
    updataSelectData (state, {payload}) {
      return {
        ...state,
        selectData: payload,
      };
    },
    updateYuangongList (state, {payload}) {
      return {
        ...state,
        yuangongList: payload,
      };
    },
    updateCurrentSelectData (state, {payload}) {
      return {
        ...state,
        currentSelectData: payload,
      };
    },
    initState(state) {
      return {
        ...state,
        currentSelectData: null,
        selectSuoyin: null,
      };
    },
    updataSelectSuoyin(state, {payload}) {
      return {
        ...state,
        selectSuoyin: payload,
      };
    },
    onCompositionChange(state, {payload: onComposition}) {
      return {
        ...state,
        onComposition,
      };
    },
    updataFilterValue(state, {payload}) {
      return {
        ...state,
        filterValue: payload,
      };
    },
    updateScrollTop(state, {payload}) {
      return {
        ...state,
        scrollTop: payload,
      };
    },
  },
});
