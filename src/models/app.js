/* global window */
/* global document */
/* global location */
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import {parse} from 'qs';
import {addLocaleData} from 'react-intl';
import intl from 'react-intl-universal';
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import enUS from 'antd/lib/locale-provider/en_US';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import appLocaleDataEn from 'react-intl/locale-data/en';
import appLocaleDataZh from 'react-intl/locale-data/zh';
import lodash from 'lodash';
import {config, filterMenu, mapper} from 'utils';
import { getConfig } from 'services/login';
import {logout, checkLogin, updatePassword} from 'services/app';
import {query as getShujuzidian} from 'services/shujuzidian';
import enMessages from '../../locales/en.json';
import zhMessages from '../../locales/zh.json';

const { menus } = mapper;
const { menus: menuList } = menus;
function setLanguage(language) {
  let appLocale = null;
  switch (language) {
    case 'chinese': {
      appLocale = {
        messages: {
          ...zhMessages,
        },
        antd: zhCN,
        lang: 'chinese',
        locale: 'zh-Hans-CN',
        data: appLocaleDataZh,
      };
      addLocaleData(appLocale.data);
      break;
    }
    case 'english': {
      appLocale = {
        messages: {
          ...enMessages,
        },
        antd: enUS,
        lang: 'english',
        locale: 'en-US',
        data: appLocaleDataEn,
      };
      addLocaleData(appLocale.data);
      break;
    }
    default: {
      appLocale = {
        messages: {
          ...zhMessages,
        },
        antd: zhCN,
        lang: 'chinese',
        locale: 'zh-Hans-CN',
        data: appLocaleDataZh,
      };
      addLocaleData(appLocale.data);
      break;
    }
  }

  const currentLocale = appLocale.locale;
  const {lang} = appLocale;
  intl.init({
    currentLocale,
    lang,
    locales: {
      [currentLocale]: appLocale.messages,
    },
  });
  intl.options.title = intl.get(`Language.lang.${lodash.capitalize(lang)}`);

  return appLocale;
}

const {prefix, jgRegExp} = config;

// models层负责维护state， 在router.js中注册
export default {
  namespace: 'app',
  // state
  state: {
    backtype: null,
    modalVisible: false,
    appLocale: setLanguage('chinese'),
    user: {},
    loading: false,
    menu: [],
    permission: [],
    permissions: [],
    menuPopoverVisible: false,
    updatePasswordVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
    isOpenNav: false,
    isFormChange: false,
    queryParams: null,
    allHulidengji: [],
    allXingbie: [],
    modalViewVisible: false,
    jigouMc: '',
    isHomeBack: false,
  },
  // 订阅websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等
  // 然后根据需要 dispatch 相应的 action
  // {dispatch， history(订阅源)}
  subscriptions: {
    // 订阅了history的变化
    setupHistory ({dispatch, history}) {
      history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/login') {
          const { href } = window.location;
          const jigou = jgRegExp.exec(href);
          dispatch({
            type: 'getConfig',
            payload: {
              jigou: jigou && jigou.length > 1 && jigou[1],
            },
          });
        }
        dispatch({
          type: 'changeIsOpenNav',
          payload: false,
        });
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: pathname,
            locationQuery: query,
          },
        });
        dispatch({
          type: 'updataFormChange',
          payload: false,
        });
        if (pathname !== '/login') {
          dispatch({
            type: 'getAllXingbie',
            payload: false,
          });
          dispatch({
            type: 'getAllHulidengji',
            payload: false,
          });
        }
      });
    },
    // 作用和生命周期很像
    setup ({dispatch, history}) {
      history.listen(({pathname}) => {
        dispatch({type: 'checkLogin', payload: pathname});
      });
      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({
            type: 'changeNavbar',
          });
        }, 300);
      };
      dispatch({
        type: 'getAllHulidengji',
      });
      dispatch({
        type: 'getAllXingbie',
      });
    },
  },
  // 可以理解为有副作用的reducer
  // 以 key/value 格式定义 effect。用于处理异步操作和业务逻辑，不直接修改 state。
  // 由 action 触发，可以触发 action，可以和服务器交互，可以获取全局 state 的数据等等。
  // 格式为 *(action, effects) => void
  // put 用于触发 action，yield put({ type: 'todos/add', payload: 'Learn Dva' });
  // call 用于调用异步逻辑，支持 promise。 const result = yield call(fetch, '/todos');
  // call的第一个参数是service
  // select 用于从 state 里获取数据。const todos = yield select(state => state.todos);
  effects: {
    *checkLogin({ payload }, { call, put, select }) {
      // yield put({type: 'loading', payload: true});
      const params = {};
      const res = yield call(checkLogin, params);
      // yield put({type: 'loading', payload: false});
      const { locationPathname } = yield select(_ => _.app);
      if (res.success) {
        let { result } = res;
        const {
          profile, permissions: permission, jigou, viewJigou,
        } = result;
        // userMenus.push(logoutMenu);
        const menu = filterMenu(permission, menuList) || [];
        jigou.xiashuJg.unshift({ ...jigou });
        const { pathname } = window.location;
        let bianhao = jgRegExp.exec(pathname);
        if (bianhao && bianhao.length > 1 && bianhao[1] !== jigou.bianhao) {
          yield put({ type: 'logout' });
        }
        if (result.login && profile.zhuangtai === 1) {
          // 调用了异步请求
          yield put({
            // reducer名
            type: 'updateState',
            payload: {
              jigou,
              viewJigou,
              menu,
              user: {
                ...profile,
              },
              permission,
              permissions: permission ? permission.map(item => item.code) : [],
            },
          });
          if (
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
      }
    },

    * logout ({payload}, {call, put}) {
      yield put({type: 'loading', payload: true});
      const res = yield call(logout, parse(payload));
      yield put({type: 'loading', payload: false});
      if (res.success) {
        yield put(routerRedux.push({
          pathname: '/',
        }));
      }
    },

    * changeNavbar (action, {put, select}) {
      yield put({ type: 'loading', payload: true });
      const {isNavbar} = yield (select(_ => _.app));
      yield put({ type: 'loading', payload: false });
      const isNavbarDom = document.body.clientWidth < 769;
      if (isNavbarDom !== isNavbar) {
        yield put({
          type: 'handleNavbar',
          payload: isNavbarDom,
        });
      }
    },

    * toLogin (action, {put, select}) {
      // 对直接打开的页面不做登录跳转
      const {locationPathname} = yield select(_ => _.app);
      if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
        yield put(routerRedux.push({
          pathname: '/',
        }));
      }
    },

    * updatePassword({ payload: obj, callback }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(updatePassword, obj);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        if (callback) {
          callback(res);
        }
        // const resOut = yield call(logout);
        // if (resOut.success) {
        //   yield put(routerRedux.push('/'));
        // }
      }
    },

    * getAllHulidengji({payload, callback}, {call, put}) {
      // yield put({ type: 'loading', payload: true });
      const res = yield call(getShujuzidian, {...payload, leibie: 'hulidengji'});
      // yield put({ type: 'loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updataHulidengji', payload: result });
        if (callback) {
          callback(result);
        }
      }
    },

    * getAllXingbie({payload, callback}, {call, put}) {
      // yield put({ type: 'loading', payload: true });
      const res = yield call(getShujuzidian, {...payload, leibie: 'xingbie'});
      // yield put({ type: 'loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({ type: 'updataXingbie', payload: result });
        if (callback) {
          callback(result);
        }
      }
    },

    *getConfig({ payload }, { call, put }) {
      yield put({ type: 'loading', payload: true });
      const res = yield call(getConfig, payload);
      yield put({ type: 'loading', payload: false });
      if (res.success) {
        const {result} = res;
        yield put({
          type: 'updateJigouMc',
          payload: result.jigouMc,
        });
      }
    },
  },
  // 以 key/value 格式定义 reducer。用于处理同步操作，唯一可以修改 state 的地方。由 action 触发。
  // 格式(state, action) => newState
  // 在模块中dispatch({ type: 'app/switchSider' })触发
  reducers: {
    updateState (state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    loading (state, {payload: loading}) {
      return {
        ...state,
        loading,
      };
    },

    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },

    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },

    showUpdatePasswordModal (state) {
      return {
        ...state,
        updatePasswordVisible: true,
      };
    },

    hideUpdatePasswordModal (state) {
      return {
        ...state,
        updatePasswordVisible: false,
      };
    },

    handleNavbar (state, {payload}) {
      return {
        ...state,
        isNavbar: payload,
      };
    },

    changeIsOpenNav (state, {payload}) {
      return {
        ...state,
        isOpenNav: payload,
      };
    },
    changeModalVisible (state, {payload}) {
      const {modalVisible, type, queryParams} = payload;
      return {
        ...state,
        modalVisible,
        backtype: type,
        queryParams,
      };
    },
    updataFormChange(state, {payload}) {
      return {
        ...state,
        isFormChange: payload,
      };
    },
    updataHulidengji(state, {payload}) {
      return {
        ...state,
        allHulidengji: payload,
      };
    },
    updataXingbie(state, {payload}) {
      return {
        ...state,
        allXingbie: payload,
      };
    },
    showModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalViewVisible: true,
      };
    },
    hideModal(state) {
      return {
        ...state,
        modalViewVisible: false,
      };
    },
    updateJigouMc(state, {payload}) {
      return {
        ...state,
        jigouMc: payload,
      };
    },
    changeIsHomeBack(state, {payload}) {
      return {
        ...state,
        isHomeBack: payload,
      };
    },
  },
};
