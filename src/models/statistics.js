import moment from 'moment';
import { getWeekAgo } from 'utils';
import { getStatistics } from 'services/statistics';
import queryString from 'query-string';

export default {
  namespace: 'statistics',
  state: {
    kaishiDate: undefined,
    jieshuDate: undefined,
    statistics: {},
  },
  reducers: {
    updateTimeFrame(state, { payload }) {
      return {
        ...state,
        kaishiDate: payload.kaishiDate,
        jieshuDate: payload.jieshuDate,
      };
    },
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
    updateStatistics(state, { payload }) {
      return {
        ...state,
        statistics: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        const params = queryString.parse(search);
        let { kaishiDate, jieshuDate } = params;
        if (pathname === '/statistics') {
          if (kaishiDate === undefined || jieshuDate === undefined) {
            kaishiDate = moment(getWeekAgo());
            jieshuDate = moment();
          } else {
            kaishiDate = moment(Number(kaishiDate));
            jieshuDate = moment(Number(jieshuDate));
          }
          dispatch({
            type: 'updateTimeFrame',
            payload: {
              kaishiDate,
              jieshuDate,
            },
          });
          dispatch({
            type: 'getStatistics',
            payload: {
              kaishiDate,
              jieshuDate,
            },
          });
        }
      });
    },
  },
  effects: {
    *getStatistics({ payload }, { call, put }) {
      yield put({ type: 'app/loading', payload: true });
      let params;
      if (payload.kaishiDate && payload.jieshuDate) {
        params = {
          kaishiSj: payload.kaishiDate.format('YYYYMMDD'),
          jieshuSj: payload.jieshuDate.format('YYYYMMDD'),
        };
      }
      const res = yield call(getStatistics, params);
      yield put({ type: 'app/loading', payload: false });
      if (res && res.success) {
        const { result } = res;
        yield put({
          type: 'updateStatistics',
          payload: {
            ...result,
          },
        });
      }
    },
  },
};

