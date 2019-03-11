import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import Chart from './chart';

const Index = (props) => {
  const { monitor, location } = props;

  const { zuijinDtz } = monitor;

  const listProps = {
    location,
    pagination: false,
    dataSource: zuijinDtz,
  };
  return (
    <div>
      <Chart {...listProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
