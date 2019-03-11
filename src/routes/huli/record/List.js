import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import { Table, Row, Col, Button, Icon } from 'antd';
import {Layout, Permissions} from 'components';
import {getOption} from 'utils';
import styles from './index.less';

const CSS = Layout.styles;

const List = (props) => {
  const {
    huli,
    onAddItem,
    onModalItem,
    ...tableProps
  } = props;

  const {
    isEdit,
    allShichang,
  } = huli;

  const onOperation = (record, operation) => {
    onModalItem(record, operation);
  };


  const columns = [
    {
      title: '序号',
      key: 'xuhao',
      render: (record, row, index) => {
        return index + 1;
      },
    },
    {
      title: '项目名称',
      dataIndex: 'xiangmu',
    },
    {
      title: '子项目',
      dataIndex: 'zixiangmu',
    },
    {
      title: '开始时间',
      dataIndex: 'kaishiSj',
      render: (text) => {
        return <span>{moment(text).format('HH:mm')}</span>;
      },
    },
    {
      title: '时长',
      dataIndex: 'shichang',
      render: (record) => {
        return (record && getOption(`${record}`, allShichang)) || '-';
      },
    },
    {
      title: '项目描述',
      dataIndex: 'miaoshu',
    },
    {
      title: '护理员',
      dataIndex: 'huliyuanXm',
      render: (record) => {
        return record || '-';
      },
    },
  ];

  if (isEdit) {
    columns.push({
      title: '操作',
      render: (record) => {
        return (
          <div className={CSS.action} style={{justifyContent: 'center'}}>
            <Permissions all="sys:hulijilu:delete">
              <div
                type="primary"
                className="a-link-operation"
                onClick={() => {
                  onOperation(record, 2);
                }}
              ><a>{intl.get('Operation.delete')}</a></div>
            </Permissions>
          </div>
        );
      },
      width: 80,
    });
  }

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{x: 530}}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  );
};


List.propTypes = {
  onModalItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    huli: state.huli,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(List));
