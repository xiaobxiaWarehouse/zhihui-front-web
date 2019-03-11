import React from 'react';
import {injectIntl} from 'react-intl';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import List from './List';

const Index = (props) => {
  const {
    dispatch,
    location,
  } = props;

  const { pathname, search } = location;
  const query = queryString.parse(search);

  const setQuery = (type, data) => {
    dispatch({
      type: 'ruyuan/updataAllvalues',
      payload: {},
    });
    const params = {
      ...query,
      cunrrTabIndex: type,
    };
    switch (type) {
      case 0:
        params.bianhao = data.chuang || undefined;
        break;
      case 1:
        params.bianhao = data.chuangdian || undefined;
        break;
      case 2:
        params.bianhao = data.duotizheng || undefined;
        break;
      case 3:
        params.bianhao = data.xie || undefined;
        break;
      default:
        break;
    }
    dispatch(routerRedux.push({
      pathname: params.bianhao ? '/ruzhu/shebei' : pathname,
      search: queryString.stringify({
        ...params,
      }),
    }));
  };

  const listProps = {
    location,
    changeTab(index) {
      dispatch({
        type: 'ruyuan/ruyuanshengqingXQ',
        payload: {
          suoyin: query.suoyin,
        },
        callback: (data) => {
          setQuery(index, data);
        },
      });
    },
  };

  return (
    <div className="content-inner">
      <List {...listProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
