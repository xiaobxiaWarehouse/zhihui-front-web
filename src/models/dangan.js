import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import X2JS from 'x2js';
import { query as getDanganList, getDanganDetail, getRuyuanDetail, getYuyueDetail, getYudingDetail, getDangan, postRuyuanEmail, postYudingEmail, postyuyueEmail, sendEmail } from 'services/dangan';
import {getMUban, ruyuanshengqingXQ} from 'services/ruzhu';
import { getSuoyin } from 'services/huli';
import { alllouhao, alllouceng } from 'services/monitor';
import {getCap, config} from 'utils';
import {pageSizeModel} from './common';

const {prefix} = config;

export default modelExtend(pageSizeModel, {
  namespace: 'dangan',
  state: {
    modalVisible: false,
    viewModalVisible: false,
    yuyueIsOpen: true,
    yudingIsOpen: true,
    ruzhuIsOpen: true,
    huliISOpen: true,
    pingguIsOpen: true,
    tijianIsOpen: true,
    jiankangIsOpen: true,
    ruzhujiangkangjilu: [],
    yuyue: [],
    yuding: [],
    shenqing: [],
    huliJilu: [],
    ruzhupinggu: [],
    tijianbaogao: [],
    shebei: null,
    ruzhuXxData: null,
    yuyueData: null,
    yudingData: null,
    shenqingData: null,
    huliJiluData: null,
    xmlDetail: null,
    tijianData: null,
    currentHuliIndex: 0,
    currentRuyuanIndex: 0,
    currentTijianIndex: 0,
    currentYudingIndex: 0,
    currentYuyueIndex: 0,
    xmlData: null,
    tijianXml: null,
    jiankangXml: null,
    currentImg: null,
    currentNavIndex: 0,
    louhaoList: [],
    loucengList: [],
    filterValue: {},
    yuyueModalVisible: false,
    yudingModalVisible: false,
    shengqingModalVisible: false,
    jiankangModalVisible: false,
    pingguModalVisible: false,
    tijianModalVisible: false,
    ruzhuData: null,
    scrollTop: 0,
    collapsed: window.sessionStorage.getItem(`${prefix}danganSiderFold`) === 'true',
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/dangan/list') {
          // dispatch({
          //   type: 'query',
          //   payload: query,
          // });
          dispatch({
            type: 'initState',
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
          const { forceRefresh } = query;
          if (forceRefresh) {
            dispatch({
              type: 'updataFilterValue',
              payload: {},
            });
          }
        } else if (pathname === '/dangan/detail') {
          dispatch({
            type: 'changeCurrentNavIndex',
            payload: 0,
          });
          dispatch({
            type: 'updateCollapsed',
            payload: window.sessionStorage.getItem(`${prefix}danganSiderFold`) === 'true',
          });
          dispatch({
            type: 'getDanganDetail',
            payload: {
              id: Number(query.suoyin),
            },
            callback: () => {
              dispatch({
                type: 'getMUban',
                payload: {
                  leixing: 3,
                  zhuangtai: 1,
                },
              });
              dispatch({
                type: 'ruyuanshengqingXQ',
                payload: {
                  suoyin: Number(query.suoyin),
                },
              });
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
      if (payload.louhao) {
        param.louhao = payload.louhao;
      }
      if (payload.louceng) {
        param.louceng = payload.louceng;
      }
      if (payload.fanghao) {
        param.fanghao = payload.fanghao;
      }
      if (payload.huliyuan) {
        param.huliyuan = payload.huliyuan;
      }
      if (payload.zerenyishi) {
        param.zerenyishi = payload.zerenyishi;
      }
      const res = yield call(getDanganList, param);
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

    * getDanganDetail ({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getDanganDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({type: 'updataLb', payload: result});
        if (callback) {
          callback(result);
        }
      }
    },

    * getRuyuanDetail ({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getRuyuanDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({type: 'uptataShenqingData', payload: result});
        if (callback) {
          callback();
        }
      }
    },

    * getYuyueDetail ({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getYuyueDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({type: 'uptataYuyueData', payload: result});
        if (callback) {
          callback();
        }
      }
    },

    * getYudingDetail ({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getYudingDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({type: 'uptataYudingeData', payload: result});
        if (callback) {
          callback(res);
        }
      }
    },

    * getDangan ({payload, callback}, {call, put}) {
      const {leixin} = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getDangan, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result: {neirong}} = res;
        let data = JSON.parse(neirong);
        for (let item in data) {
          if (data[item] && item !== 'pre0106') {
            try {
              data[item] = JSON.parse(data[item]);
            } catch (e) {
              // console.log(e);
            }
          }
        }
        if (leixin === 1) {
          yield put({type: 'uptataXmlDetail', payload: data});
        } else if (leixin === 2) {
          yield put({type: 'uptataTijianData', payload: {...data, time: res.result.createTime}});
        } else if (leixin === 3) {
          yield put({type: 'uptataRuzhuXxData', payload: data});
        }
        if (callback) {
          callback(res);
        }
      }
    },

    * getHuliDetail ({payload, callback}, {call, put}) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getSuoyin, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({type: 'updataHuliJiluData', payload: result});
        if (callback) {
          callback();
        }
      }
    },

    * getMUban({payload, callback}, {call, put}) {
      const {leixing} = payload;
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getMUban, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const {result: {neirong}} = res;
        let x2js = new X2JS({
          arrayAccessFormPaths: [
            'document.section',
            'document.section.item',
            'document.section.item.option',
          ],
        });
        let jsonObj = x2js.xml2js(neirong);
        if (leixing === 1) {
          yield put({ type: 'updataXmlData', payload: jsonObj});
        } else if (leixing === 2) {
          yield put({ type: 'updataTijianXml', payload: jsonObj});
        } else if (leixing === 3) {
          yield put({ type: 'updajiankangXml', payload: jsonObj});
        }
        if (callback) {
          callback(res);
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

    *postyuyueEmail({ payload, callback }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(postyuyueEmail, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *postRuyuanEmail({ payload, callback }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(postRuyuanEmail, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *postYudingEmail({ payload, callback }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(postYudingEmail, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *sendEmail({ payload, callback }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(sendEmail, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
      }
    },

    *ruyuanshengqingXQ({payload, callback}, {call, put}) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(ruyuanshengqingXQ, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'updateRuzhuData',
          payload: result,
        });
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
    showtijianModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        tijianModalVisible: true,
      };
    },
    hidetijianModal (state) {
      return {
        ...state,
        tijianModalVisible: false,
      };
    },
    showjiankangModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        jiankangModalVisible: true,
      };
    },
    hidejiankangModal (state) {
      return {
        ...state,
        jiankangModalVisible: false,
      };
    },
    showpingguModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        pingguModalVisible: true,
      };
    },
    hidepingguModal (state) {
      return {
        ...state,
        pingguModalVisible: false,
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
    showQrcodeModal(state, { payload }) {
      return {
        ...state,
        yuyueModalVisible: true,
      };
    },
    hideQrcodeModal(state) {
      return {
        ...state,
        yuyueModalVisible: false,
      };
    },
    showYudingModal(state, { payload }) {
      return {
        ...state,
        yudingModalVisible: true,
      };
    },
    hideYudingModal(state) {
      return {
        ...state,
        yudingModalVisible: false,
      };
    },
    showshengqingModal(state, { payload }) {
      return {
        ...state,
        shengqingModalVisible: true,
      };
    },
    hideshengqingModal(state) {
      return {
        ...state,
        shengqingModalVisible: false,
      };
    },
    changeYuyueIsOpen (state) {
      const {yuyueIsOpen} = state;
      return {
        ...state,
        yuyueIsOpen: !yuyueIsOpen,
      };
    },
    changeYudingIsOpen (state) {
      const {yudingIsOpen} = state;
      return {
        ...state,
        yudingIsOpen: !yudingIsOpen,
      };
    },
    changeRuzhuIsOpen (state) {
      const {ruzhuIsOpen} = state;
      return {
        ...state,
        ruzhuIsOpen: !ruzhuIsOpen,
      };
    },
    changeHuliIsOpen (state) {
      const {huliISOpen} = state;
      return {
        ...state,
        huliISOpen: !huliISOpen,
      };
    },
    changePingguIsOpen (state) {
      const {pingguIsOpen} = state;
      return {
        ...state,
        pingguIsOpen: !pingguIsOpen,
      };
    },
    changeTijianIsOpen (state) {
      const {tijianIsOpen} = state;
      return {
        ...state,
        tijianIsOpen: !tijianIsOpen,
      };
    },
    changeJiankangIsOpen (state) {
      const {jiankangIsOpen} = state;
      return {
        ...state,
        jiankangIsOpen: !jiankangIsOpen,
      };
    },
    updataYuyueData (state, {payload}) {
      return {
        ...state,
        yuyueData: payload,
      };
    },
    updataLb (state, {payload}) {
      const {
        ruzhujiangkangjilu,
        yuyue,
        yuding,
        shenqing,
        hulijilu,
        ruzhupinggu,
        tijianbaogao,
        shebei,
      } = payload;
      return {
        ...state,
        ruzhujiangkangjilu,
        yuyue,
        yuding,
        shenqing,
        huliJilu: hulijilu,
        ruzhupinggu,
        tijianbaogao,
        shebei,
      };
    },
    uptataXmlDetail(state, {payload}) {
      return {
        ...state,
        xmlDetail: payload,
      };
    },
    uptataTijianData(state, {payload}) {
      return {
        ...state,
        tijianData: payload,
      };
    },
    uptataRuzhuXxData(state, {payload}) {
      return {
        ...state,
        ruzhuXxData: payload,
      };
    },
    uptataYuyueData(state, {payload}) {
      return {
        ...state,
        yuyueData: payload,
      };
    },
    changeCurrentYuyueIndex(state, {payload}) {
      return {
        ...state,
        currentYuyueIndex: payload,
      };
    },
    uptataYudingeData(state, {payload}) {
      return {
        ...state,
        yudingData: payload,
      };
    },
    changeCurrentYudingIndex(state, {payload}) {
      return {
        ...state,
        currentYudingIndex: payload,
      };
    },
    uptataShenqingData(state, {payload}) {
      return {
        ...state,
        shenqingData: payload,
      };
    },
    changeCurrentRuyuanIndex(state, {payload}) {
      return {
        ...state,
        currentRuyuanIndex: payload,
      };
    },
    updataHuliJiluData(state, {payload}) {
      return {
        ...state,
        huliJiluData: payload,
      };
    },
    changeCurrentHuliIndex(state, {payload}) {
      return {
        ...state,
        currentHuliIndex: payload,
      };
    },
    changeCurrentTijianIndex(state, {payload}) {
      return {
        ...state,
        currentTijianIndex: payload,
      };
    },
    updataXmlData (state, {payload}) {
      let data = getCap(payload);
      return {
        ...state,
        xmlData: data,
      };
    },
    updataTijianXml(state, {payload}) {
      let data = getCap(payload);
      return {
        ...state,
        tijianXml: data,
      };
    },
    updajiankangXml(state, {payload}) {
      let data = getCap(payload);
      return {
        ...state,
        jiankangXml: data,
      };
    },
    changeCurrentNavIndex(state, {payload}) {
      return {
        ...state,
        currentNavIndex: payload,
      };
    },
    initState (state) {
      return {
        ...state,
        yuyueIsOpen: true,
        yudingIsOpen: true,
        ruzhuIsOpen: true,
        huliISOpen: false,
        pingguIsOpen: false,
        tijianIsOpen: false,
        jiankangIsOpen: false,
        ruzhujiangkangjilu: [],
        yuyue: [],
        yuding: [],
        shenqing: [],
        huliJilu: [],
        ruzhupinggu: [],
        tijianbaogao: [],
        ruzhuXxData: null,
        yuyueData: null,
        yudingData: null,
        shenqingData: null,
        huliJiluData: null,
        xmlDetail: null,
        tijianData: null,
        currentHuliIndex: 0,
        currentRuyuanIndex: 0,
        currentTijianIndex: 0,
        currentYudingIndex: 0,
        currentYuyueIndex: 0,
        xmlData: null,
        tijianXml: null,
        jiankangXml: null,
        currentNavIndex: 0,
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
    updateRuzhuData(state, {payload}) {
      return {
        ...state,
        ruzhuData: payload,
      };
    },
    updateScrollTop(state, {payload}) {
      return {
        ...state,
        scrollTop: payload,
      };
    },
    updateCollapsed(state, {payload}) {
      window.sessionStorage.setItem(`${prefix}danganSiderFold`, payload ? 'true' : 'false');
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
});
