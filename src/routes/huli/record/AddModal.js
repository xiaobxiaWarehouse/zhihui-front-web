import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import {Button, Modal, Form, Row, Col, Input, Select, TimePicker, Spin} from 'antd';
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
      date: null,
    };
  }

  render() {
    const {
      huli,
      onOk,
      filter,
      form: {
        getFieldDecorator,
        getFieldsValue,
        validateFields,
      },
      dispatch,
      ...modalProps
    } = this.props;

    const {
      allXiangmu,
      allZixiangmu,
      allShichang,
      allMiaoshu,
      yuangongList,
      loading,
    } = huli;

    const onSubmit = () => {
      validateFields((errors) => {
        const fields = getFieldsValue();
        if (errors) {
          return;
        }
        const {
          huliyuanXm,
        } = fields;

        fields.kaishiSj = moment(fields.kaishiSj, 'HH:mm');

        onOk({
          ...fields,
          huliyuanXm: huliyuanXm ? yuangongList.filter((item) => {
            return item.id === Number(huliyuanXm);
          })[0].xingming : undefined,
          huliyuan: huliyuanXm,
        });
      });
    };

    const {riqi} = filter;
    let initRiqi;
    if (riqi) {
      initRiqi = moment(riqi, 'YYYYMMDD');
    }

    const handleXiangmuChange = (value, options) => {
      dispatch({
        type: 'huli/selectXiangmu',
        payload: {
          id: Number(options.key),
        },
      });
    };

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        defaultDate={new Date()}
        mode="time"
      />
    );

    const text = () => {
      return (
        <Form>
          <Row>
            <Col span={21}>
              <FormItem {...formItemLayout} label="项目名称">
                {getFieldDecorator('xiangmu', {
                  rules: [
                    {required: true, message: '请输入项目名称'},
                  ],
                })(<Select onChange={handleXiangmuChange} placeholder="请选择项目名称">{allXiangmu.map((k) => {
                  return <Option key={k.id} value={String(k.zhi)}>{k.zhongwen}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={21}>
              <FormItem {...formItemLayout} label="子项目">
                {getFieldDecorator('zixiangmu', {
                  rules: [
                    {required: true, message: '请输入子项目'},
                  ],
                })(<Select placeholder="请选择子项目">{allZixiangmu.map((k) => {
                  return <Option key={k.id} value={String(k.zhi)}>{k.zhongwen}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={21}>
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
                  date={this.state.date}
                  okText="确认"
                  dismissText="取消"
                  onChange={(date) => {
                    this.setState({
                      date,
                    });
                  }}
                >
                  <Button>{this.state.date ? moment(this.state.date).format('HH:mm') : '请选择开始时间'}</Button>
                </PopPicker>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={21}>
              <FormItem {...formItemLayout} label="时长">
                {getFieldDecorator('shichang', {
                  rules: [
                    {required: true, message: '请选择时长'},
                  ],
                })(<Select placeholder="请选择时长">{allShichang.map((k) => {
                  return <Option key={k.id} value={String(k.zhi)}>{k.zhongwen}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={21}>
              <FormItem {...formItemLayout} label="项目描述">
                {getFieldDecorator('miaoshu', {
                  rules: [
                    {required: true, message: '请选择项目描述'},
                  ],
                })(<Select placeholder="请选择项目描述">{allMiaoshu.map((k) => {
                  return <Option key={k.id} value={String(k.zhi)}>{k.zhongwen}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={21}>
              <FormItem {...formItemLayout} label="护理员">
                {getFieldDecorator('huliyuanXm', {
                  rules: [
                  ],
                })(<Select placeholder="请选择护理员">
                  {yuangongList.map((k) => {
                    return <Option key={`${k.id}_${k.xingming}_${k.shouji}`} value={k.id}>{`${k.xingming}-${k.shouji}`}</Option>;
                  })}
                </Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{display: 'none'}}>
            <Col span={21}>
              <FormItem {...formItemLayout} label="护理员电话">
                {getFieldDecorator('huliyuanDh', {
                  rules: [
                  ],
                })(<Input placeholder="请输入护理员电话" />)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{display: 'none'}}>
            <Col span={21}>
              <FormItem {...formItemLayout} label="护理员">
                {getFieldDecorator('huliyuan', {
                  rules: [
                  ],
                })(<Input placeholder="请输入护理员" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      );
    };

    return (
      <Modal className={CSS.addModal} {...modalProps} footer={null}>
        <Spin spinning={loading}>
          {text()}
          <div style={{marginTop: 10}} className={CSS.buttonBox}>
            <Button
              className={CSS.searchBtn}
              onClick={() => {
                onSubmit();
              }}
              type="primary"
            >确认</Button>
          </div>
        </Spin>
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
