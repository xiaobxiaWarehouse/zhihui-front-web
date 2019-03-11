import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Modal, Table, Button} from 'antd';
import {Layout} from 'components';
import {getOption} from 'utils';

const CSS = Layout.styles;

const modal = (props) => {
  const {
    list,
    onSelect,
    currentSelectData,
    app: {
      allXingbie,
    },
    ...modalProps
  } = props;

  const rowSelection = {
    type: 'radio',
    onSelect,
  };

  const columns = [
    {
      title: '休养员姓名',
      dataIndex: 'xingming',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '性别',
      dataIndex: 'xingbie',
      render: (record) => {
        return <span>{getOption(record, allXingbie) || '-'}</span>;
      },
    },
    {
      title: '年龄',
      dataIndex: 'nianling',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '身份证',
      dataIndex: 'shenfenzheng',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '联系人姓名',
      dataIndex: 'lianxirenXm',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '联系人电话',
      dataIndex: 'lianxirenDh',
      render: (record) => {
        return record || '-';
      },
    },
  ];

  return (
    <Modal {...modalProps} footer={null} className={CSS.addModal}>
      <Table
        bordered
        columns={columns}
        dataSource={list}
        rowSelection={rowSelection}
        simple
        rowKey={(record, index) => index}
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
    yuding: state.yuding,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(modal));
