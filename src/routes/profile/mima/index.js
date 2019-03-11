import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {JXRS, Layout, Permissions} from 'components';
import {classnames, config} from 'utils';
import {Button, Form, Col, Row, Input, Tag, message} from 'antd';
import styles from '../../shezhi/index.less';
import Nav from '../../shezhi/nav';

const {Header} = Layout;
const CSS = Layout.styles;
const {PROJECT} = config;
const FormItem = Form.Item;
const JXRSIcon = JXRS.Icon;

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

const Index = (props) => {
  const {
    form: {
      getFieldDecorator,
      getFieldValue,
      validateFields,
    },
    app,
    dispatch,
    location,
  } = props;

  const {
    menu,
    isOpenNav,
    updatePasswordVisible,
  } = app;

  const {pathname, search} = location;
  const query = queryString.parse(search);

  const headerProps = {
    isOpenNav,
    title: '系统设置',
    menu,
    dispatch,
    navBtn: <div>
      <Button
        type="primary"
        onClick={() => {
          dispatch(routerRedux.push({pathname: '/home'}));
        }}
      ><JXRSIcon type="home"/> 首页</Button>
    </div>,
    changeIsOpenNav () {
      dispatch({
        type: 'app/changeIsOpenNav',
        payload: !isOpenNav,
      });
    },
  };

  let shezhiMenu = [];
  menu.forEach((item) => {
    if (item.url === '/profile/mima') {
      shezhiMenu = item.children;
    }
  });

  const menusProps = {
    menu: shezhiMenu,
    location,
  };

  let confirmDirty = false;

  let handleSave = () => {
    validateFields((err, values) => {
      if (!err) {
        let payload = {
          yuanmima: values.yuanmima,
          xinmima: values.xinmima,
        };
        dispatch({
          type: 'app/updatePassword',
          payload,
          callback: (res) => {
            if (res.success) {
              message.success('修改密码成功，系统将自动登出，请您重新登录');
              setTimeout(() => {
                dispatch({
                  type: 'app/logout',
                });
              }, 1000);
            }
          },
        });
      }
    });
  };

  let handleEdit = () => {
    if (updatePasswordVisible) {
      dispatch({
        type: 'app/hideUpdatePasswordModal',
      });
    } else {
      dispatch({
        type: 'app/showUpdatePasswordModal',
      });
    }
  };

  let handleConfirmBlur = (e) => {
    const {value} = e.target;
    confirmDirty = confirmDirty || !!value;
  };
  let checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('xinmima')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };
  let checkConfirm = (rule, value, callback) => {
    if (value && confirmDirty) {
      validateFields(['querenxinmima'], {force: true});
    }
    callback();
  };

  return (
    <div className="content-inner">
      <Header {...headerProps} />
      <Row className="content-inner-main">
        <Col span={6} className={styles.nav}>
          <Nav {...menusProps}/>
        </Col>
        <Col span={18} className={styles.content}>
          <Form className="add-form">
            <Row className="pgTitle">
              <Col span={8}>
                <Tag className="titleName">修改个人密码</Tag>
              </Col>
              <Col span={16}>
                <div style={{float: 'right'}}>
                  <Button
                    className="btn"
                    onClick={handleSave}
                  ><JXRSIcon type="save"/> 保存</Button>
                  {/* <Button
                    className="btn"
                    onClick={handleEdit}
                  ><JXRSIcon type="edit"/> 编辑</Button> */}
                </div>
              </Col>
            </Row>
            <Row type="flex" style={{paddingTop: 13}}>
              <Col span={24}>
                <FormItem {...formItemLayout} hasFeedback label="原密码">
                  {getFieldDecorator('yuanmima', {
                    rules: [
                      {required: true, message: '请输入原密码'},
                    ],
                  })(<Input autoComplete="current-password" size="large" type="password" placeholder="请输入原密码"/>)}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={24}>
                <FormItem {...formItemLayout} hasFeedback label="新密码">
                  {getFieldDecorator('xinmima', {
                    rules: [
                      {required: true, message: '请输入新密码'},
                      {pattern: /^[A-Za-z0-9]{6,20}$/, message: '密码必须为6~20位的字母和数字'},
                      {validator: checkConfirm},
                    ],
                  })(<Input autoComplete="new-password" size="large" type="password" placeholder="请输入新密码"/>)}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={24}>
                <FormItem {...formItemLayout} hasFeedback label="确认新密码">
                  {getFieldDecorator('querenxinmima', {
                    rules: [
                      {required: true, message: '请再次输入新密码'},
                      {validator: checkPassword},
                    ],
                  })(<Input autoComplete="new-password" size="large" type="password" onBlur={handleConfirmBlur} placeholder="请再次输入新密码"/>)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

Index.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Index)));
