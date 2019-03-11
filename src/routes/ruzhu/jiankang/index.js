import React from 'react';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import {Button, Checkbox, Col, Form, Input, Row, Select, Upload, Icon, Table, Tag, message} from 'antd';
import {config, upload} from 'utils';
import {JXRS, Layout, Permissions} from 'components';
import styles from '../index.less';
import VitaeModal from './VitaeModal';
import FamilyModal from './FamilyModal';
import TipModal from '../tipModal';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;
const JXRSIcon = JXRS.Icon;
const {TYPE} = upload;
const {PROJECT} = config;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
  style: {
  },
};

const formItemLayout2 = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
  style: {
  },
};

const nav = [{
  name: '入住信息',
  id: 'pre01',
}, {
  name: '基本信息',
  id: '01',
}, {
  name: '个人简历',
  id: '02',
}, {
  name: '特长性格兴趣',
  id: '03',
}, {
  name: '家庭成员',
  id: '04',
}, {
  name: '既往病史',
  id: '05',
}];

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jiandangDate: null,
      gengxinDate: null,
      ruyuanDate: null,
      pingguDate: null,
      chushengDate: null,
      gongzuoDate: null,
    };
  }

  componentWillReceiveProps(newProps) {
    const {location} = this.props;
    const {search} = location;
    const query = queryString.parse(search);
    const {jiankangJl} = query;
    const {ruyuan} = newProps;
    const {jiankangXmlDetail, shengqingList} = ruyuan;
    if (jiankangJl !== '-1' && this.props.ruyuan.jiankangXmlDetail === null && jiankangXmlDetail) {
      this.setState({
        jiandangDate: jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['02'] ? moment(jiankangXmlDetail.pre01['02']).toDate() : undefined,
        gengxinDate: jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['03'] ? moment(jiankangXmlDetail.pre01['03']).toDate() : undefined,
        ruyuanDate: jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['07'] ? moment(jiankangXmlDetail.pre01['07']).toDate() : undefined,
        pingguDate: jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['14'] ? moment(jiankangXmlDetail.pre01['14']).toDate() : undefined,
        chushengDate: jiankangXmlDetail['01'] && jiankangXmlDetail['01']['02'] ? moment(jiankangXmlDetail['01']['02']).toDate() : undefined,
        gongzuoDate: jiankangXmlDetail['01'] && jiankangXmlDetail['01']['10'] ? moment(jiankangXmlDetail['01']['10']).toDate() : undefined,
      });
    } else if (jiankangJl === '-1' && this.props.ruyuan.shengqingList === null && shengqingList) {
      this.setState({
        ruyuanDate: shengqingList.shijiSj ? moment(shengqingList.shijiSj).toDate() : undefined,
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
      ruyuan: {
        jiankangXml,
        jiankangXmlDetail,
        vitaeList,
        familyList,
        photo,
        vitaeModalVisible,
        familyModalVisible,
        vitaeEdit,
        familyEdit,
        shengqingList,
        banben,
        tipModalVisible,
      },
      app: {
        isFormChange,
      },
    } = this.props;
    const {search} = location;
    const query = queryString.parse(search);
    const {jiankangJl, suoyin} = query;

    const beforeUpload = (file, filelist) => {
      return false;
    };

    const vitaeModalProps = {
      width: 744,
      visible: vitaeModalVisible,
      maskClosable: false,
      title: '增加条目',
      wrapClassName: 'vertical-center-modal',
      filter: {
        ...query,
      },
      onOk (item) {
        vitaeList.push(item);
        dispatch({
          type: 'ruyuan/changeVitaeList',
          payload: vitaeList,
        });
        dispatch({
          type: 'ruyuan/hideVitaeModal',
        });
        dispatch({
          type: 'app/updataFormChange',
          payload: true,
        });
      },
      onCancel () {
        dispatch({
          type: 'ruyuan/hideVitaeModal',
        });
      },
    };

    const familyModalProps = {
      width: 744,
      visible: familyModalVisible,
      maskClosable: false,
      title: '增加条目',
      wrapClassName: 'vertical-center-modal',
      filter: {
        ...query,
      },
      onOk (item) {
        familyList.push(item);
        dispatch({
          type: 'ruyuan/changeFamilyList',
          payload: familyList,
        });
        dispatch({
          type: 'ruyuan/hideFamilyModal',
        });
        dispatch({
          type: 'app/updataFormChange',
          payload: true,
        });
      },
      onCancel () {
        dispatch({
          type: 'ruyuan/hideFamilyModal',
        });
      },
    };

    const uploadProps = {
      beforeUpload,
      showUploadList: false,
      onChange({ file, fileList }) {
        dispatch({
          type: 'upload/getConfig',
          payload: {},
          callback: (uploadConfig) => {
            dispatch({
              type: 'app/loading',
              payload: true,
            });
            upload.upload(uploadConfig, [file], (data) => {
              dispatch({
                type: 'app/loading',
                payload: false,
              });
              if (!data.status) {
                dispatch({
                  type: 'ruyuan/updataPhoto',
                  payload: `${data[0].name}`,
                });
                dispatch({
                  type: 'app/updataFormChange',
                  payload: true,
                });
              } else {
                message.error('文件上传异常');
                console.log(data.status, data.code, data.name, data.message);
              }
            }, TYPE.OSS);
          },
        });
      },
    };

    const deleteVitaeItem = (index) => {
      vitaeList.splice(index, 1);
      dispatch({
        type: 'ruyuan/changeVitaeList',
        payload: vitaeList,
      });
      dispatch({
        type: 'app/updataFormChange',
        payload: true,
      });
    };

    const deleteFamilyItem = (index) => {
      familyList.splice(index, 1);
      dispatch({
        type: 'ruyuan/changeFamilyList',
        payload: familyList,
      });
      dispatch({
        type: 'app/updataFormChange',
        payload: true,
      });
    };

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
              {
                vitaeEdit && <Icon onClick={() => { deleteVitaeItem(index); }} className={styles.deleteIcon} type="close-circle" />
              }
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
              {
                familyEdit && <Icon onClick={() => { deleteFamilyItem(index); }} className={styles.deleteIcon} type="close-circle" />
              }
            </div>
          );
        },
      },
    ];

    const contentByLabel = (option) => {
      return option && option.map((item) => {
        item.label = item.content;
        return item;
      });
    };

    const save = () => {
      const fields = getFieldsValue();
      fields.pre01['02'] = fields.pre01['02'] ? moment(fields.pre01['02']).format('YYYY-MM-DD') : undefined;
      fields.pre01['03'] = fields.pre01['03'] ? moment(fields.pre01['03']).format('YYYY-MM-DD') : undefined;
      fields.pre01['07'] = fields.pre01['07'] ? moment(fields.pre01['07']).format('YYYY-MM-DD') : undefined;
      fields.pre01['14'] = fields.pre01['14'] ? moment(fields.pre01['14']).format('YYYY-MM-DD') : undefined;
      fields['01']['02'] = fields['01']['02'] ? moment(fields['01']['02']).format('YYYY-MM-DD') : undefined;
      fields['01']['10'] = fields['01']['10'] ? moment(fields['01']['10']).format('YYYY-MM-DD') : undefined;
      if (Number(jiankangJl) === -1) {
        dispatch({
          type: 'ruyuan/addDanan',
          payload: {
            suoyin: Number(query.suoyin),
            neirong: JSON.stringify({
              ...fields,
              '02': {
                '01': vitaeList,
              },
              '04': {
                '01': familyList,
              },
              '01': {
                18: photo || undefined,
                ...fields['01'],
              },
            }),
            leixing: 3,
            banben,
          },
          callback: () => {
            history.goBack();
          },
        });
      } else {
        dispatch({
          type: 'ruyuan/modifyDanan',
          payload: {
            id: Number(jiankangJl),
            suoyin: Number(query.suoyin),
            neirong: JSON.stringify({
              ...jiankangXmlDetail,
              ...fields,
              '02': {
                '01': vitaeList,
              },
              '04': {
                '01': familyList,
              },
              '01': {
                18: photo || undefined,
                ...fields['01'],
              },
            }),
            leixing: 3,
            banben,
          },
          callback: () => {
            history.goBack();
          },
        });
      }
    };

    const scrollToAnchor = (anchorName) => {
      if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if (anchorElement) { anchorElement.scrollIntoView(); }
      }
    };

    const addVitae = () => {
      dispatch({
        type: 'ruyuan/showVitaeModal',
      });
    };

    const editVitae = () => {
      dispatch({
        type: 'ruyuan/changeVitaeEdit',
      });
    };

    const addFamily = () => {
      dispatch({
        type: 'ruyuan/showFamilyModal',
      });
    };

    const editFamily = () => {
      dispatch({
        type: 'ruyuan/changeFamilyEdit',
      });
    };

    const onBack = (type) => {
      if (isFormChange) {
        dispatch({
          type: 'app/changeModalVisible',
          payload: {
            modalVisible: true,
            type,
          },
        });
      } else if (type === 1) {
        history.goBack();
      } else {
        dispatch(routerRedux.push({pathname: type}));
      }
    };

    const tipModalProps = {
      visible: tipModalVisible,
      maskClosable: false,
      title: '温馨提示',
      wrapClassName: 'vertical-center-modal',
      onOk () {
        setFieldsValue({
          // 'pre01.01': shengqingList.xingming,
          'pre01.05': shengqingList.xingbie || undefined,
          'pre01.06': shengqingList.shenfenzheng,
          'pre01.07': shengqingList.shijiSj ? moment(shengqingList.shijiSj, 'YYYY-MM-DD') : undefined,
          'pre01.08': shengqingList.huliDj || undefined,
          'pre01.09': shengqingList && shengqingList.chuangwei.length > 0 ? shengqingList.baofang === 1 ? `${shengqingList.chuangwei[0].louhao}楼${shengqingList.chuangwei[0].louceng}层${shengqingList.chuangwei[0].fanghao}房${shengqingList.chuangwei[0].chuanghao}床` : `${shengqingList.chuangwei[0].louhao}楼${shengqingList.chuangwei[0].louceng}层${shengqingList.chuangwei[0].fanghao}房` : undefined,
          'pre01.10': shengqingList.yibaoQk,
          'pre01.11': shengqingList.jianhurenXm,
          'pre01.12': shengqingList.jianhurenDh,
          '01.01': shengqingList.xingming,
          '01.03': shengqingList.nianling || undefined,
          '01.04': shengqingList.xingbie || undefined,
          '01.17': shengqingList.shenfenzheng,
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

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.jiandangDate ? new Date(moment(this.state.jiandangDate).format('YYYY-MM-DD')) : new Date()}
        mode="date"
      />
    );

    const datePicker2 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.gengxinDate ? new Date(moment(this.state.gengxinDate).format('YYYY-MM-DD')) : new Date()}
        mode="date"
      />
    );

    const datePicker3 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.ruyuanDate ? new Date(moment(this.state.ruyuanDate).format('YYYY-MM-DD')) : new Date()}
        mode="date"
      />
    );

    const datePicker4 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.pingguDate ? new Date(moment(this.state.pingguDate).format('YYYY-MM-DD')) : new Date()}
        mode="date"
      />
    );

    const datePicker5 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.chushengDate ? new Date(moment(this.state.chushengDate).format('YYYY-MM-DD')) : new Date()}
        mode="date"
      />
    );

    const datePicker6 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.gongzuoDate ? new Date(moment(this.state.gongzuoDate).format('YYYY-MM-DD')) : new Date()}
        mode="date"
      />
    );

    let initDate;

    return (
      <div className="content-inner">
        <div className="add-wrap">
          <div className="header">
            <div className="navGroup">
              <Row className="nav">
                <Col className="title">录入入住健康记录</Col>
                <Col className="navBtn">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      onBack(1);
                    }}
                  ><JXRSIcon type="left"/> 返回</Button>
                  {
                    jiankangJl !== '-1' && <Permissions all="sys:jiankang:edit">
                      <Button
                        type="primary"
                        style={{marginRight: 10}}
                        onClick={() => {
                          onUpdate();
                        }}
                      >同步</Button>
                    </Permissions>
                  }
                  <Permissions all="sys:jiankang:edit">
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
          <div className="mainRaw bgWhite">
            <Form className="add-form">
              <Row>
                <Col span={6} className={styles.nav}>
                  {
                    nav.map((item, navIndex) => {
                      return (
                        <Row key={item.id}>
                          <Col>
                            <FormItem>
                              <div onClick={() => { scrollToAnchor(item.id); }} className={styles.navName}>{`${navIndex + 1} ${item.name}`}</div>
                            </FormItem>
                          </Col>
                        </Row>
                      );
                    })
                  }
                </Col>
                <Col span={18} className={styles.pgContent}>
                  <div id="pre01">
                    <Row className="pgTitle">
                      <Col span={6}>
                        <Tag className="titleName">入住信息</Tag>
                      </Col>
                    </Row>
                    <Row style={{paddingTop: 13}}>
                      <Col span={24}>
                        <FormItem className="lineFeedForm" {...formItemLayout} label={jiankangXml && jiankangXml['pre01.01']}>
                          {getFieldDecorator('pre01.01', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['01']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['pre01.01']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['pre01.02']}>
                          {getFieldDecorator('pre01.02', {
                            initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['02'] ? moment(jiankangXmlDetail.pre01['02'], 'YYYY-MM-DD').toDate() : initDate,
                            rules: [
                            ],
                          })(<PopPicker
                            datePicker={datePicker}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.jiandangDate}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                jiandangDate: date,
                              });
                            }}
                          >
                            <Button>{this.state.jiandangDate ? moment(this.state.jiandangDate).format('YYYY-MM-DD') : `请选择${jiankangXml && jiankangXml['pre01.02']}`}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['pre01.03']}>
                          {getFieldDecorator('pre01.03', {
                            initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['03'] ? moment(jiankangXmlDetail.pre01['03'], 'YYYY-MM-DD').toDate() : initDate,
                            rules: [
                            ],
                          })(<PopPicker
                            datePicker={datePicker2}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.gengxinDate}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                gengxinDate: date,
                              });
                            }}
                          >
                            <Button>{this.state.gengxinDate ? moment(this.state.gengxinDate).format('YYYY-MM-DD') : `请选择${jiankangXml && jiankangXml['pre01.03']}`}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem className="lineFeedForm" {...formItemLayout2} label={jiankangXml && jiankangXml['pre01.04']}>
                          {getFieldDecorator('pre01.04', {
                            initialValue: jiankangJl === '-1' ? (shengqingList && shengqingList.xingming) || undefined : jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['04'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['pre01.04']}`} />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['pre01.05'].cap}>
                          {getFieldDecorator('pre01.05', {
                            initialValue: (jiankangJl === '-1' ? shengqingList && shengqingList.xingbie ? String(shengqingList.xingbie) : undefined : jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['05']) || initDate,
                            rules: [
                            ],
                          })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={`请选择${jiankangXml && jiankangXml['pre01.05'].cap}`}>{jiankangXml && jiankangXml['pre01.05'].children.map((k) => {
                            return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                          })}</Select>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.06']}>
                          {getFieldDecorator('pre01.06', {
                            initialValue: jiankangJl === '-1' ? (shengqingList && shengqingList.shenfenzheng) || undefined : jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['06'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['pre01.06']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.07']}>
                          {getFieldDecorator('pre01.07', {
                            initialValue: jiankangJl === '-1' ? shengqingList && shengqingList.shijiSj ? moment(shengqingList.shijiSj, 'YYYY-MM-DD').toDate() : initDate : jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['07'] ? moment(jiankangXmlDetail.pre01['07'], 'YYYY-MM-DD').toDate() : initDate,
                            rules: [
                            ],
                          })(<PopPicker
                            datePicker={datePicker3}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.ruyuanDate}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                ruyuanDate: date,
                              });
                            }}
                          >
                            <Button>{this.state.ruyuanDate ? moment(this.state.ruyuanDate).format('YYYY-MM-DD') : `请选择${jiankangXml && jiankangXml['pre01.07']}`}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.08'].cap}>
                          {getFieldDecorator('pre01.08', {
                            initialValue: jiankangJl === '-1' ? shengqingList && shengqingList.huliDj : (jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['08']) || initDate,
                            rules: [
                            ],
                          })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={`请选择${jiankangXml && jiankangXml['pre01.08'].cap}`}>{jiankangXml && jiankangXml['pre01.08'].children.map((k) => {
                            return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                          })}</Select>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.09']}>
                          {getFieldDecorator('pre01.09', {
                            initialValue: jiankangJl === '-1' ? shengqingList && shengqingList.chuangwei.length > 0 ? shengqingList.baofang === 1 ? `${shengqingList.chuangwei[0].louhao}楼${shengqingList.chuangwei[0].louceng}层${shengqingList.chuangwei[0].fanghao}房${shengqingList.chuangwei[0].chuanghao}床` : `${shengqingList.chuangwei[0].louhao}楼${shengqingList.chuangwei[0].louceng}层${shengqingList.chuangwei[0].fanghao}房` : undefined : (jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['09']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['pre01.09']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.10']}>
                          {getFieldDecorator('pre01.10', {
                            initialValue: jiankangJl === '-1' ? shengqingList && shengqingList.yibaoQk : (jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['10']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['pre01.10']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem className="lineFeedForm" {...formItemLayout} label={jiankangXml && jiankangXml['pre01.11']}>
                          {getFieldDecorator('pre01.11', {
                            initialValue: jiankangJl === '-1' ? (shengqingList && shengqingList.jianhurenXm) || undefined : jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['11'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['pre01.11']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem className="lineFeedForm" {...formItemLayout} label={jiankangXml && jiankangXml['pre01.12']}>
                          {getFieldDecorator('pre01.12', {
                            initialValue: jiankangJl === '-1' ? (shengqingList && shengqingList.jianhurenDh) || undefined : jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['12'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['pre01.12']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.13']}>
                          {getFieldDecorator('pre01.13', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['13']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['pre01.13']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['pre01.14']}>
                          {getFieldDecorator('pre01.14', {
                            initialValue: jiankangXmlDetail && jiankangXmlDetail.pre01 && jiankangXmlDetail.pre01['14'] ? moment(jiankangXmlDetail.pre01['14'], 'YYYY-MM-DD').toDate() : initDate,
                            rules: [
                            ],
                          })(<PopPicker
                            datePicker={datePicker4}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.pingguDate}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                pingguDate: date,
                              });
                            }}
                          >
                            <Button>{this.state.pingguDate ? moment(this.state.pingguDate).format('YYYY-MM-DD') : `请选择${jiankangXml && jiankangXml['pre01.14']}`}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="01">
                    <Row className="pgTitle">
                      <Col span={6}>
                        <Tag className="titleName">基本信息</Tag>
                      </Col>
                      <Col span={18}>
                        <div style={{float: 'right'}}>
                          <Upload {...uploadProps}>
                            <Button
                              className="btn"
                            ><JXRSIcon type="upload"/> 上传照片</Button>
                          </Upload>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{paddingTop: 13}}>
                      <Col span={12}>
                        <Row>
                          <Col span={24}>
                            <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.01']}>
                              {getFieldDecorator('01.01', {
                                initialValue: jiankangJl === '-1' ? (shengqingList && shengqingList.xingming) || undefined : jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.01']}`} />)}
                            </FormItem>
                          </Col>
                          <Col span={24}>
                            <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.02']}>
                              {getFieldDecorator('01.02', {
                                initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['02'] ? moment(jiankangXmlDetail['01']['02'], 'YYYY-MM-DD').toDate() : initDate,
                                rules: [
                                ],
                              })(<PopPicker
                                datePicker={datePicker5}
                                transitionName="rmc-picker-popup-slide-fade"
                                maskTransitionName="rmc-picker-popup-fade"
                                title="选择日期"
                                date={this.state.chushengDate}
                                okText="确认"
                                dismissText="取消"
                                onChange={(date) => {
                                  this.setState({
                                    chushengDate: date,
                                  });
                                }}
                              >
                                <Button>{this.state.chushengDate ? moment(this.state.chushengDate).format('YYYY-MM-DD') : `请选择${jiankangXml && jiankangXml['01.02']}`}</Button>
                              </PopPicker>)}
                            </FormItem>
                          </Col>
                          <Col span={24}>
                            <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.03']}>
                              {getFieldDecorator('01.03', {
                                initialValue: jiankangJl === '-1' ? (shengqingList && shengqingList.nianling) || undefined : jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['03'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.03']}`} />)}
                            </FormItem>
                          </Col>
                          <Col span={24}>
                            <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.04'].cap}>
                              {getFieldDecorator('01.04', {
                                initialValue: (jiankangJl === '-1' ? shengqingList && shengqingList.xingbie ? String(shengqingList.xingbie) : undefined : jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['04']) || initDate,
                                rules: [
                                ],
                              })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={`请输入${jiankangXml && jiankangXml['01.04'].cap}`}>{jiankangXml && jiankangXml['01.04'].children.map((k) => {
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
                          <img src={(photo && `${PROJECT}/oss/${photo}?x-oss-process=image/resize,m_lfit,w_162,h_188/auto-orient,1`) || undefined} alt="" />
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
                          })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={`请选择${jiankangXml && jiankangXml['01.05.01'].cap}`}>{jiankangXml && jiankangXml['01.05.01'].children.map((k) => {
                            return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                          })}</Select>)}
                        </FormItem>
                      </Col>
                      <Col span={11} push={1}>
                        <FormItem {...formItemLayout2}>
                          {getFieldDecorator('01.05.02', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['05'] && jiankangXmlDetail['01']['05']['02']) || initDate,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.05.02']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.06']}>
                          {getFieldDecorator('01.06', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['06']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.06']}`}/>)}
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
                          })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={`请选择${jiankangXml && jiankangXml['01.07'].cap}`}>{jiankangXml && jiankangXml['01.07'].children.map((k) => {
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
                          })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={`请选择${jiankangXml && jiankangXml['01.08'].cap}`}>{jiankangXml && jiankangXml['01.08'].children.map((k) => {
                            return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                          })}</Select>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.09']}>
                          {getFieldDecorator('01.09', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['09']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.09']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem className="lineFeedForm" {...formItemLayout} label={jiankangXml && jiankangXml['01.10']}>
                          {getFieldDecorator('01.10', {
                            initialValue: jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['10'] ? moment(jiankangXmlDetail['01']['10'], 'YYYY-MM-DD').toDate() : initDate,
                            rules: [
                            ],
                          })(<PopPicker
                            datePicker={datePicker6}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.gongzuoDate}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                gongzuoDate: date,
                              });
                            }}
                          >
                            <Button>{this.state.gongzuoDate ? moment(this.state.gongzuoDate).format('YYYY-MM-DD') : `请选择${jiankangXml && jiankangXml['01.02']}`}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem className="lineFeedForm" {...formItemLayout2} label={jiankangXml && jiankangXml['01.11']}>
                          {getFieldDecorator('01.11', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['11']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.11']}`} />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.12']}>
                          {getFieldDecorator('01.12', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['12']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.12']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.13']}>
                          {getFieldDecorator('01.13', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['13']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.13']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.14']}>
                          {getFieldDecorator('01.14', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['14']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.14']}`} />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout2} label={jiankangXml && jiankangXml['01.15']}>
                          {getFieldDecorator('01.15', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['15']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.15']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.16']}>
                          {getFieldDecorator('01.16', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['16']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.16']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label={jiankangXml && jiankangXml['01.17']}>
                          {getFieldDecorator('01.17', {
                            initialValue: jiankangJl === '-1' ? (shengqingList && shengqingList.shenfenzheng) || undefined : jiankangXmlDetail && jiankangXmlDetail['01'] && jiankangXmlDetail['01']['17'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${jiankangXml && jiankangXml['01.17']}`} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="02">
                    <Row className="pgTitle">
                      <Col span={6}>
                        <Tag className="titleName">个人简历</Tag>
                      </Col>
                      <Col span={18}>
                        <div style={{float: 'right'}}>
                          <Button
                            className="btn"
                            onClick={() => {
                              addVitae();
                            }}
                          ><JXRSIcon type="add"/> 增加条目</Button>
                          <Button
                            className="btn"
                            onClick={() => {
                              editVitae();
                            }}
                          ><JXRSIcon type="edit"/> 编辑条目</Button>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{marginTop: 13}}>
                      <Col>
                        <Table
                          bordered
                          columns={columnsJL}
                          dataSource={vitaeList}
                          pagination={false}
                          rowKey={(record, index) => index}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div id="03" style={{marginTop: 12}}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>特长性格兴趣</Col>
                    </Row>
                    <Row style={{paddingTop: 13}}>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label="特长">
                          {getFieldDecorator('03.01', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['03'] && jiankangXmlDetail['03']['01']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder="请输入特长" />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label="性格">
                          {getFieldDecorator('03.02', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['03'] && jiankangXmlDetail['03']['02']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder="请输入性格" />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem {...formItemLayout} label="兴趣爱好">
                          {getFieldDecorator('03.03', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['03'] && jiankangXmlDetail['03']['03']) || undefined,
                            rules: [
                            ],
                          })(<Input placeholder="请输入兴趣爱好" />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="04">
                    <Row className="pgTitle">
                      <Col span={6}>
                        <Tag className="titleName">家庭成员</Tag>
                      </Col>
                      <Col span={18}>
                        <div style={{float: 'right'}}>
                          <Button
                            className="btn"
                            onClick={() => {
                              addFamily();
                            }}
                          ><JXRSIcon type="add"/> 增加条目</Button>
                          <Button
                            className="btn"
                            onClick={() => {
                              editFamily();
                            }}
                          ><JXRSIcon type="edit"/> 编辑条目</Button>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{marginTop: 13}}>
                      <Col>
                        <Table
                          bordered
                          columns={columnsJT}
                          dataSource={familyList}
                          pagination={false}
                          rowKey={(record, index) => index}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div id="05" style={{marginTop: 12}}>
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
                          })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(jiankangXml && jiankangXml['05.01.01'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem className="lineFeedForm" {...formItemLayout} label="既往病史说明">
                          {getFieldDecorator('05.01.02', {
                            initialValue: (jiankangXmlDetail && jiankangXmlDetail['05'] && jiankangXmlDetail['05']['01'] && jiankangXmlDetail['05']['01']['02']) || undefined,
                            rules: [
                            ],
                          })(<TextArea rows={4} placeholder="请输入既往病史说明" />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Form>
            <VitaeModal {...vitaeModalProps} />
            <FamilyModal {...familyModalProps} />
          </div>
        </div>
        {
        tipModalVisible && <TipModal {...tipModalProps}/>
        }
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
})(Add)));
