import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {convert} from 'utils';
import intl from 'react-intl-universal';
import { Col, Form, Row, Collapse} from 'antd';
import styles from './Record.less';

const FormItem = Form.Item;
const {Panel} = Collapse;

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
  style: {
  },
};

const filterChuzhiDz = (chuzhiDz, id) => {
  if (chuzhiDz) {
    const filters = chuzhiDz.filter((item) => {
      return item.id === id;
    });
    if (filters && filters.length > 0) {
      return filters[0].value;
    }
  }
};

const Record = (props) => {
  const {
    app,
    type,
    list,
    chuzhiDzRadio,
  } = props;

  const {
    allHulidengji,
    allXingbie,
  } = app;

  let convertFunc;
  switch (type) {
    case 'yuyue':
      convertFunc = convert.yuyue;
      break;
    case 'yuding':
      convertFunc = convert.yuding;
      break;
    case 'shenqing':
      convertFunc = convert.shenqing;
      break;
    default:
      break;
  }

  return (
    <div className={styles.record}>
      {
        list && list.length > 0 && list.map((item) => {
          const xinxiBg = convertFunc(JSON.parse(item.xinxiBg), allXingbie || [], allHulidengji || []);
          const first2 = [];
          const left2 = [];
          const more2 = xinxiBg && xinxiBg.length > 2;
          if (xinxiBg) {
            xinxiBg.forEach((xinxi, xIndex) => {
              const keyId = xIndex;
              if (xIndex >= 2) {
                left2.push(<div key={keyId}>{xinxiBg[xIndex]}</div>);
              } else {
                first2.push(<div key={keyId}>{xinxiBg[xIndex]}</div>);
              }
            });
          }
          return (
            <div key={item.id} className={styles.recordItem}>
              <Form>
                <Row>
                  <Col span={12}>
                    <FormItem {...formItemLayout}>
                      <div className={styles.chuzhiSj}>{item.updateTime}</div>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem style={{justifyContent: 'flex-end'}}>
                      <div className={styles.chuzhiDz}>处置动作/处置人：{`${filterChuzhiDz(chuzhiDzRadio, item.chuzhiDz)}/${item.chuzhirenXm}`}</div>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem {...formItemLayout} className="justify" label={intl.get('Yuyue.chuzhiQk')}>
                      {item.chuzhiQk}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={intl.get('Yuyue.xinxiBg')}>
                      <Collapse className={more2 ? 'xinxiBg' : 'xinxiBg disabled'}>
                        <Panel header={first2 && first2.length > 0 ? first2 : '-'} key="1">
                          {left2 && left2.length > 0 ? left2 : '-'}
                        </Panel>
                      </Collapse>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          );
        })
      }
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Record));
