import React from 'react';
import queryString from 'query-string';
import {injectIntl} from 'react-intl';
import {connect} from 'dva';
import {Button} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import {routerRedux} from 'dva/router';

import Modal from './Modal';
import Filter from './Filter';
import CardList from './CardList';

const {Header} = Layout;
const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    huodongjilu,
    app,
    dispatch,
    location,
  } = props;

  const {
    list,
    pagination,
    modalVisible,
    isMotion,
    filterValue,
  } = huodongjilu;

  const {
    menu,
    isOpenNav,
  } = app;

  const {pathname, search} = location;
  const query = queryString.parse(search);

  const filterProps = {
    isMotion,
    filterValue,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          ...value,
          forceRefresh: undefined,
          page: 1,
        }),
      }));
      dispatch({
        type: 'huodongjilu/query',
        payload: {
          ...query,
          ...value,
          page: 1,
        },
      });
    },
  };

  const headerProps = {
    isOpenNav,
    title: '文娱活动',
    menu,
    dispatch,
    navBtn: <div>
      {/* <Button
        type="primary"
        style={{marginRight: 10}}
        onClick={() => {
          dispatch({
            type: 'huodongjilu/showModal',
          });
        }}
      ><JXRSIcon type="search"/> 查询活动记录</Button> */}
      <Permissions all="sys:huodongjilu:add">
        <Button
          type="primary"
          style={{marginRight: 10}}
          onClick={() => {
            dispatch(routerRedux.push({pathname: '/huodongjilu/add'}));
          }}
        ><JXRSIcon type="add"/> 新增活动记录</Button>
      </Permissions>
      <Button
        type="primary"
        style={{marginRight: 10}}
        onClick={() => {
          dispatch(routerRedux.push({pathname: '/huodongjihua/list'}));
        }}
      ><JXRSIcon type="tools"/> 维护活动计划</Button>
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
        type: 'huodongjilu/query',
        payload: {
          ...query,
          ...value,
          page: 1,
        },
      });
      dispatch({
        type: 'huodongjilu/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'huodongjilu/hideModal',
      });
    },
  };

  const cardProps = {
    query,
    pagination: {
      ...pagination,
    },
    dataSource: list,
    onChange(page) {
      dispatch({
        type: 'huodongjilu/query',
        payload: {
          ...query,
          page,
        },
      });
    },
    onEdit(item) {
      dispatch(routerRedux.push({
        pathname: '/huodongjilu/edit',
        search: queryString.stringify({
          ...query,
          id: item.id,
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

function mapStateToProps(state) {
  return {
    huodongjilu: state.huodongjilu,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
