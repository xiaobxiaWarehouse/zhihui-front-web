import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {Table} from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;

const List = (props) => {
  const {
    onEditItem,
    onModalItem,
    ...tableProps
  } = props;

  const onOperation = (record, operation) => {
    onModalItem(record, operation);
  };

  const onEdit = (path, params) => {
    onEditItem(path, params);
  };

  const columns = [
    {
      title: intl.get('Account.shouji'),
      dataIndex: 'shouji',
      width: 240,
    },
    {
      title: intl.get('Account.name'),
      dataIndex: 'name',
      width: 240,
    },
    {
      title: intl.get('Account.status'),
      render: (record) => {
        switch (record.zhuangtai) {
          case 2:
            return <span className={CSS.red}>{intl.get('Account.status.option.status0')}</span>;
          case 1:
            return <span className={CSS.green}>{intl.get('Account.status.option.status1')}</span>;
          default:
            return <span>{intl.get('Account.status.option.notset')}</span>;
        }
      },
      width: 60,
    },
    {
      title: intl.get('Operation.operation'),
      render: (record) => {
        return (
          <div className={CSS.action}>
            <div
              type="primary"
              className="a-link-operation"
              onClick={() => {
                onOperation(record, 1);
              }}
            ><a>{intl.get(record.zhuangtai === 1 ? 'Operation.disable' : 'Operation.enable')}</a></div>
            <div
              type="primary"
              className="a-link-operation"
              onClick={() => {
                onEdit('/user/edit', {id: record.id});
              }}
            ><a>{intl.get('Operation.edit')}</a></div>
            <div
              type="primary"
              className="a-link-operation"
              onClick={() => {
                onOperation(record, 2);
              }}
            ><a>{intl.get('Operation.reset.mima')}</a></div>
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
        scroll={{x: 800}}
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

export default injectIntl(connect(({yuding}) => ({yuding}))(List));
