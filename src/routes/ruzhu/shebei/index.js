import React from 'react';
import {injectIntl} from 'react-intl';
import queryString from 'query-string';
import {connect} from 'dva';
import {message} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import {routerRedux} from 'dva/router';

import Modal from './Modal';
import List from './List';

const Index = (props) => {
  const {
    ruyuan,
    dispatch,
    location,
  } = props;

  const {
    cunrrTabIndex,
    modalVisible,
    zncData,
    zncdData,
    dtzData,
    zhxData,
  } = ruyuan;

  const { pathname, search } = location;
  const query = queryString.parse(search);

  const setQuery = (type, data) => {
    dispatch(routerRedux.push({
      pathname: data ? pathname : '/ruzhu/shebeiBangd',
      search: queryString.stringify({
        ...query,
        bianhao: data || undefined,
        cunrrTabIndex: type,
      }),
    }));
  };

  const shebeiUnTying = (shebeiName, id) => {
    dispatch({
      type: shebeiName,
      payload: {
        bianhao: query.bianhao,
        suoyin: Number(query.suoyin),
        id,
      },
      callback: () => {
        message.success('解绑成功');
        dispatch(routerRedux.push({
          pathname: '/ruzhu/list',
          search: queryString.stringify({
            ...query,
          }),
        }));
      },
    });
  };
  const listProps = {
    location,
    unTying() {
      dispatch({
        type: 'ruyuan/showModal',
      });
    },

    changeTab(type) {
      dispatch({
        type: 'ruyuan/updataAllvalues',
        payload: {},
      });
      dispatch({
        type: 'ruyuan/ruyuanshengqingXQ',
        payload: {
          suoyin: query.suoyin,
        },
        callback: (data) => {
          switch (type) {
            case 0:
              setQuery(type, data.chuang);
              break;
            case 1:
              setQuery(type, data.chuangdian);
              break;
            case 2:
              setQuery(type, data.duotizheng);
              break;
            case 3:
              setQuery(type, data.xie);
              break;
            default:
              break;
          }
        },
      });
    },
  };

  const modalProps = {
    cunrrTabIndex,
    width: 350,
    visible: modalVisible,
    wrapClassName: 'vertical-center-modal',
    title: '操作提示',
    onOk() {
      switch (cunrrTabIndex) {
        case 0:
          shebeiUnTying('ruyuan/untieZnc', zncData.id);
          break;
        case 1:
          shebeiUnTying('ruyuan/untieZncd', zncdData.id);
          break;
        case 2:
          shebeiUnTying('ruyuan/untieDtz', dtzData.id);
          break;
        case 3:
          shebeiUnTying('ruyuan/untieZhx', zhxData.id);
          break;
        default:
          break;
      }
      dispatch({
        type: 'ruyuan/hideModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'ruyuan/hideModal',
      });
    },
  };

  return (
    <div className="content-inner">
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
