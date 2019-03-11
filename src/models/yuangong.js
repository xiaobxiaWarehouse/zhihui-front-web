import qs from 'qs';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import { message } from 'antd';
import modelExtend from 'dva-model-extend';
import {config} from 'utils';
import {
  query as getYuangongList,
  addYuangong,
  modifyYuangong,
  delYuangong,
  resetPassword,
  modifyYuangongStatus,
  getYuangongDetail,
  getYuangongRole,
  getallRole,
  modifyYuangongRole,
} from 'services/yuangong';
import {query as getShujuzidian} from 'services/shujuzidian';
import {pageSizeModel} from './common';

const {prefix} = config;


export default modelExtend(pageSizeModel, {
  namespace: 'yuangong',
  state: {
    modalVisible: false,
    addModalVisible: false,
    allocateModalVisible: false,
    allGangwei: [],
    allRole: [],
    selectedRoleIds: [],
    roleList: [],
    editData: null,
    isEdit: false,
    loading: false,
    filter: {},
    itemId: {},
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/yuangong/list') {
          dispatch({
            type: 'query',
            payload: query,
          });
          dispatch({
            type: 'getGangweiAll',
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
          const {
            forceRefresh,
          } = query;
          if (forceRefresh) {
            dispatch({
              type: 'updateFilter',
              payload: {
                filter: {},
              },
            });
          }
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
      param.state = 'A';
      const res = yield call(getYuangongList, param);
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

    * addYuangong ({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(addYuangong, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyYuangong({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(modifyYuangong, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyYuangongStatus({payload, callback}, {call, put}) {
      const {id, zhuangtai} = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyYuangongStatus, {id, zhuangtai: zhuangtai === 1 ? 1 : 2 });
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * delYuangong({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(delYuangong, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * resetPassword({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(resetPassword, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        message.success('重置成功');
        if (callback) {
          callback(res);
        }
      }
    },

    * getYuangongDetail({payload, callback}, {call, put}) {
      const {id} = payload;
      if (id) {
        yield put({ type: 'loading', payload: true });
        const res = yield call(getYuangongDetail, payload);
        yield put({ type: 'loading', payload: false });
        if (res.success) {
          const {result} = res;
          yield put({type: 'updateEditData', payload: result});
          if (callback) {
            callback(res);
          }
        } else {
          yield put({type: 'updateEditData', payload: null});
        }
      } else {
        yield put({type: 'updateEditData', payload: null});
      }
    },

    // * getYuangongRole({payload, callback}, {call, put}) {
    //   const {id} = payload;
    //   if (id) {
    //     yield put({ type: 'loading', payload: true });
    //     const res = yield call(getYuangongRole, payload);
    //     yield put({ type: 'loading', payload: false });
    //     if (res.success) {
    //       const {result} = res;
    //       const roleIds = [];
    //       if (result.length > 0) {
    //         result.forEach((item) => {
    //           roleIds.push(item.id);
    //         });
    //       }
    //       yield put({type: 'updateSelectedRoleIds', payload: roleIds});
    //     }
    //   } else {
    //     yield put({type: 'updateSelectedRoleIds', payload: []});
    //   }
    // },

    // * getRoleAll({payload, callback}, {call, put}) {
    //   yield put({ type: 'app/loading', payload: true });
    //   const res = yield call(getRole, payload);
    //   yield put({ type: 'app/loading', payload: false });
    //   if (res.success) {
    //     const {result} = res;
    //     yield put({
    //       type: 'initAllRole',
    //       payload: {
    //         result,
    //       },
    //     });
    //   }
    // },

    * modifyYuangongRole({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(modifyYuangongRole, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        yield put({type: 'hideModal'});
        yield put({type: 'updateRoleIdArray', payload: null});
        if (callback) {
          callback(res);
        }
      }
    },

    * getGangweiAll({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShujuzidian, {...payload, leibie: 'gangwei'});
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'initAllGangwei',
          payload: {
            result,
          },
        });
      }
    },

    *getallRole({ payload = {} }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getallRole, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateRoleList',
          payload: result,
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
    showAllocateModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        allocateModalVisible: true,
      };
    },
    hideAllocateModal (state) {
      return {
        ...state,
        allocateModalVisible: false,
      };
    },
    updateEditData (state, {payload: editData}) {
      return {
        ...state,
        editData,
      };
    },
    initAllRole (state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        allRole: result,
      };
    },
    initAllGangwei (state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        allGangwei: result,
      };
    },
    updateSelectedRoleIds (state, {payload: roleIds}) {
      return {
        ...state,
        selectedRoleIds: roleIds,
      };
    },
    updateIsEdit (state, {payload}) {
      const {isEdit} = payload;
      return {
        ...state,
        isEdit,
      };
    },
    updateFilter (state, {payload}) {
      const {filter} = payload;
      return {
        ...state,
        filter,
      };
    },
    updateItemid(state, { payload }) {
      return {
        ...state,
        itemId: payload,
      };
    },
    updateRoleList(state, { payload }) {
      return {
        ...state,
        roleList: payload,
      };
    },
  },
});
