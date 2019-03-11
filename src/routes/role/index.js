import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {JXRS, Layout, Permissions} from 'components';
import {Button, Form, Col, Row, Tag, message} from 'antd';
import styles from '../shezhi/index.less';
import Nav from '../shezhi/nav';

import List from './List';
import Modal from './Modal';
import AddModal from './AddModal';
import AllocateModal from './AllocateModal';

const {Header} = Layout;
const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    role,
    app,
    dispatch,
    location,
  } = props;

  const {
    list,
    pagination,
    modalVisible,
    addModalVisible,
    allocateModalVisible,
    modalType,
    isMotion,
    editData,
    isEdit,
    itemId,
    filter: modelFilter,
  } = role;

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
      type: 'role/showAddModal',
    });
  };

  const modalProps = {
    width: 397,
    item: editData,
    itemId,
    visible: modalVisible,
    maskClosable: false,
    modalType,
    title: intl.get('Confirm.title'),
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      if (modalType === 2) {
        dispatch({
          type: 'role/delRole',
          payload: {
            id: itemId.id,
          },
          callback: () => {
            dispatch({
              type: 'role/query',
              payload: query,
            });
          },
        });
      }
      dispatch({
        type: 'role/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'role/hideModal',
      });
    },
  };

  const addModalProps = {
    width: 744,
    visible: addModalVisible,
    maskClosable: false,
    title: editData ? '编辑条目' : '增加条目',
    wrapClassName: 'vertical-center-modal',
    filter: {
      ...query,
    },
    onOk (item) {
      const {id} = item;
      if (id) {
        dispatch({
          type: 'role/modifyRole',
          payload: item,
          callback: (data) => {
            dispatch({
              type: 'role/getRoleDetail',
              payload: {
                id: item.id,
              },
            });
            message.success('编辑条目成功');
            dispatch({
              type: 'role/hideAddModal',
            });
            dispatch(routerRedux.push({pathname: '/role/list'}));
          },
        });
      } else {
        dispatch({
          type: 'role/addRole',
          payload: item,
          callback: (data) => {
            message.success('增加条目成功');
            dispatch({
              type: 'role/hideAddModal',
            });
            dispatch(routerRedux.push({pathname: '/role/list'}));
          },
        });
      }
    },
    onCancel () {
      dispatch({
        type: 'role/hideAddModal',
      });
    },
  };

  const onEdit = () => {
    dispatch({
      type: 'role/updateIsEdit',
      payload: {
        isEdit: !isEdit,
      },
    });
  };

  const allocateModalProps = {
    width: 744,
    dispatch,
    item: editData,
    itemId,
    visible: allocateModalVisible,
    maskClosable: false,
    title: '分配权限',
    wrapClassName: 'vertical-center-modal',
    onOk (rolePriv) {
      if (rolePriv) {
        const children = rolePriv.map((item) => {
          return item.childrenValue;
        });
        let hebinchildren = [].concat(...children);
        // const {id} = editData;
        dispatch({
          type: 'role/modifyRole',
          payload: {
            ...itemId,
            id: itemId.id,
            privs: hebinchildren,
          },
          callback: (res) => {
            if (res.success) {
              dispatch({
                type: 'role/query',
                payload: query,
              });
              message.success('分配权限成功');
              dispatch({
                type: 'role/hideAllocateModal',
              });
            } else {
              message.success('分配权限失败');
            }
          },
        });
      } else {
        message.success('请先选择角色');
        dispatch({
          type: 'role/hideAllocateModal',
        });
      }
    },
    onCancel () {
      dispatch({
        type: 'role/hideAllocateModal',
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
        type: 'role/updateEditData',
        payload: null,
      });
      dispatch({
        type: 'role/updateItemid',
        payload: item,
      });
      dispatch({
        type: 'role/showModal',
        payload: {
          modalType: operation,
        },
      });
    },
    onEdit(item) {
      dispatch({
        type: 'role/updateEditData',
        payload: null,
      });
      dispatch({
        type: 'role/getRolePriv',
        payload: {
          type: -1,
          pageNum: 1,
          pageSize: 40,
          pattern: 'tree',
        },
      });
      dispatch({
        type: 'role/getRoleDetail',
        payload: {
          id: item.id,
        },
      });
      dispatch({
        type: 'role/showAddModal',
      });
    },
    onAllocate(item) {
      dispatch({
        type: 'role/updateRolepriv',
        payload: [],
      });
      dispatch({
        type: 'role/updateItemid',
        payload: item,
      });
      dispatch({
        type: 'role/getRolePriv',
        payload: {
          type: -1,
          pageNum: 1,
          pageSize: 40,
          pattern: 'tree',
        },
        callback: (res) => {
          dispatch({
            type: 'role/getRoleDetail',
            payload: {
              id: item.id,
            },
          });
        },
      });
      dispatch({
        type: 'role/showAllocateModal',
      });
    },
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
              <Tag className="titleName">管理角色</Tag>
            </Col>
            <Col span={18}>
              <div style={{float: 'right'}}>
                <Permissions all="sys:role:add">
                  <Button
                    className="btn"
                    onClick={() => {
                      onAdd();
                    }}
                  ><JXRSIcon type="add"/> 增加条目</Button>
                </Permissions>
                <Permissions all="sys:role:edit">
                  <Button
                    className="btn"
                    onClick={() => {
                      onEdit();
                    }}
                  ><JXRSIcon type="edit"/> 编辑条目</Button>
                </Permissions>
              </div>
            </Col>
          </Row>
          <Row style={{paddingTop: 15, paddingBottom: 15}}>
            <Col span={24}>
              <List {...listProps}/>
            </Col>
          </Row>
        </Col>
      </Row>
      {modalVisible && <Modal {...modalProps} />}
      {addModalVisible && <AddModal {...addModalProps}/>}
      {allocateModalVisible && <AllocateModal {...allocateModalProps}/>}
    </div>
  );
};

Index.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    role: state.role,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Index)));
