import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {routerRedux} from 'dva/router';
import moment from 'moment';
import {Col, Row, Button, message, Icon} from 'antd';
import {JXRS} from 'components';
import styles from './index.less';
import Nav from './nav';
import Ruzhu from './ruzhu';
import Yuyue from './yuyue';
import Yuding from './yuding';
import Ruyuan from './ruyuan';
import Huli from './huli';
import Pinggu from './pinggu';
import Tijian from './tijian';
import Jiankang from './jiankang';
import Modal from './ViewModal';
import YuyuePdfModal from './yuyuepdfModal';
import YudingPdfModal from './yudingModal';
import ShengqingPdfModal from './shengqingModal';
import JiankangPdfModal from './jiankangModal';
import PingguPdfModal from './pingguModal';
import TijianPdfModal from './tijianModal';

const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    dispatch,
    dangan,
    location,
    app: {
      jigou,
    },
  } = props;
  const {
    yuyueIsOpen,
    yudingIsOpen,
    ruzhuIsOpen,
    huliISOpen,
    pingguIsOpen,
    tijianIsOpen,
    jiankangIsOpen,
    ruzhujiangkangjilu,
    yuyue,
    yuding,
    shenqing,
    huliJilu,
    ruzhupinggu,
    tijianbaogao,
    ruzhuXxData,
    yuyueData,
    yudingData,
    shebei,
    shenqingData,
    huliJiluData,
    xmlDetail,
    tijianData,
    currentHuliIndex,
    currentRuyuanIndex,
    currentTijianIndex,
    currentYudingIndex,
    currentYuyueIndex,
    xmlData,
    tijianXml,
    jiankangXml,
    currentImg,
    viewModalVisible,
    currentNavIndex,
    yuyueModalVisible,
    shengqingModalVisible,
    yudingModalVisible,
    ruzhuData,
    jiankangModalVisible,
    pingguModalVisible,
    tijianModalVisible,
    collapsed,
  } = dangan;
  const {search} = location;
  const query = queryString.parse(search);
  const ruzhuProps = {
    ruzhujiangkangjilu,
    ruzhuData,
    jiankangXml,
  };

  const yuyueProps = {
    yuyue,
    yuyueData,
    yuyueIsOpen,
    currentYuyueIndex,
    onyuyuePdf() {
      dispatch({
        type: 'dangan/showQrcodeModal',
      });
    },
    changeYuyueIsOpen() {
      dispatch({
        type: 'dangan/changeYuyueIsOpen',
      });
    },
    onEdit() {
      dispatch(routerRedux.push({
        pathname: '/yuyue/edit',
        search: queryString.stringify({
          id: yuyue && yuyue[currentYuyueIndex].id,
        }),
      }));
    },
    onPage(index) {
      dispatch({
        type: 'dangan/changeCurrentYuyueIndex',
        payload: index,
      });
      dispatch({
        type: 'dangan/getYuyueDetail',
        payload: {
          id: yuyue && yuyue[index].id,
        },
      });
    },
    onChangeRiqi(time) {
      dispatch({
        type: 'dangan/getYuyueDetail',
        payload: {
          suoyin: Number(query.suoyin),
          riqi: time,
        },
      });
    },
  };

  const yudingProps = {
    yuding,
    yudingData,
    yudingIsOpen,
    currentYudingIndex,
    onyudingPdf() {
      dispatch({
        type: 'dangan/showYudingModal',
      });
    },
    changeYudingIsOpen() {
      dispatch({
        type: 'dangan/changeYudingIsOpen',
      });
    },
    onEdit() {
      dispatch(routerRedux.push({
        pathname: '/yuding/edit',
        search: queryString.stringify({
          id: yuding && yuding[currentYudingIndex].id,
        }),
      }));
    },
    onPage(index) {
      dispatch({
        type: 'dangan/changeCurrentYudingIndex',
        payload: index,
      });
      dispatch({
        type: 'dangan/getYudingDetail',
        payload: {
          id: yuding && yuding[index].id,
        },
      });
    },
    onChangeRiqi(time) {
      dispatch({
        type: 'dangan/getYudingDetail',
        payload: {
          suoyin: Number(query.suoyin),
          riqi: time,
        },
      });
    },
  };

  const ruyuanProps = {
    shenqing,
    shenqingData,
    ruzhuIsOpen,
    currentRuyuanIndex,
    onshengqingPdf() {
      dispatch({
        type: 'dangan/showshengqingModal',
      });
    },
    changeRuzhuIsOpen() {
      dispatch({
        type: 'dangan/changeRuzhuIsOpen',
      });
    },
    onEdit(index) {
      dispatch(routerRedux.push({
        pathname: '/ruzhu/edit',
        search: queryString.stringify({
          id: shenqing && shenqing[index].id,
        }),
      }));
    },
    onPage(index) {
      dispatch({
        type: 'dangan/changeCurrentRuyuanIndex',
        payload: index,
      });
      dispatch({
        type: 'dangan/getRuyuanDetail',
        payload: {
          id: shenqing && shenqing[index].id,
        },
      });
    },
    onChangeRiqi(time) {
      dispatch({
        type: 'dangan/getRuyuanDetail',
        payload: {
          suoyin: Number(query.suoyin),
          riqi: time,
        },
      });
    },
  };

  const huliProps = {
    huliJilu,
    huliJiluData,
    huliISOpen,
    currentHuliIndex,
    changeHuliIsOpen() {
      dispatch({
        type: 'dangan/changeHuliIsOpen',
      });
    },
    pagination: false,
    dataSource: (huliJiluData && huliJiluData.huliJl) || [],
    onEdit() {
      dispatch(routerRedux.push({
        pathname: '/huli/record',
        search: queryString.stringify({
          riqi: huliJilu && huliJilu[currentHuliIndex] ? moment(huliJilu[currentHuliIndex]).format('YYYYMMDD') : moment().format('YYYYMMDD'),
          suoyin: query.suoyin,
          from: query.id,
        }),
      }));
    },
    onPage(index) {
      dispatch({
        type: 'dangan/changeCurrentHuliIndex',
        payload: index,
      });
      dispatch({
        type: 'dangan/getHuliDetail',
        payload: {
          suoyin: Number(query.suoyin),
          riqi: moment(huliJilu[index]).format('YYYYMMDD'),
        },
      });
    },
    onChangeRiqi(time) {
      dispatch({
        type: 'dangan/getHuliDetail',
        payload: {
          suoyin: Number(query.suoyin),
          riqi: time,
        },
      });
    },
  };

  const pingguProps = {
    xmlData,
    ruzhupinggu,
    xmlDetail,
    pingguIsOpen,
    onpingguPdf() {
      dispatch({
        type: 'dangan/showpingguModal',
      });
    },
    changePingguIsOpen() {
      dispatch({
        type: 'dangan/changePingguIsOpen',
      });
    },
    onEdit() {
      dispatch(routerRedux.push({
        pathname: '/ruzhu/pinggu',
        search: queryString.stringify({
          ruzhuPg: ruzhupinggu && ruzhupinggu[0],
          suoyin: query.suoyin,
        }),
      }));
    },
  };

  const tijianProps = {
    tijianbaogao,
    tijianXml,
    currentTijianIndex,
    tijianData,
    tijianIsOpen,
    ontijianPdf() {
      dispatch({
        type: 'dangan/showtijianModal',
      });
    },
    changeTijianIsOpen() {
      dispatch({
        type: 'dangan/changeTijianIsOpen',
      });
    },
    onPage(index) {
      dispatch({
        type: 'dangan/changeCurrentTijianIndex',
        payload: index,
      });
      dispatch({
        type: 'dangan/getDangan',
        payload: {
          suoyin: Number(query.suoyin),
          id: Number(tijianbaogao[index]),
          leixin: 2,
        },
      });
    },
    onEdit() {
      dispatch(routerRedux.push({
        pathname: '/ruzhu/tijian',
        search: queryString.stringify({
          tijianBg: tijianbaogao && tijianbaogao[currentTijianIndex],
          suoyin: query.suoyin,
          from: query.suoyin,
          fromId: query.id,
        }),
      }));
    },
    showImg(img) {
      dispatch({
        type: 'dangan/showViewModal',
        payload: {
          currentImg: img,
        },
      });
    },
  };

  const jiankangProps = {
    jiankangXmlDetail: ruzhuXxData,
    jiankangXml,
    ruzhujiangkangjilu,
    jiankangIsOpen,
    onjiankangPdf() {
      dispatch({
        type: 'dangan/showjiankangModal',
      });
    },
    changeJiankangIsOpen() {
      dispatch({
        type: 'dangan/changeJiankangIsOpen',
      });
    },
    onEdit() {
      dispatch(routerRedux.push({
        pathname: '/ruzhu/jiankang',
        search: queryString.stringify({
          jiankangJl: ruzhujiangkangjilu && ruzhujiangkangjilu[0],
          suoyin: query.suoyin,
        }),
      }));
    },
  };

  const getMUban = (leixing) => {
    dispatch({
      type: 'dangan/getMUban',
      payload: {
        leixing,
        zhuangtai: 1,
      },
    });
  };

  const getDangan = (leixin, id, cb) => {
    dispatch({
      type: 'dangan/getDangan',
      payload: {
        suoyin: Number(query.suoyin),
        id,
        leixin,
      },
      callback: () => {
        if (cb && cb instanceof Function) {
          cb();
        }
      },
    });
  };

  const getTabIndex = () => {
    if (shebei) {
      if (shebei.chuang || shebei.chuangTimes) {
        return 1;
      } else if (shebei.chuangdian || shebei.chuangdianTimes) {
        return 2;
      } else if (shebei.duotizheng || shebei.duotizhengTimes) {
        return 3;
      }
    }
  };

  const navProps = {
    shebei,
    ruzhujiangkangjilu,
    yuyue,
    yuding,
    shenqing,
    huliJilu,
    ruzhupinggu,
    tijianbaogao,
    currentNavIndex,
    changeNav(index, cb) {
      dispatch({
        type: 'dangan/changeCurrentNavIndex',
        payload: index,
      });
      switch (index) {
        case 0:
          getMUban(3);
          dispatch({
            type: 'dangan/ruyuanshengqingXQ',
            payload: {
              suoyin: Number(query.suoyin),
            },
          });
          break;
        case 1:
          dispatch({
            type: 'dangan/getYuyueDetail',
            payload: {
              id: yuyue.filter((item, yuyueIndex) => {
                if (item.latest === 1) {
                  dispatch({
                    type: 'dangan/changeCurrentYuyueIndex',
                    payload: yuyueIndex,
                  });
                }
                return item.latest === 1;
              })[0].id,
            },
          });
          break;
        case 2:
          dispatch({
            type: 'dangan/getYudingDetail',
            payload: {
              id: yuding.filter((item, yudingIndex) => {
                if (item.latest === 1) {
                  dispatch({
                    type: 'dangan/changeCurrentYudingIndex',
                    payload: yudingIndex,
                  });
                }
                return item.latest === 1;
              })[0].id,
            },
          });
          break;
        case 3:
          dispatch({
            type: 'dangan/getRuyuanDetail',
            payload: {
              id: shenqing.filter((item, ruyuanIndex) => {
                if (item.latest === 1) {
                  dispatch({
                    type: 'dangan/changeCurrentRuyuanIndex',
                    payload: ruyuanIndex,
                  });
                }
                return item.latest === 1;
              })[0].id,
            },
          });
          break;
        case 4:
          dispatch({
            type: 'dangan/getHuliDetail',
            payload: {
              suoyin: Number(query.suoyin),
              riqi: moment(huliJilu[0]).format('YYYYMMDD'),
            },
          });
          dispatch({
            type: 'dangan/changeCurrentHuliIndex',
            payload: 0,
          });
          break;
        case 5:
          getMUban(1);
          getDangan(1, ruzhupinggu[0], cb);
          break;
        case 6:
          getMUban(2);
          dispatch({
            type: 'dangan/changeCurrentTijianIndex',
            payload: (tijianbaogao && (tijianbaogao.length - 1)) || 0,
          });
          getDangan(2, tijianbaogao[(tijianbaogao && (tijianbaogao.length - 1)) || 0], cb);
          break;
        case 7:
          getMUban(3);
          getDangan(3, ruzhujiangkangjilu[0], cb);
          break;
        case 8:
          dispatch(routerRedux.push({
            pathname: '/monitor/detail',
            search: queryString.stringify({
              id: query.suoyin,
              detaiTabIndex: getTabIndex(),
              jigou: jigou.id,
            }),
          }));
          break;
        default:
          break;
      }
    },
  };

  const onBack = (type, params) => {
    // dispatch({
    //   type: 'dangan/changeCurrentNavIndex',
    //   payload: 0,
    // });
    dispatch(routerRedux.push({
      pathname: type,
      search: queryString.stringify({
        ...query,
        params,
      }),
    }));
  };

  const modalProps = {
    width: 744,
    currentImg,
    visible: viewModalVisible,
    maskClosable: false,
    bodyStyle: { padding: '0'},
    title: '查看图片',
    wrapClassName: 'vertical-center-modal',
    onCancel () {
      dispatch({
        type: 'dangan/hideViewModal',
        payload: {
          currentImg: null,
        },
      });
    },
  };

  const yuyueModalProps = {
    visible: yuyueModalVisible,
    maskClosable: false,
    title: '导出PDF',
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'dangan/postyuyueEmail',
        payload: {
          id: yuyue && yuyue[currentYuyueIndex].id,
          email: item.email,
        },
        callback: () => {
          message.success('发送成功');
          dispatch({
            type: 'app/checkLogin',
          });
        },
      });
      dispatch({
        type: 'dangan/hideQrcodeModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'dangan/hideQrcodeModal',
      });
    },
  };

  const yudingModalProps = {
    visible: yudingModalVisible,
    maskClosable: false,
    title: '导出PDF',
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'dangan/postYudingEmail',
        payload: {
          id: yuding && yuding[currentYudingIndex].id,
          email: item.email,
        },
        callback: () => {
          message.success('发送成功');
          dispatch({
            type: 'app/checkLogin',
          });
        },
      });
      dispatch({
        type: 'dangan/hideYudingModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'dangan/hideYudingModal',
      });
    },
  };

  const shengqingModalProps = {
    visible: shengqingModalVisible,
    maskClosable: false,
    title: '导出PDF',
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'dangan/postRuyuanEmail',
        payload: {
          id: shenqing && shenqing[currentRuyuanIndex].id,
          email: item.email,
        },
        callback: () => {
          message.success('发送成功');
          dispatch({
            type: 'app/checkLogin',
          });
        },
      });
      dispatch({
        type: 'dangan/hideshengqingModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'dangan/hideshengqingModal',
      });
    },
  };
  const jiankangModalProps = {
    visible: jiankangModalVisible,
    maskClosable: false,
    title: '导出PDF',
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'dangan/sendEmail',
        payload: {
          id: ruzhujiangkangjilu && ruzhujiangkangjilu[0],
          suoyin: Number(query.suoyin),
          email: item.email,
        },
        callback: () => {
          message.success('发送成功');
          dispatch({
            type: 'app/checkLogin',
          });
        },
      });
      dispatch({
        type: 'dangan/hidejiankangModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'dangan/hidejiankangModal',
      });
    },
  };
  const pingguModalProps = {
    visible: pingguModalVisible,
    maskClosable: false,
    title: '导出PDF',
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'dangan/sendEmail',
        payload: {
          id: ruzhupinggu && ruzhupinggu[0],
          suoyin: Number(query.suoyin),
          email: item.email,
        },
        callback: () => {
          message.success('发送成功');
          dispatch({
            type: 'app/checkLogin',
          });
        },
      });
      dispatch({
        type: 'dangan/hidepingguModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'dangan/hidepingguModal',
      });
    },
  };

  const tijianModalProps = {
    visible: tijianModalVisible,
    maskClosable: false,
    title: '导出PDF',
    wrapClassName: 'vertical-center-modal',
    onOk (item) {
      dispatch({
        type: 'dangan/sendEmail',
        payload: {
          id: tijianbaogao && tijianbaogao[currentTijianIndex],
          suoyin: Number(query.suoyin),
          email: item.email,
        },
        callback: () => {
          message.success('发送成功');
          dispatch({
            type: 'app/checkLogin',
          });
        },
      });
      dispatch({
        type: 'dangan/hidetijianModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'dangan/hidetijianModal',
      });
    },
  };

  const updateCollapsed = () => {
    dispatch({
      type: 'dangan/updateCollapsed',
      payload: !collapsed,
    });
  };

  return (
    <div className="content-inner bgWhite">
      <div className="add-wrap">
        <div className="header">
          <div className="navGroup">
            <Row className="nav">
              <Col className="title">
                查看健康档案
                <Button
                  onClick={() => { updateCollapsed(); }}
                  style={{
                    marginLeft: 10,
                    verticalAlign: 'middle',
                    marginTop: -7,
                  }}
                >
                  <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
              </Col>
              <Col className="navBtn">
                <Button
                  type="primary"
                  style={{marginRight: 10}}
                  onClick={() => {
                    onBack('/dangan/list');
                  }}
                ><JXRSIcon type="left"/> 返回</Button>
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
        <div className="mainRaw">
          <div>
            <div className={styles.nav}>
              <Nav {...navProps} />
            </div>
            <div className={collapsed ? styles.content2 : styles.content}>
              {
                currentNavIndex === 0 && <Ruzhu id="1" {...ruzhuProps} />
              }
              {
                currentNavIndex === 1 && <Yuyue {...yuyueProps} />
              }
              {
                currentNavIndex === 2 && <Yuding {...yudingProps} />
              }
              {
                currentNavIndex === 3 && <Ruyuan {...ruyuanProps} />
              }
              {
                currentNavIndex === 4 && <Huli {...huliProps} />
              }
              {
                currentNavIndex === 5 && <Pinggu {...pingguProps}/>
              }
              {
                currentNavIndex === 6 && <Tijian {...tijianProps}/>
              }
              {
                currentNavIndex === 7 && <Jiankang {...jiankangProps} />
              }
            </div>
          </div>
        </div>
      </div>
      {
        viewModalVisible && <Modal {...modalProps} />
      }
      {
        yuyueModalVisible && <YuyuePdfModal {...yuyueModalProps} />
      }
      {
        yudingModalVisible && <YudingPdfModal {...yudingModalProps} />
      }
      {
        shengqingModalVisible && <ShengqingPdfModal {...shengqingModalProps} />
      }
      {
        jiankangModalVisible && <JiankangPdfModal {...jiankangModalProps} />
      }
      {
        pingguModalVisible && <PingguPdfModal {...pingguModalProps} />
      }
      {
        tijianModalVisible && <JiankangPdfModal {...tijianModalProps} />
      }
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
