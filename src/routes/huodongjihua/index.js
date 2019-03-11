import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {JXRS, Permissions} from 'components';
import {Button, Form, Col, Row, Tag, message} from 'antd';

import List from './List';
import Filter from './Filter';
import Modal from './Modal';
import AddModal from './AddModal';

const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    huodongjihua,
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
  } = huodongjihua;
  const {pathname, search} = location;
  const query = queryString.parse(search);

  const onAdd = () => {
    dispatch({
      type: 'huodongjihua/updateEditData',
    });
    dispatch({
      type: 'huodongjihua/updateIsEdit',
      payload: {
        isEdit: false,
      },
    });
    dispatch({
      type: 'huodongjihua/showAddModal',
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
          type: 'huodongjihua/modifyHuodongjihua',
          payload: {
            id: item.id,
            zhuangtai: item.zhuangtai === 1 ? 2 : 1,
          },
          callback: () => {
            dispatch({
              type: 'huodongjihua/query',
              payload: query,
            });
          },
        });
      } else if (modalType === 2) {
        dispatch({
          type: 'huodongjihua/delHuodongjihua',
          payload: {
            id: parseInt(item.id, 10),
          },
          callback: () => {
            dispatch({
              type: 'huodongjihua/query',
              payload: query,
            });
          },
        });
      }
      dispatch({
        type: 'huodongjihua/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'huodongjihua/hideModal',
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
      dispatch({
        type: 'huodongjihua/addHuodongjihua',
        payload: item,
        callback: (data) => {
          message.success('增加条目成功');
          dispatch({
            type: 'huodongjihua/hideAddModal',
          });
          dispatch(routerRedux.push({pathname: '/huodongjihua/list'}));
        },
      });
    },
    onCancel () {
      dispatch({
        type: 'huodongjihua/hideAddModal',
      });
    },
  };

  const onEdit = () => {
    dispatch({
      type: 'huodongjihua/updateIsEdit',
      payload: {
        isEdit: !isEdit,
      },
    });
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
        type: 'huodongjihua/updateEditData',
        payload: null,
      });
      dispatch({
        type: 'huodongjihua/updateEditData',
        payload: item,
      });
      dispatch({
        type: 'huodongjihua/getHuodongjihuaDetail',
        payload: {
          id: item.id,
        },
      });
      dispatch({
        type: 'huodongjihua/showModal',
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
    <div className="content-inner bgWhite">
      <div className="header">
        <div className="navGroup">
          <Row className="nav">
            <Col className="title">维护文娱活动计划</Col>
            <Col className="navBtn">
              <Button
                type="primary"
                style={{marginRight: 10}}
                onClick={() => {
                  dispatch(routerRedux.push({pathname: '/huodongjilu/list'}));
                }}
              ><JXRSIcon type="left"/> 返回</Button>
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
            </Col>
          </Row>
        </div>
        <div className="filter">
          <Filter {...filterProps} />
        </div>
      </div>
      <div className="cardList" style={{padding: '28px 0'}}>
        <Row style={{padding: '0 28px'}}>
          <Col span={24} className="content">
            <Row className="pgTitle">
              <Col span={6}>
                <Tag className="titleName">文娱活动计划</Tag>
              </Col>
              <Col span={18}>
                <div style={{float: 'right'}}>
                  <Permissions all="sys:huodongjihua:add">
                    <Button
                      className="btn"
                      onClick={() => {
                        onAdd();
                      }}
                    ><JXRSIcon type="add"/> 增加活动计划</Button>
                  </Permissions>
                  <Button
                    className="btn"
                    onClick={() => {
                      onEdit();
                    }}
                  ><JXRSIcon type="edit"/> 编辑活动计划</Button>
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
      </div>
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
    huodongjihua: state.huodongjihua,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Index)));
