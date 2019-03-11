import modelExtend from 'dva-model-extend';
import {
  query,
  getChuang,
  getChuangdian,
  getDuotizheng,
  getMonitorDetail,
  getShishiZnc,
  getShumianZnc,
  getZailichuangZnc,
  getLishiZnc,
  getShishiZncd,
  getShumianZncd,
  getZailichuangZncd,
  getLishiZncd,
  getZuijinDtz,
  getLishibiaodanDtz,
  getLishitubiaoDtz,
  getSuoyinDetail,
  getChuangBaobiao,
  getChuangdianBaobiao,
  getduotizhengBaobiao,
  alllouhao,
  alllouceng,
  getChuangState,
  getChuangdianState,
  getDuotizhengState,
} from 'services/monitor';
import moment from 'moment';
import { getBeforeDay } from 'utils';
import queryString from 'query-string';
import { pageSizeModel } from './common';

const conversionTime = (time) => {
  let h = Number(time.split(':')[0]);
  let m = Number(time.split(':')[1]);
  let total = (h * 60 * 60) + (m * 60);
  return total;
};

const alculationPercent = (time1, time2, count) => {
  return conversionTime(count) / (conversionTime(time1) + conversionTime(time2));
};

const unique = (array) => {
  let obj = {};
  array.sort((a, b) => {
    return a.name - b.name;
  }).forEach((item, index) => {
    obj[array[index].name] = array[index];
  });
  return Object.keys(obj).map((item) => {
    return {
      ...obj[item],
    };
  });
};

const setBedStatus = (state) => {
  switch (state) {
    case 0:
      return 1;
    case 1:
      return 2;
    default:
      return 0;
  }
};

export default modelExtend(pageSizeModel, {
  namespace: 'monitor',
  state: {
    cunrrTabIndex: 0,
    detaiTabIndex: 1,
    cuurrNavIndex: 1,
    jigouList: [],
    detailData: null,
    shishiZnc: {
      shijian: undefined,
      hrList: [],
      rrList: [],
      mvList: [],
    },
    sleepZnc: {
      avgHrList: [],
      avgRRList: [],
      sleepQualityList: [],
      sleepList: [],
    },
    offbedZnc: [],
    zuijinDtz: [],
    lishibiaodanDtz: {
      list: [],
      next: null,
      prev: null,
    },
    lishitubiaoDtz: {
      weightList: [],
      tempList: [],
      bgList: [],
      spo2List: [],
      hrList: [],
      bpList: [],
    },
    louhaoList: [],
    loucengList: [],
    prev: [],
    hoverState: false,
    chuangData: null,
    chuangdianData: null,
    duotizhengData: null,
    menuSelect: '0-0-0-0-0',
    zuijin: null,
    expandedKeys: [],
    lishitubiaoValue: {},
    scrollTop: 0,
    state: {
      total: 0,
      nosignal: 0,
      offbed: 0,
      onbed: 0,
    },
    cyc: {
      deviceTotal: 0,
      latest7Days: 0,
      personTimeTotal: 0,
      today: 0,
      yesterday: 0,
    },
    showDetail: false,
  },
  reducers: {
    initState(state) {
      return {
        ...state,
        shishiZnc: {
          shijian: undefined,
          hrList: [],
          rrList: [],
          mvList: [],
        },
        sleepZnc: {
          avgHrList: [],
          avgRRList: [],
          sleepQualityList: [],
          sleepList: [],
        },
        offbedZnc: [],
        zuijinDtz: [],
        lishibiaodanDtz: {
          list: [],
          next: null,
          prev: null,
        },
        lishitubiaoDtz: {
          weightList: [],
          tempList: [],
          bgList: [],
          spo2List: [],
          hrList: [],
          bpList: [],
        },
      };
    },
    changeCunrrTabIndex(state, { payload }) {
      return {
        ...state,
        cunrrTabIndex: payload,
      };
    },
    changeDetaiTabIndex(state, { payload }) {
      return {
        ...state,
        detaiTabIndex: payload,
        cuurrNavIndex: 1,
      };
    },
    changeCuurrNavIndex(state, { payload }) {
      return {
        ...state,
        cuurrNavIndex: payload,
      };
    },
    updateDetailData(state, { payload }) {
      return {
        ...state,
        detailData: payload,
      };
    },
    updateShishiZnc(state, { payload }) {
      return {
        ...state,
        shishiZnc: {
          ...payload,
        },
      };
    },
    updateSleepZnc(state, { payload }) {
      return {
        ...state,
        sleepZnc: {
          ...payload,
        },
      };
    },
    updateOffbedZnc(state, { payload }) {
      const { offbedZnc, zuijin } = payload;
      return {
        ...state,
        offbedZnc,
        zuijin,
      };
    },
    updateLouhaoList(state, { payload }) {
      return {
        ...state,
        louhaoList: payload,
      };
    },
    updateLoucengList(state, { payload }) {
      return {
        ...state,
        loucengList: payload,
      };
    },
    updatePrev(state, { payload }) {
      return {
        ...state,
        prev: payload,
      };
    },
    updateZuijinDtz(state, { payload }) {
      return {
        ...state,
        zuijinDtz: payload,
      };
    },
    updateLishibiaodanDtz(state, { payload }) {
      return {
        ...state,
        lishibiaodanDtz: {
          ...payload,
        },
      };
    },
    updateLishitubiaoDtz(state, { payload }) {
      return {
        ...state,
        lishitubiaoDtz: {
          ...payload,
        },
        zuijin: payload.zuijin,
      };
    },
    changeLishitubiaoValue(state, { payload }) {
      return {
        ...state,
        lishitubiaoValue: {
          ...payload,
        },
      };
    },
    updateChuangData(state, { payload }) {
      const { chuangData, hoverState } = payload;
      return {
        ...state,
        chuangData,
        hoverState,
      };
    },
    updateChuangdianData(state, { payload }) {
      const { chuangdianData, hoverState } = payload;
      return {
        ...state,
        chuangdianData,
        hoverState,
      };
    },
    updateDuotizhengData(state, { payload }) {
      const { duotizhengData, hoverState } = payload;
      return {
        ...state,
        duotizhengData,
        hoverState,
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        state: payload,
      };
    },
    updateCyc(state, { payload }) {
      return {
        ...state,
        cyc: payload,
      };
    },
    changeHoverState(state, { payload }) {
      return {
        ...state,
        hoverState: payload,
      };
    },
    changeMenuSelect(state, { payload }) {
      return {
        ...state,
        menuSelect: payload,
      };
    },
    changeExpandedKeys(state, { payload }) {
      return {
        ...state,
        expandedKeys: payload,
      };
    },
    updateScrollTop(state, {payload}) {
      return {
        ...state,
        scrollTop: payload || 0,
      };
    },
    changeShowDetail(state, {payload}) {
      return {
        ...state,
        showDetail: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        let params = queryString.parse(search);
        if (pathname === '/monitor/list') {
          const { cunrrTabIndex } = params;
          dispatch({
            type: 'changeCunrrTabIndex',
            payload: cunrrTabIndex ? Number(cunrrTabIndex) : 0,
          });
          dispatch({
            type: 'alllouhao',
          });
          if (params.louhao) {
            dispatch({
              type: 'alllouceng',
              payload: {
                louhao: params.louhao,
              },
            });
          } else {
            dispatch({
              type: 'updateLoucengList',
              payload: [],
            });
          }
        } else if (pathname === '/monitor/detail') {
          dispatch({
            type: 'changeShowDetail',
            payload: false,
          });
          dispatch({
            type: 'changeDetaiTabIndex',
            payload: Number(params.detaiTabIndex),
          });
          dispatch({
            type: 'getSuoyinDetail',
            payload: {
              id: Number(params.id),
              jigou: Number(params.jigou),
            },
          });
          if (Number(params.detaiTabIndex) === 3) {
            dispatch({
              type: 'getZuijinDtz',
              payload: {
                id: Number(params.id),
                jigou: Number(params.jigou),
              },
            });
          }
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
      param.leixing = payload.leixing ? Number(payload.leixing) : -1;
      param.kaishiSj = payload.kaishiSj
        ? payload.kaishiSj
        : moment(getBeforeDay()).format('YYYYMMDD');
      param.jieshuSj = payload.jieshuSj
        ? payload.jieshuSj
        : moment().format('YYYYMMDD');
      if (payload.louhao) {
        param.louhao = payload.louhao;
      }
      if (payload.louceng) {
        param.louceng = payload.louceng;
      }
      if (payload.leixing) {
        param.leixing = Number(payload.leixing);
      }
      if (payload.keyword) {
        param.keyword = payload.keyword;
      }
      const res = yield call(query, param);
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

    *getChuang({ payload = {} }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {
        ...payload,
      };
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 12;
      // if (payload.id) {
      //   param.jigou = Number(payload.id);
      // }
      const res = yield call(getChuang, param);
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

    *getChuangdian({ payload = {} }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {
        ...payload,
      };
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 12;
      // if (payload.id) {
      //   param.jigou = Number(payload.id);
      // }
      const res = yield call(getChuangdian, param);
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

    *getDuotizheng({ payload = {} }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let param = {
        ...payload,
      };
      param.zhuangtai = payload.zhuangtai ? Number(payload.zhuangtai) : -1;
      param.pageNum = payload.page ? Number(payload.page) : 1;
      param.pageSize = payload.pageSize ? Number(payload.pageSize) : 12;
      // if (payload.id) {
      //   param.jigou = Number(payload.id);
      // }
      const res = yield call(getDuotizheng, param);
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

    *alllouhao({ payload = {} }, { call, put }) {
      // yield put({ type: 'app/loading', payload: true });
      let param = { ...payload };
      param.zhuangtai = payload.zhuangtai ? payload.zhuangtai : -1;
      const res = yield call(alllouhao, param);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateLouhaoList',
          payload: result,
        });
      }
    },

    *alllouceng({ payload = {} }, { call, put }) {
      // yield put({ type: 'app/loading', payload: true });
      let param = { ...payload };
      param.zhuangtai = payload.zhuangtai ? payload.zhuangtai : -1;
      const res = yield call(alllouceng, param);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateLoucengList',
          payload: result,
        });
      }
    },

    *getMonitorDetail({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getMonitorDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateDetailData',
          payload: result,
        });
      }
    },

    *getShishiZnc({ payload, callback }, { call, put, select }) {
      // yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShishiZnc, payload);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const { shishiZnc } = yield select(_ => _.monitor);
        let { hrList, rrList, mvList } = shishiZnc;
        let shijian = payload.kaishiSj;
        let hrs = hrList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });
        let rrs = rrList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });
        let mvs = mvList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });

        result.forEach((item) => {
          hrs.push({ name: item.shijian, number: item.hr });
          rrs.push({ name: item.shijian, number: item.rr });
          mvs.push({ name: item.shijian, number: item.mv });
        });

        hrs = unique(hrs);
        rrs = unique(rrs);
        mvs = unique(mvs);

        const preMinutes = 3 * (60 * 1000);
        for (let i = 0; i < hrs.length; i += 1) {
          if (hrs[i].name < hrs[hrs.length - 1].name - preMinutes) {
            hrs.shift();
            rrs.shift();
            mvs.shift();
          } else {
            break;
          }
        }

        shijian = hrs.length > 0 ? hrs[hrs.length - 1].name : shijian;
        yield put({
          type: 'updateShishiZnc',
          payload: {
            shijian,
            hrList: hrs,
            rrList: rrs,
            mvList: mvs,
          },
        });
        if (callback) {
          callback({
            shijian,
          });
        }
      }
    },

    *getShumianZnc({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShumianZnc, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        if (result) {
          const {
            avgHr, avgRr, deepSleep, lightSleep, sleepStatus,
          } = result;
          let avgHrList = [
            { item: '心率', count: avgHr < 100 ? avgHr : 100 },
            { item: '心率2', count: avgHr < 100 ? 100 - avgHr : 0 },
          ];
          let avgRRList = [
            { item: '呼吸', count: avgRr < 100 ? avgRr : 100 },
            { item: '呼吸2', count: avgRr < 100 ? 100 - avgRr : 0 },
          ];
          let sleepQualityList = [
            { item: '睡眠质量', count: sleepStatus < 100 ? sleepStatus : 100 },
            {
              item: '睡眠质量2',
              count: sleepStatus < 100 ? 100 - sleepStatus : 0,
            },
          ];
          let sleepList = [
            { item: '深度睡眠', count: alculationPercent(deepSleep, lightSleep, deepSleep) * 100 },
            { item: '浅度睡眠', count: alculationPercent(deepSleep, lightSleep, lightSleep) * 100 },
          ];
          yield put({
            type: 'updateSleepZnc',
            payload: {
              avgHrList,
              avgRRList,
              sleepQualityList,
              sleepList,
            },
          });
        } else {
          yield put({
            type: 'updateSleepZnc',
            payload: {
              avgHrList: [],
              avgRRList: [],
              sleepQualityList: [],
              sleepList: [],
            },
          });
        }
      } else {
        yield put({
          type: 'updateSleepZnc',
          payload: {
            avgHrList: [],
            avgRRList: [],
            sleepQualityList: [],
            sleepList: [],
          },
        });
      }
    },

    *getZailichuangZnc({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZailichuangZnc, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        let offbedZnc = result.map((item) => {
          return {
            name: moment(item.shijian).format('YYYY-MM-DD HH:mm:ss'),
            number: setBedStatus(item.bedStatus),
          };
        });
        yield put({
          type: 'updateOffbedZnc',
          payload: {
            offbedZnc,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getLishiZnc({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getLishiZnc, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const { yuanshi, zailichuang } = result;
        let hrList = [];
        let rrList = [];
        let mvList = [];
        yuanshi.forEach((item) => {
          hrList.push({ name: item.shijian, number: item.hr });
          rrList.push({ name: item.shijian, number: item.rr });
          mvList.push({ name: item.shijian, number: item.mv });
        });
        let offbedZnc = zailichuang.map((item) => {
          return {
            name: item.shijian,
            number: setBedStatus(item.bedStatus),
          };
        });
        yield put({
          type: 'updateShishiZnc',
          payload: {
            shijian: undefined,
            hrList,
            rrList,
            mvList,
          },
        });
        yield put({
          type: 'updateOffbedZnc',
          payload: {
            offbedZnc,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getShishiZncd({ payload, callback }, { call, put, select }) {
      // yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShishiZncd, payload);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const { shishiZnc } = yield select(_ => _.monitor);
        let { hrList, rrList, mvList } = shishiZnc;
        let shijian = payload.kaishiSj;
        let hrs = hrList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });
        let rrs = rrList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });
        let mvs = mvList.map((item) => {
          return {
            name: item.name,
            number: item.number,
          };
        });

        result.forEach((item) => {
          hrs.push({ name: item.shijian, number: item.hr });
          rrs.push({ name: item.shijian, number: item.rr });
          mvs.push({ name: item.shijian, number: item.mv });
        });

        hrs = unique(hrs);
        rrs = unique(rrs);
        mvs = unique(mvs);

        const preMinutes = 3 * (60 * 1000);
        for (let i = 0; i < hrs.length; i += 1) {
          if (hrs[i].name < hrs[hrs.length - 1].name - preMinutes) {
            hrs.shift();
            rrs.shift();
            mvs.shift();
          } else {
            break;
          }
        }

        shijian = hrs.length > 0 ? hrs[hrs.length - 1].name : shijian;
        yield put({
          type: 'updateShishiZnc',
          payload: {
            shijian,
            hrList: hrs,
            rrList: rrs,
            mvList: mvs,
          },
        });
        if (callback) {
          callback({
            shijian,
          });
        }
      }
    },

    *getShumianZncd({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getShumianZncd, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        if (result) {
          const {
            avgHr, avgRr, deepSleep, lightSleep, sleepStatus,
          } = result;
          let avgHrList = [
            { item: '心率', count: avgHr < 100 ? avgHr : 100 },
            { item: '心率2', count: avgHr < 100 ? 100 - avgHr : 0 },
          ];
          let avgRRList = [
            { item: '呼吸', count: avgRr < 100 ? avgRr : 100 },
            { item: '呼吸2', count: avgRr < 100 ? 100 - avgRr : 0 },
          ];
          let sleepQualityList = [
            { item: '睡眠质量', count: sleepStatus < 100 ? sleepStatus : 100 },
            {
              item: '睡眠质量2',
              count: sleepStatus < 100 ? 100 - sleepStatus : 0,
            },
          ];
          let sleepList = [
            { item: '深度睡眠', count: alculationPercent(deepSleep, lightSleep, deepSleep) * 100 },
            { item: '浅度睡眠', count: alculationPercent(deepSleep, lightSleep, lightSleep) * 100 },
          ];
          yield put({
            type: 'updateSleepZnc',
            payload: {
              avgHrList,
              avgRRList,
              sleepQualityList,
              sleepList,
            },
          });
        } else {
          yield put({
            type: 'updateSleepZnc',
            payload: {
              avgHrList: [],
              avgRRList: [],
              sleepQualityList: [],
              sleepList: [],
            },
          });
        }
      } else {
        yield put({
          type: 'updateSleepZnc',
          payload: {
            avgHrList: [],
            avgRRList: [],
            sleepQualityList: [],
            sleepList: [],
          },
        });
      }
    },

    *getZailichuangZncd({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZailichuangZncd, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        let offbedZnc = result.map((item) => {
          return {
            name: moment(item.shijian).format('YYYY-MM-DD HH:mm:ss'),
            number: setBedStatus(item.bedStatus),
          };
        });
        yield put({
          type: 'updateOffbedZnc',
          payload: {
            offbedZnc,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getLishiZncd({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getLishiZncd, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const { yuanshi, zailichuang } = result;
        let hrList = [];
        let rrList = [];
        let mvList = [];
        yuanshi.forEach((item) => {
          hrList.push({ name: item.shijian, number: item.hr });
          rrList.push({ name: item.shijian, number: item.rr });
          mvList.push({ name: item.shijian, number: item.mv });
        });
        let offbedZnc = zailichuang.map((item) => {
          return {
            name: item.shijian,
            number: setBedStatus(item.bedStatus),
          };
        });
        yield put({
          type: 'updateShishiZnc',
          payload: {
            shijian: undefined,
            hrList,
            rrList,
            mvList,
          },
        });
        yield put({
          type: 'updateOffbedZnc',
          payload: {
            offbedZnc,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getZuijinDtz({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getZuijinDtz, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateZuijinDtz',
          payload: result,
        });
      }
    },

    *getLishibiaodanDtz({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getLishibiaodanDtz, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result: { list, next } } = res;
        yield put({
          type: 'updateLishibiaodanDtz',
          payload: {
            list,
            next,
          },
        });
      }
    },

    *getLishitubiaoDtz({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getLishitubiaoDtz, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        const {
          weight, bg, temp, spo2, bp, hr,
        } = result;
        // 体重
        let weightList = weight.map((item) => {
          return {
            name: item.shijian,
            number: item.weight,
          };
        });
        // 体温
        let tempList = temp.map((item) => {
          return {
            name: item.shijian,
            number: item.temp,
          };
        });
        // 血糖
        let bgList = bg.map((item) => {
          return {
            name: item.shijian,
            number: item.bg,
          };
        });
        // 血氧
        let spo2List = spo2.map((item) => {
          return {
            name: item.shijian,
            number: item.spo2,
          };
        });
        // 心率
        let hrList = hr.map((item) => {
          return {
            name: item.shijian,
            number: item.hr,
          };
        });
        // 血氧
        let bpList = bp.map((item) => {
          return {
            x: item.shijian,
            y1: item.dbp,
            y2: item.sbp,
          };
        });

        yield put({
          type: 'updateLishitubiaoDtz',
          payload: {
            weightList,
            tempList,
            bgList,
            spo2List,
            hrList,
            bpList,
            zuijin: payload.zuijin,
          },
        });
      }
    },

    *getSuoyinDetail({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      const res = yield call(getSuoyinDetail, payload);
      yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateDetailData',
          payload: result,
        });
      }
    },

    *getChuangBaobiao({ payload }, { call, put }) {
      // yield put({ type: 'app/loading', payload: true });
      const res = yield call(getChuangBaobiao, payload);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateChuangData',
          payload: {
            chuangData: result,
            hoverState: true,
          },
        });
      }
    },

    *getChuangdianBaobiao({ payload }, { call, put }) {
      // yield put({ type: 'app/loading', payload: true });
      const res = yield call(getChuangdianBaobiao, payload);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateChuangdianData',
          payload: {
            chuangdianData: result,
            hoverState: true,
          },
        });
      }
    },

    *getduotizhengBaobiao({ payload }, { call, put }) {
      // yield put({ type: 'app/loading', payload: true });
      const res = yield call(getduotizhengBaobiao, payload);
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateDuotizhengData',
          payload: {
            duotizhengData: result,
            hoverState: true,
          },
        });
      }
    },
    *getState({ payload }, { call, put }) {
      // yield put({ type: 'app/loading', payload: true });
      const { cunrrTabIndex, jigou } = payload;
      let res;
      switch (cunrrTabIndex) {
        case 0:
          res = yield call(getChuangState, { jigou });
          break;
        case 1:
          res = yield call(getChuangdianState, { jigou });
          break;
        default:
          break;
      }
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateState',
          payload: {
            ...result,
          },
        });
      }
    },
    *getCyc({ payload }, { call, put }) {
      // yield put({ type: 'app/loading', payload: true });
      const { jigou } = payload;
      const res = yield call(getDuotizhengState, { jigou });
      // yield put({ type: 'app/loading', payload: false });
      if (res.success) {
        const { result } = res;
        yield put({
          type: 'updateCyc',
          payload: {
            ...result,
          },
        });
      }
    },
  },
});
