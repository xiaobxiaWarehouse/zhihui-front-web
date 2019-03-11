import React, {Component} from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {compare, config} from 'utils';
import {Select, Input} from 'antd';
import reactComposition from './Composition';

const {Option} = Select;

const DQMSelect = (props) => {
  const {
    dataSource,
    selectProps,
    inputProps,
  } = props;

  return (<Select
    {...selectProps}
    getInputElement={() => <Input className="ant-select-search__field" {...inputProps}/>}
  >
    {dataSource.map((k) => {
      return <Option key={k.id} value={String(`${k.id}`)}>{`${k.xiangmu}-${k.mingcheng}`}</Option>;
    })}
  </Select>);
};

function mapStateToProps(state) {
  return {
  };
}

export default injectIntl(connect()(DQMSelect));
