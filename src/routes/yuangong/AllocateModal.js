import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import { Table, Button, Modal, Form, Input, Select, Radio, Spin } from 'antd';
import {Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TextArea} = Input;
const {Option} = Select;

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
  style: {
  },
};

const AllocateModal = (props) => {
  const {
    yuangong,
    onOk,
    dispatch,
    ...modalProps
  } = props;

  const {
    loading,
    allRole,
    selectedRoleIds,
  } = yuangong;

  const onSubmit = () => {
    onOk(selectedRoleIds);
  };

  const rowSelection = {
    selectedRowKeys: selectedRoleIds,
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch({
        type: 'yuangong/updateSelectedRoleIds',
        payload: selectedRowKeys,
      });
    },
  };

  const listProps = {
    pagination: false,
    dataSource: allRole,
    onModalItem(item, operation) {
      dispatch({
        type: 'yuangong/showModal',
        payload: {
          modalType: operation,
          currentItem: item,
        },
      });
    },
    rowSelection,
  };

  const columns = [
    {
      title: '角色代码',
      key: 'code',
      render: (record) => {
        return record.code ? record.code : '-';
      },
      width: 120,
    },
    {
      title: '角色名',
      key: 'name',
      render: (record) => {
        return record.name ? record.name : '-';
      },
      width: 110,
    },
    {
      title: '角色描述',
      key: 'description',
      render: (record) => {
        return record.description ? record.description : '-';
      },
      width: 110,
    },
  ];

  return (
    <Modal
      className={CSS.addModal}
      {...modalProps}
      footer={[
        <Button
          className={CSS.searchBtn}
          onClick={() => {
            onSubmit();
          }}
          type="primary"
          key="submit"
        >确认</Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Table
          {...listProps}
          bordered
          scroll={{x: 530}}
          columns={columns}
          simple
          rowKey={record => record.id}
        />
      </Spin>
    </Modal>
  );
};

AllocateModal.propTypes = {
  item: PropTypes.object,
  onFilterChange: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    yuangong: state.yuangong,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AllocateModal)));
