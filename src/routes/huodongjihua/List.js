import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import {Table} from 'antd';
import {Layout, Permissions} from 'components';

const CSS = Layout.styles;

const List = (props) => {
  const {
    huodongjihua,
    dispatch,
    onModalItem,
    ...tableProps
  } = props;

  const {
    isEdit,
  } = huodongjihua;

  const onOperation = (record, operation) => {
    onModalItem(record, operation);
  };

  const columns = [
    {
      title: '活动项目',
      key: 'xiangmu',
      render: (record) => {
        return record.xiangmu ? record.xiangmu : '-';
      },
      width: 120,
    },
    {
      title: '活动名称',
      key: 'mingcheng',
      render: (record) => {
        return record.mingcheng ? record.mingcheng : '-';
      },
    },
    {
      title: '活动时间',
      key: 'shijian',
      render: (record) => {
        return record.shijian || '-';
      },
      width: 120,
    },
    {
      title: '活动内容',
      key: 'neirong',
      render: (record) => {
        return record.neirong ? record.neirong : '-';
      },
    },
    {
      title: '状态',
      render: (record) => {
        switch (record.zhuangtai) {
          case 1:
            return <span className={CSS.green}>有效</span>;
          case 2:
            return <span className={CSS.red}>无效</span>;
          default:
            return <span>-</span>;
        }
      },
      width: 60,
    },
  ];

  if (isEdit) {
    columns.push({
      title: '操作',
      render: (record) => {
        return (
          <div className={CSS.action} style={{justifyContent: 'center'}}>
            <Permissions all="sys:huodongjihua:edit">
              <div
                type="primary"
                className="a-link-operation"
                onClick={(e) => {
                  onOperation(record, 1);
                }}
              ><a>{intl.get(record.zhuangtai === 1 ? 'Operation.disable' : 'Operation.enable')}</a></div>
            </Permissions>
            <Permissions all="sys:huodongjihua:delete">
              <div
                type="primary"
                className="a-link-operation"
                onClick={(e) => {
                  onOperation(record, 2);
                }}
              ><a>{intl.get('Operation.delete')}</a></div>
            </Permissions>
          </div>
        );
      },
      width: 100,
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
    huodongjihua: state.huodongjihua,
  };
}

export default injectIntl(connect(mapStateToProps)(List));
