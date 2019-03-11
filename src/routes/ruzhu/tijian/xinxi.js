import React from 'react';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import moment, { months } from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import { Button, Col, Form, Input, message, Row, Tag } from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import TipModal from '../tipModal';
import Page from './page';
import List from './list';

const FormItem = Form.Item;
const JXRSIcon = JXRS.Icon;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
  style: {
  },
};

class Xinxi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  componentWillReceiveProps(newProps) {
    const {location} = this.props;
    const {search} = location;
    const query = queryString.parse(search);
    const {tijianBg} = query;
    if ((newProps.tijianXmlDetail && newProps.tijianXmlDetail.pre01 && newProps.tijianXmlDetail.pre01['05']) !== (this.props.tijianXmlDetail && this.props.tijianXmlDetail.pre01 && this.props.tijianXmlDetail.pre01['05']) && tijianBg !== '-1') {
      this.setState({
        date: newProps.tijianXmlDetail && newProps.tijianXmlDetail.pre01 && newProps.tijianXmlDetail.pre01['05'] ? moment(newProps.tijianXmlDetail.pre01['05'], 'YYYY-MM-DD').toDate() : undefined,
      });
    }
  }

  render() {
    const {
      dispatch,
      history,
      form: {
        getFieldsValue,
        getFieldDecorator,
        setFieldsValue,
      },
      location,
      tijianXml,
      isAdd,
      tijianList,
      tijianXmlDetail,
      baogaoLb,
      bgCreateTime,
      currentBgIndex,
      shengqingList,
      tipModalVisible,
      app: {
        isFormChange,
      },
      listProps,
      banben,
    } = this.props;

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.date ? moment(this.state.date, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const {pathname, search} = location;
    const query = queryString.parse(search);
    const {tijianBg, suoyin} = query;

    const pageProps = {
      isAdd,
      currentIndex: currentBgIndex,
      qitaBg: baogaoLb,
      bgCreateTime,
      onFilterChange (key) {
        let index = key === 'left' ? currentBgIndex - 1 : currentBgIndex + 1;
        dispatch(routerRedux.push({
          pathname,
          search: queryString.stringify({
            ...query,
            tijianBg: baogaoLb[index - 1],
          }),
        }));
        dispatch({
          type: 'ruyuan/changeCurrentBgIndex',
          payload: index,
        });
      },
    };

    let initDate;
    const add = () => {
      if (!isAdd) {
        dispatch({
          type: 'ruyuan/changeIsAdd',
          payload: true,
        });
        setFieldsValue({
          // 'pre01.01': (tijianBg === '-1' ? shengqingList && shengqingList.xingming : tijianXmlDetail && tijianXmlDetail.pre01 && tijianXmlDetail.pre01['01']) || initDate,
          'pre01.02': (tijianBg === '-1' ? (shengqingList && shengqingList.nianling) || undefined : tijianXmlDetail && tijianXmlDetail.pre01 && tijianXmlDetail.pre01['02']) || initDate,
          'pre01.03': (tijianBg === '-1' ? shengqingList && shengqingList.shenfenzheng : tijianXmlDetail && tijianXmlDetail.pre01 && tijianXmlDetail.pre01['03']) || initDate,
          'pre01.04': initDate,
          'pre01.06': initDate,
        });
        this.setState({
          date: null,
        });
      } else {
        message.info('请先保存当前体检报告');
      }
    };

    const onBack = (type, params) => {
      if (isFormChange) {
        dispatch({
          type: 'app/changeModalVisible',
          payload: {
            modalVisible: true,
            type,
            queryParams: params,
          },
        });
      } else if (type === 1) {
        history.goBack();
      } else if (type === '/ruzhu/list') {
        dispatch(routerRedux.push({
          pathname: type,
          search: queryString.stringify(query),
        }));
      } else if (type === '/dangan/detail') {
        dispatch(routerRedux.push({
          pathname: type,
          search: queryString.stringify(params),
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: type,
          search: queryString.stringify(query),
        }));
      }
    };

    const saveCallback = () => {
      const {
        from,
        ...queryParams
      } = query;
      if (from === '1') {
        dispatch(routerRedux.push({
          pathname: '/ruzhu/list',
          search: queryString.stringify(queryParams),
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: '/dangan/detail',
          search: queryString.stringify({id: query.fromId, suoyin: query.suoyin}),
        }));
      }
    };

    const save = () => {
      const fields = getFieldsValue();
      let xinxi = Object.keys(fields).some((item) => {
        return fields[item];
      });
      if (fields.pre01['05']) {
        fields.pre01['05'] = moment(fields.pre01['05']).format('YYYY-MM-DD');
      }
      if (xinxi || tijianList.length > 0) {
        if (isAdd) {
          dispatch({
            type: 'ruyuan/addDanan',
            payload: {
              suoyin: Number(query.suoyin),
              neirong: JSON.stringify({
                ...fields,
                '01': {
                  '01': tijianList,
                },
              }),
              leixing: 2,
              banben,
            },
            callback: () => {
              saveCallback();
            },
          });
        } else {
          dispatch({
            type: 'ruyuan/modifyDanan',
            payload: {
              id: Number(query.tijianBg),
              suoyin: Number(query.suoyin),
              neirong: JSON.stringify({
                ...fields,
                '01': {
                  '01': tijianList,
                },
              }),
              leixing: 2,
              banben,
            },
            callback: () => {
              saveCallback();
            },
          });
        }
      }
    };

    const tipModalProps = {
      visible: tipModalVisible,
      maskClosable: false,
      title: '温馨提示',
      wrapClassName: 'vertical-center-modal',
      onOk () {
        setFieldsValue({
          'pre01.01': shengqingList.xingming,
          'pre01.02': shengqingList.nianling || undefined,
          'pre01.03': shengqingList.shenfenzheng,
        });
        dispatch({
          type: 'ruyuan/hideTipModal',
        });
      },
      onCancel () {
        dispatch({
          type: 'ruyuan/hideTipModal',
        });
      },
    };

    const onUpdate = () => {
      dispatch({
        type: 'ruyuan/ruyuanshengqingXQ',
        payload: {
          suoyin: Number(suoyin),
        },
        callback: () => {
          dispatch({
            type: 'ruyuan/showTipModal',
          });
        },
      });
    };

    return (
      <div className="add-wrap">
        <div className="header">
          <div className="navGroup">
            <Row className="nav">
              <Col className="title">录入体检报告</Col>
              <Col className="navBtn">
                <Permissions all="sys:tijian:edit">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      add();
                    }}
                  ><JXRSIcon type="add"/> 新增体检报告</Button>
                </Permissions>
                <Button
                  type="primary"
                  style={{marginRight: 10}}
                  onClick={() => {
                    onBack(query.from === '1' ? '/ruzhu/list' : '/dangan/detail', {id: query.fromId, suoyin: query.from});
                  }}
                ><JXRSIcon type="left"/> 返回</Button>
                {
                  tijianBg !== '-1' && <Permissions all="sys:tijian:edit">
                    <Button
                      type="primary"
                      style={{marginRight: 10}}
                      onClick={() => {
                        onUpdate();
                      }}
                    >同步</Button>
                  </Permissions>
                }
                <Permissions all="sys:tijian:edit">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      save();
                    }}
                  ><JXRSIcon type="save"/> 保存</Button>
                </Permissions>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch({
                      type: 'app/changeIsHomeBack',
                      payload: true,
                    });
                    onBack('/home');
                  }}
                ><JXRSIcon type="home"/> 首页</Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className="mainRaw bgWhite" style={{padding: '28px 0 0'}}>
          <Form className="add-form">
            <Page {...pageProps} />
            <Row style={{padding: '0 28px'}}>
              <Col span={24} className="content">
                <Row className="pgTitle">
                  <Col span={6}>
                    <Tag className="titleName">评估信息</Tag>
                  </Col>
                </Row>
                <Row style={{paddingTop: 15, paddingBottom: 15}}>
                  <Col span={24}>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={tijianXml && tijianXml['pre01.01']}>
                          {getFieldDecorator('pre01.01', {
                            initialValue: tijianBg === '-1' ? (shengqingList && shengqingList.xingming) || undefined : tijianXmlDetail && tijianXmlDetail.pre01 && tijianXmlDetail.pre01['01'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${tijianXml && tijianXml['pre01.01']}`} />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={tijianXml && tijianXml['pre01.02']}>
                          {getFieldDecorator('pre01.02', {
                            initialValue: tijianBg === '-1' ? (shengqingList && shengqingList.nianling) || undefined : tijianXmlDetail && tijianXmlDetail.pre01 && tijianXmlDetail.pre01['02'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${tijianXml && tijianXml['pre01.02']}`}/>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={tijianXml && tijianXml['pre01.03']}>
                          {getFieldDecorator('pre01.03', {
                            initialValue: tijianBg === '-1' ? (shengqingList && shengqingList.shenfenzheng) || undefined : tijianXmlDetail && tijianXmlDetail.pre01 && tijianXmlDetail.pre01['03'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${tijianXml && tijianXml['pre01.03']}`}/>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={tijianXml && tijianXml['pre01.04']}>
                          {getFieldDecorator('pre01.04', {
                            initialValue: (tijianXmlDetail && tijianXmlDetail.pre01 && tijianXmlDetail.pre01['04']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${tijianXml && tijianXml['pre01.04']}`}/>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={tijianXml && tijianXml['pre01.05']}>
                          {getFieldDecorator('pre01.05', {
                            initialValue: tijianXmlDetail && tijianXmlDetail.pre01 && tijianXmlDetail.pre01['05'] ? moment(tijianXmlDetail.pre01['05'], 'YYYY-MM-DD').toDate() : initDate,
                            rules: [
                            ],
                          })(<PopPicker
                            datePicker={datePicker}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.date}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                date,
                              });
                            }}
                          >
                            <Button>{this.state.date ? moment(this.state.date).format('YYYY-MM-DD') : `请选择${tijianXml && tijianXml['pre01.05']}`}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={tijianXml && tijianXml['pre01.06']}>
                          {getFieldDecorator('pre01.06', {
                            initialValue: (tijianXmlDetail && tijianXmlDetail.pre01 && tijianXmlDetail.pre01['06']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${tijianXml && tijianXml['pre01.06']}`}/>)}
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <List {...listProps} />
          {
            tipModalVisible && <TipModal {...tipModalProps}/>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create({
  onValuesChange(props, values) {
    const {
      dispatch,
    } = props;
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
    });
  },
})(Xinxi)));
