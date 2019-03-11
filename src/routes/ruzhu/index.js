import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
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
    ruyuan,
    app,
    dispatch,
    location,
  } = props;

  const {
    list,
    pagination,
    modalVisible,
    isMotion,
    bumenAll,
    filterValue,
  } = ruyuan;
  const {
    menu,
    isOpenNav,
    permissions,
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
        type: 'ruyuan/query',
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
    title: '入住业务',
    menu,
    dispatch,
    navBtn: <div>
      {/* <Button
        type="primary"
        style={{marginRight: 10}}
        onClick={() => {
          dispatch({
            type: 'ruyuan/getBumenAll',
            callback: () => {
              dispatch({
                type: 'ruyuan/showModal',
              });
            },
          });
        }}
      ><JXRSIcon type="search"/> 查询入院申请单</Button> */}
      <Permissions all="sys:shenqing:add">
        <Button
          type="primary"
          style={{marginRight: 10}}
          onClick={() => {
            dispatch(routerRedux.push({pathname: '/ruzhu/add'}));
          }}
        ><JXRSIcon type="add"/> 新增入院申请单</Button>
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
    bumenAll,
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
        type: 'ruyuan/query',
        payload: {
          ...query,
          ...value,
          page: 1,
        },
      });
      dispatch({
        type: 'ruyuan/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'ruyuan/hideModal',
      });
    },
  };

  const cardProps = {
    query,
    permissions,
    pagination: {
      ...pagination,
    },
    dataSource: list,
    onChange(page) {
      dispatch({
        type: 'ruyuan/query',
        payload: {
          ...query,
          page,
        },
      });
    },
    onEdit(item) {
      dispatch(routerRedux.push({
        pathname: '/ruzhu/edit',
        search: queryString.stringify({
          id: item.id,
        }),
      }));
    },
    onBanli(item) {
      dispatch({
        type: 'ruyuan/updataBanlibumen',
        payload: [],
      });
      dispatch(routerRedux.push({
        pathname: '/ruzhu/banli',
        search: queryString.stringify({
          id: item.id,
        }),
      }));
    },
    onPinggu(item) {
      dispatch(routerRedux.push({
        pathname: '/ruzhu/pinggu',
        search: queryString.stringify({
          id: item.id,
          ruzhuPg: item.ruzhuPg,
          suoyin: item.suoyin,
        }),
      }));
    },
    onBangding(item) {
      dispatch({
        type: 'ruyuan/updataAllvalues',
        payload: {},
      });
      dispatch({
        type: 'ruyuan/ruyuanshengqingXQ',
        payload: {
          suoyin: item.suoyin,
        },
        callback: (data) => {
          if (data.chuang.length <= 0) {
            dispatch(routerRedux.push({
              pathname: '/ruzhu/shebeiBangd',
              search: queryString.stringify({
                ...query,
                suoyin: item.suoyin,
                jigou: item.jigou,
                bianhao: undefined,
                cunrrTabIndex: 0,
              }),
            }));
          } else {
            dispatch(routerRedux.push({
              pathname: '/ruzhu/shebei',
              search: queryString.stringify({
                ...query,
                suoyin: item.suoyin,
                jigou: item.jigou,
                bianhao: data.chuang,
                cunrrTabIndex: 0,
              }),
            }));
          }
        },
      });
    },
    onTijian(item) {
      dispatch(routerRedux.push({
        pathname: '/ruzhu/tijian',
        search: queryString.stringify({
          ...query,
          id: item.id,
          suoyin: item.suoyin,
          tijianBg: item.tijianBg,
          from: 1,
        }),
      }));
    },
    onJiankang(item) {
      dispatch(routerRedux.push({
        pathname: '/ruzhu/jiankang',
        search: queryString.stringify({
          id: item.id,
          suoyin: item.suoyin,
          jiankangJl: item.jiankangJl,
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
    ruyuan: state.ruyuan,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
