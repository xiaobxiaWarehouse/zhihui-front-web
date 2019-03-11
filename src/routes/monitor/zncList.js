import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import { getBedStatus } from 'utils';
import styles from './index.less';
import chuangImg from '../../public/chuang.png';
import xinluImg from '../../public/xinlu.png';
import huxiImg from '../../public/huxi.png';

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
                      detaiTabIndex: 1,
                    });
                  }}
                >
                  <Row style={{ width: '100%' }}>
                    <Col span={17}>
                      <div className={styles.louceng}>
                        {item.chuangwei || '-'}
                      </div>
                      <div className={styles.name}>{item.xingming || '-'}</div>
                    </Col>
                    <Col span={7}>
                      <div className={styles.itemRightBox}>
                        <img
                          className={styles.itemIcon}
                          src={chuangImg}
                          alt=""
                        />
                        {getBedStatus(item.bedStatus)}
                      </div>
                      <div className={styles.itemRightBox}>
                        <img className={styles.itemIcon} src={huxiImg} alt="" />
                        {`${item.rr || 0}次`}
                      </div>
                      <div className={styles.itemRightBox}>
                        <img
                          className={styles.itemIcon}
                          src={xinluImg}
                          alt=""
                        />
                        {`${item.hr || 0}次`}
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
