import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {Icon} from 'antd';
import {Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;

const Error = (props) => {
  return (
    <div>
      <div className="content-inner">
        <div className={styles.error}>
          <Icon type="cross-circle"/>
          <h1>{intl.get('Error.404')}</h1>
        </div>
      </div>
    </div>
  );
};

Error.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    login: state.login,
  };
}

export default injectIntl(connect(mapStateToProps)(Error));
