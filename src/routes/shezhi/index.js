import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { injectIntl } from 'react-intl';
import { JXRS, Layout } from 'components';
import { classnames, config } from 'utils';
import intl from 'react-intl-universal';
import { Button, Form, Col, Row } from 'antd';
import styles from './index.less';
import Nav from './nav';

const { Header } = Layout;
const CSS = Layout.styles;
const { PROJECT } = config;
const FormItem = Form.Item;
const JXRSIcon = JXRS.Icon;

const formItemLayout = {
  labelCol: {},
  wrapperCol: {},
  style: {},
};

const Index = (props) => {
  const { app, dispatch, location } = props;

  const { menu, isOpenNav } = app;

  const headerProps = {
    isOpenNav,
    title: '系统设置',
    menu,
    dispatch,
    navBtn: (
      <div>
        <Button
          type="primary"
          onClick={() => {
            dispatch(routerRedux.push({ pathname: '/home' }));
          }}
        >
          <JXRSIcon type="home" /> 首页
        </Button>
      </div>
    ),
    changeIsOpenNav() {
      dispatch({
        type: 'app/changeIsOpenNav',
        payload: !isOpenNav,
      });
    },
  };

  let shezhiMenu = [];
  menu.forEach((item) => {
    if (item.url === '/profile/mima') {
      shezhiMenu = item.children;
    }
  });

  const menusProps = {
    menu: shezhiMenu,
    location,
  };

  return (
    <div className="content-inner">
      <Header {...headerProps} />
      <Row className="content-inner-main">
        <Col span={6} className={styles.nav}>
          <Nav {...menusProps} />
        </Col>
        <Col span={18} className={styles.content} />
      </Row>
    </div>
  );
};

Index.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
