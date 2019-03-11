import qs from 'qs';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import { Modal, notification, message } from 'antd';
import modelExtend from 'dva-model-extend';
import {config} from 'utils';
import {query as getRoleList, addRole, modifyRole, delRole, getRoleDetail, getRolePriv, getPriv, modifyRolePriv} from 'services/role';
import {pageSizeModel} from './common';

const {prefix} = config;


export default modelExtend(pageSizeModel, {
  namespace: 'role',
  state: {
    modalVisible: false,
    addModalVisible: false,
    allocateModalVisible: false,
    allPriv: [],
    selectedPrivIds: [],
    editData: null,
    isEdit: false,
    loading: false,
    privs: null,
    filter: {},
    itemId: {},
    checkAll: false,
    detaiData: [],
    rolePriv: [],
    roleList: [],
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/role/list') {
          dispatch({
            type: 'query',
            payload: query,
          });
          // dispatch({
          //   type: 'getPrivAll',
          // });
          // dispatch({
          //   type: 'updateEditData',
          // });
          // dispatch({
          //   type: 'getRolePriv',
          //   payload: {
          //     type: -1,
          //     pageNum: 1,
          //     pageSize: 40,
          //     pattern: 'tree',
          //   },
          // });
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
      const res = yield call(getRoleList, param);
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

    * addRole ({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(addRole, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyRole({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(modifyRole, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyRoleStatus({payload, callback}, {call, put}) {
      const {id, zhuangtai} = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyRole, {id, zhuangtai: zhuangtai === 1 ? 1 : 2 });
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * delRole({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(delRole, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *getRoleDetail({ payload }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(getRoleDetail, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateDetaiData',
          payload: result,
        });
      }
    },

    *getRolePriv({ payload, callback }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(getRolePriv, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
        const { result } = res;
        const rolePriv = result.map((item) => {
          return {
            code: item.code,
            label: item.name,
            value: item.id,
            id: item.id,
            description: item.description,
            type: item.type,
            childrenValue: [],
            checked: false,
            children: item.children.map((k) => {
              return {
                code: k.code,
                label: k.name,
                value: k.id,
                id: k.id,
                description: k.description,
                type: k.type,
              };
            }),
          };
        });

        yield put({
          type: 'updateRolepriv',
          payload: rolePriv,
        });
      }
    },

    // * getPrivAll({payload, callback}, {call, put}) {
    //   yield put({ type: 'app/loading', payload: true });
    //   const res = yield call(getPriv, payload);
    //   yield put({ type: 'app/loading', payload: false });
    //   if (res.success) {
    //     const {result} = res;
    //     yield put({
    //       type: 'initAllPriv',
    //       payload: {
    //         result,
    //       },
    //     });
    //   }
    // },

    * modifyRolePriv({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(modifyRolePriv, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        yield put({type: 'hideModal'});
        yield put({type: 'updatePrivIdArray', payload: null});
        if (callback) {
          callback(res);
        }
      }
    },
  },
  reducers: {
    updateItemid(state, { payload }) {
      return {
        ...state,
        itemId: payload,
      };
    },
    updateDetaiData(state, { payload }) {
      const {rolePriv} = state;
      let privsCode = payload.privs.map((priv) => {
        return priv.code;
      });
      let newRolePriv = rolePriv.map((item) => {
        return {
          ...item,
          checked: item.children.every((k) => {
            return privsCode.indexOf(k.code) > -1;
          }),
          childrenValue: item.children.filter((k) => {
            return privsCode.indexOf(k.code) > -1;
          }).map((c) => {
            return c.id;
          }),
        };
      });
      return {
        ...state,
        detaiData: payload,
        rolePriv: newRolePriv,
      };
    },
    updateRolepriv(state, { payload }) {
      return {
        ...state,
        rolePriv: payload,
      };
    },
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
    initAllPriv (state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        allPriv: result,
      };
    },
    updateSelectedPrivIds (state, {payload: privIds}) {
      return {
        ...state,
        selectedPrivIds: privIds,
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
  },
});
