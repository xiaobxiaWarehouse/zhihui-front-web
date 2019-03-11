import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {connect} from 'dva';
import intl from 'react-intl-universal';
import {Table} from 'antd';
import {Layout, Permissions} from 'components';

const CSS = Layout.styles;

const List = (props) => {
  const {
    yuangong,
    dispatch,
    onModalItem,
    onEdit,
    onAllocate,
    ...tableProps
  } = props;

  const {
    isEdit,
  } = yuangong;

  const onOperation = (record, operation) => {
    onModalItem(record, operation);
  };

  const columns = [
    {
      title: '员工工号',
      key: 'gonghao',
      render: (record) => {
        return record.gonghao ? record.gonghao : '-';
      },
      width: 120,
    },
    {
      title: '员工姓名',
      key: 'xingming',
      render: (record) => {
        return record.xingming ? record.xingming : '-';
      },
      width: 110,
    },
    {
      title: '手机号码',
      key: 'shouji',
      render: (record) => {
        return record.shouji ? record.shouji : '-';
      },
      width: 110,
    },
    {
      title: '员工岗位',
      key: 'gangwei',
      render: (record) => {
        return record.gangwei ? record.gangwei : '-';
      },
      width: 75,
    },
    {
      title: '授权角色',
      key: 'department',
      render: (record) => {
        return (record.roles && record.roles.length > 0) ? record.roles.map(item => item.name).join(',') : '-';
      },
      width: 75,
    },
  ];

  if (isEdit) {
    columns.push({
      title: '操作',
      render: (record) => {
        return (
          <div className={CSS.action}>
            <Permissions all="sys:user:zhuangtai">
              <div
                type="primary"
                className="a-link-operation"
                onClick={(e) => {
                  onOperation(record, 1);
                }}
              ><a>{intl.get(record.zhuangtai === 1 ? 'Operation.disable' : 'Operation.enable')}</a></div>
            </Permissions>
            <Permissions all="sys:user:edit">
              <div
                type="primary"
                className="a-link-operation"
                onClick={() => {
                  onEdit(record);
                }}
              ><a>{intl.get('Operation.edit')}</a></div>
            </Permissions>
            {/* <Permissions all="sys:user:allocate">
            <div
              type="primary"
              className="a-link-operation"
              onClick={() => {
                onAllocate(record);
              }}
            ><a>{intl.get('Operation.allocate')}</a></div>
            </Permissions> */}
            <Permissions all="sys:user:mima">
              <div
                type="primary"
                className="a-link-operation"
                onClick={() => {
                  onOperation(record, 2);
                }}
              ><a>{intl.get('Operation.reset.mima')}</a></div>
            </Permissions>
            {/* <Permissions all="sys:user:delete">
              <div
                type="primary"
                className="a-link-operation"
                onClick={() => {
                  onOperation(record, 3);
                }}
              ><a>{intl.get('Operation.delete')}</a></div>
            </Permissions> */}
          </div>
        );
      },
      width: 180,
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
        rowKey={record => record.shouji}
      />
    </div>
  );
};


List.propTypes = {
  onEditItem: PropTypes.func,
  onModalItem: PropTypes.func,
  onViewItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    yuangong: state.yuangong,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(List));
