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
    onAdd,
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
    let newFields = {};
    let fields = getFieldsValue();
    const {target: {value}} = val;
    newFields.zhuangtai = value;
    onFilterChange(newFields);
  };

  return (
    <Row align="middle" style={{paddingTop: 15, paddingBottom: 15}}>
      <Col span={24}>
        <Form layout="inline">
          <FormItem
            {...formItemLayout}
          >
            {getFieldDecorator('zhuangtai', {
              initialValue: filter && filter.zhuangtai !== null && filter.zhuangtai !== undefined ? filter.zhuangtai : '',
              rules: [],
            })(<RadioGroup onChange={(val) => { changeRadio(val); }}>
              {
                radioOption.map((item) => {
                  return <Radio key={item.id} value={String(item.id)}>{item.value}</Radio>;
                })
              }
            </RadioGroup>)}
          </FormItem>
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

export default injectIntl(connect(({admin}) => ({admin}))(Form.create()(Filter)));

