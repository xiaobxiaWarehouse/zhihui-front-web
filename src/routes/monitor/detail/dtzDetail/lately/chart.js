import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Row, Col, Table } from 'antd';
import Nav from '../nav';
import styles from './index.less';

const navList = [
  { id: 1, name: '最近监测数据' },
  { id: 2, name: '历史表单数据' },
  { id: 3, name: '历史图表数据' },
];

const Chart = (props) => {
  const { location, ...tableProps } = props;

  const columns = [
    {
      title: '测量时间',
      dataIndex: 'shijian',
      render: (record) => {
        return record ? moment(record).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '测量类目',
      dataIndex: 'signType',
      render: (record) => {
        switch (record) {
          case 'weight':
            return <span>体重</span>;
          case 'bg':
            return <span>血糖</span>;
          case 'spo2':
            return <span>血氧</span>;
          case 'pulse':
            return <span>心率/脉搏</span>;
          case 'temp':
            return <span>体温</span>;
          case 'bp':
            return <span>血压</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '测量数值',
      dataIndex: 'clNum',
      render: (record, item) => {
        switch (item.signType) {
          case 'weight':
            return <span>{`${item.weight}kg`}</span>;
          case 'bg':
            return <span>{`${item.bg} mmol/L`}</span>;
          case 'spo2':
            return <span>{`${item.spo2}%`}</span>;
          case 'pulse':
            return <span>{`${item.pulse}次/分`}</span>;
          case 'temp':
            return <span>{`${item.temp}℃`}</span>;
          case 'bp':
            return <span>{`${item.dbp}mmHg/${item.sbp}mmHg`}</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      render: (record) => {
        return record || '-';
      },
    },
  ];
  const navProps = {
    navList,
    location,
  };

  return (
    <div>
      <div>
        <div className="monitorNav">
          <Nav {...navProps} />
        </div>
        <div className="chartW" style={{ padding: 17 }}>
          <Row gutter={10}>
            <Col span={24}>
              <div className={styles.chartBox}>
                <Table
                  {...tableProps}
                  scroll={{ x: 600 }}
                  columns={columns}
                  simple
                  rowKey={(record, index) => index}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default connect(mapStateToProps)(Form.create()(Chart));
