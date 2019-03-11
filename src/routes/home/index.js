import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import intl from 'react-intl-universal';
import { Form, Row, Col, Button } from 'antd';
import { JXRS } from 'components';
import {config} from 'utils';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import logo from '../../public/logo-cube.png';
import homeName from '../../public/home-name.png';
import styles from './index.less';
import Modal from './Modal';

const JXRSMenuItem = JXRS.MenuItem;
const JXRSIcon = JXRS.Icon;
const {version} = config;

const Home = (props) => {
  const { dispatch, app } = props;
  const { menu, modalViewVisible, jigou } = app;

  const handleClick = (item) => {
    dispatch(routerRedux.push({
      pathname: item.url,
      search: queryString.stringify({
        forceRefresh: true,
      }),
    }));
  };
  const onshowModal = () => {
    dispatch({
      type: 'app/showModal',
    });
  };
  const modalProps = {
    width: 397,
    visible: modalViewVisible,
    maskClosable: false,
    title: '温馨提示',
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'app/logout',
      });
      dispatch({
        type: 'app/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'app/hideModal',
      });
    },
  };
  return (
    <div className="homeWrap">
      <div className="homeTitleimg">
        <img src={logo} alt="" className={styles.logo}/>
        <div className="homeTitletag">
          <div>
            <img src={homeName} alt=""/><span style={{ display: 'inline-block', verticalAlign: 'sub', fontWeight: 600 }}>{`v${version}`}</span>
          </div>
          <div>
            {jigou && jigou.mingcheng}
            <Button
              type="primary"
              className="layout-button"
              onClick={() => {
                onshowModal();
              }}
            ><JXRSIcon style={{marginRight: 5}} type="layout"/>退出</Button>
          </div>
        </div>
      </div>
      <div className="homeFlex">
        <Row>
          {menu &&
            menu.length &&
            menu.map((item) => {
              const menuItemProps = {
                item,
                type: item.icon,
                label: item.name,
                handleClick,
              };
              return (
                <Col span={8} key={item.code} className="col-menuitem">
                  <JXRSMenuItem {...menuItemProps} />
                </Col>
              );
            })}
        </Row>
      </div>
      {modalViewVisible && <Modal {...modalProps} />}
    </div>
  );
};

// console.log(`构件号:${buildNum}`);

Home.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Home)));
