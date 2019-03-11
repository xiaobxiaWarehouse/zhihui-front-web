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
    chuangwei,
    dispatch,
    onModalItem,
    onEdit,
    ...tableProps
  } = props;

  const {
    isEdit,
  } = chuangwei;

  const {pagination} = tableProps;

  const {
    current,
    pageSize,
  } = pagination;

  const onOperation = (record, operation) => {
    onModalItem(record, operation);
  };

  const columns = [
    {
      title: '序号',
      key: 'index',
      render: (text, record, index) => {
        return ((current - 1) * pageSize) + index + 1;
      },
      width: 60,
    },
    {
      title: '楼号',
      key: 'louhao',
      render: (record) => {
        return record.louhao ? record.louhao : '-';
      },
      width: 80,
    },
    {
      title: '楼层',
      key: 'louceng',
      render: (record) => {
        return record.louceng ? record.louceng : '-';
      },
      width: 80,
    },
    {
      title: '房号',
      key: 'fanghao',
      render: (record) => {
        return record.fanghao ? record.fanghao : '-';
      },
      width: 100,
    },
    {
      title: '床号',
      key: 'chuanghao',
      render: (record) => {
        return record.chuanghao ? record.chuanghao : '-';
      },
      width: 80,
    },
    {
      title: '床位类型',
      key: 'leixing',
      render: (record) => {
        switch (record.leixing) {
          case 1:
            return <span>动态床位</span>;
          case 2:
            return <span>固定床位</span>;
          case -1:
            return <span>全部</span>;
          default:
            return <span>-</span>;
        }
      },
      width: 100,
    },
    {
      title: '启/禁用',
      render: (record) => {
        switch (record.zhuangtai) {
          case 1:
            return (<div>
              <div className={CSS.action} style={{justifyContent: 'center'}}>
                {/* <div
                  type="primary"
                  className="a-link-operation"
                ><span>空</span></div> */}
                {/* <Permissions all="sys:chuangwei:zhuangtai"> */}
                <div
                  type="primary"
                  className={record.leixing === 2 ? 'a-link-operation' : 'a-link-operation-disabled'}
                  onClick={(e) => {
                    onOperation(record, 1);
                  }}
                ><a disabled={record.leixing === 1 && true}>{intl.get(record.zhuangtai === 1 ? 'Operation.disable' : 'Operation.enable')}</a></div>
                {/* </Permissions> */}
                { isEdit && <Permissions all="sys:chuangwei:delete">
                  <div
                    type="primary"
                    className={record.leixing === 2 ? 'a-link-operation' : 'a-link-operation-disabled'}
                    onClick={() => {
                      onOperation(record, 2);
                    }}
                  ><a disabled={record.leixing === 1 && true}>{intl.get('Operation.delete')}</a></div>
                </Permissions>}
                { isEdit && <Permissions all="sys:chuangwei:edit">
                  <div
                    type="primary"
                    className={record.leixing === 2 ? 'a-link-operation' : 'a-link-operation-disabled'}
                    onClick={() => {
                      onEdit(record);
                    }}
                  ><a disabled={record.leixing === 1 && true}>{intl.get('Operation.edit')}</a></div>
                </Permissions>}
              </div>
            </div>);
          case 2:
            return (<div>
              <div className={CSS.action} style={{justifyContent: 'center'}}>
                <div
                  type="primary"
                  className="a-link-operation"
                ><span className={CSS.orange}>已预定</span></div>
              </div>
            </div>);
          case 3:
            return (<div>
              <div className={CSS.action} style={{justifyContent: 'center'}}>
                <div
                  type="primary"
                  className="a-link-operation"
                ><span className={CSS.green}>已申请</span></div>
              </div>
            </div>);
          case 4:
            return (<div>
              <div className={CSS.action} style={{justifyContent: 'center'}}>
                <div
                  type="primary"
                  className="a-link-operation"
                ><span>已入住</span></div>
              </div>
            </div>);
          case 5:
            return (<div>
              <div className={CSS.action} style={{justifyContent: 'center'}}>
                {/* <div
                  type="primary"
                  className="a-link-operation"
                ><span className={CSS.red}>不可用</span></div> */}
                {/* <Permissions all="sys:chuangwei:zhuangtai"> */}
                <div
                  type="primary"
                  className={record.leixing === 2 ? 'a-link-operation' : 'a-link-operation-disabled'}
                  onClick={(e) => {
                    onOperation(record, 1);
                  }}
                ><a disabled={record.leixing === 1 && true}>{intl.get(record.zhuangtai === 1 ? 'Operation.disable' : 'Operation.enable')}</a></div>
                {/* </Permissions> */}
                { isEdit && <Permissions all="sys:chuangwei:delete">
                  <div
                    type="primary"
                    className={record.leixing === 2 ? 'a-link-operation' : 'a-link-operation-disabled'}
                    onClick={() => {
                      onOperation(record, 2);
                    }}
                  ><a disabled={record.leixing === 1 && true}>{intl.get('Operation.delete')}</a></div>
                </Permissions>}
                { isEdit && <Permissions all="sys:chuangwei:edit">
                  <div
                    type="primary"
                    className={record.leixing === 2 ? 'a-link-operation' : 'a-link-operation-disabled'}
                    onClick={() => {
                      onEdit(record);
                    }}
                  ><a disabled={record.leixing === 1 && true}>{intl.get('Operation.edit')}</a></div>
                </Permissions>}
              </div>
            </div>);
          default:
            return '-';
        }
      },
      width: isEdit ? 130 : 80,
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
    chuangwei: state.chuangwei,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(List));
