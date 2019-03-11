import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import { query as getHuodongjiluList, addHuodongjilu, getHuodongjiluDetail, getSuoyin, getYuangong, modifyHuodongjilu } from 'services/huodongjilu';
import { query as getHuodongjihua} from 'services/huodongjihua';
import {swapItems} from 'utils';
import {pageSizeModel} from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'huodongjilu',
  state: {
    modalVisible: false,
    zerenModalVisible: false,
    viewModalVisible: false,
    canyurenModalVisible: false,
    editData: {
      canyuJl: [],
      zhaopian: [],
    },
    yuangongList: [],
    huodongjihuaList: [],
    canyurenList: [],
    isEdit: false,
    canyuJlModalVisible: false,
    isCanyuJlEdit: false,
    editCanyuJl: null,
    loading: false,
    onComposition: false,
    selectLoading: false,
    currentImgIndex: null,
    currentImg: null,
    filterValue: {},
    scrollTop: 0,
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/huodongjilu/list') {
          // dispatch({
          //   type: 'query',
          //   payload: query,
          // });
          const { forceRefresh } = query;
          if (forceRefresh) {
            dispatch({
              type: 'updataFilterValue',
              payload: {},
            });
          }
        } else if (pathname === '/huodongjilu/add') {
          dispatch({
            type: 'updateEditData',
            payload: {
              canyuJl: [],
              zhaopian: [],
            },
          });
          dispatch({
            type: 'updateEditCanyuJl',
            payload: null,
          });
          dispatch({
            type: 'updateCurrentZenrenData',
            payload: null,
          });
          dispatch({
            type: 'updateYuangongList',
            payload: [],
          });
          dispatch({
            type: 'updateHuodongjihuaList',
            payload: [],
          });
          dispatch({
            type: 'getYuangongList',
            payload: {
              zhuangtai: 1,
            },
          });
          dispatch({
            type: 'getHuodongjihuaList',
            payload: {
            },
          });
        } else if (pathname === '/huodongjilu/edit') {
          dispatch({
            type: 'updateEditData',
            payload: {
              canyuJl: [],
              zhaopian: [],
            },
          });
          dispatch({
            type: 'updateCurrentZenrenData',
            payload: null,
          });
          dispatch({
            type: 'getHuodongjiluDetail',
            payload: query,
          });
          dispatch({
            type: 'getYuangongList',
            payload: {
              zhuangtai: 1,
            },
          });
          dispatch({
            type: 'getHuodongjihuaList',
            payload: {
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
      if (payload.canguanSj) {
        param.canguanSj = payload.canguanSj;
      }
      if (payload.kaishiSj) {
        param.kaishiSj = payload.kaishiSj;
      }
      if (payload.jieshuSj) {
        param.jieshuSj = payload.jieshuSj;
      }
      if (payload.zerenren) {
        param.zerenren = payload.zerenren;
      }
      const res = yield call(getHuodongjiluList, param);
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

    * addHuodongjilu ({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addHuodongjilu, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * getHuodongjiluDetail({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getHuodongjiluDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updateEditData', payload: result});
        if (callback) {
          callback(res);
        }
      }
    },

    * getCanyurenList({payload, callback}, {call, put}) {
      yield put({ type: 'selectLoading', payload: true });
      let param = {};
      // param.pageNum = payload.page ? Number(payload.page) : 1;
      // param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      param.zhuangtai = Number(payload.zhuangtai) || -1;
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      param.searchFlag = 1;
      const res = yield call(getSuoyin, param);
      yield put({ type: 'selectLoading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updateCanyurenList', payload: result});
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

    * getHuodongjihuaList({payload, callback}, {call, put}) {
      yield put({ type: 'selectLoading', payload: true });
      let param = {};
      // param.pageNum = payload.page ? Number(payload.page) : 1;
      // param.pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
      param.zhuangtai = Number(payload.zhuangtai) || 1;
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      const res = yield call(getHuodongjihua, param);
      yield put({ type: 'selectLoading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updateHuodongjihuaList', payload: result});
        if (callback) {
          callback(result);
        }
      }
    },

    * modifyHuodongjilu({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyHuodongjilu, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyCanyuJl ({payload, callback}, {call, put, select}) {
      const {
        index: editIndex,
        ...editCanyuJlData
      } = payload;
      const {editData} = yield select(_ => _.huodongjilu);
      const {
        canyuJl,
      } = editData;
      if (editIndex >= 0 && editIndex < canyuJl.length) {
        canyuJl[editIndex] = {...editCanyuJlData};
      }
      yield put({ type: 'app/loading', payload: true });
      yield put({ type: 'updateCanyuJl', payload: canyuJl});
      yield put({ type: 'app/loading', payload: false });
      if (callback) {
        callback({
          success: true,
        });
      }
    },

    * addCanyuJl ({payload, callback}, {call, put, select}) {
      const {
        ...addCanyuJlData
      } = payload;
      const {editData} = yield select(_ => _.huodongjilu);
      const {
        canyuJl,
      } = editData;
      canyuJl.push(addCanyuJlData);
      yield put({ type: 'app/loading', payload: true });
      yield put({ type: 'updateCanyuJl', payload: canyuJl});
      yield put({ type: 'app/loading', payload: false });
      if (callback) {
        callback({
          success: true,
        });
      }
    },

    * delCanyuJl ({payload, callback}, {call, put, select}) {
      const {
        index: editIndex,
        ...delCanyuJlData
      } = payload;
      const {editData} = yield select(_ => _.huodongjilu);
      const {
        canyuJl,
      } = editData;
      if (editIndex >= 0 && editIndex < canyuJl.length) {
        canyuJl.splice(editIndex, 1);
      }
      yield put({ type: 'app/loading', payload: true });
      yield put({ type: 'updateCanyuJl', payload: canyuJl});
      yield put({ type: 'app/loading', payload: false });
      if (callback) {
        callback({
          success: true,
        });
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
    showCanyurenModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        canyurenModalVisible: true,
      };
    },
    hideCanyurenModal (state) {
      return {
        ...state,
        canyurenModalVisible: false,
      };
    },
    showViewModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        viewModalVisible: true,
      };
    },
    hideViewModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        viewModalVisible: false,
      };
    },
    updateEditData (state, {payload}) {
      const {zhaopian} = payload;
      let newZhaopian = zhaopian.sort((a, b) => {
        return a.xuhao - b.xuhao;
      });
      return {
        ...state,
        editData: {
          ...payload,
          zhaopian: newZhaopian,
        },
      };
    },
    updateEditCanyuJl (state, {payload}) {
      return {
        ...state,
        editCanyuJl: payload,
      };
    },
    updateYuangongList (state, {payload}) {
      return {
        ...state,
        yuangongList: payload,
      };
    },
    updateHuodongjihuaList (state, {payload}) {
      return {
        ...state,
        huodongjihuaList: payload,
      };
    },
    updateCanyurenList (state, {payload}) {
      return {
        ...state,
        canyurenList: payload,
      };
    },
    updateIsEdit (state, {payload}) {
      const {isEdit} = payload;
      return {
        ...state,
        isEdit,
      };
    },
    showAddCanyuJlModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        canyuJlModalVisible: true,
      };
    },
    hideAddCanyuJlModal (state) {
      return {
        ...state,
        canyuJlModalVisible: false,
      };
    },
    updateIsCanyuJlEdit (state, {payload}) {
      const {isCanyuJlEdit} = payload;
      return {
        ...state,
        isCanyuJlEdit,
      };
    },
    updateCanyuJl (state, {payload: canyuJl}) {
      const {
        editData,
      } = state;

      return {
        ...state,
        editData: {
          ...editData,
          canyuJl,
        },
      };
    },
    updateZhaopian(state, {payload: zhaopian}) {
      const {
        editData,
      } = state;
      return {
        ...state,
        editData: {
          ...editData,
          zhaopian,
        },
      };
    },
    onUpZhaopian(state, {payload}) {
      const {
        editData,
      } = state;
      const {zhaopian} = editData;
      let newList = swapItems(zhaopian, payload, payload - 1);
      return {
        ...state,
        zhaopian: newList,
      };
    },
    onDownZhaopian(state, {payload}) {
      const {
        editData,
      } = state;
      const {zhaopian} = editData;
      let newList = swapItems(zhaopian, payload, payload + 1);
      return {
        ...state,
        zhaopian: newList,
      };
    },
    onDeleteZhaopian(state, {payload}) {
      const {
        editData,
      } = state;
      const {zhaopian} = editData;
      zhaopian.splice(payload, 1);
      return {
        ...state,
        zhaopian,
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
