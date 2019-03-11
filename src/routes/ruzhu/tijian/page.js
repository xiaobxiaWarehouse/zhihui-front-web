import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import {Button, Col, Form, Row} from 'antd';
import {JXRS} from 'components';
import styles from './index.less';

const JXRSIcon = JXRS.Icon;

const Page = (props) => {
  const {
    qitaBg,
    bgCreateTime,
    currentIndex,
    isAdd,
    onFilterChange,
  } = props;

  return (
    <div>
      <Row type="flex" justify="center">
        <Col span={1}>
          {
            !isAdd && <Button
              type="primary"
              className={styles.pageBtn}
              disabled={currentIndex <= 1}
              onClick={() => {
                onFilterChange('left');
              }}
            ><JXRSIcon type="left"/></Button>
          }
        </Col>
        <Col span={7}>
          <div className={styles.pageContent}>
            {
              isAdd ? '新增体检报告' : bgCreateTime ? `${currentIndex}/${qitaBg && qitaBg.length}：${moment(bgCreateTime).format('YYYY-MM-DD')}` : ''
            }
          </div>
        </Col>
        <Col span={1}>
          {
            !isAdd && <Button
              type="primary"
              className={styles.pageBtn}
              disabled={currentIndex >= Number(qitaBg && qitaBg.length)}
              onClick={() => {
                onFilterChange('right');
              }}
            ><JXRSIcon type="right"/></Button>
          }
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Page)));
