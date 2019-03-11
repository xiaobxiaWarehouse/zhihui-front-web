import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import {Button, Col, Form, Row} from 'antd';
import {config} from 'utils';
import {JXRS} from 'components';
import styles from './index.less';
import Page from './page';

const JXRSIcon = JXRS.Icon;
const {PROJECT} = config;


const Tijian = (props) => {
  const {
    tijianbaogao,
    currentTijianIndex,
    tijianData,
    onPage,
    onEdit,
    showImg,
    ontijianPdf,
  } = props;

  const pageProps = {
    length: tijianbaogao.length,
    index: currentTijianIndex,
    onLeft() {
      let newCurrentTijianIndex = currentTijianIndex - 1;
      onPage(newCurrentTijianIndex);
    },
    onRight() {
      let newCurrentTijianIndex = currentTijianIndex + 1;
      onPage(newCurrentTijianIndex);
    },
    time: tijianData && tijianData.time ? moment(tijianData.time, 'YYYY-MM-DD') : undefined,
    isDisabled: false,
  };

  return (
    <div className={styles.disabledColor}>
      <Form className="add-form">
        <Row className={styles.pgTitle} id="22">
          <Col span={9} className={styles.titleName}>体检报告</Col>
          <Col span={5} push={4}>
            <Button
              htmlType="button"
              className={styles.btn}
              onClick={() => {
                ontijianPdf();
              }}
            > 导出PDF</Button>
          </Col>
          <Col span={5} push={5}>
            <Button
              className={styles.btn}
              onClick={() => {
                onEdit();
              }}
            ><JXRSIcon type="edit"/> 编辑表单</Button>
          </Col>
        </Row>
        {
          tijianbaogao.length > 1 && <Page {...pageProps} />
        }
        <div className={styles.tijianList}>
          {
            tijianData && tijianData['01'] && tijianData['01']['01'] && tijianData['01']['01'].length > 0 ? tijianData['01']['01'].map((item, index) => {
              let keyId = index;
              return (
                <div
                  className={styles.imgBox}
                  key={keyId}
                  style={{
                    width: 271,
                    height: 171,
                    border: '1px solid #d9d9d9',
                    overflow: 'hidden',
                    marginBottom: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => { showImg(item['01']); }}
                >
                  <img src={`${PROJECT}/oss/${item['01']}?x-oss-process=image/resize,m_lfit,w_271,h_171/auto-orient,1`} alt="" />
                </div>
              );
            }) : <div className={styles.empty}>
              暂无数据
            </div>
          }
        </div>
      </Form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    dangan: state.dangan,
  };
}

export default injectIntl(connect(({dangan}) => ({dangan}))(Form.create()(Tijian)));
