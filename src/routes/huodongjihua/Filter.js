import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {mapper} from 'utils';
import intl from 'react-intl-universal';
import {Button, Col, Form, Input, Row, Radio} from 'antd';
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

  const radioOption = [
    {id: 1, value: '当前有效'},
    {id: -1, value: '全部'},
  ];

  const formItemLayout = {
  };

  const changeRadio = (val) => {
    let newFields = {};
    let fields = getFieldsValue();
    const {target: {value}} = val;
    newFields.zhuangtai = value;
    if (fields.keyword) {
      newFields.keyword = fields.keyword;
    }
    onFilterChange(newFields);
  };

  const handleOk = (val) => {
    let fields = getFieldsValue();
    let newFields = {
      ...fields,
    };
    if (fields.zhuangtai) {
      newFields.zhuangtai = Number(fields.zhuangtai);
    }
    onFilterChange(newFields);
  };

  return (
    <Form>
      <Row>
        <FormItem>
          {getFieldDecorator('zhuangtai', {
            initialValue: filter && filter.zhuangtai ? filter.zhuangtai : '-1',
            rules: [],
          })(<RadioGroup onChange={(val) => { changeRadio(val); }}>
            {
              radioOption.map((item) => {
                return <Radio key={item.id} value={String(item.id)}>{item.value}</Radio>;
              })
            }
          </RadioGroup>)}
        </FormItem>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{float: 'right', padding: '2px 0'}}>
            <Button
              className="btn"
              type="primary"
              style={{marginRight: 0}}
              onClick={handleOk}
            >查询</Button>
          </div>
          <div style={{width: 'calc(100% - 70px)'}}>
            <FormItem>
              {getFieldDecorator('keyword', {
                initialValue: filter && filter.keyword !== null && filter.keyword !== undefined ? filter.keyword : '',
                rules: [],
              })(<Input className="headerInput" placeholder="请输入活动计划项目/名称进行搜索" />)}
            </FormItem>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  form: PropTypes.object,
  onFilterChange: PropTypes.func,
};

export default injectIntl(connect(({huodongjihua}) => ({huodongjihua}))(Form.create()(Filter)));

