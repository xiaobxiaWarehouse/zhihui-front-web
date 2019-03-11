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
    priv,
    dispatch,
    onModalItem,
    ...tableProps
  } = props;

  const onOperation = (record, operation) => {
    onModalItem(record, operation);
  };

  const columns = [
    {
      title: '权限类型',
      key: 'type',
      render: (record) => {
        switch (record.type) {
          case 0:
            return <span className={CSS.green}>目录</span>;
          case 1:
            return <span className={CSS.orange}>菜单</span>;
          case 2:
            return <span className={CSS.red}>操作</span>;
          default:
            return <span>-</span>;
        }
      },
      width: 60,
    },
    {
      title: '权限名',
      key: 'name',
      render: (record) => {
        return record.name ? record.name : '-';
      },
      width: 120,
    },
    {
      title: '权限编码',
      key: 'code',
      render: (record) => {
        return record.code ? record.code : '-';
      },
      width: 110,
    },
    {
      title: '权限描述',
      key: 'description',
      render: (record) => {
        return record.description ? record.description : '-';
      },
      width: 110,
    },
    // {
    //   title: '操作',
    //   render: (record) => {
    //     return (
    //       <div className={CSS.action}>
    //         <div
    //           type="primary"
    //           className="a-link-operation"
    //           onClick={(e) => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             onOperation(record, 1);
    //           }}
    //         ><a>{intl.get(record.zhuangtai === 1 ? 'Operation.disable' : 'Operation.enable')}</a></div>
    //       </div>
    //     );
    //   },
    //   width: 50,
    // },
  ];

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
    priv: state.priv,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(List));
