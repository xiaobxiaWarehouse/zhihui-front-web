/* global window */
import React from 'react';
import queryString from 'query-string';
import {connect} from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import intl from 'react-intl-universal';
import {Spin, LocaleProvider, Modal} from 'antd';
import {IntlProvider} from 'react-intl';
import {getRoutes, classnames, config} from 'utils';
import {Layout} from 'components';
import {Helmet} from 'react-helmet';
import '../themes/default.less';
import './app.less';
import Error from './error';

const CSS = Layout.styles;

const {
  openPages,
  withOutContentPages,
} = config;

let lastHref;

const getBashRedirect = (routerData) => {
  // According to the url parameter to redirect
  // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
  const urlParams = new URL(window.location.href);

  const redirect = urlParams.searchParams.get('redirect');
  // Remove the parameters in the url
  if (redirect) {
    urlParams.searchParams.delete('redirect');
    window.history.replaceState(null, 'redirect', urlParams.href);
  } else {
    // get the first authorized route path in routerData
    const authorizedPath = Object.keys(routerData).find(item => item && item !== '/');
    return authorizedPath;
  }
  return redirect;
};

const App = (props) => {
  const {
    // children,
    dispatch,
    history,
    app,
    location,
    routerData,
    match,
  } = props;
  const {
    siderFold,
    loading,
    isNavbar,
    modalVisible,
    backtype,
    queryParams,
  } = app;

  let {pathname} = location;

  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const { href } = window.location;

  if (lastHref !== href) {
    if (!loading) {
      lastHref = href;
    }
  }

  const bashRedirect = getBashRedirect(routerData);

  const modalProps = {
    width: 397,
    visible: modalVisible,
    maskClosable: false,
    title: '温馨提示',
    wrapClassName: 'vertical-center-modal',
    onOk () {
      dispatch({
        type: 'app/changeModalVisible',
        payload: {
          modalVisible: false,
          type: null,
          queryParams: null,
        },
      });
      if (backtype === 1) {
        history.goBack();
      } else {
        dispatch(routerRedux.push({
          pathname: backtype,
          search: queryString.stringify(queryParams),
        }));
      }
      dispatch({
        type: 'app/updataFormChange',
        payload: false,
      });
    },
    onCancel () {
      dispatch({
        type: 'app/changeModalVisible',
        payload: {
          modalVisible: false,
          type: null,
          queryParams: null,
        },
      });
    },
  };

  const isWithOutContent = withOutContentPages && withOutContentPages.includes(pathname);
  // const isWithOutHeader = withOutHeaderPages && withOutHeaderPages.includes(pathname);

  if (openPages && openPages.includes(pathname)) {
    return (
      <Spin spinning={loading}>
        <Switch>
          {getRoutes(match.path, routerData).map((item) => {
            // console.log(location, match.path, item.path, item.exact);
            return (<Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />);
          })}
          <Redirect exact from="/" to={bashRedirect} />
        </Switch>
      </Spin>
    );
  } else {
    return (
      <Spin spinning={loading}>
        <Helmet>
          <title>{intl.get('App.name')}</title>
        </Helmet>
        <div
          className={classnames('layout', {fold: isNavbar ? false : siderFold}, {withnavbar: isNavbar})}
        >
          <div className={isWithOutContent ? 'main raw' : 'main'}>
            <div className="container">
              <div className={isWithOutContent ? 'contentRaw' : 'content'}>
                <Switch>
                  {getRoutes(match.path, routerData).map((item) => {
                    // console.log(location, match.path, item.path, item.exact);
                    return (<Route
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                    />);
                  })}
                  <Redirect exact from="/" to={bashRedirect} />
                </Switch>
              </div>
            </div>
            <Modal
              className={CSS.tipsModal}
              {...modalProps}
            >
              您还有更改未保存，确定继续退出？
            </Modal>
          </div>
        </div>
      </Spin>
    );
  }
};

App.propTypes = {
  // children: PropTypes.element.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    app: state.app,
  };
}

export default connect(mapStateToProps)(App);
