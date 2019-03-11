import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Form, message} from 'antd';
import {upload, config} from 'utils';
import Xinxi from './xinxi';
import Modal from './ViewModal';

const {TYPE} = upload;


const Index = (props) => {
  const {
    dispatch,
    ruyuan,
    location,
  } = props;

  const {
    tijianXml,
    isAdd,
    tijianList,
    tijianXmlDetail,
    baogaoLb,
    bgCreateTime,
    currentBgIndex,
    currentImg,
    viewModalVisible,
    banben,
    shengqingList,
    tipModalVisible,
  } = ruyuan;

  const beforeUpload = (file, filelist) => {
    return false;
  };

  const listProps = {
    uploadProps: {
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
                tijianList.push({'01': `${data[0].name}`});
                dispatch({
                  type: 'ruyuan/changeTijianList',
                  payload: tijianList,
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
    },
    list: tijianList,
    onUp(index) {
      dispatch({
        type: 'ruyuan/onUpTijianList',
        payload: index,
      });
      dispatch({
        type: 'app/updataFormChange',
        payload: true,
      });
    },
    onDown(index) {
      dispatch({
        type: 'ruyuan/onDownTijianList',
        payload: index,
      });
      dispatch({
        type: 'app/updataFormChange',
        payload: true,
      });
    },
    onDelete(index) {
      dispatch({
        type: 'ruyuan/onDeleteTijianList',
        payload: index,
      });
      dispatch({
        type: 'app/updataFormChange',
        payload: true,
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
        type: 'ruyuan/showViewModal',
        payload: {
          currentImg: img,
        },
      });
    },
  };

  const xinxiProps = {
    baogaoLb,
    tijianXmlDetail,
    location,
    tijianList,
    isAdd,
    tijianXml,
    bgCreateTime,
    currentBgIndex,
    shengqingList,
    listProps,
    banben,
    tipModalVisible,
  };

  const modalProps = {
    width: 744,
    currentImg,
    visible: viewModalVisible,
    maskClosable: false,
    bodyStyle: { padding: '0'},
    title: '查看图片',
    wrapClassName: 'vertical-center-modal',
    onCancel () {
      dispatch({
        type: 'ruyuan/hideViewModal',
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
      <Xinxi {...xinxiProps} />
      {viewModalVisible && <Modal {...modalProps} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Index)));
