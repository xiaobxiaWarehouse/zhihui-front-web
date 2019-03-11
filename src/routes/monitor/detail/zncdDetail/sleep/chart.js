import React from 'react';
import { connect } from 'dva';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import { Form, Row, Col, Button } from 'antd';
import { Charts } from 'components';
import moment from 'moment';
import Nav from '../nav';

const { AnnularChart, CakeChart } = Charts;
const FormItem = Form.Item;

const navList = [
  { id: 1, name: '实时数据' },
  { id: 2, name: '睡眠分析' },
  { id: 3, name: '在离床分析' },
  { id: 4, name: '历史数据' },
];

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    const {
      monitor,
      location,
      form: {
        getFieldDecorator,
      },
      onFilterChange,
    } = this.props;
    const { sleepZnc } = monitor;
    const {
      avgHrList, avgRRList, sleepQualityList, sleepList,
    } = sleepZnc;

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.date ? moment(this.state.date, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const navProps = {
      location,
      navList,
      filter: <FormItem>
        {getFieldDecorator('shijian', {
          initialValue: moment().toDate(),
          rules: [],
        })(<PopPicker
          datePicker={datePicker}
          transitionName="rmc-picker-popup-slide-fade"
          maskTransitionName="rmc-picker-popup-fade"
          title="选择日期"
          date={this.state.date}
          okText="确认"
          dismissText="取消"
          onChange={(date) => {
            onChangeTime(date);
            this.setState({
              date,
            });
          }}
        >
          <Button style={{width: '100%'}}>{this.state.date ? moment(this.state.date).format('YYYY-MM-DD') : '请选择时间'}</Button>
        </PopPicker>)}
      </FormItem>,
    };

    const onChangeTime = (val) => {
      let params = {};
      if (val) {
        params.shijian = moment(val).format('YYYYMMDD');
      }
      onFilterChange(params);
    };

    return (
      <div>
        <div>
          <div className="monitorNav">
            <Nav {...navProps} />
          </div>
          <div className="chartW" style={{padding: 17}}>
            <Row gutter={10}>
              {avgHrList.length === 0 && (
                <Col span={24}>
                  <div className="empty-tip">暂无数据</div>
                </Col>
              )}
              {avgHrList.length > 0 && (
                <Col span={24}>
                  <div style={{ height: 818 }}>
                    <Row>
                      <Col span={8}>
                        <div style={{ height: 380 }}>
                          <AnnularChart
                            title="平均心率"
                            height={330}
                            data={avgHrList}
                            count={avgHrList[0] ? avgHrList[0].count : 0}
                          />
                        </div>
                      </Col>
                      <Col span={8}>
                        <AnnularChart
                          title="平均呼吸"
                          height={330}
                          data={avgRRList}
                          count={avgRRList[0] ? avgRRList[0].count : 0}
                        />
                      </Col>
                      <Col span={8}>
                        <AnnularChart
                          title="睡眠质量"
                          height={330}
                          data={sleepQualityList}
                          count={`${
                            sleepQualityList[0] ? sleepQualityList[0].count : 0
                          }%`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div style={{ height: 384 }}>
                          <CakeChart height={334} data={sleepList} />
                        </div>
                      </Col>
                    </Row>
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
