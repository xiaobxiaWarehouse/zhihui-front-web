import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import {message} from 'antd';
import { query as getYudingList, addYuDing, getChuangwei, getChuangweiYueding, getYudingDetail, modifyYuding} from 'services/yuding';
import { getYuangong, getSuoyin } from 'services/yuyue';
import {pageSizeModel} from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'yuding',
  state: {
    modalVisible: false,
    selectModalVisible: false,
    suoyinModalVisible: false,
    chuangweiModalVisible: false,
    editData: null,
    selectData: [],
    yuangongList: [],
    currentSelectData: null,
    selectSuoyin: null,
    chuangweiList: [],
    chuangweiSelectItem: [],
    savaChuangwei: [],
    myChuangwei: [],
    onComposition: false,
    selectLoading: false,
    filter: null,
    chuzhiDz: 2,
    optional: [],
    filterValue: {},
    scrollTop: 0,
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/yuding/list') {
          // dispatch({
          //   type: 'query',
          //   payload: query,
          // });
          dispatch({
            type: 'initData',
          });
          const { forceRefresh } = query;
          if (forceRefresh) {
            dispatch({
              type: 'updataFilterValue',
              payload: {},
            });
          }
        } else if (pathname === '/yuding/add') {
          dispatch({
            type: 'initChuangweiSelectItem',
            payload: [],
          });
          dispatch({
            type: 'getYuangongList',
            payload: {
              zhuangtai: 1,
            },
          });
        } else if (pathname === '/yuding/edit') {
          dispatch({
            type: 'updateEditData',
            payload: null,
          });
          dispatch({
            type: 'getYudingDetail',
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
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      param.zhuangtai = Number(payload.zhuangtai) || 1;
      if (payload.ruzhuSj) {
        param.ruzhuSj = payload.ruzhuSj;
      }
      if (payload.jiezhiSj) {
        param.jiezhiSj = payload.jiezhiSj;
      }
      if (payload.zerenren) {
        param.zerenren = payload.zerenren;
      }
      const res = yield call(getYudingList, param);
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

    * addYuDing ({payload, callback, failCallback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addYuDing, payload);
      yield put({ type: 'app/loading', payload: false });
      let throwErrorCode = ['10106', '10203', '10303', '10202'];
      if (throwErrorCode.indexOf(res.errorCode) > -1) {
        if (failCallback) {
          failCallback();
        }
      }
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    * getYudingDetail({payload, callback}, {call, put}) {
      yield put({ type: 'selectLoading', payload: true });
      const res = yield call(getYudingDetail, payload);
      yield put({ type: 'selectLoading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updateEditData', payload: result});
        if (callback) {
          callback(result, chuangweiSelectItem);
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

    * getChuangwei({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const {
        zhuangtai,
        screen,
        suoyin,
      } = payload;
      let param = {};
      param.zhuangtai = zhuangtai ? Number(zhuangtai) : -1;
      param.screen = Number(screen);
      if (payload.suoyin) {
        param.suoyin = Number(suoyin);
      }
      if (payload.louhao) {
        param.louhao = payload.louhao;
      }
      if (payload.cenghao) {
        param.louceng = payload.cenghao;
      }
      const res = yield call(getChuangwei, param);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updataChuangweiList', payload: {result}});
        if (callback) {
          callback(result);
        }
      }
    },

    * getChuangweiYueding({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const {
        zhuangtai,
        screen,
        suoyin,
      } = payload;
      let param = {};
      param.zhuangtai = zhuangtai ? Number(zhuangtai) : -1;
      param.screen = Number(screen);
      if (payload.suoyin) {
        param.suoyin = Number(suoyin);
      }
      if (payload.louhao) {
        param.louhao = payload.louhao;
      }
      if (payload.cenghao) {
        param.louceng = payload.cenghao;
      }
      const res = yield call(getChuangweiYueding, param);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updataChuangweiList', payload: {result}});
        if (callback) {
          callback(result);
        }
      }
    },

    * modifyYuding({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyYuding, payload);
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
    showChuangweiModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        chuangweiModalVisible: true,
      };
    },
    hideChuangweiModal (state, {payload}) {
      return {
        ...state,
        chuangweiModalVisible: false,
        ...payload,
      };
    },
    updateEditData (state, {payload}) {
      let newChuangweiSelectItem = payload && payload.chuangwei ? payload.chuangwei.map((item) => {
        item.baofang = payload.baofang;
        return item;
      }) : [];
      return {
        ...state,
        editData: payload,
        savaChuangwei: newChuangweiSelectItem,
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
    updataChuangweiList (state, {payload}) {
      const {savaChuangwei} = state;
      const {result: {list, yuding = [], shenqing = []}} = payload;
      let newList = list.map((item) => {
        item.beforeZhuangtai = item.zhuangtai;
        item.beforeBaofang = item.shenqingBaofang === 2 || item.yudingBaofang === 2 ? 2 : 1;
        item.baofang = item.shenqingBaofang === 2 || item.yudingBaofang === 2 ? 2 : 1;
        savaChuangwei.forEach((k) => {
          if (item.id === k.id) {
            item.zhuangtai = 6;
            item.baofang = k.baofang;
          }
        });
        return item;
      });
      return {
        ...state,
        chuangweiList: newList,
        myChuangwei: yuding,
        optional: shenqing.concat(yuding),
      };
    },
    initChuangweiSelectItem (state, {payload}) {
      return {
        ...state,
        chuangweiSelectItem: payload,
        savaChuangwei: payload,
        editData: null,
        chuzhiDz: 2,
      };
    },
    chuangweiSelect (state, {payload}) {
      const {isSelect, chuangwei} = payload;
      const {chuangweiList, chuangweiSelectItem} = state;
      let newItem = [];
      let newList = chuangweiList.map((item) => {
        // 为取消选房&&为包房
        if (!isSelect && chuangwei.baofang === 2) {
          chuangweiSelectItem.forEach((k) => {
            if (k.id === item.id) {
              item.baofang = 1;
              item.zhuangtai = item.beforeZhuangtai;
            }
          });
        }
        if (item.id === chuangwei.id) {
          newItem = isSelect ? [chuangwei] : [];
          item.zhuangtai = isSelect ? 6 : item.beforeZhuangtai;
          item.baofang = 1;
        } else if (item.zhuangtai === 6) {
          item.zhuangtai = item.beforeZhuangtai;
          item.baofang = 1;
        }
        return item;
      });
      return {
        ...state,
        chuangweiList: newList,
        chuangweiSelectItem: newItem,
      };
    },
    fanghaoSelect (state, {payload}) {
      const {chuangweiList} = state;
      let newItem = [];
      let currFanghaoId = payload.map((item) => {
        return item.id;
      });
      // 判断当前是选择操作还是取消操作
      let isSelect = payload.every((item) => {
        return item.zhuangtai === 6;
      });
      let newList = chuangweiList.map((item) => {
        payload.forEach((k) => {
          if (item.id === k.id) {
            item.zhuangtai = isSelect ? item.beforeZhuangtai : 6;
            item.baofang = isSelect ? item.beforeBaofang : 2;
            newItem.push(item);
          } else if (item.zhuangtai === 6 && currFanghaoId.indexOf(item.id) < 0) {
            item.zhuangtai = item.beforeZhuangtai;
            item.baofang = 1;
          }
        });
        return item;
      });
      return {
        ...state,
        chuangweiList: newList,
        chuangweiSelectItem: newItem,
      };
    },
    initData (state) {
      return {
        ...state,
        chuangweiSelectItem: [],
        addData: null,
        currentSelectData: null,
        selectSuoyin: null,
        filter: null,
        editData: null,
      };
    },
    updataSelectSuoyin (state, {payload}) {
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
    updateFilter (state, {payload}) {
      const {filter} = payload;
      return {
        ...state,
        filter,
      };
    },
    updataFilterValue(state, {payload}) {
      return {
        ...state,
        filterValue: payload,
      };
    },
    changeChuzhiDz (state, {payload}) {
      return {
        ...state,
        chuzhiDz: payload,
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
