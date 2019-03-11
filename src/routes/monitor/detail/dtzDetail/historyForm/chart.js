import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Row, Col, Table, Button, Select, message } from 'antd';
import Nav from '../nav';
import styles from './index.less';

const navList = [
  { id: 1, name: '最近监测数据' },
  { id: 2, name: '历史表单数据' },
  { id: 3, name: '历史图表数据' },
];

const signTypeOption = [
  { id: '-1', name: '全部' },
  { id: 'weight', name: '体重' },
  { id: 'bg', name: '血糖' },
  { id: 'spo2', name: '血氧' },
  { id: 'hr', name: '心率/脉搏' },
  { id: 'temp', name: '体温' },
  { id: 'bp', name: '血压' },
];

const zuijinOption = [
  { id: 1, name: '最近1天' },
  { id: 7, name: '最近7天' },
  { id: 15, name: '最近15天' },
  { id: 30, name: '最近30天' },
];

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
  style: {
  },
};

const FormItem = Form.Item;
const { Option } = Select;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onchangePage,
      next,
      prev,
      location,
      onFilterChange,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue },
      ...tableProps
    } = this.props;

    const onChangeSignType = (val) => {
      let fields = getFieldsValue();
      let params = {
        ...fields,
      };
      if (val) {
        params.signType = val;
      }
      if (fields.kaishiSj || fields.jieshuSj) {
        if (!fields.kaishiSj || !fields.jieshuSj) {
          message.error('请完整选择开始时间和结束时间');
          return;
        }
        params.kaishiSj = moment(fields.kaishiSj).format('YYYYMMDD');
        params.jieshuSj = moment(fields.jieshuSj).format('YYYYMMDD');
      }
      onFilterChange(params);
    };

    const onChangeZuijin = (val) => {
      let fields = getFieldsValue();
      let params = {
        ...fields,
        kaishiSj: undefined,
        jieshuSj: undefined,
      };
      if (val) {
        params.zuijin = val;
      }
      onFilterChange(params);
      setFieldsValue({
        kaishiSj: undefined,
        jieshuSj: undefined,
      });
    };

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
            case 'hr':
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
            case 'hr':
              return <span>{`${item.hr}次/分`}</span>;
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
      filter: <Form>
        <Row type="flex" justify="end">
          <Col span={12}>
            <FormItem style={{ marginRight: 20 }}>
              {getFieldDecorator('zuijin', {
                initialValue: '1',
                rules: [],
              })(<Select
                allowClear={false}
                style={{width: '100%'}}
                placeholder="请选择最近周期"
                onChange={(val) => {
                    onChangeZuijin(val);
                  }}
              >
                {zuijinOption.map((item) => {
                    return (
                      <Option key={item.id} value={String(item.id)}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('signType', {
                initialValue: '-1',
                rules: [],
              })(<Select
                allowClear={false}
                style={{width: '100%'}}
                placeholder="请选择检测类型"
                onChange={(val) => {
                    onChangeSignType(val);
                  }}
              >
                {signTypeOption.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>)}
            </FormItem>
          </Col>
        </Row>
      </Form>,
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
                <Row>
                  <Col span={24}>
                    <div className={styles.chartBox}>
                      <Table
                        {...tableProps}
                        scroll={{ x: 600 }}
                        columns={columns}
                        simple
                        rowKey={record => record.id}
                      />
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col span={24}>
                    <div
                      className={styles.chartBox}
                      style={{ textAlign: 'right', border: 'none' }}
                    >
                      <Button
                        disabled={!prev.length > 0}
                        type="primary"
                        onClick={() => {
                          onchangePage('prev');
                        }}
                      >
                        上一页
                      </Button>
                      <Button
                        disabled={!next}
                        type="primary"
                        style={{ marginLeft: 20 }}
                        onClick={() => {
                          onchangePage('next');
                        }}
                      >
                        下一页
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default connect(mapStateToProps)(Form.create()(Chart));
