import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Button, Form, Row, Col, Upload, Table} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import {config} from 'utils';

const CSS = Layout.styles;
const JXRSIcon = JXRS.Icon;
const {PROJECT} = config;

const List = (props) => {
  const {
    list,
    uploadProps,
    onUp,
    onDown,
    onDelete,
    viewImg,
  } = props;

  const columns = [
    {
      title: '页码',
      key: 'index',
      render: (record, row, index) => {
        return index + 1;
      },
    },
    {
      title: '页面',
      dataIndex: '01',
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
            <Permissions all="sys:tijian:edit">
              <Button
                disabled={index === 0}
                onClick={() => {
                  onUp(index);
                }}
              >上移</Button>
            </Permissions>
            <Permissions all="sys:tijian:edit">
              <Button
                disabled={index === Number(list.length - 1)}
                style={{marginLeft: 10}}
                onClick={() => {
                  onDown(index);
                }}
              >下移</Button>
            </Permissions>
            <Permissions all="sys:tijian:edit">
              <Button
                className={CSS.deleteBtn}
                style={{marginLeft: 10}}
                type="danger"
                onClick={() => {
                  onDelete(index);
                }}
              >删除</Button>
            </Permissions>
          </div>
        );
      },
    },
  ];

  return (
    <Row style={{padding: '0 28px'}}>
      <Col span={24} className="content">
        <Row className="pgTitle">
          <Col span={24}>
            <div style={{float: 'right'}}>
              <Permissions all="sys:tijian:edit">
                <Upload {...uploadProps}>
                  <Button
                    className="btn"
                  ><JXRSIcon type="upload"/> 上传照片</Button>
                </Upload>
              </Permissions>
            </div>
          </Col>
        </Row>
        <Row style={{paddingTop: 15, paddingBottom: 15}}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              style={{marginTop: 12}}
              columns={columns}
              rowKey={(record, index) => index}
              dataSource={list}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(List)));
