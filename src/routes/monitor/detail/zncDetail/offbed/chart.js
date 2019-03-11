import React from 'react';
import { connect } from 'dva';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import { Form, Row, Col, Button } from 'antd';
import { Charts } from 'components';
import moment from 'moment';
import Nav from '../nav';
import styles from './index.less';

const { LadderChart } = Charts;
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
      onFilterChange,
      form: {
        getFieldDecorator,
      },
    } = this.props;
    const { offbedZnc } = monitor;

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
              {offbedZnc.length === 0 && (
                <Col span={24}>
                  <div className="empty-tip">暂无数据</div>
                </Col>
              )}
              {offbedZnc.length > 0 && (
                <Col span={24}>
                  <div className={styles.chartBox} style={{ height: 436 }}>
                    <LadderChart
                      tickCount={12}
                      height={376}
                      title="在离床分析"
                      data={offbedZnc}
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
