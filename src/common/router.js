import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/app')),
    },
    '/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/login')),
    },
    '/home': {
      component: dynamicWrapper(app, ['app'], () => import('../routes/home')),
    },
    '/yuyue/list': {
      component: dynamicWrapper(app, ['yuyue'], () => import('../routes/yuyue')),
    },
    '/yuyue/add': {
      component: dynamicWrapper(app, ['yuyue'], () => import('../routes/yuyue/add')),
    },
    '/yuyue/edit': {
      component: dynamicWrapper(app, ['yuyue'], () => import('../routes/yuyue/edit')),
    },
    '/yuding/list': {
      component: dynamicWrapper(app, ['yuding'], () => import('../routes/yuding')),
    },
    '/yuding/add': {
      component: dynamicWrapper(app, ['yuding'], () => import('../routes/yuding/add')),
    },
    '/yuding/edit': {
      component: dynamicWrapper(app, ['yuding'], () => import('../routes/yuding/edit')),
    },
    '/ruzhu/list': {
      component: dynamicWrapper(app, ['ruyuan'], () => import('../routes/ruzhu')),
    },
    '/ruzhu/add': {
      component: dynamicWrapper(app, ['ruyuan'], () => import('../routes/ruzhu/add')),
    },
    '/ruzhu/edit': {
      component: dynamicWrapper(app, ['ruyuan'], () => import('../routes/ruzhu/edit')),
    },
    '/ruzhu/pinggu': {
      component: dynamicWrapper(app, ['ruyuan'], () => import('../routes/ruzhu/pinggu')),
    },
    '/ruzhu/tijian': {
      component: dynamicWrapper(app, ['ruyuan'], () => import('../routes/ruzhu/tijian')),
    },
    '/ruzhu/jiankang': {
      component: dynamicWrapper(app, ['ruyuan'], () => import('../routes/ruzhu/jiankang')),
    },
    '/ruzhu/banli': {
      component: dynamicWrapper(app, ['ruyuan'], () => import('../routes/ruzhu/banli')),
    },
    '/ruzhu/shebei': {
      component: dynamicWrapper(app, ['ruyuan'], () => import('../routes/ruzhu/shebei')),
    },
    '/ruzhu/shebeiBangd': {
      component: dynamicWrapper(app, ['ruyuan'], () => import('../routes/ruzhu/shebeiBangd')),
    },
    '/huli/list': {
      component: dynamicWrapper(app, ['huli'], () => import('../routes/huli')),
    },
    '/huli/record': {
      component: dynamicWrapper(app, ['huli'], () => import('../routes/huli/record')),
    },
    '/dangan/list': {
      component: dynamicWrapper(app, ['dangan'], () => import('../routes/dangan')),
    },
    '/dangan/detail': {
      component: dynamicWrapper(app, ['dangan'], () => import('../routes/dangan/detail')),
    },
    '/profile/mima': {
      component: dynamicWrapper(app, [], () => import('../routes/profile/mima')),
    },
    '/yuangong/list': {
      component: dynamicWrapper(app, ['yuangong'], () => import('../routes/yuangong')),
    },
    '/role/list': {
      component: dynamicWrapper(app, ['role'], () => import('../routes/role')),
    },
    '/priv/list': {
      component: dynamicWrapper(app, ['priv'], () => import('../routes/priv')),
    },
    '/chuangwei/list': {
      component: dynamicWrapper(app, ['chuangwei'], () => import('../routes/chuangwei')),
    },
    '/huodongjilu/list': {
      component: dynamicWrapper(app, ['huodongjilu'], () => import('../routes/huodongjilu')),
    },
    '/huodongjilu/add': {
      component: dynamicWrapper(app, ['huodongjilu'], () => import('../routes/huodongjilu/add')),
    },
    '/huodongjilu/edit': {
      component: dynamicWrapper(app, ['huodongjilu'], () => import('../routes/huodongjilu/edit')),
    },
    '/huodongjihua/list': {
      component: dynamicWrapper(app, ['huodongjihua'], () => import('../routes/huodongjihua')),
    },
    '/monitor/list': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/monitor')),
    },
    '/monitor/detail': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/monitor/detail')),
    },
    '/statistics': {
      component: dynamicWrapper(app, ['statistics'], () => import('../routes/statistics')),
    },
    '*': {
      component: dynamicWrapper(app, [], () => import('../routes/error')),
    },
  };

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name,
    };
    routerData[path] = router;
  });
  return routerData;
};
