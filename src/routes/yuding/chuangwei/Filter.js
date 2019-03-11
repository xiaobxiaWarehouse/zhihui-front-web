import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {routerRedux} from 'dva/router';
import {mapper} from 'utils';
import intl from 'react-intl-universal';
import {Button, Col, Form, Input, Row, Radio} from 'antd';
import {JXRS, Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const JXRSIcon = JXRS.Icon;

const zhuangtaiOptions = [
  { label: '空床', value: 1 },
  { label: '全部', value: -1 },
];

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
  },
  style: {
  },
};

const formItemLayout2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
  style: {
  },
};

const Filter = (props) => {
  const {
    form: {
      getFieldDecorator,
      getFieldsValue,
    },
    onFilterChange,
    chuangweiSelectItem,
    onBack,
    onSave,
  } = props;

  const filterFields = (obj) => {
    let newObj = {};
    for (let item in obj) {
      if (obj[item]) {
        newObj[item] = obj[item];
      }
    }
    return newObj;
  };

  const onSearch = (val) => {
    let fields = getFieldsValue();
    const {target: {value}} = val;
    let newFields = filterFields(fields);
    newFields.zhuangtai = value;
    onFilterChange(newFields);
  };

  const onBlur = () => {
    let fields = getFieldsValue();
    let newFields = filterFields(fields);
    onFilterChange(newFields);
  };

  let isBaofang = chuangweiSelectItem.length > 0 && chuangweiSelectItem[0].baofang === 2;
  let initChuangwei = chuangweiSelectItem.length > 0 ? !isBaofang ? `${chuangweiSelectItem[0].louhao}楼${chuangweiSelectItem[0].louceng}层${chuangweiSelectItem[0].fanghao}房${chuangweiSelectItem[0].chuanghao}床` : `${chuangweiSelectItem[0].louhao}楼${chuangweiSelectItem[0].louceng}层${chuangweiSelectItem[0].fanghao}房` : '';

  return (
    <div className="container">
      <div className="add-wrap">
        <div className="header">
          <div className="navGroup">
            <Row className="nav">
              <Col className="title">选择房间</Col>
              <Col className="navBtn">
                <Button
                  style={{height: 36}}
                  onClick={() => {
                    onBack();
                  }}
                >取消</Button>
              </Col>
              <Col className="navBtn" style={{marginRight: 10}}>
                <Button
                  type="primary"
                  onClick={() => {
                    onSave();
                  }}
                >确认</Button>
              </Col>
            </Row>
          </div>
          <div className="navGroupHolder" />
          <div className="filter" style={{padding: '0 28px'}}>
            <Form className="add-form">
              <Row type="flex" align="middle" style={{marginTop: 10}}>
                <Col span={12}>
                  <FormItem>
                    {getFieldDecorator('zhuangtai', {
                      initialValue: -1,
                      rules: [],
                    })(<RadioGroup onChange={(val) => { onSearch(val); }} options={zhuangtaiOptions} />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="已选床位">
                    {getFieldDecorator('chuangwei', {
                      initialValue: initChuangwei,
                      rules: [],
                    })(<Input disabled placeholder="已选床位" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" align="middle">
                <Col span={12}>
                  <FormItem {...formItemLayout} label="楼号">
                    {getFieldDecorator('louhao', {
                      rules: [],
                    })(<Input onBlur={() => { onBlur(); }} placeholder="请输入楼号" />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="层号" style={{textAlign: 'right'}}>
                    {getFieldDecorator('cenghao', {
                      rules: [],
                    })(<Input onBlur={() => { onBlur(); }} placeholder="请输入层号" />)}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    yuding: state.yuding,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create({
  mapPropsToFields(props) {
    const {
      yuding,
    } = props;
    const {
      filter,
    } = yuding;
    return {
      zhuangtai: Form.createFormField({
        value: filter && filter.zhuangtai ? filter.zhuangtai : -1,
      }),
      louhao: Form.createFormField({
        value: filter && filter.louhao ? filter.louhao : '',
      }),
      cenghao: Form.createFormField({
        value: filter && filter.cenghao ? filter.cenghao : '',
      }),
    };
  },
})(Filter)));

