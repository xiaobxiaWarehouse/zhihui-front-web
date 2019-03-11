import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {Form, Modal, Table, Button} from 'antd';
import {Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const columns = [
  {
    title: '员工编号',
    dataIndex: 'bianhao',
    render: (record) => {
      return record || '-';
    },
  },
  {
    title: '员工工号',
    dataIndex: 'gonghao',
    render: (record) => {
      return record || '-';
    },
  },
  {
    title: '员工姓名',
    dataIndex: 'xingming',
    render: (record) => {
      return record || '-';
    },
  },
  {
    title: '员工手机',
    dataIndex: 'shouji',
    render: (record) => {
      return record || '-';
    },
  },
  {
    title: '员工岗位',
    dataIndex: 'gangwei',
    render: (record) => {
      return record || '-';
    },
  },
];

const modal = (props) => {
  const {
    list,
    onSelect,
    ...modalProps
  } = props;

  const rowSelection = {
    fixed: true,
    type: 'radio',
    onSelect,
  };

  return (
    <Modal {...modalProps} footer={null} className={CSS.addModal}>
      <Table
        bordered
        columns={columns}
        dataSource={list}
        rowSelection={rowSelection}
        simple
        rowKey={record => record.id}
        pagination={false}
      />
      <div className={CSS.buttonBox}>
        <Button
          className={CSS.searchBtn}
          onClick={() => {
            modalProps.onOk();
          }}
          type="primary"
        >确定</Button>
      </div>
    </Modal>
  );
};

modal.propTypes = {
  item: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(modal));
