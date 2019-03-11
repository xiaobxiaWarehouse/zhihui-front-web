import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import { Button, Modal, Form, Row, Col, Input, Select } from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;
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

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kaishiDate: null,
      jieshuDate: null,
    };
  }

  render() {
    const {
      app,
      onOk,
      form: {
        getFieldDecorator,
        getFieldsValue,
        validateFields,
      },
      suoyinList,
      ...modalProps
    } = this.props;

    const {
      user,
    } = app;

    const onSubmit = () => {
      validateFields((errors) => {
        const fields = getFieldsValue();
        if (errors) {
          return;
        }
        fields.kaishiSj = moment(fields.kaishiSj).format('YYYYMMDD');
        fields.jieshuSj = moment(fields.jieshuSj).format('YYYYMMDD');
        onOk(fields);
      });
    };

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={new Date()}
        mode="date"
      />
    );

    const datePicker2 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={new Date()}
        mode="date"
      />
    );

    const text = () => {
      return (
        <Form>
          <Row>
            <Col span={21}>
              <FormItem {...formItemLayout} label="休养员">
                {getFieldDecorator('suoyin', {
                  // initialValue: user && user.email,
                  rules: [
                    {required: true, message: '请选择休养员'},
                  ],
                })(<Select mode="multiple" placeholder="请选择休养员">
                  {
                    suoyinList.map((item) => {
                      return <Option key={item.suoyin} value={item.suoyin}>{`${item.xingming}-${item.suoyinBh}`}</Option>;
                    })
                  }
                </Select>)}
              </FormItem>
              <FormItem {...formItemLayout} label="开始时间">
                {getFieldDecorator('kaishiSj', {
                  rules: [
                    {required: true, message: '请选择开始时间'},
                  ],
                })(<PopPicker
                  datePicker={datePicker}
                  transitionName="rmc-picker-popup-slide-fade"
                  maskTransitionName="rmc-picker-popup-fade"
                  title="选择日期"
                  date={this.state.kaishiDate}
                  okText="确认"
                  dismissText="取消"
                  onChange={(date) => {
                    this.setState({
                      kaishiDate: date,
                    });
                  }}
                >
                  <Button>{this.state.kaishiDate ? moment(this.state.kaishiDate).format('YYYY-MM-DD') : '请选择开始时间'}</Button>
                </PopPicker>)}
              </FormItem>
              <FormItem {...formItemLayout} label="结束时间">
                {getFieldDecorator('jieshuSj', {
                  rules: [
                    {required: true, message: '请选择结束时间'},
                  ],
                })(<PopPicker
                  datePicker={datePicker2}
                  transitionName="rmc-picker-popup-slide-fade"
                  maskTransitionName="rmc-picker-popup-fade"
                  title="选择日期"
                  date={this.state.jieshuDate}
                  okText="确认"
                  dismissText="取消"
                  onChange={(date) => {
                    this.setState({
                      jieshuDate: date,
                    });
                  }}
                >
                  <Button>{this.state.jieshuDate ? moment(this.state.jieshuDate).format('YYYY-MM-DD') : '请选择结束时间'}</Button>
                </PopPicker>)}
              </FormItem>
              <FormItem {...formItemLayout} label="邮箱">
                {getFieldDecorator('email', {
                  initialValue: user && user.email,
                  rules: [
                    {required: true, message: '请输入邮箱'},
                  ],
                })(<Input placeholder="请输入邮箱" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      );
    };

    return (
      <Modal className={CSS.addModal} {...modalProps} footer={null}>
        {text()}
        <div style={{marginTop: 10}} className={CSS.buttonBox}>
          <Button
            className={CSS.searchBtn}
            onClick={() => {
              onSubmit();
            }}
            type="primary"
          >下载</Button>
        </div>
      </Modal>
    );
  }
}

AddModal.propTypes = {
  item: PropTypes.object,
  onFilterChange: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    huli: state.huli,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AddModal)));
