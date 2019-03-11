import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form } from 'antd';
import {getOption} from 'utils';
import { JXRS } from 'components';
import styles from './index.less';

const JXRSIcon = JXRS.Icon;

const geiXinbie = (type) => {
  switch (type) {
    case 'M':
      return '男';
    case 'F':
      return '女';
    default:
      return '-';
  }
};

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
  style: {},
};

const FormItem = Form.Item;

const Personaldata = (props) => {
  const {
    detailData,
    showDetail,
    dispatch,
    app: {allHulidengji},
  } = props;

  const onShowDetail = () => {
    dispatch({
      type: 'monitor/changeShowDetail',
      payload: !showDetail,
    });
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px 28px 0' }}>
      <Form>
        <Row gutter={20}>
          <Col span={12}>
            <div>
              <div className={styles.title}>
                <span>个人信息</span>
              </div>
              <FormItem
                {...formItemLayout}
                className={styles.monitorForm}
                label="姓名/性别"
              >
                {`${(detailData && detailData.xingming) || '-'}/${detailData && geiXinbie(detailData.xingbie)}`}
              </FormItem>
              <FormItem
                {...formItemLayout}
                className={styles.monitorForm}
                label="房间/床位"
              >
                {detailData && detailData.chuangwei.length > 0 ? detailData.baofang === 1 ? `${detailData.chuangwei[0].louhao}楼${detailData.chuangwei[0].louceng}层${detailData.chuangwei[0].fanghao}房${detailData.chuangwei[0].chuanghao}床` : `${detailData.chuangwei[0].louhao}楼${detailData.chuangwei[0].louceng}层${detailData.chuangwei[0].fanghao}房` : '-'}
              </FormItem>
              {
                showDetail && <div>
                  <FormItem
                    {...formItemLayout}
                    className={styles.monitorForm}
                    label="监护人姓名"
                  >
                    {`${(detailData && detailData.jianhurenXm) || '-'}`}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    className={styles.monitorForm}
                    label="医保情况"
                  >
                    {`${(detailData && detailData.yibaoQk) || '-'}`}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    className={styles.monitorForm}
                    label="其他情况"
                  >
                    {`${(detailData && detailData.qitaQk) || '-'}`}
                  </FormItem>
                </div>
              }
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.title}>
              <span />
            </div>
            <div>
              <FormItem
                {...formItemLayout}
                className={styles.monitorForm}
                label="护理等级"
              >
                {(detailData && getOption(detailData.huliDj, allHulidengji)) || '-'}
              </FormItem>
              <FormItem
                {...formItemLayout}
                className={styles.monitorForm}
                label="护理员"
              >
                {(detailData && detailData.huliyuanXm) || '-'}
                <a style={{float: 'right'}} onClick={() => { onShowDetail(); }}>
                  <JXRSIcon type={showDetail ? 'up' : 'down'} style={{color: '#333'}} />
                </a>
              </FormItem>
              {
                showDetail && <div>
                  <FormItem
                    {...formItemLayout}
                    className={styles.monitorForm}
                    label="监护人电话"
                  >
                    {`${(detailData && detailData.jianhurenDh) || '-'}`}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    className={styles.monitorForm}
                    label="病史情况"
                  >
                    {`${(detailData && detailData.bingshiQk) || '-'}`}
                  </FormItem>
                </div>
              }
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default connect(mapStateToProps)(Personaldata);
