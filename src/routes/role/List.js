import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {Table} from 'antd';
import {Layout, Permissions} from 'components';

const CSS = Layout.styles;

const List = (props) => {
  const {
    role,
    dispatch,
    onModalItem,
    onEdit,
    onAllocate,
    ...tableProps
  } = props;

  const {
    isEdit,
  } = role;

  const onOperation = (record, operation) => {
    onModalItem(record, operation);
  };

  const columns = [
    {
      title: '角色名',
      key: 'name',
      render: (record) => {
        return record.name ? record.name : '-';
      },
      width: 120,
    },
    {
      title: '创建时间',
      key: 'createTime',
      render: (record) => {
        return record.createTime ? record.createTime : '-';
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

  if (isEdit) {
    columns.push({
      title: '操作',
      render: (record) => {
        return (
          <div className={CSS.action} style={{justifyContent: 'center'}}>
            <div
              type="primary"
              className="a-link-operation"
              onClick={() => {
                onAllocate(record);
              }}
            ><a>{intl.get('Operation.allocate')}</a></div>
            {/* <div
              type="primary"
              className="a-link-operation"
              onClick={() => {
                onOperation(record, 2);
              }}
            ><a>{intl.get('Operation.delete')}</a></div> */}
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
  onEditItem: PropTypes.func,
  onModalItem: PropTypes.func,
  onViewItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    role: state.role,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(List));
