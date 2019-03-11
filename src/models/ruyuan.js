import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import X2JS from 'x2js';
import moment from 'moment';
import {
  query as getRuyuanList,
  addRuyuan,
  getRuyuanDetail,
  modifyRuyuan,
  getMUban,
  addDanan,
  getDanan,
  modifyDanan,
  getBanli,
  modifyBanli,
  untieZnc,
  untieZncd,
  untieDtz,
  untieZhx,
  addBangdingZnc,
  addBangdingZncd,
  addBangdingDtz,
  addBangdingZhx,
  modifyZnc,
  modifyZncd,
  modifyDtz,
  modifyZhx,
  zncXQ,
  zncdXQ,
  dtzXQ,
  ruyuanshengqingXQ,
} from 'services/ruzhu';
import {getChuangwei} from 'services/yuding';
import {message} from 'antd';
import { getYuangong, getSuoyin } from 'services/yuyue';
import {query as getShujuzidian} from 'services/shujuzidian';
import {getCap, swapItems} from 'utils';
import {pageSizeModel} from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'ruyuan',
  state: {
    modalVisible: false,
    viewModalVisible: false,
    suoyinModalVisible: false,
    selectModalVisible: false,
    vitaeModalVisible: false,
    familyModalVisible: false,
    tipModalVisible: false,
    editData: null,
    selectData: [],
    yuangongList: [],
    currentSelectData: null,
    chuangweiList: [],
    chuangweiSelectItem: [],
    savaChuangwei: [],
    xmlData: null,
    xmlDetail: null,
    tijianXml: null,
    tijianXmlDetail: null,
    jiankangXml: null,
    jiankangXmlDetail: null,
    addData: null,
    banlibumen: [],
    isAdd: true,
    tijianList: [],
    vitaeList: [],
    familyList: [],
    vitaeEdit: false,
    familyEdit: false,
    baogaoLb: [],
    bgCreateTime: null,
    currentBgIndex: 1,
    photo: null,
    selectSuoyin: null,
    myChuangwei: [],
    bumenAll: [],
    onComposition: false,
    selectLoading: false,
    filter: null,
    currentImg: null,
    cunrrTabIndex: 0,
    morenzhi: null,
    allValues: {},
    chuzhiDz: 2,
    optional: [],
    zncData: null,
    zncdData: null,
    dtzData: null,
    shengqingLb: null,
    shengqingList: null,
    filterValue: {},
    scrollTop: 0,
    kaishiDate: undefined,
    jieshuDate: undefined,
    jiankangVitae: {},
  },

  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/ruzhu/list') {
          // dispatch({
          //   type: 'query',
          //   payload: query,
          // });
          dispatch({
            type: 'initData',
          });
          const { forceRefresh } = query;
          dispatch({
            type: 'updataFilterValue',
            payload: forceRefresh ? {} : query,
          });
        } else if (pathname === '/ruzhu/add') {
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
        } else if (pathname === '/ruzhu/shebei' || pathname === '/ruzhu/shebeiBangd') {
          const { cunrrTabIndex, bianhao, suoyin } = query;
          dispatch({
            type: 'changeCunrrTabIndex',
            payload: cunrrTabIndex ? Number(cunrrTabIndex) : 0,
          });
          dispatch({
            type: 'updatezncData',
            payload: null,
          });
          dispatch({
            type: 'updatezncdData',
            payload: null,
          });
          if (bianhao && cunrrTabIndex === '1') {
            // 智能床垫
            dispatch({
              type: 'zncdXQ',
              payload: {
                bianhao,
                suoyin: Number(suoyin),
              },
            });
          } else if (bianhao && cunrrTabIndex === '2') {
            // 多体征设备
            dispatch({
              type: 'dtzXQ',
              payload: {
                bianhao,
                suoyin: Number(suoyin),
              },
            });
          } else if (bianhao && cunrrTabIndex === '0') {
            // 智能床
            dispatch({
              type: 'zncXQ',
              payload: {
                bianhao,
                suoyin: Number(suoyin),
              },
            });
          }
        } else if (pathname === '/ruzhu/edit') {
          dispatch({
            type: 'updateEditData',
            payload: null,
          });
          dispatch({
            type: 'getRuyuanDetail',
            payload: query,
          });
          dispatch({
            type: 'getYuangongList',
            payload: {
              zhuangtai: 1,
            },
          });
        } else if (pathname === '/ruzhu/banli') {
          dispatch({
            type: 'getRuyuanDetail',
            payload: query,
          });
          dispatch({
            type: 'getBumenAll',
            callback: (data) => {
              dispatch({
                type: 'getBanli',
                payload: {
                  shenqingId: Number(query.id),
                  bumenAll: data,
                },
              });
            },
          });
        } else if (pathname === '/ruzhu/pinggu') {
          const {ruzhuPg, suoyin} = query;
          dispatch({
            type: 'getMUban',
            payload: {
              leixing: 1,
            },
          });
          if (Number(ruzhuPg) !== -1) {
            dispatch({
              type: 'getDanan',
              payload: {
                suoyin: Number(suoyin),
                id: Number(ruzhuPg),
                leixing: 1,
              },
            });
          } else {
            dispatch({
              type: 'ruyuanshengqingXQ',
              payload: {
                suoyin: Number(suoyin),
              },
            });
          }
        } else if (pathname === '/ruzhu/tijian') {
          const {tijianBg, suoyin} = query;
          dispatch({
            type: 'getMUban',
            payload: {
              leixing: 2,
            },
          });
          dispatch({
            type: 'changeIsAdd',
            payload: Number(tijianBg) === -1,
          });
          if (Number(tijianBg) !== -1) {
            dispatch({
              type: 'getDanan',
              payload: {
                suoyin: Number(suoyin),
                id: Number(tijianBg),
                leixing: 2,
              },
            });
          } else {
            dispatch({
              type: 'ruyuanshengqingXQ',
              payload: {
                suoyin: Number(query.suoyin),
              },
            });
          }
        } else if (pathname === '/ruzhu/jiankang') {
          const {jiankangJl, suoyin} = query;
          dispatch({
            type: 'initJiankangXmlDetail',
            payload: null,
          });
          dispatch({
            type: 'getMUban',
            payload: {
              leixing: 3,
            },
          });
          if (Number(jiankangJl) !== -1) {
            dispatch({
              type: 'getDanan',
              payload: {
                suoyin: Number(suoyin),
                id: Number(jiankangJl),
                leixing: 3,
              },
            });
          } else {
            dispatch({
              type: 'ruyuanshengqingXQ',
              payload: {
                suoyin: Number(query.suoyin),
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
      param.danganZt = Number(payload.danganZt) || -2;
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      if (payload.zerenren) {
        param.zerenren = payload.zerenren;
      }
      if (payload.yujiSj) {
        param.yujiSj = payload.yujiSj;
      }
      if (payload.bumen) {
        param.bumen = Number(payload.bumen);
      }
      const res = yield call(getRuyuanList, param);
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

    *ruyuanshengqingXQ({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(ruyuanshengqingXQ, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateruyuanDetai',
          payload: result,
        });
        if (callback) {
          callback(result);
        }
      }
    },

    * addRuyuan ({payload, callback, failCallback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addRuyuan, payload);
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

    * getRuyuanDetail ({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getRuyuanDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updateEditData', payload: result });
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

    * getSuoyin({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getSuoyin, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updataSelectData', payload: result});
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

    * modifyRuyuan({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyRuyuan, payload);
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

    * getMUban({payload, callback}, {call, put}) {
      const {leixing} = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getMUban, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result: {neirong, banben}} = res;
        let x2js = new X2JS({
          arrayAccessFormPaths: [
            'document.section',
            'document.section.item',
            'document.section.item.option',
          ],
        });
        let jsonObj = x2js.xml2js(neirong);
        if (leixing === 1) {
          yield put({ type: 'updataXmlData', payload: {jsonObj, banben}});
        } else if (leixing === 2) {
          yield put({ type: 'updataTijianXml', payload: {jsonObj, banben}});
        } else if (leixing === 3) {
          yield put({ type: 'updajiankangXml', payload: {jsonObj, banben}});
        }
        if (callback) {
          callback(res);
        }
      }
    },

    * addDanan({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addDanan, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * getDanan({payload, callback}, {call, put}) {
      const {leixing} = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getDanan, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result: {neirong}} = res;
        let data = JSON.parse(neirong);
        for (let item in data) {
          if (data[item] && item !== 'pre0103' && item !== 'pre0106') {
            try {
              data[item] = JSON.parse(data[item]);
            } catch (e) {
              // console.log(e);
            }
          }
        }
        if (leixing === 1) {
          yield put({ type: 'updataXmlDetail', payload: data});
        } else if (leixing === 2) {
          yield put({
            type: 'updataTijianXmlDetail',
            payload: {
              data,
              baogaoLb: res.result.qita,
              createTime: res.result.createTime,
              id: payload.id,
            },
          });
        } else if (leixing === 3) {
          yield put({ type: 'updataJiankangDetail', payload: data});
        }
        if (callback) {
          callback(res);
        }
      }
    },

    * modifyDanan({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyDanan, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    * getBumenAll({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShujuzidian, {...payload, leibie: 'banlibumen'});
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updataBumenAll', payload: result });
        if (callback) {
          callback(result);
        }
      }
    },

    * getBanli({payload, callback}, {call, put}) {
      const {shenqingId, bumenAll} = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getBanli, {shenqingId});
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({type: 'updataBanlibumen', payload: {bumenAll, result, shenqingId}});
      }
    },

    * modifyBanli({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyBanli, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },
    *untieZnc({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(untieZnc, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *untieZncd({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(untieZncd, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *untieDtz({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(untieDtz, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *untieZhx({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(untieZhx, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *addBangdingZnc({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addBangdingZnc, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *addBangdingZncd({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addBangdingZncd, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *addBangdingDtz({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addBangdingDtz, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *addBangdingZhx({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(addBangdingZhx, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *modifyZnc({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyZnc, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *modifyZncd({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyZncd, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *modifyDtz({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyDtz, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *modifyZhx({ payload, callback }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(modifyZhx, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        if (callback) {
          callback();
        }
      }
    },

    *zncXQ({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(zncXQ, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { bangdingjilu } } = res;
        yield put({
          type: 'updatezncData',
          payload: bangdingjilu,
        });
        let {yuzhi} = bangdingjilu;
        if (bangdingjilu && bangdingjilu.yuzhi) {
          yuzhi = JSON.parse(bangdingjilu.yuzhi);
        }
        const params = {
          bianhao: bangdingjilu.bianhao,
          tixing: bangdingjilu.tixing,
          hrmin: yuzhi ? yuzhi.hr.min : undefined,
          hrmax: yuzhi ? yuzhi.hr.max : undefined,
          rrmin: yuzhi ? yuzhi.rr.min : undefined,
          rrmax: yuzhi ? yuzhi.rr.max : undefined,
          offbed: yuzhi ? yuzhi.bed.offbed : undefined,
          hrStart: yuzhi ? moment(yuzhi.hr.start, 'HH:mm:ss').toDate() : undefined,
          hrEnd: yuzhi ? moment(yuzhi.hr.end, 'HH:mm:ss').toDate() : undefined,
          rrStart: yuzhi ? moment(yuzhi.rr.start, 'HH:mm:ss').toDate() : undefined,
          rrEnd: yuzhi ? moment(yuzhi.rr.end, 'HH:mm:ss').toDate() : undefined,
          bedStart: yuzhi ? moment(yuzhi.bed.start, 'HH:mm:ss').toDate() : undefined,
          bedEnd: yuzhi ? moment(yuzhi.bed.end, 'HH:mm:ss').toDate() : undefined,
          hrduration: yuzhi ? yuzhi.hr.duration : undefined,
          rrduration: yuzhi ? yuzhi.rr.duration : undefined,
        };
        yield put({
          type: 'updataAllvalues',
          payload: params,
        });
      }
    },

    *zncdXQ({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(zncdXQ, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { bangdingjilu } } = res;
        yield put({
          type: 'updatezncdData',
          payload: bangdingjilu,
        });
        let {yuzhi} = bangdingjilu;
        if (bangdingjilu && bangdingjilu.yuzhi) {
          yuzhi = JSON.parse(bangdingjilu.yuzhi);
        }
        const params = {
          bianhao: bangdingjilu.bianhao,
          tixing: bangdingjilu.tixing,
          hrmin: yuzhi ? yuzhi.hr.min : undefined,
          hrmax: yuzhi ? yuzhi.hr.max : undefined,
          rrmin: yuzhi ? yuzhi.rr.min : undefined,
          rrmax: yuzhi ? yuzhi.rr.max : undefined,
          offbed: yuzhi ? yuzhi.bed.offbed : undefined,
          hrStart: yuzhi ? moment(yuzhi.hr.start, 'HH:mm:ss').toDate() : undefined,
          hrEnd: yuzhi ? moment(yuzhi.hr.end, 'HH:mm:ss').toDate() : undefined,
          rrStart: yuzhi ? moment(yuzhi.rr.start, 'HH:mm:ss').toDate() : undefined,
          rrEnd: yuzhi ? moment(yuzhi.rr.end, 'HH:mm:ss').toDate() : undefined,
          bedStart: yuzhi ? moment(yuzhi.bed.start, 'HH:mm:ss').toDate() : undefined,
          bedEnd: yuzhi ? moment(yuzhi.bed.end, 'HH:mm:ss').toDate() : undefined,
          hrduration: yuzhi ? yuzhi.hr.duration : undefined,
          rrduration: yuzhi ? yuzhi.rr.duration : undefined,
        };
        yield put({
          type: 'updataAllvalues',
          payload: params,
        });
      }
    },

    *dtzXQ({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(dtzXQ, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { bangdingjilu } } = res;
        yield put({
          type: 'updatedtzData',
          payload: bangdingjilu,
        });
        let {yuzhi} = bangdingjilu;
        if (bangdingjilu && bangdingjilu.yuzhi) {
          yuzhi = JSON.parse(bangdingjilu.yuzhi);
        }
        const params = {
          bianhao: bangdingjilu.bianhao,
          tixing: bangdingjilu.tixing,
          hrmin: yuzhi ? yuzhi.hr.min : undefined,
          hrmax: yuzhi ? yuzhi.hr.max : undefined,
          sbpmin: yuzhi ? yuzhi.sbp.min : undefined,
          sbpmax: yuzhi ? yuzhi.sbp.max : undefined,
          dbpmin: yuzhi ? yuzhi.dbp.min : undefined,
          dbpmax: yuzhi ? yuzhi.dbp.max : undefined,
          tempmin: yuzhi ? yuzhi.temp.min : undefined,
          tempmax: yuzhi ? yuzhi.temp.max : undefined,
          bgmin: yuzhi ? yuzhi.bg.min : undefined,
          bgmax: yuzhi ? yuzhi.bg.max : undefined,
          spo2min: yuzhi ? yuzhi.spo2.min : undefined,
          spo2max: yuzhi ? yuzhi.spo2.max : undefined,
        };
        yield put({
          type: 'updataAllvalues',
          payload: params,
        });
      }
    },
  },
  reducers: {
    updateKaishiDate(state, { payload }) {
      return {
        ...state,
        kaishiDate: payload,
      };
    },
    updateJieshuDate(state, {payload}) {
      return {
        ...state,
        jieshuDate: payload,
      };
    },
    updateJiankangVitae(state, { payload }) {
      return {
        ...state,
        jiankangVitae: payload,
      };
    },
    updateruyuanDetai(state, { payload }) {
      return {
        ...state,
        shengqingList: payload,
        savaChuangwei: payload.chuangwei,
      };
    },
    changeCunrrTabIndex(state, { payload }) {
      return {
        ...state,
        cunrrTabIndex: payload,
        morenzhi: null,
      };
    },
    updataAllvalues(state, { payload }) {
      return {
        ...state,
        allValues: payload,
      };
    },
    updatashengqing(state, { payload }) {
      return {
        ...state,
        shengqingLb: payload,
      };
    },
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
    showTipModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        tipModalVisible: true,
      };
    },
    hideTipModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        tipModalVisible: false,
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
    showVitaeModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        vitaeModalVisible: true,
      };
    },
    hideVitaeModal (state) {
      return {
        ...state,
        vitaeModalVisible: false,
      };
    },
    showFamilyModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        familyModalVisible: true,
      };
    },
    hideFamilyModal (state) {
      return {
        ...state,
        familyModalVisible: false,
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
      let newChuangweiSelectItem = payload ? payload.chuangwei.map((item) => {
        item.baofang = payload.baofang;
        return item;
      }) : [];
      return {
        ...state,
        editData: {
          ...payload,
          beforeChuangweiLx: payload && payload.chuangweiLx,
        },
        savaChuangwei: newChuangweiSelectItem,
      };
    },
    resetChuangwei(state) {
      const {editData} = state;
      const {chuangwei, baofang} = editData;
      let newChuangweiSelectItem = chuangwei.map((item) => {
        item.baofang = baofang;
        return item;
      });
      return {
        ...state,
        chuangweiSelectItem: newChuangweiSelectItem,
        savaChuangwei: newChuangweiSelectItem,
        editData: {
          ...editData,
          chuangweiLx: editData.beforeChuangweiLx,
        },
      };
    },
    updataAddData (state, {payload}) {
      return {
        ...state,
        addData: payload,
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
        myChuangwei: shenqing,
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
      const {chuangweiList, chuangweiSelectItem, editData} = state;
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
        editData: {
          ...editData,
          chuangweiLx: 2,
        },
      };
    },
    fanghaoSelect (state, {payload}) {
      const {chuangweiList, editData} = state;
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
        editData: {
          ...editData,
          chuangweiLx: 2,
        },
      };
    },
    updataXmlData (state, {payload}) {
      const {jsonObj, banben} = payload;
      let data = getCap(jsonObj);
      return {
        ...state,
        xmlData: data,
        banben,
      };
    },
    updataTijianXml(state, {payload}) {
      const {jsonObj, banben} = payload;
      let data = getCap(jsonObj);
      return {
        ...state,
        tijianXml: data,
        banben,
      };
    },
    updajiankangXml(state, {payload}) {
      const {jsonObj, banben} = payload;
      let data = getCap(jsonObj);
      return {
        ...state,
        jiankangXml: data,
        banben,
      };
    },
    updataXmlDetail (state, {payload}) {
      return {
        ...state,
        xmlDetail: payload,
      };
    },
    updataTijianXmlDetail (state, {payload}) {
      const {
        data,
        baogaoLb,
        createTime,
        id,
      } = payload;
      let index = baogaoLb.indexOf(id);
      let newList = (data && data['01'] && data['01']['01']) || [];
      return {
        ...state,
        tijianXmlDetail: data,
        baogaoLb,
        bgCreateTime: createTime,
        currentBgIndex: index + 1,
        tijianList: newList,
      };
    },
    updataJiankangDetail (state, {payload}) {
      return {
        ...state,
        jiankangXmlDetail: payload,
        vitaeList: payload['02']['01'] || [],
        familyList: payload['04']['01'] || [],
        photo: payload['01'] && payload['01']['18'],
      };
    },
    initJiankangXmlDetail (state, {payload}) {
      return {
        ...state,
        jiankangXmlDetail: null,
        shengqingList: null,
      };
    },
    updataBanlibumen (state, {payload}) {
      const {bumenAll, result, shenqingId} = payload;
      let allItem = [];
      if (bumenAll) {
        bumenAll.forEach((item, index) => {
          allItem[index] = {
            banli: 1,
            bumen: item.id,
            shenqing: shenqingId,
            miaoshu: item.miaoshu,
          };
        });
      }
      allItem = allItem.map((it) => {
        let f = result.map(sit => sit.bumen).indexOf(it.bumen);
        if (f !== -1) {
          return {
            ...it,
            banli: result[f].banli,
          };
        } else {
          return it;
        }
      });
      return {
        ...state,
        banlibumen: allItem,
      };
    },
    changeBumenStatus (state, {payload}) {
      const {banlibumen} = state;
      let newBanlibumen = banlibumen.map((item, index) => {
        if (index === payload) {
          item.banli = item.banli === 2 ? 1 : 2;
        }
        return item;
      });
      return {
        ...state,
        banlibumen: newBanlibumen,
      };
    },
    changeIsAdd(state, {payload}) {
      return {
        ...state,
        isAdd: payload,
        tijianList: [],
        baogaoLb: [],
        bgCreateTime: null,
        currentBgIndex: 1,
      };
    },
    changeTijianList(state, {payload}) {
      return {
        ...state,
        tijianList: payload,
      };
    },
    changeCurrentBgIndex(state, {payload}) {
      return {
        ...state,
        currentBgIndex: payload,
      };
    },
    initData(state) {
      return {
        ...state,
        xmlData: null,
        xmlDetail: null,
        tijianXml: null,
        tijianXmlDetail: null,
        currentZenrenData: null,
        currentSelectData: null,
        addData: null,
        chuangweiSelectItem: [],
        jiankangXml: null,
        jiankangXmlDetail: null,
        photo: null,
        selectSuoyin: null,
        myChuangwei: [],
        filter: null,
        vitaeList: [],
        familyList: [],
      };
    },
    onUpTijianList(state, {payload}) {
      const {tijianList} = state;
      let newList = swapItems(tijianList, payload, payload - 1);
      return {
        ...state,
        tijianList: newList,
      };
    },
    onDownTijianList(state, {payload}) {
      const {tijianList} = state;
      let newList = swapItems(tijianList, payload, payload + 1);
      return {
        ...state,
        tijianList: newList,
      };
    },
    onDeleteTijianList(state, {payload}) {
      const {tijianList} = state;
      tijianList.splice(payload, 1);
      return {
        ...state,
        tijianList,
      };
    },
    updataPhoto(state, {payload}) {
      return {
        ...state,
        photo: payload,
      };
    },
    changeVitaeList(state, {payload}) {
      return {
        ...state,
        vitaeList: payload,
      };
    },
    changeFamilyList(state, {payload}) {
      return {
        ...state,
        familyList: payload,
      };
    },
    changeVitaeEdit(state) {
      const {vitaeEdit} = state;
      return {
        ...state,
        vitaeEdit: !vitaeEdit,
      };
    },
    changeFamilyEdit(state) {
      const {familyEdit} = state;
      return {
        ...state,
        familyEdit: !familyEdit,
      };
    },
    updataSelectSuoyin (state, {payload}) {
      return {
        ...state,
        selectSuoyin: payload,
      };
    },
    updataBumenAll(state, {payload}) {
      return {
        ...state,
        bumenAll: payload,
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
    changeChuzhiDz (state, {payload}) {
      return {
        ...state,
        chuzhiDz: payload,
      };
    },
    updatedtzData(state, { payload }) {
      return {
        ...state,
        dtzData: payload,
      };
    },
    updatezncdData(state, { payload }) {
      return {
        ...state,
        zncdData: payload,
      };
    },
    updatezncData(state, { payload }) {
      return {
        ...state,
        zncData: payload,
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
