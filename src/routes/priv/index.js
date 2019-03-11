import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {JXRS, Layout} from 'components';
import {classnames, config} from 'utils';
import {Button, Form, Col, Row, Tag, message} from 'antd';
import styles from '../shezhi/index.less';
import Nav from '../shezhi/nav';

import List from './List';
import Modal from './Modal';
import AddModal from './AddModal';
import Filter from './Filter';

const {Header} = Layout;
const CSS = Layout.styles;
const {PROJECT} = config;
const FormItem = Form.Item;
const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    priv,
    app,
    dispatch,
    location,
  } = props;

  const {
    list,
    pagination,
    modalVisible,
    addModalVisible,
    // allocateModalVisible,
    modalType,
    isMotion,
    // selectedPrivIds,
    editData,
    // selectedRowKeys,
  } = priv;

  const {
    menu,
    isOpenNav,
  } = app;

  const {pathname, search} = location;
  const query = queryString.parse(search);

  const headerProps = {
    isOpenNav,
    title: '系统设置',
    menu,
    dispatch,
    navBtn: <div>
      <Button
        type="primary"
        onClick={() => {
          dispatch(routerRedux.push({pathname: '/home'}));
        }}
      ><JXRSIcon type="home"/> 首页</Button>
    </div>,
    changeIsOpenNav () {
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

  const onAdd = () => {
    dispatch({
      type: 'priv/updateEditData',
    });
    dispatch({
      type: 'priv/updateSelectedRowKeys',
      payload: {
        selectedRowKeys: [],
      },
    });
    dispatch({
      type: 'priv/showAddModal',
    });
  };

  const onEdit = () => {
    dispatch({
      type: 'priv/showAddModal',
    });
  };

  const modalProps = {
    width: 397,
    item: editData,
    visible: modalVisible,
    maskClosable: false,
    modalType,
    title: intl.get('Confirm.title'),
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      if (modalType === 1) {
        dispatch({
          type: 'priv/modifyPrivStatus',
          payload: {
            id: item.id,
            zhuangtai: item.zhuangtai === 1 ? 2 : 1,
          },
          callback: () => {
            dispatch({
              type: 'priv/query',
              payload: query,
            });
          },
        });
      }
      dispatch({
        type: 'priv/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'priv/hideModal',
      });
    },
  };

  const addModalProps = {
    width: 744,
    visible: addModalVisible,
    maskClosable: false,
    title: '增加条目',
    wrapClassName: 'vertical-center-modal',
    filter: {
      ...query,
    },
    onOk (item) {
      const {id} = item;
      if (id) {
        dispatch({
          type: 'priv/modifyPriv',
          payload: item,
          callback: (data) => {
            dispatch({
              type: 'priv/getPrivDetail',
              payload: {
                id: item.id,
              },
            });
            message.success('编辑条目成功');
            dispatch({
              type: 'priv/hideAddModal',
            });
            dispatch(routerRedux.push({pathname: '/priv/list'}));
          },
        });
      } else {
        dispatch({
          type: 'priv/addPriv',
          payload: item,
          callback: (data) => {
            message.success('增加条目成功');
            dispatch({
              type: 'priv/hideAddModal',
            });
            dispatch(routerRedux.push({pathname: '/priv/list'}));
          },
        });
      }
    },
    onCancel () {
      dispatch({
        type: 'priv/hideAddModal',
      });
    },
  };

  const listProps = {
    pagination: {
      ...pagination,
      showTotal: total => intl.get('Table.pagination.total', {total}),
    },
    dataSource: list,
    location,
    isMotion,
    // 用于分页
    onChange(page) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }),
      }));
    },
    onModalItem(item, operation) {
      dispatch({
        type: 'priv/getPrivDetail',
        payload: {
          id: item.id,
        },
      });
      dispatch({
        type: 'priv/showModal',
        payload: {
          modalType: operation,
        },
      });
    },
  };

  const filterProps = {
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...value,
          page: 1,
        }),
      }));
    },
    // onAdd (path) {
    //   dispatch(routerRedux.push({pathname: path}));
    // },
  };

  return (
    <div className="content-inner">
      <Header {...headerProps} />
      <Row className="content-inner-main">
        <Col span={6} className={styles.nav}>
          <Nav {...menusProps}/>
        </Col>
        <Col span={18} className={styles.content}>
          <Row className="pgTitle">
            <Col span={6}>
              <Tag className="titleName">管理权限</Tag>
            </Col>
            {/* <Col span={18}>
              <div style={{float: 'right'}}>
                <Button
                  className="btn"
                  type="primary"
                  onClick={() => {
                    onAdd();
                  }}
                ><JXRSIcon type="add"/> 增加条目</Button>
                <Button
                  className="btn"
                  type="primary"
                  onClick={() => {
                    onEdit();
                  }}
                  disabled={!(selectedRowKeys && selectedRowKeys.length > 0)}
                ><JXRSIcon type="edit"/> 编辑条目</Button>
              </div>
            </Col> */}
          </Row>
          <Row style={{paddingTop: 15, paddingBottom: 15}}>
            <Col span={24}>
              {/* <Filter {...filterProps}/> */}
              <List {...listProps}/>
            </Col>
          </Row>
        </Col>
      </Row>
      {modalVisible && <Modal {...modalProps} />}
      {addModalVisible && <AddModal {...addModalProps}/>}
    </div>
  );
};

Index.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    priv: state.priv,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Index)));
