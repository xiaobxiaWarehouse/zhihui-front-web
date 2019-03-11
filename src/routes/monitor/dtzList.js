import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import styles from './index.less';
import { Icon as JXRSIcon } from '../../components/JXRS';

const List = (props) => {
  const {
    dataSource, onEditItem,
  } = props;

  return (
    <div style={{ backgroundColor: '#fff', padding: '0 28px' }}>
      <Row gutter={20}>
        {dataSource.length > 0 ? (
          dataSource.map((item, index) => {
            let keyid = index;
            return (
              <Col
                span={12}
                key={keyid}
              >
                <div
                  className={styles.listItem}
                  onClick={() => {
                    onEditItem('/monitor/detail', {
                      jigou: item.jigou,
                      id: item.suoyin,
                      detaiTabIndex: 3,
                    });
                  }}
                >
                  <Row style={{ width: '100%' }}>
                    <Col span={12}>
                      <div className={styles.louceng2}>
                        {item.chuangwei || '-'}
                      </div>
                      <div className={styles.name}>{item.xingming || '-'}</div>
                    </Col>
                    <Col span={12}>
                      <div className={styles.itemRightBox2}>
                        <JXRSIcon
                          type="xinlv"
                          style={{ marginRight: 8, verticalAlign: 'middle' }}
                        />
                        {`${item.hr || 0}次`}
                      </div>
                      <div className={styles.itemRightBox2}>
                        <JXRSIcon
                          type="tiwen"
                          style={{ marginRight: 8, verticalAlign: 'middle' }}
                        />
                        {`${item.temp || 0}°C`}
                      </div>
                      <div className={styles.itemRightBox2}>
                        <JXRSIcon
                          type="xuetang"
                          style={{ marginRight: 8, verticalAlign: 'middle' }}
                        />
                        {`${item.bg || 0}mmol/L`}
                      </div>
                      <div className={styles.itemRightBox2}>
                        <JXRSIcon
                          type="xueya"
                          style={{ marginRight: 8, verticalAlign: 'middle' }}
                        />
                        {`${item.dbp || 0}/${item.sbp || 0}mmHg`}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })
        ) : (
          <div className="empty-tip">暂无数据</div>
        )}
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default connect(mapStateToProps)(Form.create()(List));
