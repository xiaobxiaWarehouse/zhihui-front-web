import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {Button, Form, Icon, Input, message, Row} from 'antd';
import {JXRS, Layout} from 'components';
import {config} from 'utils';
import imgLogoLogin from '../../public/logo-login.png';
import imgAppName from '../../public/app-name.png';
// import styles from './index.less';

const CSS = Layout.styles;

const FormItem = Form.Item;
const {Header, Footer} = Layout;
const JXRSIcon = JXRS.Icon;
const {version, jgRegExp} = config;

const Login = (props) => {
  const {
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
      validateFields,
    },
    dispatch,
    login,
    app: {
      jigouMc,
    },
  } = props;

  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const { href } = window.location;
      let jigou = jgRegExp.exec(href);
      window.localStorage.setItem('shouji', values.shouji);
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          bianhao: jigou && jigou.length > 1 && jigou[1],
          sys: 2,
        },
      });
    });
  };

  return (
    <div className="loginWrap">
      <div className="formLogin">
        <div className="logo">
          <img alt={intl.get('App.name')} src={imgLogoLogin}/>
        </div>
        <div className="appName">
          <img alt={intl.get('App.name')} src={imgAppName}/><span className="appVersion">{version}</span>
        </div>
        <div className="jigouName">
          {
            jigouMc
          }
        </div>
        <form className="formWrapper">
          <FormItem>
            {getFieldDecorator('shouji', {
              initialValue: window.localStorage.getItem('shouji'),
              rules: [
                {required: true, message: intl.get('Login.login.account.error.required')},
                {pattern: /^[0-9]+$/, message: intl.get('Account.shouji.error.pattern')},
              ],
            })(<Input
              type="number"
              prefix={<JXRSIcon type="user" style={{fontSize: 16}}/>}
              autoComplete="off"
              className="loginInput"
              onPressEnter={handleOk}
              placeholder={intl.get('Login.login.account.placeholder')}
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('mima', {
              rules: [
                {required: true, message: intl.get('Login.login.mima.error.required')},
              ],
            })(<Input
              prefix={<JXRSIcon type="password" style={{fontSize: 16}}/>}
              autoComplete="off"
              className="loginInput"
              type="password"
              onPressEnter={handleOk}
              placeholder={intl.get('Login.login.mima.placeholder')}
            />)}
          </FormItem>
          <Row>
            <Button
              className="loginButton"
              onClick={handleOk}
              loading={login.loginLoading}
            >
              {intl.get('Login.login')}
            </Button>
          </Row>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

// console.log(`构件号:${buildNum}`);

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    app: state.app,
    login: state.login,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Login)));
