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
    yuding,
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
  } = yuding;

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
        type: 'yuding/query',
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
    title: '预定业务',
    menu,
    dispatch,
    navBtn: <div>
      {/* <Button
        type="primary"
        style={{marginRight: 10}}
        onClick={() => {
          dispatch({
            type: 'yuding/showModal',
          });
        }}
      ><JXRSIcon type="search"/> 查询预定单</Button> */}
      <Permissions all="sys:yuding:add">
        <Button
          type="primary"
          style={{marginRight: 10}}
          onClick={() => {
            dispatch(routerRedux.push({pathname: '/yuding/add'}));
          }}
        ><JXRSIcon type="add"/> 新增预定单</Button>
      </Permissions>
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
          forceRefresh: undefined,
          page: 1,
        }),
      }));
      dispatch({
        type: 'yuding/query',
        payload: {
          ...query,
          ...value,
          page: 1,
        },
      });
      dispatch({
        type: 'yuding/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'yuding/hideModal',
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
        type: 'yuding/query',
        payload: {
          ...query,
          page,
        },
      });
    },
    onEdit(item) {
      dispatch(routerRedux.push({
        pathname: '/yuding/edit',
        search: queryString.stringify({
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
    yuding: state.yuding,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
