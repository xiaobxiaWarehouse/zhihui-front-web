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
import QrcodeModal from './QrcodeModal';
import Filter from './Filter';

const {Header} = Layout;
const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    chuangwei,
    app,
    dispatch,
    location,
  } = props;

  const {
    list,
    pagination,
    modalVisible,
    addModalVisible,
    modalType,
    isMotion,
    editData,
    isEdit,
    filter: modelFilter,
    qrcodeModalVisible,
    louList,
  } = chuangwei;

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
      type: 'chuangwei/updateEditData',
    });
    dispatch({
      type: 'chuangwei/updateIsEdit',
      payload: {
        isEdit: false,
      },
    });
    dispatch({
      type: 'chuangwei/showAddModal',
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
          type: 'chuangwei/modifyChuangweiStatus',
          payload: {
            id: item.id,
            zhuangtai: item.zhuangtai === 1 ? 5 : 1,
          },
          callback: () => {
            dispatch({
              type: 'chuangwei/query',
              payload: query,
            });
          },
        });
      } else if (modalType === 2) {
        dispatch({
          type: 'chuangwei/delChuangwei',
          payload: {
            id: item.id,
          },
          callback: () => {
            dispatch({
              type: 'chuangwei/query',
              payload: query,
            });
          },
        });
      }
      dispatch({
        type: 'chuangwei/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'chuangwei/hideModal',
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
          type: 'chuangwei/modifyChuangwei',
          payload: {
            ...item,
            leixing: 2,
          },
          callback: (data) => {
            dispatch({
              type: 'chuangwei/getChuangweiDetail',
              payload: {
                id: item.id,
              },
            });
            message.success('编辑条目成功');
            dispatch({
              type: 'chuangwei/hideAddModal',
            });
            dispatch(routerRedux.push({pathname: '/chuangwei/list'}));
          },
        });
      } else {
        dispatch({
          type: 'chuangwei/addChuangwei',
          payload: {
            ...item,
            leixing: 2,
          },
          callback: (data) => {
            message.success('增加条目成功');
            dispatch({
              type: 'chuangwei/hideAddModal',
            });
            dispatch(routerRedux.push({pathname: '/chuangwei/list'}));
          },
        });
      }
    },
    onCancel () {
      dispatch({
        type: 'chuangwei/hideAddModal',
      });
    },
  };

  const qrcodeModalProps = {
    louList,
    visible: qrcodeModalVisible,
    maskClosable: false,
    title: '导出二维码',
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'chuangwei/sendQrcode',
        payload: {
          louhao: item.id,
          email: item.email,
        },
        callback: () => {
          message.success('发送成功');
          dispatch({
            type: 'app/checkLogin',
          });
        },
      });
      dispatch({
        type: 'chuangwei/hideQrcodeModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'chuangwei/hideQrcodeModal',
      });
    },
  };

  const onEdit = () => {
    dispatch({
      type: 'chuangwei/updateIsEdit',
      payload: {
        isEdit: !isEdit,
      },
    });
  };

  const listProps = {
    pagination: {
      ...pagination,
      showTotal: total => intl.get('Table.pagination.total', {total}),
      showLessItems: true,
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

    onEdit(item) {
      dispatch({
        type: 'chuangwei/updateEditData',
        payload: null,
      });
      dispatch({
        type: 'chuangwei/getChuangweiDetail',
        payload: {
          id: item.id,
        },
      });
      dispatch({
        type: 'chuangwei/showAddModal',
      });
    },
    onModalItem(item, operation) {
      dispatch({
        type: 'chuangwei/updateEditData',
        payload: null,
      });
      dispatch({
        type: 'chuangwei/getChuangweiDetail',
        payload: {
          id: item.id,
        },
      });
      dispatch({
        type: 'chuangwei/showModal',
        payload: {
          modalType: operation,
        },
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
        type: 'chuangwei/updateFilter',
        payload: {
          filter: {
            zhuangtai: value.zhuangtai,
            louhao: value.louhao,
            louceng: value.louceng,
          },
        },
      });
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

  const onQrcode = () => {
    dispatch({
      type: 'chuangwei/alllouhao',
      payload: {
        screen: 1,
      },
      callback: () => {
        dispatch({
          type: 'chuangwei/showQrcodeModal',
        });
      },
    });
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
              <Tag className="titleName">管理房间</Tag>
            </Col>
            <Col span={18}>
              <div style={{float: 'right'}}>
                <Permissions all="sys:chuangwei:add">
                  <Button
                    className="btn"
                    onClick={() => {
                      onQrcode();
                    }}
                  > 导出二维码</Button>
                </Permissions>
                <Permissions all="sys:chuangwei:add">
                  <Button
                    className="btn"
                    onClick={() => {
                      onAdd();
                    }}
                  ><JXRSIcon type="add"/> 增加条目</Button>
                </Permissions>
                <Permissions all="sys:chuangwei:edit">
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
      {qrcodeModalVisible && <QrcodeModal {...qrcodeModalProps} />}
    </div>
  );
};

Index.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    chuangwei: state.chuangwei,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Index)));
