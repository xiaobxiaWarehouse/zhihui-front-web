import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import { query as getHuliList, addHuli, delHuli, getHuliDetailBySuoyin, getYuangong, getSuoyin, exportHulijilu } from 'services/huli';
import { query as getShujuzidian } from 'services/shujuzidian';
import { getSuoyin as getSuoyinList} from 'services/huodongjilu';
import { alllouhao, alllouceng } from 'services/monitor';
import {pageSizeModel} from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'huli',
  state: {
    modalVisible: false,
    viewModalVisible: false,
    addModalVisible: false,
    pdfModalVisible: false,
    allXiangmu: [],
    allZixiangmu: [],
    xiangmuSelected: null,
    allShichang: [],
    allMiaoshu: [],
    editData: null,
    yuangongList: [],
    isEdit: false,
    loading: false,
    editRecord: null,
    onComposition: false,
    selectLoading: false,
    listQuery: {},
    louhaoList: [],
    loucengList: [],
    filterValue: {},
    suoyinList: [],
    scrollTop: 0,
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/huli/list') {
          const {forceRefresh} = query;
          // dispatch({
          //   type: 'query',
          //   payload: query,
          // });
          dispatch({
            type: 'getShichangAll',
          });
          dispatch({
            type: 'getMiaoshuAll',
          });
          dispatch({
            type: 'alllouhao',
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
              type: 'updateLoucengList',
              payload: [],
            });
          }
          dispatch({
            type: 'updataFilterValue',
            payload: forceRefresh ? {} : query,
          });
        } else if (pathname === '/huli/record') {
          dispatch({
            type: 'getSuoyin',
            payload: query,
          });
          dispatch({
            type: 'getShichangAll',
          });
          dispatch({
            type: 'getMiaoshuAll',
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
      param.zhuangtai = payload.zhuangtai || -1;
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      if (payload.louceng) {
        param.louceng = payload.louceng;
      }
      if (payload.louhao) {
        param.louhao = payload.louhao;
      }
      if (payload.fanghao) {
        param.fanghao = payload.fanghao;
      }
      if (payload.huliZt) {
        param.huliZt = Number(payload.huliZt);
      }
      if (payload.riqi) {
        param.riqi = payload.riqi;
      }
      if (payload.huliyuan) {
        param.huliyuan = payload.huliyuan;
      }
      if (payload.zerenyishi) {
        param.zerenyishi = payload.zerenyishi;
      }
      const res = yield call(getHuliList, param);
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

    * addHuli ({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(addHuli, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * delHuli({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(delHuli, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * getSuoyin({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getSuoyin, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
        const {result} = res;
        yield put({
          type: 'updataSuoyindetail',
          payload: {
            result,
          },
        });
      }
    },
    // * getHuliDetailBySuoyin({payload, callback}, {call, put}) {
    //   const {suoyin} = payload;
    //   if (suoyin) {
    //     yield put({ type: 'loading', payload: true });
    //     const res = yield call(getHuliDetailBySuoyin, payload);
    //     yield put({ type: 'loading', payload: false });
    //     if (res.success) {
    //       const {result} = res;
    //       yield put({type: 'updateEditData', payload: result});
    //       if (callback) {
    //         callback(res);
    //       }
    //     } else {
    //       yield put({type: 'updateEditData', payload: null});
    //     }
    //   } else {
    //     yield put({type: 'updateEditData', payload: null});
    //   }
    // },
    * getXiangmuAll({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(getShujuzidian, {...payload, leibie: 'hulixiangmu', parentId: 0});
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'initAllXiangmu',
          payload: {
            result,
          },
        });
      }
    },

    * getZixiangmuAll({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(getShujuzidian, {...payload, leibie: 'hulixiangmu'});
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'initAllZixiangmu',
          payload: {
            result,
          },
        });
      }
    },

    * selectXiangmu({payload, callback}, {call, put}) {
      const {
        id,
      } = payload;
      if (id) {
        yield put({
          type: 'getZixiangmuAll',
          payload: {
            parentId: id,
          },
        });
      } else {
        yield put({
          type: 'initAllZixiangmu',
          payload: {
            result: [],
          },
        });
      }
    },

    * getShichangAll({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(getShujuzidian, {...payload, leibie: 'shichang'});
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'initAllShichang',
          payload: {
            result,
          },
        });
      }
    },

    * getMiaoshuAll({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(getShujuzidian, {...payload, leibie: 'miaoshu'});
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'initAllMiaoshu',
          payload: {
            result,
          },
        });
      }
    },

    * showAddModalAll({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      yield put({ type: 'getXiangmuAll', payload: true });
      yield put({ type: 'getZixiangmuAll', payload: true });
      yield put({ type: 'getShichangAll', payload: true });
      yield put({ type: 'getMiaoshuAll', payload: true });
      yield put({ type: 'loading', payload: false });
      yield put({
        type: 'showAddModal',
        payload: true,
      });
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

    *alllouhao({payload = {}}, {call, put}) {
      // yield put({ type: 'app/loading', payload: true });
      let param = { ...payload };
      param.zhuangtai = payload.zhuangtai ? payload.zhuangtai : -1;
      const res = yield call(alllouhao, param);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'updateLouhaoList',
          payload: result,
        });
      }
    },

    *alllouceng({payload = {}}, {call, put}) {
      // yield put({ type: 'app/loading', payload: true });
      let param = { ...payload };
      param.zhuangtai = payload.zhuangtai ? payload.zhuangtai : -1;
      const res = yield call(alllouceng, param);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'updateLoucengList',
          payload: result,
        });
      }
    },

    *exportHulijilu({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(exportHulijilu, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *getSuoyinList({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getSuoyinList, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'updataSuoyinList',
          payload: result,
        });
        if (callback) {
          callback();
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
    showViewModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        viewModalVisible: true,
      };
    },
    hideViewModal (state) {
      return {
        ...state,
        viewModalVisible: false,
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
    showPdfModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        pdfModalVisible: true,
      };
    },
    hidePdfModal (state) {
      return {
        ...state,
        pdfModalVisible: false,
      };
    },
    updateEditData (state, {payload: editData}) {
      return {
        ...state,
        editData,
      };
    },
    updateEditRecord (state, {payload: editRecord}) {
      return {
        ...state,
        editRecord,
      };
    },
    initAllXiangmu (state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        allXiangmu: result,
      };
    },
    updataSuoyindetail (state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        editData: result,
      };
    },
    initAllZixiangmu (state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        allZixiangmu: result,
      };
    },
    initAllShichang (state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        allShichang: result,
      };
    },
    initAllMiaoshu (state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        allMiaoshu: result,
      };
    },
    updateIsEdit (state, {payload}) {
      const {isEdit} = payload;
      return {
        ...state,
        isEdit,
      };
    },
    updateYuangongList (state, {payload}) {
      return {
        ...state,
        yuangongList: payload,
      };
    },
    onCompositionChange(state, {payload: onComposition}) {
      return {
        ...state,
        onComposition,
      };
    },
    updataListQuery(state, {payload}) {
      return {
        ...state,
        listQuery: payload,
      };
    },
    updateLouhaoList(state, {payload}) {
      return {
        ...state,
        louhaoList: payload,
      };
    },
    updateLoucengList(state, {payload}) {
      return {
        ...state,
        loucengList: payload,
      };
    },
    updataFilterValue(state, {payload}) {
      return {
        ...state,
        filterValue: payload,
      };
    },
    updataSuoyinList(state, {payload}) {
      return {
        ...state,
        suoyinList: payload,
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
