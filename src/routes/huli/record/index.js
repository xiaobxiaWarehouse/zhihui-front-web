import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {JXRS, Permissions} from 'components';
import {Button, Col, Row, Tag, message} from 'antd';
import List from './List';
import Xinxi from './Xinxi';
import Modal from './Modal';
import AddModal from './AddModal';
import PdfModal from './pdfModal';

const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    huli,
    dispatch,
    history,
    location,
    app: {
      isFormChange,
    },
  } = props;

  const {
    modalVisible,
    addModalVisible,
    pdfModalVisible,
    modalType,
    editData,
    isEdit,
    editRecord,
    listQuery,
  } = huli;
  const {pathname, search} = location;
  const query = queryString.parse(search);
  const onAdd = () => {
    dispatch({
      type: 'huli/getYuangongList',
      payload: {
        zhuangtai: 1,
      },
    });
    dispatch({
      type: 'huli/showAddModalAll',
    });
  };

  const onEdit = () => {
    dispatch({
      type: 'huli/updateIsEdit',
      payload: {
        isEdit: !isEdit,
      },
    });
  };

  const modalProps = {
    width: 397,
    item: editRecord,
    visible: modalVisible,
    maskClosable: false,
    modalType,
    title: intl.get('Confirm.title'),
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      if (modalType === 2) {
        dispatch({
          type: 'huli/delHuli',
          payload: {
            id: item.id,
          },
          callback: () => {
            dispatch({
              type: 'huli/getSuoyin',
              payload: query,
            });
            dispatch({
              type: 'app/updataFormChange',
              payload: true,
            });
          },
        });
      }
      dispatch({
        type: 'huli/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'huli/hideModal',
      });
    },
  };

  const addModalProps = {
    width: 744,
    dispatch,
    visible: addModalVisible,
    maskClosable: false,
    title: '增加条目',
    wrapClassName: 'vertical-center-modal',
    filter: {
      ...query,
    },
    onOk(item) {
      const {
        kaishiSj,
      } = item;
      const {
        riqi,
      } = query;
      dispatch({
        type: 'huli/addHuli',
        payload: {
          riqi,
          suoyin: editData.id,
          huliJl: [{
            ...item,
            kaishiSj: `${riqi}${kaishiSj.format('HHmm')}00`,
          }],
        },
        callback: (data) => {
          message.success('增加条目成功');
          dispatch({
            type: 'huli/hideAddModal',
          });
          dispatch({
            type: 'app/updataFormChange',
            payload: true,
          });
          dispatch(routerRedux.push({
            pathname: '/huli/record',
            search: queryString.stringify({
              ...query,
            }),
          }));
        },
      });
    },
    onCancel () {
      dispatch({
        type: 'huli/hideAddModal',
      });
    },
  };

  const pdfModalProps = {
    width: 500,
    visible: pdfModalVisible,
    maskClosable: false,
    title: '导出PDF',
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'huli/exportHulijilu',
        payload: {
          email: item.email,
          suoyin: [query.suoyin],
          kaishiSj: query.riqi,
          jieshuSj: query.riqi,
        },
        callback: () => {
          dispatch({type: 'app/checkLogin'});
        },
      });
      dispatch({
        type: 'huli/hidePdfModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'huli/hidePdfModal',
      });
    },
  };

  const listProps = {
    isEdit,
    pagination: false,
    dataSource: editData && editData.huliJl,
    onAddItem() {
      dispatch({
        type: 'huli/showAddModal',
      });
    },
    onModalItem(item, operation) {
      dispatch({
        type: 'huli/updateEditRecord',
        payload: {
          ...item,
        },
      });
      dispatch({
        type: 'huli/showModal',
        payload: {
          modalType: operation,
        },
      });
    },
  };

  const xinxiProps = {
    editData,
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        search: queryString.stringify({
          ...query,
          ...value,
        }),
      }));
    },
    filter: {
      ...query,
    },
  };

  const onBack = (type, params) => {
    if (isFormChange) {
      dispatch({
        type: 'app/changeModalVisible',
        payload: {
          modalVisible: true,
          type,
          queryParams: params,
        },
      });
    } else if (type === 1) {
      history.goBack();
    } else {
      dispatch(routerRedux.push({
        pathname: type,
        search: queryString.stringify(params),
      }));
    }
  };

  const showPdfModal = () => {
    dispatch({
      type: 'huli/showPdfModal',
    });
  };

  return (
    <div className="content-inner bgWhite">
      <div className="add-wrap">
        <div className="header">
          <div className="navGroup">
            <Row className="nav">
              <Col className="title">记录日常护理</Col>
              <Col className="navBtn">
                <Button
                  type="primary"
                  style={{marginRight: 10}}
                  onClick={() => {
                    onBack(query.from === '1' ? '/huli/list' : '/dangan/detail', query.from === '1' ? {...listQuery} : {id: query.from, suoyin: query.suoyin});
                  }}
                ><JXRSIcon type="left"/> 返回</Button>
                <Button
                  type="primary"
                  style={{marginRight: 10}}
                  onClick={() => {
                    showPdfModal();
                  }}
                > 导出PDF</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch({
                      type: 'app/changeIsHomeBack',
                      payload: true,
                    });
                    onBack('/home');
                  }}
                ><JXRSIcon type="home"/> 首页</Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className="mainRaw" style={{padding: '28px 0'}}>
          <Xinxi {...xinxiProps} />
          <Row style={{padding: '0 28px'}}>
            <Col span={24} className="content">
              <Row className="pgTitle">
                <Col span={6}>
                  <Tag className="titleName">护理项目</Tag>
                </Col>
                <Col span={18}>
                  <div style={{float: 'right'}}>
                    <Permissions all="sys:hulijilu:add">
                      <Button
                        className="btn"
                        onClick={() => {
                          onAdd();
                        }}
                      ><JXRSIcon type="add"/> 增加条目</Button>
                    </Permissions>
                    <Button
                      className="btn"
                      onClick={() => {
                        onEdit();
                      }}
                    ><JXRSIcon type="edit"/> 编辑条目</Button>
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
      </div>
      {modalVisible && <Modal {...modalProps} />}
      {addModalVisible && <AddModal {...addModalProps}/>}
      {pdfModalVisible && <PdfModal {...pdfModalProps} />}
    </div>
  );
};

Index.propTypes = {
  userListProps: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    huli: state.huli,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
