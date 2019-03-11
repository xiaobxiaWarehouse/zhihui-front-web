import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Select } from 'antd';
import { Charts } from 'components';
import Nav from '../nav';
import styles from './index.less';

const navList = [
  { id: 1, name: '最近监测数据' },
  { id: 2, name: '历史表单数据' },
  { id: 3, name: '历史图表数据' },
];

const zuijinOption = [
  { id: 1, name: '最近1天' },
  { id: 7, name: '最近7天' },
  { id: 15, name: '最近15天' },
  { id: 30, name: '最近30天' },
];

const FormItem = Form.Item;
const { Option } = Select;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      onFilterChange,
      monitor,
      location,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue },
    } = this.props;

    const {
      lishitubiaoDtz: {
        weightList, tempList, bgList, spo2List, hrList, bpList,
      },
    } = monitor;

    const navProps = {
      navList,
      location,
      filter: <FormItem>
        {getFieldDecorator('zuijin', {
          initialValue: '1',
          rules: [],
        })(<Select
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
      </FormItem>,
    };

    const { AreaChart, LineChart } = Charts;

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

    return (
      <div>
        <div>
          <div className="monitorNav">
            <Nav {...navProps} />
          </div>
          <div className="chartW" style={{padding: 17}}>
            <Row gutter={10}>
              {weightList.length === 0 && tempList.length === 0 && bgList.length === 0 && spo2List.length === 0 && hrList.length === 0 && bpList.length === 0 && (
                <Col span={24}>
                  <div className="empty-tip">暂无数据</div>
                </Col>
              )}
              {
                weightList.length > 0 && <Col span={12} style={{marginBottom: 20}}>
                  <div className={styles.chartBox} style={{ height: 379 }}>
                    <AreaChart
                      height={320}
                      tickCount={6}
                      title="体重数据"
                      data={weightList}
                      mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                      max={(weightList && weightList.length > 0) ? Math.max.apply(null, weightList.map(item => item.number)) : 100}
                    />
                  </div>
                </Col>
              }
              {
                tempList.length > 0 && <Col span={12} style={{marginBottom: 20}}>
                  <div className={styles.chartBox} style={{ height: 379 }}>
                    <AreaChart
                      height={320}
                      tickCount={6}
                      title="体温数据"
                      data={tempList}
                      mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                      max={(tempList && tempList.length > 0) ? Math.max.apply(null, tempList.map(item => item.number)) : 100}
                    />
                  </div>
                </Col>
              }
              {
                bgList.length > 0 && <Col span={12} style={{marginBottom: 20}}>
                  <div className={styles.chartBox} style={{ height: 379 }}>
                    <AreaChart
                      height={320}
                      tickCount={6}
                      title="血糖数据"
                      data={bgList}
                      mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                      max={(bgList && bgList.length > 0) ? Math.max.apply(null, bgList.map(item => item.number)) : 100}
                    />
                  </div>
                </Col>
              }
              {
                spo2List.length > 0 && <Col span={12} style={{marginBottom: 20}}>
                  <div className={styles.chartBox} style={{ height: 379 }}>
                    <AreaChart
                      height={320}
                      title="血氧数据"
                      data={spo2List}
                      // mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                      mask="MM-DD"
                      max={(spo2List && spo2List.length > 0) ? Math.max.apply(null, spo2List.map(item => item.number)) : 100}
                    />
                  </div>
                </Col>
              }
              {
                hrList.length > 0 && <Col span={12} style={{marginBottom: 20}}>
                  <div className={styles.chartBox} style={{ height: 379 }}>
                    <AreaChart
                      tickCount={6}
                      height={320}
                      title="心率/脉搏数据"
                      data={hrList}
                      mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                      max={(hrList && hrList.length > 0) ? Math.max.apply(null, hrList.map(item => item.number)) : 100}
                    />
                  </div>
                </Col>
              }
              {
                bpList.length > 0 && <Col span={12} style={{marginBottom: 20}}>
                  <div className={styles.chartBox} style={{ height: 379 }}>
                    <LineChart
                      height={320}
                      tickCount={6}
                      title="血压数据"
                      data={bpList}
                      titleMap={{ y1: '舒张压', y2: '收缩压' }}
                      timeScale={{
                        type: 'time',
                        mask: 'YYYY-MM-DD',
                        tickInterval:
                          (bpList.length > 5 ? 5 : 1) * 24 * 60 * 60 * 1000,
                      }}
                      selectHtml={
                        <div className={styles.legend}>
                          <div className={styles.legendItem}>
                            <span
                              className={styles.legendColor}
                              style={{ backgroundColor: '#6F4111' }}
                            />
                            舒张压
                          </div>
                          <div className={styles.legendItem}>
                            <span
                              className={styles.legendColor}
                              style={{ backgroundColor: '#FCC91A' }}
                            />
                            收缩压
                          </div>
                        </div>
                      }
                    />
                  </div>
                </Col>
              }
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
