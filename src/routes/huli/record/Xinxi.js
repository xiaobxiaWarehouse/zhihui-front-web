import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import moment from 'moment';
import { Col, Form, Row, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const {Option} = Select;

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
  style: {
  },
};

class Xinxi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  componentWillMount() {
    const {filter} = this.props;
    const {riqi} = filter;
    if (riqi) {
      this.setState({
        date: moment(riqi, 'YYYYMMDD'),
      });
    }
  }

  render() {
    const {
      huli,
      form: {
        getFieldDecorator,
      },
      onFilterChange,
      app: {
        allHulidengji,
        allXingbie,
      },
      filter,
    } = this.props;

    const {
      editData,
    } = huli;

    const {riqi} = filter;

    const changeDate = (date) => {
      let shijian = moment(date).format('YYYYMMDD');
      this.setState({
        date,
      });
      onFilterChange({riqi: shijian});
    };

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={moment(riqi, 'YYYY-MM-DD').toDate()}
        mode="date"
      />
    );

    return (
      <Form className="add-form">
        <Row style={{padding: '0 28px'}}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="入住编号">
              {getFieldDecorator('shenqingBh', {
                initialValue: editData && editData.shenqingBh,
                rules: [
                ],
              })(<Input disabled placeholder="请输入入住编号" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="休养员">
              {getFieldDecorator('xingming', {
                initialValue: editData && editData.xingming,
                rules: [
                ],
              })(<Input disabled placeholder="请输入休养员姓名" />)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 28px'}}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('xingbie', {
                initialValue: editData && (editData.shenqingXingbie || editData.xingbie) ? `${editData.shenqingXingbie || editData.xingbie}` : undefined,
                rules: [
                ],
              })(<Select disabled getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="">{allXingbie.map((k) => {
                return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
              })}</Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="护理日期">
              {getFieldDecorator('riqi', {
                rules: [
                  {required: true, message: '请选择护理日期'},
                ],
              })(<PopPicker
                datePicker={datePicker}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                date={this.state.date}
                okText="确认"
                dismissText="取消"
                onChange={(date) => {
                  changeDate(date);
                }}
              >
                <Button>{this.state.date ? moment(this.state.date).format('YYYY-MM-DD') : '请选择开始时间'}</Button>
              </PopPicker>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 28px'}}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="护理等级">
              {getFieldDecorator('huliDj', {
                initialValue: editData && editData.huliDj ? `${editData.huliDj}` : undefined,
                rules: [
                ],
              })(<Select disabled allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="">{allHulidengji.map((k) => {
                return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
              })}</Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="床位">
              {getFieldDecorator('chuangwei', {
                initialValue: editData && editData.louhao && editData.louceng && editData.fanghao ? editData.baofang === 2 ? `${editData.louhao}楼${editData.louceng}层${editData.fanghao}房` : `${editData.louhao}楼${editData.louceng}层${editData.fanghao}房${editData.chuanghao}床` : undefined,
                rules: [
                ],
              })(<Input disabled placeholder="" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    huli: state.huli,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Xinxi)));
