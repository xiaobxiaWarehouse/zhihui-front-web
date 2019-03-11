import { routerRedux } from 'dva/router';
import { config } from 'utils';
import { login } from 'services/login';

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
    forgetPasswordVisible: false,
  },
  reducers: {
    loginLoading(state, { payload: loginLoading }) {
      return {
        ...state,
        loginLoading,
      };
    },
    showForgetPasswordModal(state) {
      return {
        ...state,
        forgetPasswordVisible: true,
      };
    },

    hideForgetPasswordModal(state) {
      return {
        ...state,
        forgetPasswordVisible: false,
      };
    },
    setAccountId(state, { payload: accountId }) {
      return {
        ...state,
        accountId,
      };
    },
    setRoleId(state, { payload: roleId }) {
      return {
        ...state,
        roleId,
      };
    },
  },
  effects: {
    *login({ payload }, { put, call, select }) {
      yield put({ type: 'loginLoading', payload: true });
      const res = yield call(login, payload);
      yield put({ type: 'loginLoading', payload: false });
      const { locationQuery } = yield select(_ => _.app);
      if (res.success) {
        const { from } = locationQuery;
        let { result } = res;
        const { locationPathname } = yield select(_ => _.app);
        if (result.login) {
          const { profile } = result;
          window.localStorage.setItem('shouji', profile.shouji);
          if (from && from !== '/' && from !== '/login') {
            yield put(routerRedux.push(from));
          } else if (
            config.openPages &&
            config.openPages.indexOf(locationPathname) !== -1
          ) {
            yield put(routerRedux.push('/home'));
          }
        } else if (
          config.openPages &&
          config.openPages.indexOf(locationPathname) < 0
        ) {
          yield put({ type: 'toLogin' });
        }
      } else {
        yield put({ type: 'loginLoading', payload: false });
      }
    },
  },
};
