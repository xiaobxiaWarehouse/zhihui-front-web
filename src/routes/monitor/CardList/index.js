import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Layout} from 'components';
import {Form, Col, Row, Pagination} from 'antd';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
  },
  wrapperCol: {
  },
  style: {
  },
};

const getJiancexiang = (type) => {
  switch (type) {
    case 'HR':
      return <span>心率</span>;
    case 'RR':
      return <span>呼吸</span>;
    case 'MV':
      return <span>体动</span>;
    case 'WEIGHT':
      return <span>体重</span>;
    case 'BG':
      return <span>血糖</span>;
    case 'SPO2':
      return <span>血氧</span>;
    case 'TEMP':
      return <span>体温</span>;
    case 'BP':
      return <span>血压</span>;
    default:
      return <span>{type}</span>;
  }
};

const CardList = (props) => {
  const {
    dataSource,
    pagination,
    onChange,
  } = props;

  const handleChange = (page, pageSize) => {
    onChange({
      current: page,
      pageSize,
    });
  };

  const handleShowSizeChange = (current, size) => {
    onChange({
      current: 1,
      pageSize: size,
    });
  };

  const shebeiLeixing = {
    1: '智能床',
    2: '智能床垫',
    3: '多体征',
  };

  return (
    <div>
      {
        dataSource.length > 0 ? dataSource.map((item, cardIndex) => {
          let keyId = cardIndex;
          return (
            <div
              key={keyId}
              className={styles.card}
            >
              <Form>
                <Row>
                  <Col span={12}>
                    <FormItem>
                      <div className={CSS.bianhao}>{shebeiLeixing[item.leixing] || '-'}</div>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem style={{justifyContent: 'flex-end'}}>
                      <div className={styles.zhuangtai}>{getJiancexiang(item.jiancexiang && item.jiancexiang.toUpperCase()) || '-'}</div>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="人员姓名">
                      {item.xingming || '-'}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="床位">
                      {item.chuangwei || '-'}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="检测值">
                      {item.jiancezhi || '-'}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="阈值">
                      {item.yuzhi || '-'}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="异常发生时间">
                      {item.shijian || '-'}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="异常情况">
                      {item.yichangQk || '数值超过正常范围'}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          );
        }) : <div className="empty-tip">暂无数据</div>
      }
    </div>
  );
};


CardList.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    yuyue: state.yuyue,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(CardList));
