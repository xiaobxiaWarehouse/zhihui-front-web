import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {injectIntl} from 'react-intl';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button} from 'antd';
import {JXRS, Layout} from 'components';

import Modal from './Modal';
import Filter from './Filter';
import CardList from './CardList';

const {Header} = Layout;
const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    app,
    dangan,
    dispatch,
    location,
  } = props;
  const {
    list,
    pagination,
    modalVisible,
    isMotion,
    louhaoList,
    loucengList,
    filterValue,
  } = dangan;

  const {
    menu,
    isOpenNav,
    allHulidengji,
    allXingbie,
  } = app;

  const {pathname, search} = location;
  const query = queryString.parse(search);

  const filterProps = {
    louhaoList,
    loucengList,
    isMotion,
    filterValue,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...value,
          forceRefresh: undefined,
          page: 1,
        }),
      }));
      dispatch({
        type: 'dangan/query',
        payload: {
          ...query,
          ...value,
          page: 1,
        },
      });
    },
    onAdd (path) {
      dispatch(routerRedux.push({pathname: path}));
    },
  };

  const headerProps = {
    isOpenNav,
    title: '健康档案',
    menu,
    dispatch,
    navBtn: <div>
      {/* <Button
        type="primary"
        style={{marginRight: 10}}
        onClick={() => {
          dispatch({
            type: 'dangan/showModal',
          });
        }}
      ><JXRSIcon type="search"/> 查询健康档案</Button> */}
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            type: 'app/changeIsHomeBack',
            payload: true,
          });
          dispatch(routerRedux.push({pathname: '/home'}));
        }}
      ><JXRSIcon type="home"/> 首页</Button>
    </div>,
    filter: <Filter {...filterProps} />,
    changeIsOpenNav () {
      dispatch({
        type: 'app/changeIsOpenNav',
        payload: !isOpenNav,
      });
    },
  };

  const modalProps = {
    width: 520,
    filterValue,
    visible: modalVisible,
    maskClosable: false,
    title: '更多查询',
    wrapClassName: 'vertical-center-modal',
    filter: {
      ...query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          ...value,
          page: 1,
        }),
      }));
      dispatch({
        type: 'dangan/query',
        payload: {
          ...query,
          ...value,
          page: 1,
        },
      });
      dispatch({
        type: 'dangan/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'dangan/hideModal',
      });
    },
  };

  const cardProps = {
    query,
    allHulidengji,
    allXingbie,
    pagination: {
      ...pagination,
    },
    dataSource: list,
    onChange(page) {
      dispatch({
        type: 'dangan/query',
        payload: {
          ...query,
          page,
        },
      });
    },
    onEdit(item) {
      dispatch(routerRedux.push({
        pathname: '/dangan/detail',
        search: queryString.stringify({
          ...query,
          id: item.shenqingId,
          suoyin: item.id,
        }),
      }));
    },
  };

  return (
    <div className="content-inner">
      <Header {...headerProps} />
      <CardList {...cardProps} />
      {modalVisible && <Modal {...modalProps}/>}
    </div>
  );
};

Index.propTypes = {
  userListProps: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    dangan: state.dangan,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
