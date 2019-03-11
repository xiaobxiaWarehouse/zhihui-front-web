import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {connect} from 'dva';
import intl from 'react-intl-universal';
import {Table} from 'antd';
import {Layout, Permissions} from 'components';
import {manyiduOption, getOption} from 'utils';

const CSS = Layout.styles;

const List = (props) => {
  const {
    huodongjilu,
    dispatch,
    onEdit,
    onModalItem,
    ...tableProps
  } = props;

  const {
    isCanyuJlEdit,
  } = huodongjilu;

  const onOperation = (record, operation) => {
    onModalItem(record, operation);
  };

  const columns = [
    {
      title: '参与人姓名',
      key: 'canyurenXm',
      render: (record) => {
        return record.canyurenXm ? record.canyurenXm : '-';
      },
      width: 120,
    },
    {
      title: '活动满意度',
      key: 'manyidu',
      render: (record) => {
        return record.manyidu ? getOption(record.manyidu, manyiduOption) : '-';
      },
      width: 120,
    },
    {
      title: '备注',
      key: 'beizhu',
      render: (record) => {
        return record.beizhu ? record.beizhu : '-';
      },
    },
  ];

  if (isCanyuJlEdit) {
    columns.push({
      title: '操作',
      render: (text, record, index) => {
        return (
          <div className={CSS.action}>
            <Permissions all="sys:huodongjilu:edit">
              <div
                type="primary"
                className="a-link-operation"
                onClick={(e) => {
                  onEdit({
                    ...text,
                    index,
                  });
                }}
              ><a>{intl.get('Operation.edit')}</a></div>
            </Permissions>
            <Permissions all="sys:huodongjilu:delete">
              <div
                type="primary"
                className="a-link-operation"
                onClick={(e) => {
                  onOperation({
                    ...text,
                    index,
                  }, 2);
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
        rowKey={(record, index) => index}
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
    huodongjilu: state.huodongjilu,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(List));
