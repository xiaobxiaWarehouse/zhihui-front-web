import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Select } from 'antd';
import { Charts } from 'components';
import Nav from '../nav';
import styles from './index.less';

const navList = [
  { id: 1, name: '实时数据' },
  { id: 2, name: '睡眠分析' },
  { id: 3, name: '在离床分析' },
  { id: 4, name: '历史数据' },
];

const ziujinOption = [
  { id: 1, name: '最近1天' },
  { id: 3, name: '最近3天' },
  { id: 5, name: '最近5天' },
  { id: 7, name: '最近7天' },
];

const {Option} = Select;
const FormItem = Form.Item;

const { AreaChart, LadderChart } = Charts;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      monitor,
      location,
      form: { getFieldDecorator, setFieldsValue },
      onFilterChange,
    } = this.props;
    const { shishiZnc, offbedZnc, zuijin } = monitor;
    const { hrList, rrList, mvList } = shishiZnc;

    const navProps = {
      location,
      navList,
      filter: <FormItem>
        {getFieldDecorator('zuijin', {
          initialValue: '1',
          rules: [],
        })(<Select
          style={{width: '100%'}}
          onChange={(val) => {
              onChangeDay(val);
            }}
          placeholder="请选择最近周期"
        >
          {ziujinOption.map((item) => {
            return (
              <Option key={item.id} value={String(item.id)}>
                {item.name}
              </Option>
            );
          })}
        </Select>)}
      </FormItem>,
    };

    const onChangeDay = (val) => {
      let params = {};
      if (val) {
        params.zuijin = Number(val);
      }
      onFilterChange(params);
      setFieldsValue({
        shijian: undefined,
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
              {hrList.length === 0 && rrList.length === 0 && mvList.length === 0 && offbedZnc.length === 0 && (
                <Col span={24}>
                  <div className="empty-tip">暂无数据</div>
                </Col>
              )}
              {hrList.length > 0 && (
                <Col span={12}>
                  <div className={styles.chartBox} style={{ height: 379, marginBottom: 15 }}>
                    <AreaChart
                      mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                      max={120}
                      height={320}
                      title="心率数据"
                      data={hrList}
                      tickCount={6}
                    />
                  </div>
                </Col>
              )}
              {rrList.length > 0 && (
                <Col span={12}>
                  <div className={styles.chartBox} style={{ height: 379, marginBottom: 15 }}>
                    <AreaChart
                      mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                      max={50}
                      height={320}
                      title="呼吸数据"
                      data={rrList}
                      tickCount={6}
                    />
                  </div>
                </Col>
              )}
              {mvList.length > 0 && (
                <Col span={12}>
                  <div className={styles.chartBox} style={{ height: 379, marginBottom: 15 }}>
                    <AreaChart
                      mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                      max={6000}
                      height={320}
                      title="体动数据"
                      data={mvList}
                      tickCount={6}
                    />
                  </div>
                </Col>
              )}
              {offbedZnc.length > 0 && (
                <Col span={12}>
                  <div className={styles.chartBox} style={{ height: 379, marginBottom: 15 }}>
                    <LadderChart
                      mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                      height={320}
                      title="在/离床数据"
                      data={offbedZnc}
                      tickCount={6}
                    />
                  </div>
                </Col>
              )}
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
