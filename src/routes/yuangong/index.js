import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {JXRS, Layout, Permissions} from 'components';
import {classnames, config} from 'utils';
import {Button, Form, Col, Row, Tag, message} from 'antd';
import styles from '../shezhi/index.less';
import Nav from '../shezhi/nav';

import List from './List';
import Modal from './Modal';
import AddModal from './AddModal';
import AllocateModal from './AllocateModal';
import Filter from './Filter';

const {Header} = Layout;
const CSS = Layout.styles;
const {PROJECT} = config;
const FormItem = Form.Item;
const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    yuangong,
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
  } = yuangong;

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
      type: 'yuangong/updateEditData',
    });
    dispatch({
      type: 'yuangong/getallRole',
    });
    dispatch({
      type: 'yuangong/updateIsEdit',
      payload: {
        isEdit: false,
      },
    });
    dispatch({
      type: 'yuangong/showAddModal',
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
          type: 'yuangong/modifyYuangongStatus',
          payload: {
            id: item.id,
            zhuangtai: item.zhuangtai === 1 ? 2 : 1,
          },
          callback: () => {
            dispatch({
              type: 'yuangong/query',
              payload: query,
            });
          },
        });
      } else if (modalType === 2) {
        dispatch({
          type: 'yuangong/resetPassword',
          payload: {
            id: item.id,
          },
          callback: () => {
            dispatch({
              type: 'yuangong/query',
              payload: query,
            });
          },
        });
      } else if (modalType === 3) {
        dispatch({
          type: 'yuangong/delYuangong',
          payload: {
            id: item.id,
          },
          callback: () => {
            dispatch({
              type: 'yuangong/query',
              payload: query,
            });
          },
        });
      }
      dispatch({
        type: 'yuangong/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'yuangong/hideModal',
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
          type: 'yuangong/modifyYuangong',
          payload: item,
          callback: (data) => {
            dispatch({
              type: 'yuangong/getYuangongDetail',
              payload: {
                id: item.id,
              },
            });
            message.success('编辑条目成功');
            dispatch({
              type: 'yuangong/hideAddModal',
            });
            dispatch(routerRedux.push({pathname: '/yuangong/list'}));
          },
        });
      } else {
        dispatch({
          type: 'yuangong/addYuangong',
          payload: item,
          callback: (data) => {
            message.success('增加条目成功');
            dispatch({
              type: 'yuangong/hideAddModal',
            });
            dispatch(routerRedux.push({pathname: '/yuangong/list'}));
          },
        });
      }
    },
    onCancel () {
      dispatch({
        type: 'yuangong/hideAddModal',
      });
    },
  };

  const onEdit = () => {
    dispatch({
      type: 'yuangong/updateIsEdit',
      payload: {
        isEdit: !isEdit,
      },
    });
  };

  const allocateModalProps = {
    width: 744,
    dispatch,
    item: editData,
    visible: allocateModalVisible,
    maskClosable: false,
    title: '分配角色',
    wrapClassName: 'vertical-center-modal',
    onOk (role) {
      if (editData) {
        const {id} = editData;
        dispatch({
          type: 'yuangong/modifyYuangongRole',
          payload: {
            id,
            role,
          },
          callback: (res) => {
            if (res.success) {
              dispatch({
                type: 'yuangong/query',
                payload: query,
              });
              message.success('分配角色成功');
              dispatch({
                type: 'yuangong/hideAllocateModal',
              });
            } else {
              message.success('分配角色失败');
            }
          },
        });
      } else {
        message.success('请先选择员工');
        dispatch({
          type: 'yuangong/hideAllocateModal',
        });
      }
    },
    onCancel () {
      dispatch({
        type: 'yuangong/hideAllocateModal',
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
        type: 'yuangong/updateEditData',
        payload: null,
      });
      dispatch({
        type: 'yuangong/updateItemid',
        payload: [],
      });
      dispatch({
        type: 'yuangong/updateItemid',
        payload: item,
      });
      // dispatch({
      //   type: 'yuangong/getYuangongRole',
      //   payload: {},
      // });
      dispatch({
        type: 'yuangong/getYuangongDetail',
        payload: {
          id: item.id,
        },
      });
      dispatch({
        type: 'yuangong/showModal',
        payload: {
          modalType: operation,
        },
      });
    },
    onEdit(item) {
      dispatch({
        type: 'yuangong/updateEditData',
        payload: null,
      });
      dispatch({
        type: 'yuangong/updateItemid',
        payload: item,
      });
      dispatch({
        type: 'yuangong/getallRole',
      });
      dispatch({
        type: 'yuangong/getYuangongDetail',
        payload: {
          id: item.id,
        },
      });
      dispatch({
        type: 'yuangong/showAddModal',
      });
    },
    onAllocate(item) {
      dispatch({
        type: 'yuangong/updateEditData',
        payload: null,
      });
      dispatch({
        type: 'yuangong/updateItemid',
        payload: item,
      });
      dispatch({
        type: 'yuangong/getYuangongRole',
        payload: {},
      });
      dispatch({
        type: 'yuangong/getYuangongDetail',
        payload: {
          id: item.id,
        },
      });
      dispatch({
        type: 'yuangong/showAllocateModal',
      });
    },
  };

  const filterProps = {
    isMotion,
    filter: {
      ...modelFilter,
      ...query,
    },
    onFilterChange (value) {
      dispatch({
        type: 'yuangong/updateFilter',
        payload: {
          filter: {
            zhuangtai: value.zhuangtai,
          },
        },
      });
      dispatch(routerRedux.push({
        pathname: location.pathname,
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
              <Tag className="titleName">管理员工</Tag>
            </Col>
            <Col span={18}>
              <div style={{float: 'right'}}>
                <Permissions all="sys:user:add">
                  <Button
                    className="btn"
                    onClick={() => {
                      onAdd();
                    }}
                  ><JXRSIcon type="add"/> 增加条目</Button>
                </Permissions>
                <Permissions all="sys:user:edit">
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
          <Row>
            <Col span={24}>
              <Filter {...filterProps}/>
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
    yuangong: state.yuangong,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Index)));
