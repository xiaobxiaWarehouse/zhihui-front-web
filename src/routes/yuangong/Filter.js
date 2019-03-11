import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {config, getMenuByCode, mapper} from 'utils';
import {Button, Col, Form, Radio, Row} from 'antd';
import {Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Filter = (props) => {
  const {
    onFilterChange,
    form: {
      getFieldDecorator,
      getFieldsValue,
    },
    filter,
  } = props;

  const formItemLayout = {
  };

  const radioOption = [
    {id: 1, value: '启用'},
    {id: 2, value: '禁用'},
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

  return (
    <Row align="middle" style={{paddingTop: 9, paddingBottom: 9}}>
      <Col span={24}>
        <Form layout="inline">
          <Row>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
              >
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
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

Filter.propTypes = {
  form: PropTypes.object,
  onFilterChange: PropTypes.func,
  onAdd: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    yuangong: state.yuangong,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create({
  mapPropsToFields(props) {
    const {
      yuangong,
    } = props;
    const {
      filter,
    } = yuangong;
    return {
      zhuangtai: Form.createFormField({
        ...filter.zhuangtai,
        value: filter.zhuangtai ? filter.zhuangtai : '-1',
      }),
    };
  },
})(Filter)));

