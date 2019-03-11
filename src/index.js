import '@babel/polyfill';
import 'console-polyfill';
// import 'babel-polyfill';
import dva from 'dva';
import {message} from 'antd';
import createLoading from 'dva-loading';
import intl from 'react-intl-universal';
import {config, hashPath, AppError} from 'utils';
import createHistory from 'history/createHashHistory';
// import App from './models/app';
// import Upload from './models/upload';
// import router from './router';

message.config({
  maxCount: 1,
});

// 1. Initialize
const app = dva({
  // 使用hash
  history: createHistory(),
  onError (error, dispatch) {
    // console.log(error);
    let pathHash = window.location.hash;
    let pathname = hashPath(pathHash);
    // console.log('in app error', error);
    dispatch({type: 'app/loading', payload: false});
    dispatch({type: 'login/loginLoading', payload: false});
    dispatch({type: 'chuangwei/loading', payload: false});
    dispatch({type: 'role/loading', payload: false});
    dispatch({type: 'yuangong/loading', payload: false});
    if (error instanceof Error) {
      // 4006:用户未登录
      // 4007:用户已禁用
      // 4008:用户已删除
      // 4013:用户Session过期
      // 4021:用户重置密码
      if (error.code === '4006' || error.code === '4008' || error.code === '4013') {
        if (pathname && config.openPages && config.openPages.indexOf(pathname) < 0) {
          message.error(error.message);
          dispatch({
            type: 'app/toLogin',
          });
        }
      } else if (error.code === '4007' || error.code === '4021') {
        message.error(error.message);
        if (pathname && config.openPages && config.openPages.indexOf(pathname) < 0) {
          dispatch({
            type: 'app/toLogin',
          });
        }
      } else if (error.message === 'Network Error') {
        message.error('网络异常或服务器无法连接');
      } else {
        message.error(error.message);
      }
    } else if (error.message === 'Network Error') {
      message.error('网络异常或服务器无法连接');
    } else {
      message.error(error.message);
    }
    error.preventDefault();
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(App);
// app.model(Upload);
app.model(require('./models/app').default);
app.model(require('./models/upload').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
