import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Button, Col, Form, Radio, Row, Select} from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

const formItemLayout = {
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
    dispatch,
    onFilterChange,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
    },
    chuangwei: {
      loucengList,
      louList,
      filter,
    },
  } = props;

  const radioOption = [
    {id: -2, value: '启用'},
    {id: -3, value: '禁用'},
    {id: -1, value: '全部'},
  ];

  const changeRadio = (val) => {
    let fields = getFieldsValue();
    const {target: {value}} = val;
    onFilterChange({
      ...fields,
      zhuangtai: value,
    });
  };

  const handleOk = () => {
    let fields = getFieldsValue();
    onFilterChange(fields);
  };

  const onChangeLouhao = (val) => {
    let fields = getFieldsValue();
    dispatch({
      type: 'chuangwei/updateFilter',
      payload: {
        filter: {
          ...fields,
          louhao: val || undefined,
          louceng: undefined,
        },
      },
    });
    if (val) {
      dispatch({
        type: 'chuangwei/alllouceng',
        payload: {
          louhao: val,
        },
      });
    } else {
      dispatch({
        type: 'chuangwei/updateLouceng',
        payload: [],
      });
    }
  };

  return (
    <Form>
      <Row>
        <Col>
          <div style={{paddingTop: 9, width: '100%'}}>
            <Row>
              <Col span={11}>
                <FormItem {...formItemLayout} label="楼号">
                  {getFieldDecorator('louhao', {
                    initialValue: filter && filter.louhao,
                    rules: [],
                  })(<Select

                    onChange={(val) => {
                      onChangeLouhao(val);
                    }}
                    allowClear
                  >
                    {louList && louList.map((item) => {
                      return (
                        <Option key={item.louhao} value={String(item.louhao)}>
                          {item.louhao}
                        </Option>
                      );
                    })}
                  </Select>)}
                </FormItem>
              </Col>
              <Col span={1}/>
              <Col span={12}>
                <FormItem {...formItemLayout} label="楼层">
                  {getFieldDecorator('louceng', {
                    initialValue: filter && filter.louceng,
                    rules: [],
                  })(<Select
                    disabled={!loucengList.length > 0}
                    allowClear
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                  >
                    {loucengList && loucengList.map((item) => {
                      return (
                        <Option key={item.louceng} value={String(item.louceng)}>
                          {item.louceng}
                        </Option>
                      );
                    })}
                  </Select>)}
                </FormItem>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row align="middle" style={{paddingTop: 9, paddingBottom: 9}}>
        <Col span={24}>
          <Row>
            <Col span={11}>
              <FormItem>
                {getFieldDecorator('zhuangtai', {
                  initialValue: filter && filter.zhuangtai !== null && filter.zhuangtai !== undefined ? filter.zhuangtai : '-1',
                  rules: [],
                })(<RadioGroup onChange={(val) => { changeRadio(val); }}>
                  {
                    radioOption.map((item) => {
                      return <Radio key={item.id} value={String(item.id)}>{item.value}</Radio>;
                    })
                  }
                </RadioGroup>)}
              </FormItem>
            </Col>
            <Col span={13}>
              <div style={{float: 'right', padding: '2px 0'}}>
                <Button
                  className="btn"
                  type="primary"
                  style={{marginRight: 0}}
                  onClick={handleOk}
                >查询</Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  form: PropTypes.object,
  onFilterChange: PropTypes.func,
  onAdd: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    chuangwei: state.chuangwei,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create({
  mapPropsToFields(props) {
    const {
      chuangwei,
    } = props;
    const {
      filter,
    } = chuangwei;
    return {
      zhuangtai: Form.createFormField({
        ...filter.zhuangtai,
        value: filter.zhuangtai ? filter.zhuangtai : '-1',
      }),
      louhao: Form.createFormField({
        ...filter.louhao,
        value: filter.louhao ? filter.louhao : undefined,
      }),
      louceng: Form.createFormField({
        ...filter.louceng,
        value: filter.louceng ? filter.louceng : undefined,
      }),
    };
  },
})(Filter)));

