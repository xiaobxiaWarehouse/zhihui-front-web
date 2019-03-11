import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {JXRS, Permissions} from 'components';
import {Button, Form, Col, Row, Tag} from 'antd';

import List from './List';
import Modal from './Modal';
import AddModal from './AddModal';

const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    huodongjilu,
    dispatch,
    location,
  } = props;

  const {
    canyurenModalVisible,
    canyuJlModalVisible: addModalVisible,
    modalType,
    isMotion,
    editData,
    isCanyuJlEdit,
  } = huodongjilu;

  let list = editData ? editData.canyuJl : [];

  const {pathname, search} = location;
  const query = queryString.parse(search);

  const onAdd = () => {
    dispatch({
      type: 'huodongjilu/updateEditCanyuJl',
      payload: null,
    });
    dispatch({
      type: 'huodongjilu/updateIsCanyuJlEdit',
      payload: {
        isCanyuJlEdit: false,
      },
    });
    dispatch({
      type: 'huodongjilu/getCanyurenList',
      payload: {
        zhuangtai: -2,
      },
    });
    dispatch({
      type: 'huodongjilu/showAddCanyuJlModal',
    });
  };

  const onEdit = () => {
    dispatch({
      type: 'huodongjilu/updateIsCanyuJlEdit',
      payload: {
        isCanyuJlEdit: !isCanyuJlEdit,
      },
    });
  };

  const modalProps = {
    width: 397,
    visible: canyurenModalVisible,
    maskClosable: false,
    modalType,
    title: intl.get('Confirm.title'),
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      if (modalType === 1) {
        dispatch({
          type: 'huodongjilu/hideCanyurenModal',
        });
      } else if (modalType === 2) {
        dispatch({
          type: 'huodongjilu/delCanyuJl',
          payload: item,
          callback: () => {
            dispatch({
              type: 'huodongjilu/hideCanyurenModal',
            });
          },
        });
      }
      dispatch({
        type: 'huodongjilu/hideCanyurenModal',
      });
      dispatch({
        type: 'app/updataFormChange',
        payload: true,
      });
    },
    onCancel () {
      dispatch({
        type: 'huodongjilu/hideCanyurenModal',
      });
    },
  };

  const addModalProps = {
    width: 744,
    dispatch,
    visible: addModalVisible,
    maskClosable: false,
    title: isCanyuJlEdit ? '编辑参与人' : '增加参与人',
    wrapClassName: 'vertical-center-modal',
    filter: {
      ...query,
    },
    onOk (item) {
      const {
        index,
      } = item;
      if (index !== undefined && index !== null && index >= 0) {
        dispatch({
          type: 'huodongjilu/modifyCanyuJl',
          payload: item,
          callback: (data) => {
            dispatch({
              type: 'huodongjilu/hideAddCanyuJlModal',
            });
          },
        });
      } else {
        dispatch({
          type: 'huodongjilu/addCanyuJl',
          payload: item,
          callback: (data) => {
            dispatch({
              type: 'huodongjilu/hideAddCanyuJlModal',
            });
          },
        });
      }
      dispatch({
        type: 'app/updataFormChange',
        payload: true,
      });
    },
    onCancel () {
      dispatch({
        type: 'huodongjilu/hideAddCanyuJlModal',
      });
    },
  };

  const listProps = {
    pagination: false,
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
        type: 'huodongjilu/updateEditCanyuJl',
        payload: item,
      });
      dispatch({
        type: 'huodongjilu/showCanyurenModal',
        payload: {
          modalType: operation,
        },
      });
    },
    onEdit(item) {
      dispatch({
        type: 'huodongjilu/updateEditCanyuJl',
        payload: null,
      });
      dispatch({
        type: 'huodongjilu/updateEditCanyuJl',
        payload: item,
      });
      dispatch({
        type: 'huodongjilu/showAddCanyuJlModal',
      });
    },
  };

  return (
    <div className="content-inner">
      <Row className="content-inner-main">
        <Col span={24} className="content">
          <Row className="pgTitle">
            <Col span={6}>
              <Tag className="titleName">活动参与人</Tag>
            </Col>
            <Col span={18}>
              <div style={{float: 'right'}}>
                <Permissions all="sys:huodongjilu:edit">
                  <Button
                    className="btn"
                    onClick={() => {
                      onAdd();
                    }}
                  ><JXRSIcon type="add"/> 增加参与人</Button>
                </Permissions>
                <Button
                  className="btn"
                  onClick={() => {
                    onEdit();
                  }}
                ><JXRSIcon type="edit"/> 编辑参与人</Button>
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
      <Modal {...modalProps} />
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
    huodongjilu: state.huodongjilu,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Index)));
