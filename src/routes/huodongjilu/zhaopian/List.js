import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {connect} from 'dva';
import intl from 'react-intl-universal';
import {Button, Table} from 'antd';
import {config} from 'utils';
import {Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const {PROJECT} = config;

const List = (props) => {
  const {
    huodongjilu,
    dispatch,
    onUp,
    onDown,
    onDelete,
    imgLoad,
    viewImg,
    ...tableProps
  } = props;

  const {
    isCanyuJlEdit,
  } = huodongjilu;

  const {
    dataSource,
  } = tableProps;

  const columns = [
    {
      title: '编号',
      key: 'index',
      render: (record, row, index) => {
        return index + 1;
      },
    },
    {
      title: '活动照片',
      dataIndex: 'weizhi',
      render: (record) => {
        return (
          <div
            style={{
              width: 220,
              height: 220,
              overflow: 'hidden',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => { viewImg(record); }}
          >
            <img src={`${PROJECT}/oss/${record}?x-oss-process=image/resize,m_lfit,w_220,h_220/auto-orient,1`} alt="" />
          </div>
        );
      },
    },
    {
      title: '操作',
      key: 'cz',
      render: (record, row, index) => {
        return (
          <div>
            <Button
              disabled={index === 0}
              onClick={() => {
                onUp(index);
              }}
            >上移</Button>
            <Button
              disabled={index === Number(dataSource.length - 1)}
              style={{marginLeft: 10}}
              onClick={() => {
                onDown(index);
              }}
            >下移</Button>
            <Button
              className={CSS.deleteBtn}
              style={{marginLeft: 10}}
              type="danger"
              onClick={() => {
                onDelete(index);
              }}
            >删除</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{x: 530}}
        columns={columns}
        simple
        rowKey={(record, index) => index}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    huodongjilu: state.huodongjilu,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(List));
