import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';
import { JXRS, Layout } from 'components';
import Filter from './Filter';
import Content from './content';
import styles from './index.less';


const Index = (props) => {
  const { Header } = Layout;
  const JXRSIcon = JXRS.Icon;
  const {
    statistics,
    dispatch,
    location,
    app: {
      menu,
      isOpenNav,
    },
  } = props;

  const { pathname, search } = location;

  const filterProps = {
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...value,
        }),
      }));
    },
  };

  const headerProps = {
    isOpenNav,
    title: '统计分析',
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
    filter: <Filter {...filterProps} />,
    changeIsOpenNav() {
      dispatch({
        type: 'app/changeIsOpenNav',
        payload: !isOpenNav,
      });
    },
  };
  return (
    <div className={styles.content_inner} >
      <Header {...headerProps} />
      <Content />
    </div>
  );
};
function mapStateToProps(state) {
  return {
    statistics: state.statistics,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
