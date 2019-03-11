import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import {Button, Checkbox, Col, Form, Input, Row, Select, DatePicker, Table} from 'antd';
import {config} from 'utils';
import {JXRS, Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;
const JXRSIcon = JXRS.Icon;
const {PROJECT} = config;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
  style: {
  },
};

const formItemLayout2 = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
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

const Jiankang = (props) => {
  const {
    form: {
      getFieldDecorator,
    },
    jiankangXml,
    jiankangXmlDetail,
    onEdit,
    onjiankangPdf,
  } = props;

  let initDate;

  const columnsJL = [
    {
      title: jiankangXml && jiankangXml['02.01.01'],
      dataIndex: '01',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiankangXml && jiankangXml['02.01.02'],
      dataIndex: '02',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiankangXml && jiankangXml['02.01.03'],
      dataIndex: '03',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiankangXml && jiankangXml['02.01.04'],
      dataIndex: '04',
      render: (record, row, index) => {
        return (
          <div className={styles.deleteBox}>
            <span>{record || '-'}</span>
          </div>
        );
      },
    },
  ];

  const columnsJT = [
    {
      title: jiankangXml && jiankangXml['04.01.01'],
      dataIndex: '01',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiankangXml && jiankangXml['04.01.02'],
      dataIndex: '02',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiankangXml && jiankangXml['04.01.03'],
      dataIndex: '03',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiankangXml && jiankangXml['04.01.04'],
      dataIndex: '04',
      render: (record, row, index) => {
        return (
          <div className={styles.deleteBox}>
            <span>{record || '-'}</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.disabledColor}>
      <Form className="add-form">
        <Row className={styles.pgTitle} id="22">
          <Col span={9} className={styles.titleName}>入住健康记录</Col>
          <Col span={5} push={4}>
            <Button
              htmlType="button"
              className={styles.btn}
              onClick={() => {
                onjiankangPdf();
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
          <div id="23">
            <Row className={styles.pgTitle}>
              <Col span={4} className={styles.titleName}>入住信息</Col>
            </Row>
            <Row style={{paddingTop: 13}}>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.01']}>
                  {getFieldDecorator('pre01.01', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['01'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['pre01.02']}>
                  {getFieldDecorator('pre01.02', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['02'] ? moment(jiankangXmlDetail.pre01['02'], 'YYYYMMDD') : initDate,
                    rules: [
                    ],
                  })(<DatePicker placeholder="" disabled className={CSS.datePicker} format="YYYY-MM-DD" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['pre01.03']}>
                  {getFieldDecorator('pre01.03', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['03'] ? moment(jiankangXmlDetail.pre01['03'], 'YYYYMMDD') : initDate,
                    rules: [
                    ],
                  })(<DatePicker placeholder="" disabled className={CSS.datePicker} format="YYYY-MM-DD" />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['pre01.04']}>
                  {getFieldDecorator('pre01.04', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['04'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['pre01.05'].cap}>
                  {getFieldDecorator('pre01.05', {
                    initialValue: (jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['05']) || initDate,
                    rules: [
                    ],
                  })(<Select disabled allowClear>{jiankangXml && jiankangXml['pre01.05'].children.map((k) => {
                    return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                  })}</Select>)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.06']}>
                  {getFieldDecorator('pre01.06', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['06'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.07']}>
                  {getFieldDecorator('pre01.07', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['07'] ? moment(jiankangXmlDetail.pre01['07'], 'YYYYMMDD') : initDate,
                    rules: [
                    ],
                  })(<DatePicker placeholder="" disabled className={CSS.datePicker} format="YYYY-MM-DD" />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.08'].cap}>
                  {getFieldDecorator('pre01.08', {
                    initialValue: (jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['08']) || initDate,
                    rules: [
                    ],
                  })(<Select disabled allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{jiankangXml && jiankangXml['pre01.08'].children.map((k) => {
                    return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                  })}</Select>)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.09']}>
                  {getFieldDecorator('pre01.09', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['09'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.10']}>
                  {getFieldDecorator('pre01.10', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['10'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.11']}>
                  {getFieldDecorator('pre01.11', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['11'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.12']}>
                  {getFieldDecorator('pre01.12', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01 && ['12'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.13']}>
                  {getFieldDecorator('pre01.13', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['13'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.14']}>
                  {getFieldDecorator('pre01.14', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['14'] ? moment(jiankangXmlDetail.pre01['14'], 'YYYYMMDD') : initDate,
                    rules: [
                    ],
                  })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="24">
            <Row className={styles.pgTitle} type="flex" justify="space-between">
              <Col span={4} className={styles.titleName}>基本信息</Col>
            </Row>
            <Row style={{paddingTop: 13}}>
              <Col span={12}>
                <Row>
                  <Col span={24}>
                    <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.01']}>
                      {getFieldDecorator('01.01', {
                        initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['01'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.02']}>
                      {getFieldDecorator('01.02', {
                        initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['02'] ? moment(jiankangXmlDetail['01']['02'], 'YYYYMMDD') : initDate,
                        rules: [
                        ],
                      })(<DatePicker placeholder="" disabled className={CSS.datePicker} format="YYYY-MM-DD" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.03']}>
                      {getFieldDecorator('01.03', {
                        initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['03'],
                        rules: [
                        ],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.04'].cap}>
                      {getFieldDecorator('01.04', {
                        initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['04']) || initDate,
                        rules: [
                        ],
                      })(<Select disabled allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{jiankangXml && jiankangXml['01.04'].children.map((k) => {
                        return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                      })}</Select>)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span={12} style={{textAlign: 'center'}}>
                <div
                  style={{
                    width: 162,
                    height: 188,
                    border: '1px solid #d9d9d9',
                    overflow: 'hidden',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img src={((jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['18']) && (`${PROJECT}/oss/${jiankangXmlDetail['01']['18']}?x-oss-process=image/resize,m_lfit,w_162,h_188/auto-orient,1`)) || undefined} alt="" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.05.01'].cap}>
                  {getFieldDecorator('01.05.01', {
                    initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['05'] && jiankangXmlDetail['01']['05']['01']) || initDate,
                    rules: [
                    ],
                  })(<Select disabled allowClear>{jiankangXml && jiankangXml['01.05.01'].children.map((k) => {
                    return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                  })}</Select>)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.05.01'].cap}>
                  {getFieldDecorator('01.05.02', {
                    initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['05'] && jiankangXmlDetail['01']['05']['02']) || initDate,
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.06']}>
                  {getFieldDecorator('01.06', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['06'],
                    rules: [
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.07'].cap}>
                  {getFieldDecorator('01.07', {
                    initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['07']) ? String(jiankangXmlDetail['01']['07']) : initDate,
                    rules: [
                    ],
                  })(<Select disabled allowClear>{jiankangXml && jiankangXml['01.07'].children.map((k) => {
                    return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                  })}</Select>)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.08'].cap}>
                  {getFieldDecorator('01.08', {
                    initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['08']) ? String(jiankangXmlDetail['01']['08']) : initDate,
                    rules: [
                    ],
                  })(<Select disabled allowClear>{jiankangXml && jiankangXml['01.08'].children.map((k) => {
                    return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                  })}</Select>)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.09']}>
                  {getFieldDecorator('01.09', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['09'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.10']}>
                  {getFieldDecorator('01.10', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['10'] ? moment(jiankangXmlDetail['01']['10'], 'YYYYMMDD') : initDate,
                    rules: [
                    ],
                  })(<DatePicker placeholder="" disabled className={CSS.datePicker} format="YYYY-MM-DD" />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.11']}>
                  {getFieldDecorator('01.11', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['11'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.12']}>
                  {getFieldDecorator('01.12', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['12'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.13']}>
                  {getFieldDecorator('01.13', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['13'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.14']}>
                  {getFieldDecorator('01.14', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['14'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.15']}>
                  {getFieldDecorator('01.15', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['15'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.16']}>
                  {getFieldDecorator('01.16', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['16'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.17']}>
                  {getFieldDecorator('01.17', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['17'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="25">
            <Row className={styles.pgTitle}>
              <Col span={4} className={styles.titleName}>个人简历</Col>
            </Row>
            <Row style={{marginTop: 13}}>
              <Col>
                <Table
                  bordered
                  columns={columnsJL}
                  dataSource={(jiankangXmlDetail && jiankangXmlDetail['02'] && jiankangXmlDetail['02']['01']) || []}
                  pagination={false}
                  rowKey={(record, index) => index}
                />
              </Col>
            </Row>
          </div>
          <div id="26" style={{marginTop: 12}}>
            <Row className={styles.pgTitle}>
              <Col span={6} className={styles.titleName}>特长性格兴趣</Col>
            </Row>
            <Row style={{paddingTop: 13}}>
              <Col span={24}>
                <FormItem {...formItemLayout} label="特长">
                  {getFieldDecorator('03.01', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['03'] && jiankangXmlDetail['03']['01'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label="性格">
                  {getFieldDecorator('03.02', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['03'] && jiankangXmlDetail['03']['02'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label="兴趣爱好">
                  {getFieldDecorator('03.03', {
                    initialValue: jiankangXmlDetail && jiankangXmlDetail['03'] && jiankangXmlDetail['03']['03'],
                    rules: [
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div id="27">
            <Row className={styles.pgTitle}>
              <Col span={4} className={styles.titleName}>家庭成员</Col>
            </Row>
            <Row style={{marginTop: 13}}>
              <Col>
                <Table
                  bordered
                  columns={columnsJT}
                  dataSource={(jiankangXmlDetail && jiankangXmlDetail['04'] && jiankangXmlDetail['04']['01']) || []}
                  pagination={false}
                  rowKey={(record, index) => index}
                />
              </Col>
            </Row>
          </div>
          <div id="28" style={{marginTop: 12}}>
            <Row className={styles.pgTitle}>
              <Col span={4} className={styles.titleName}>既往病史</Col>
            </Row>
            <Row style={{paddingTop: 13}}>
              <Col span={24}>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator('05.01.01', {
                    initialValue: (jiankangXmlDetail && jiankangXmlDetail['05'] && jiankangXmlDetail['05']['01'] && jiankangXmlDetail['05']['01']['01']) || [],
                    rules: [
                    ],
                  })(<CheckboxGroup disabled className={styles.CheckboxGroup} options={contentByLabel(jiankangXml && jiankangXml['05.01.01'].children) || []} />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label="既往病史说明">
                  {getFieldDecorator('05.01.02', {
                    initialValue: (jiankangXmlDetail && jiankangXmlDetail['05'] && jiankangXmlDetail['05']['01'] && jiankangXmlDetail['05']['01']['02']) || undefined,
                    rules: [
                    ],
                  })(<TextArea disabled rows={4} />)}
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

export default injectIntl(connect(({dangan}) => ({dangan}))(Form.create()(Jiankang)));
