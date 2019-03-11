import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import {Button, Checkbox, Col, Form, Input, Radio, Row, Select, DatePicker} from 'antd';
import {JXRS, Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const JXRSIcon = JXRS.Icon;

const formItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
  style: {
  },
};

const formItemLayout2 = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
  style: {
  },
};

const formItemLayout3 = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 21,
  },
  style: {
  },
};

const formItemLayout4 = {
  labelCol: {
  },
  wrapperCol: {
  },
  style: {
  },
};

const contentByLabel = (option) => {
  return option && option.map((item) => {
    item.label = item.content;
    return item;
  });
};

const Pinggu = (props) => {
  const {
    form: {
      getFieldDecorator,
    },
    xmlDetail,
    xmlData,
    onEdit,
    onpingguPdf,
  } = props;

  let initDate;

  return (
    <div className={styles.disabledColor}>
      <Form className="add-form">
        <Row className={styles.pgTitle} id="5">
          <Col span={9} className={styles.titleName}>入住评估表</Col>
          <Col span={5} push={4}>
            <Button
              htmlType="button"
              className={styles.btn}
              onClick={() => {
                onpingguPdf();
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
        <div>
          <div id="6" className={styles.ruzhuXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.pre01')}</Col>
            </Row>
            <Row style={{paddingTop: 13}}>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.01']}>
                  {getFieldDecorator('pre01.01', {
                    initialValue: xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['01'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.02']}>
                  {getFieldDecorator('pre01.02', {
                    initialValue: xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['02'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.03']}>
                  {getFieldDecorator('pre01.03', {
                    initialValue: xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['03'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.04']}>
                  {getFieldDecorator('pre01.04', {
                    initialValue: xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['04'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.05']}>
                  {getFieldDecorator('pre01.05', {
                    initialValue: xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['05'] ? moment(xmlDetail.pre01['05'], 'YYYY-MM-DD') : initDate,
                    rules: [
                    ],
                  })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.06']}>
                  {getFieldDecorator('pre01.06', {
                    initialValue: xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['06'] ? moment(xmlDetail.pre01['06'], 'YYYY-MM-DD') : initDate,
                    rules: [
                    ],
                  })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="7" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.01')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.01']}>
                      {getFieldDecorator('01.01', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.02'].cap}>
                      {getFieldDecorator('01.02', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['02']) || initDate,
                        rules: [
                        ],
                      })(<Select disabled allowClear getPopupContainer={triggerNode => triggerNode.parentNode} >{xmlData && xmlData['01.02'].children.map((k) => {
                        return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                      })}</Select>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.03']}>
                      {getFieldDecorator('01.03', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['03'] ? moment(xmlDetail['01']['03'], 'YYYY-MM-DD') : initDate,
                        rules: [
                        ],
                      })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.04']}>
                      {getFieldDecorator('01.04', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['04'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.05']}>
                      {getFieldDecorator('01.05', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['05'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.06']}>
                      {getFieldDecorator('01.06', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['06'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.07.01'].cap}>
                      {getFieldDecorator('01.07.01', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['07'] && xmlDetail['01']['07']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['01.07.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('01.07.02', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['07'] && xmlDetail['01']['07']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.08']}>
                      {getFieldDecorator('01.08', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['08'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.09'].cap}>
                      {getFieldDecorator('01.09', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['09']) || initDate,
                        rules: [
                        ],
                      })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{xmlData && xmlData['01.09'].children.map((k) => {
                        return <Option disabled key={k.value} value={k.value}>{k.content}</Option>;
                      })}</Select>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.10.01'].cap}>
                      {getFieldDecorator('01.10.01', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['10'] && xmlDetail['01']['10']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['01.10.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4} label={xmlData && xmlData['01.10.02'].cap}>
                      {getFieldDecorator('01.10.02', {
                        initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['10'] && xmlDetail['01']['10']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.11'].cap}>
                      {getFieldDecorator('01.11', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['11']) || initDate,
                        rules: [
                        ],
                      })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{xmlData && xmlData['01.11'].children.map((k) => {
                        return <Option disabled key={k.value} value={String(k.value)}>{k.content}</Option>;
                      })}</Select>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.12'].cap}>
                      {getFieldDecorator('01.12', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['12']) || initDate,
                        rules: [
                        ],
                      })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{xmlData && xmlData['01.12'].children.map((k) => {
                        return <Option disabled key={k.value} value={String(k.value)}>{k.content}</Option>;
                      })}</Select>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['01.13.01'].cap}>
                      {getFieldDecorator('01.13.01', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['13'] && xmlDetail['01']['13']['01']) || initDate,
                        rules: [
                        ],
                      })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{xmlData && xmlData['01.13.01'].children.map((k) => {
                        return <Option disabled key={k.value} value={k.value}>{k.content}</Option>;
                      })}</Select>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('01.13.02', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['13'] && xmlDetail['01']['13']['02']) || initDate,
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.14.01'].cap}>
                      {getFieldDecorator('01.14.01', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['14'] && xmlDetail['01']['14']['01']) || initDate,
                        rules: [
                        ],
                      })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{xmlData && xmlData['01.14.01'].children.map((k) => {
                        return <Option disabled key={k.value} value={k.value}>{k.content}</Option>;
                      })}</Select>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('01.14.02', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['14'] && xmlDetail['01']['14']['02']) || initDate,
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['01.15.01'].cap}>
                      {getFieldDecorator('01.15.01', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['15'] && xmlDetail['01']['15']['01']) || initDate,
                        rules: [
                        ],
                      })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{xmlData && xmlData['01.15.01'].children.map((k) => {
                        return <Option disabled key={k.value} value={k.value}>{k.content}</Option>;
                      })}</Select>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem {...formItemLayout3}>
                      {getFieldDecorator('01.15.02', {
                        initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['15'] && xmlDetail['01']['15']['02']) || initDate,
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 865}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('01.16', {
                    initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['16']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['01.16'].children ? xmlData['01.16'].children : [])} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="8" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.02')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['02.01'].cap}>
                      {getFieldDecorator('02.01', {
                        initialValue: (xmlDetail && xmlDetail['02'] && xmlDetail['02']['01']) || initDate,
                        rules: [
                        ],
                      })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{xmlData && xmlData['02.01'].children.map((k) => {
                        return <Option disabled key={k.value} value={String(k.value)}>{k.content}</Option>;
                      })}</Select>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['02.02.01'].cap}>
                      {getFieldDecorator('02.02.01', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['02'] && xmlDetail['02']['02']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['02.02.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4} >
                      {getFieldDecorator('02.02.02', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['02'] && xmlDetail && xmlDetail['02']['02']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['02.03.01'].cap}>
                      {getFieldDecorator('02.03.01', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['03'] && xmlDetail['02']['03']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['02.03.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('02.03.02', {
                        initialValue: (xmlDetail && xmlDetail['02'] && xmlDetail['02']['03'] && xmlDetail['02']['03']['02']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['02.03.02'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['02.04.01'].cap}>
                      {getFieldDecorator('02.04.01', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['04'] && xmlDetail['02']['04']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['02.04.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('02.04.02', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['04'] && xmlDetail['02']['04']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['02.05.01'].cap}>
                      {getFieldDecorator('02.05.01', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['05'] && xmlDetail['02']['05']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['02.05.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('02.05.02', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['05'] && xmlDetail['02']['05']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['02.06.01'].cap}>
                      {getFieldDecorator('02.06.01', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['06'] && xmlDetail['02']['06']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['02.06.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('02.06.02', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['06'] && xmlDetail['02']['06']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['02.07.01'].cap}>
                      {getFieldDecorator('02.07.01', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['07'] && xmlDetail['02']['07']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['02.07.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('02.07.02', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['07'] && xmlDetail['02']['07']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['02.08']}>
                      {getFieldDecorator('02.08', {
                        initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['08'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 1146}} span={10} className={styles.huliContent} />
            </Row>
          </div>
          <div id="9" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.03')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['03.01'].cap}>
                      {getFieldDecorator('03.01', {
                        initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['03.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['03.02.01']}>
                      {getFieldDecorator('03.02.01', {
                        initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['03.02.02']}>
                      {getFieldDecorator('03.02.02', {
                        initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['03.02.03']}>
                      {getFieldDecorator('03.02.03', {
                        initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['03'] ? moment(xmlDetail['03']['02']['03'], 'YYYY-MM-DD') : initDate,
                        rules: [
                        ],
                      })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['03.02.04']}>
                      {getFieldDecorator('03.02.04', {
                        initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['04'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['03.02.05']}>
                      {getFieldDecorator('03.02.05', {
                        initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['05'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 325}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('03.03', {
                    initialValue: (xmlDetail && xmlDetail['03'] && xmlDetail['03']['03']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['03.03'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="10" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.04')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['04.01.01'].cap}>
                      {getFieldDecorator('04.01.01', {
                        initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['01'] && xmlDetail['04']['01']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['04.01.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('04.01.02', {
                        initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['01'] && xmlDetail['04']['01']['02'],
                        rules: [
                        ],
                      })(<Input placeholder="请输入吸烟说明" />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['04.02'].cap}>
                      {getFieldDecorator('04.02', {
                        initialValue: (xmlDetail && xmlDetail['04'] && xmlDetail['04']['02']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['04.02'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['04.03'].cap}>
                      {getFieldDecorator('04.03', {
                        initialValue: (xmlDetail && xmlDetail['04'] && xmlDetail['04']['03']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['04.03'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['04.04.01']}>
                      {getFieldDecorator('04.04.01', {
                        initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['04'] && xmlDetail['04']['04']['01'],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      次/分
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={`${xmlData && xmlData['04.04.01']}选项`}>
                      {getFieldDecorator('04.04.02', {
                        initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['04'] && xmlDetail['04']['04']['02'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['04.04.02'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['04.04.03']}>
                      {getFieldDecorator('04.04.03', {
                        initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['04'] && xmlDetail['04']['04']['03'],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      次/分
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={`${xmlData && xmlData['04.04.03']}选项`}>
                      {getFieldDecorator('04.04.04', {
                        initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['04'] && xmlDetail['04']['04']['04'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['04.04.04'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 605}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('04.05', {
                    initialValue: (xmlDetail && xmlDetail['04'] && xmlDetail['04']['05']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['04.05'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="11" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.05')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.01']}>
                      {getFieldDecorator('05.01', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.02'].cap}>
                      {getFieldDecorator('05.02', {
                        initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['02']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['05.02'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.03.01'].cap}>
                      {getFieldDecorator('05.03.01', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['03'] && xmlDetail['05']['03']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['05.03.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('05.03.02', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['03'] && xmlDetail['05']['03']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.04'].cap}>
                      {getFieldDecorator('05.04', {
                        initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['04']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['05.04'].children) || []}/>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.05.01'].cap}>
                      {getFieldDecorator('05.05.01', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['05'] && xmlDetail['05']['05']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['05.05.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('05.05.02', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['05'] && xmlDetail['05']['05']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.06'].cap}>
                      {getFieldDecorator('05.06', {
                        initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['06']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['05.06'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.07'].cap}>
                      {getFieldDecorator('05.07', {
                        initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['07']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['05.07'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['05.08.01']}>
                      {getFieldDecorator('05.08.01', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['08'] && xmlDetail['05']['08']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.08.02']}>
                      {getFieldDecorator('05.08.02', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['08'] && xmlDetail['05']['08']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['05.09.01']}>
                      {getFieldDecorator('05.09.01', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['09'] && xmlDetail['05']['09']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.09.02']}>
                      {getFieldDecorator('05.09.02', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['09'] && xmlDetail['05']['09']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['05.10.01']}>
                      {getFieldDecorator('05.10.01', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['10'] && xmlDetail['05']['10']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['05.10.02']}>
                      {getFieldDecorator('05.10.02', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['10'] && xmlDetail['05']['10']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={`${xmlData && xmlData['05.11.01']}`}>
                      {getFieldDecorator('05.11.01', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['11'] && xmlDetail['05']['11']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={`${xmlData && xmlData['05.11.02']}`}>
                      {getFieldDecorator('05.11.02', {
                        initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['11'] && xmlDetail['05']['11']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 976}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('05.12', {
                    initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['12']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['05.12'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="12" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.06')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['06.01.01'].cap}>
                      {getFieldDecorator('06.01.01', {
                        initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['01'] && xmlDetail['06']['01']['01']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['06.01.01'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem>
                      {getFieldDecorator('06.01.02', {
                        initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['01'] && xmlDetail['06']['01']['02']) || [],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      次/夜
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['06.02.01'].cap}>
                      {getFieldDecorator('06.02.01', {
                        initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['02'] && xmlDetail['06']['02']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['06.02.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['06.02.02']}>
                      {getFieldDecorator('06.02.02', {
                        initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['02'] && xmlDetail['06']['02']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['06.02.03']}>
                      {getFieldDecorator('06.02.03', {
                        initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['02'] && xmlDetail['06']['02']['03'] ? moment(xmlDetail['06']['02']['03'], 'YYYY-MM-DD') : initDate,
                        rules: [
                        ],
                      })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['06.03']}>
                      {getFieldDecorator('06.03', {
                        initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['03'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['06.04']}>
                      {getFieldDecorator('06.04', {
                        initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['04'] ? moment(xmlDetail['06']['04'], 'YYYY-MM-DD') : initDate,
                        rules: [
                        ],
                      })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['06.05'].cap}>
                      {getFieldDecorator('06.05', {
                        initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['05'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['06.05'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['06.06'].cap}>
                      {getFieldDecorator('06.06', {
                        initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['06'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['06.06'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['06.07'].cap}>
                      {getFieldDecorator('06.07', {
                        initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['07']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['06.07'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 893}} span={10} className={styles.huliContent}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout4} label={intl.get('Ruyuan.06.08.01')}>
                      {getFieldDecorator('06.08.01', {
                        initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['08'] && xmlDetail['06']['08']['01']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['06.08.01'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout4} label={intl.get('Ruyuan.06.08.02')}>
                      {getFieldDecorator('06.08.02', {
                        initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['08'] && xmlDetail['06']['08']['02']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['06.08.02'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div id="13" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.07')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['07.01.01'].cap}>
                      {getFieldDecorator('07.01.01', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['01'] && xmlDetail['07']['01']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['07.01.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={intl.get('Ruyuan.07.01.02')}>
                      {getFieldDecorator('07.01.02', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['01'] && xmlDetail['07']['01']['02'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['07.01.02'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['07.02.01'].cap}>
                      {getFieldDecorator('07.02.01', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['02'] && xmlDetail['07']['02']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['07.02.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={intl.get('Ruyuan.07.02.02')}>
                      {getFieldDecorator('07.02.02', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['02'] && xmlDetail['07']['02']['02'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['07.02.02'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['07.03'].cap}>
                      {getFieldDecorator('07.03', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['03'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['07.03'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['07.04'].cap}>
                      {getFieldDecorator('07.04', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['04'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['07.04'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['07.05'].cap}>
                      {getFieldDecorator('07.05', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['05'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['07.05'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['07.06.01']}>
                      {getFieldDecorator('07.06.01', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['06'] && xmlDetail['07']['06']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['07.06.02']}>
                      {getFieldDecorator('07.06.02', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['06'] && xmlDetail['07']['06']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['07.07.01']}>
                      {getFieldDecorator('07.07.01', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['07'] && xmlDetail['07']['07']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['07.07.02']}>
                      {getFieldDecorator('07.07.02', {
                        initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['07'] && xmlDetail['07']['07']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 673}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('07.08', {
                    initialValue: (xmlDetail && xmlDetail['07'] && xmlDetail['07']['08']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['07.08'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="14">
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.08')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['08.01'].cap}>
                      {getFieldDecorator('08.01', {
                        initialValue: (xmlDetail && xmlDetail['08'] && xmlDetail['08']['01']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['08.01'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['08.02'].cap}>
                      {getFieldDecorator('08.02', {
                        initialValue: (xmlDetail && xmlDetail['08'] && xmlDetail['08']['02']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['08.02'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['08.03'].cap}>
                      {getFieldDecorator('08.03', {
                        initialValue: (xmlDetail && xmlDetail['08'] && xmlDetail['08']['03']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['08.03'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['08.04.01']}>
                      {getFieldDecorator('08.04.01', {
                        initialValue: xmlDetail && xmlDetail['08'] && xmlDetail['08']['04'] && xmlDetail['08']['04']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['08.04.02']}>
                      {getFieldDecorator('08.04.02', {
                        initialValue: xmlDetail && xmlDetail['08'] && xmlDetail['08']['04'] && xmlDetail['08']['04']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 255}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('08.05', {
                    initialValue: (xmlDetail && xmlDetail['08'] && xmlDetail['08']['05']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['08.05'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="15" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.09')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['09.01'].cap}>
                      {getFieldDecorator('09.01', {
                        initialValue: (xmlDetail && xmlDetail['09'] && xmlDetail['09']['01']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['09.01'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['09.02'].cap}>
                      {getFieldDecorator('09.02', {
                        initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['02'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['09.02'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['09.03.01']}>
                      {getFieldDecorator('09.03.01', {
                        initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['03'] && xmlDetail['09']['03']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['09.03.02']}>
                      {getFieldDecorator('09.03.02', {
                        initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['03'] && xmlDetail['09']['03']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['09.04.01']}>
                      {getFieldDecorator('09.04.01', {
                        initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['04'] && xmlDetail['09']['04']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['09.04.02']}>
                      {getFieldDecorator('09.04.02', {
                        initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['04'] && xmlDetail['09']['04']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 228}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('09.05', {
                    initialValue: (xmlDetail && xmlDetail['09'] && xmlDetail['09']['05']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['09.05'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="16" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.10')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['10.01.01'].cap}>
                      {getFieldDecorator('10.01.01', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['01'] && xmlDetail['10']['01']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['10.01.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('10.01.02', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['01'] && xmlDetail['10']['01']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['10.02'].cap}>
                      {getFieldDecorator('10.02', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['02'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['10.02'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['10.03'].cap}>
                      {getFieldDecorator('10.03', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['03'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['10.03'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['10.04'].cap}>
                      {getFieldDecorator('10.04', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['04'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['10.04'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['10.05.01'].cap}>
                      {getFieldDecorator('10.05.01', {
                        initialValue: (xmlDetail && xmlDetail['10'] && xmlDetail['10']['05'] && xmlDetail['10']['05']['01']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['10.05.01'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('10.05.02', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['05'] && xmlDetail['10']['05']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('10.05.03', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['05'] && xmlDetail['10']['05']['03'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['10.06.01'].cap}>
                      {getFieldDecorator('10.06.01', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['06'] && xmlDetail['10']['06']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['10.06.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['10.06.02'].cap}>
                      {getFieldDecorator('10.06.02', {
                        initialValue: (xmlDetail && xmlDetail['10'] && xmlDetail['10']['06'] && xmlDetail['10']['06']['02']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['10.06.02'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('10.06.03', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['06'] && xmlDetail['10']['06']['03'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('10.06.04', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['06'] && xmlDetail['10']['06']['04'],
                        rules: [
                        ],
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['10.07.01']}>
                      {getFieldDecorator('10.07.01', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['07'] && xmlDetail['10']['07']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['10.07.02']}>
                      {getFieldDecorator('10.07.02', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['07'] && xmlDetail['10']['07']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['10.08.01']}>
                      {getFieldDecorator('10.08.01', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['08'] && xmlDetail['10']['08']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['10.08.02']}>
                      {getFieldDecorator('10.08.02', {
                        initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['08'] && xmlDetail['10']['08']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 782}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('10.09', {
                    initialValue: (xmlDetail && xmlDetail['10'] && xmlDetail['10']['09']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['10.09'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="17" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.11')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['11.01.01'].cap}>
                      {getFieldDecorator('11.01.01', {
                        initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['01'] && xmlDetail['11']['01']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['11.01.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('11.01.02', {
                        initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['01'] && xmlDetail['11']['01']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['11.02.01'].cap}>
                      {getFieldDecorator('11.02.01', {
                        initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['02'] && xmlDetail['11']['02']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['11.02.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('11.02.02', {
                        initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['02'] && xmlDetail['11']['02']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['11.03'].cap}>
                      {getFieldDecorator('11.03', {
                        initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['03'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['11.03'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['11.04']}>
                      {getFieldDecorator('11.04', {
                        initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['04'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['11.05']}>
                      {getFieldDecorator('11.05', {
                        initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['05'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 458}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('11.06', {
                    initialValue: (xmlDetail && xmlDetail['11'] && xmlDetail['11']['06']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['11.06'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="18" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.12')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['12.01']}>
                      {getFieldDecorator('12.01', {
                        initialValue: xmlDetail && xmlDetail['12'] && xmlDetail['12']['01'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['12.02'].cap}>
                      {getFieldDecorator('12.02', {
                        initialValue: (xmlDetail && xmlDetail['12'] && xmlDetail['12']['02']) || [],
                        rules: [
                        ],
                      })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['12.02'].children) || []} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['12.03.01']}>
                      {getFieldDecorator('12.03.01 ', {
                        initialValue: xmlDetail && xmlDetail['12'] && xmlDetail['12']['03'] && xmlDetail['12']['03']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['12.03.02']}>
                      {getFieldDecorator('12.03.02 ', {
                        initialValue: xmlDetail && xmlDetail['12'] && xmlDetail['12']['03'] && xmlDetail['12']['03']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 221}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('12.04', {
                    initialValue: (xmlDetail && xmlDetail['12'] && xmlDetail['12']['04']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['12.04'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="19" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.13')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['13.01.01'].cap}>
                      {getFieldDecorator('13.01.01', {
                        initialValue: xmlDetail && xmlDetail['13'] && xmlDetail['13']['01']['01'],
                        rules: [
                        ],
                      })(<RadioGroup className="op-radio-group">
                        {
                          xmlData && xmlData['13.01.01'].children.map((item) => {
                            return <Radio disabled key={item.value} value={item.value}>{item.content}</Radio>;
                          })
                        }
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={23}>
                    <FormItem {...formItemLayout4}>
                      {getFieldDecorator('13.01.02', {
                        initialValue: xmlDetail && xmlDetail['13'] && xmlDetail['13']['02'] && xmlDetail['13']['01']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['13.02.01']}>
                      {getFieldDecorator('13.02.01', {
                        initialValue: xmlDetail && xmlDetail['13'] && xmlDetail['13']['02'] && xmlDetail['13']['02']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['13.02.02']}>
                      {getFieldDecorator('13.02.02', {
                        initialValue: xmlDetail && xmlDetail['13'] && xmlDetail['13']['02'] && xmlDetail['13']['02']['02'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 222}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('13.03', {
                    initialValue: (xmlDetail && xmlDetail['13'] && xmlDetail['13']['03']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['13.03'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="20" className={styles.jibenXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.14')}</Col>
              <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
              <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
            </Row>
            <Row>
              <Col span={14} style={{paddingTop: 13}}>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.01']}>
                      {getFieldDecorator('14.01.01', {
                        initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01']['01'],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      °C
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.02']}>
                      {getFieldDecorator('14.01.02', {
                        initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['02'],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      次/分
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.03']}>
                      {getFieldDecorator('14.01.03', {
                        initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['03'],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      次/分
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.04']}>
                      {getFieldDecorator('14.01.04', {
                        initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['04'],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      次/分
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.05']}>
                      {getFieldDecorator('14.01.05', {
                        initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['05'],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      mmHg
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.06']}>
                      {getFieldDecorator('14.01.06', {
                        initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['06'],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      cm
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.07']}>
                      {getFieldDecorator('14.01.07', {
                        initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['07'],
                        rules: [
                        ],
                      })(<Input disabled className={styles.houzhuiInput} />)}
                      kg
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['14.02']}>
                      {getFieldDecorator('14.02', {
                        initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['02'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem {...formItemLayout2} label={xmlData && xmlData['14.03']}>
                      {getFieldDecorator('14.03', {
                        initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['03'],
                        rules: [
                        ],
                      })(<TextArea disabled rows={4} />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col style={{paddingTop: 13, height: 546}} span={10} className={styles.huliContent}>
                <FormItem {...formItemLayout3} >
                  {getFieldDecorator('14.04', {
                    initialValue: (xmlDetail && xmlDetail['14'] && xmlDetail['14']['04']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled options={contentByLabel(xmlData && xmlData['14.04'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="21" className={styles.ruzhuXX}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.sup01')}</Col>
            </Row>
            <Row style={{paddingTop: 13}}>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['sup01.01']}>
                  {getFieldDecorator('sup01.01', {
                    initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['01'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['sup01.02']}>
                  {getFieldDecorator('sup01.02', {
                    initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['02'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['sup01.03']}>
                  {getFieldDecorator('sup01.03', {
                    initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['03'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['sup01.04']}>
                  {getFieldDecorator('sup01.04', {
                    initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['04'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['sup01.05']}>
                  {getFieldDecorator('sup01.05', {
                    initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['05'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['sup01.06']}>
                  {getFieldDecorator('sup01.06', {
                    initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['06'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['sup01.07']}>
                  {getFieldDecorator('sup01.07', {
                    initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['07'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['sup01.08']}>
                  {getFieldDecorator('sup01.08', {
                    initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['08'] ? moment(xmlDetail.sup01['08'], 'YYYY-MM-DD') : initDate,
                    rules: [
                    ],
                  })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={xmlData && xmlData['sup01.09']}>
                  {getFieldDecorator('sup01.09', {
                    initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['09'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
          </div>
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

export default injectIntl(connect(({dangan}) => ({dangan}))(Form.create()(Pinggu)));
