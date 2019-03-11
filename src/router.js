import React from 'react';
import {routerRedux, Router, Switch, Route} from 'dva/router';
import {LocaleProvider} from 'antd';
import {addLocaleData, IntlProvider} from 'react-intl';
import lodash from 'lodash';
import intl from 'react-intl-universal';
import enUS from 'antd/lib/locale-provider/en_US';
import appLocaleDataZh from 'react-intl/locale-data/zh';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import appLocaleDataEn from 'react-intl/locale-data/en';
import enMessages from '../locales/en.json';
import zhMessages from '../locales/zh.json';
import { getRouterData } from './common/router';

const { ConnectedRouter } = routerRedux;


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


const appLocale = setLanguage('chinese');
// 基于router3的懒加载
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const LoginLayout = routerData['/login'].component;
  const BasicLayout = routerData['/'].component;

  return (
    <LocaleProvider locale={appLocale.antd}>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <ConnectedRouter history={history}>
          <Router history={history}>
            <Switch>
              <Route path="/login" component={LoginLayout} />
              <Route path="/" render={props => <BasicLayout {...props} />} />
            </Switch>
          </Router>
        </ConnectedRouter>
      </IntlProvider>
    </LocaleProvider>
  );
}

export default RouterConfig;
