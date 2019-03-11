import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {JXRS, Layout, Permissions} from 'components';
import {classnames, config, upload} from 'utils';
import {Button, Form, Col, Row, Tag, Upload, message} from 'antd';

import List from './List';
import Modal from './Modal';
import ViewModal from './ViewModal';

const {Header} = Layout;
const CSS = Layout.styles;
const {PROJECT} = config;
const FormItem = Form.Item;
const JXRSIcon = JXRS.Icon;
const {TYPE} = upload;

const Index = (props) => {
  const {
    huodongjilu,
    dispatch,
    location,
  } = props;

  const {
    modalVisible,
    canyuJlModalVisible: addModalVisible,
    isMotion,
    editData,
    isCanyuJlEdit,
    currentImgIndex,
    currentImg,
    viewModalVisible,
  } = huodongjilu;

  const {
    zhaopian,
  } = editData;

  let list = zhaopian || [];

  const {pathname, search} = location;
  const query = queryString.parse(search);

  const modalProps = {
    width: 397,
    item: editData,
    visible: modalVisible,
    maskClosable: false,
    title: intl.get('Confirm.title'),
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'huodongjilu/onDeleteZhaopian',
        payload: currentImgIndex,
      });
      dispatch({
        type: 'huodongjilu/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'huodongjilu/hideModal',
      });
    },
  };

  const addModalProps = {
    width: 744,
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
    },
    onCancel () {
      dispatch({
        type: 'huodongjilu/hideAddCanyuJlModal',
      });
    },
  };

  const beforeUpload = (file, filelist) => {
    return false;
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
    onUp(index) {
      dispatch({
        type: 'huodongjilu/onUpZhaopian',
        payload: index,
      });
    },
    onDown(index) {
      dispatch({
        type: 'huodongjilu/onDownZhaopian',
        payload: index,
      });
    },
    onDelete(index) {
      dispatch({
        type: 'huodongjilu/showModal',
        payload: {
          currentImgIndex: index,
        },
      });
    },
    imgLoad(src) {
      let width;
      let height;
      let img = new Image();
      img.src = src;
      return img.width > img.height;
    },
    viewImg(img) {
      dispatch({
        type: 'huodongjilu/showViewModal',
        payload: {
          currentImg: img,
        },
      });
    },
  };

  const uploadProps = {
    beforeUpload,
    showUploadList: false,
    onChange({ file, fileList }) {
      dispatch({
        type: 'upload/getConfig',
        payload: {},
        callback: (uploadConfig) => {
          dispatch({
            type: 'app/loading',
            payload: true,
          });
          upload.upload(uploadConfig, [file], (data) => {
            dispatch({
              type: 'app/loading',
              payload: false,
            });
            if (!data.status) {
              zhaopian.push({weizhi: `${data[0].name}`});
              dispatch({
                type: 'huodongjilu/updateZhaopian',
                payload: zhaopian,
              });
              dispatch({
                type: 'app/updataFormChange',
                payload: true,
              });
            } else {
              message.error('文件上传异常');
              console.log(data.status, data.code, data.name, data.message);
            }
          }, TYPE.OSS);
        },
      });
    },
  };

  const viewModalProps = {
    width: 744,
    currentImg,
    visible: viewModalVisible,
    maskClosable: false,
    bodyStyle: { padding: '0'},
    title: '查看图片',
    wrapClassName: 'vertical-center-modal',
    onCancel () {
      dispatch({
        type: 'huodongjilu/hideViewModal',
        payload: {
          currentImg: null,
        },
      });
    },
    imgLoad(src) {
      let width;
      let height;
      let img = new Image();
      img.src = src;
      return img.width > img.height;
    },
  };

  return (
    <div className="content-inner">
      <Row className="content-inner-main">
        <Col span={24} className="content">
          <Row className="pgTitle">
            <Col span={6}>
              <Tag className="titleName">活动照片附件</Tag>
            </Col>
            <Col span={18}>
              <div style={{float: 'right'}}>
                <Permissions all="sys:huodongjilu:edit">
                  <Upload {...uploadProps}>
                    <Button
                      className="btn"
                    ><JXRSIcon type="upload"/> 上传照片</Button>
                  </Upload>
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
      {viewModalVisible && <ViewModal {...viewModalProps} />}
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
