import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import Iscroll from 'iscroll-luo';
import {Layout, JXRS} from 'components';
import {classnames, getOption, chuangweiJoin} from 'utils';
import intl from 'react-intl-universal';
import {Form, Col, Row, Pagination, Button} from 'antd';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const JXRSIcon = JXRS.Icon;

const formItemLayout = {
  labelCol: {
  },
  wrapperCol: {
  },
  style: {
  },
};

const ruyuanStatus = {
  1: '待入住',
  2: '已入住',
  3: '已离院',
  4: '已作废',
};

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
    };
  }

  componentDidMount() {
    const {
      dispatch,
      ruyuan: {scrollTop},
      onChange,
      app,
    } = this.props;
    const {isHomeBack} = app;
    if (!scrollTop || isHomeBack) {
      onChange(1);
      dispatch({
        type: 'app/changeIsHomeBack',
        payload: false,
      });
    } else {
      this.card.myScroll.scrollTo(0, scrollTop);
    }
  }

  componentDidUpdate(newProps) {
    const {query} = this.props;
    if (JSON.stringify(query) !== JSON.stringify(newProps.query)) {
      this.card.myScroll.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'ruyuan/updateScrollTop',
      payload: this.card.myScroll.absStartY,
    });
  }

  onDown() {
    const {onChange} = this.props;
    onChange(1);
  }

  onUp() {
    const {pagination, onChange} = this.props;
    const {isLoad} = this.state;
    if (!isLoad) {
      this.setState({
        isLoad: true,
      });
      onChange(pagination.current + 1);
      this.setState({
        isLoad: false,
      });
    }
  }

  render() {
    const {
      dataSource,
      pagination,
      onEdit,
      onPinggu,
      onTijian,
      onJiankang,
      onBanli,
      onBangding,
      app: {
        allXingbie,
      },
    } = this.props;

    const {current, pageSize, total} = pagination;

    const handleRoot = (node) => {
      this.card = node;
    };

    return (
      <div className={classnames('ant-card-list', 'cardList')}>
        <Iscroll
          ref={handleRoot}
          noUp={current * pageSize >= total}
          onDown={() => { this.onDown(); }}
          onUp={() => { this.onUp(); }}
        >
          {
            dataSource.length > 0 && dataSource.map((item, cardIndex) => {
              return (
                <div
                  key={item.id}
                  className={styles.card}
                >
                  <Form>
                    <div onClick={() => { onEdit(item); }}>
                      <Row>
                        <Col span={12}>
                          <FormItem>
                            <div className={CSS.bianhao}>{item.bianhao}</div>
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem style={{justifyContent: 'flex-end'}}>
                            <div className={styles.zhuangtai}>{ruyuanStatus[item.zhuangtai]}</div>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="休养员/性别">
                            {`${item.xingming}/${getOption(item.xingbie, allXingbie) || '未选择'}`}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="床位" style={{justifyContent: 'flex-end'}}>
                            {`${(item.chuangwei && chuangweiJoin(item.chuangwei)) || '-'}`}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label={intl.get('Ruyuan.yujiSj')}>
                            {item.yujiSj || '-'}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label={intl.get('Ruyuan.shijiSj')} style={{justifyContent: 'flex-end'}}>
                            {item.shijiSj || '-'}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={6}>
                          <FormItem {...formItemLayout} label={intl.get('Ruyuan.jianhurenXm')}>
                            {item.jianhurenXm}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label={intl.get('Ruyuan.jianhurenDh')}>
                            {item.jianhurenDh}
                          </FormItem>
                        </Col>
                        <Col span={10}>
                          <FormItem {...formItemLayout} label={intl.get('Ruyuan.huliyuanXm.zerenyishiXm')} style={{justifyContent: 'flex-end'}}>
                            <p className={styles.card_item_list}>{`${item.huliyuanXm || '-'}/${item.zerenyishiXm || '-'}`}</p>
                          </FormItem>
                        </Col>
                      </Row>
                    </div>

                    <div className={styles.border} />

                    <Row type="flex" justify="space-between">
                      <Col span={4}>
                        <Button
                          className={item.ruzhuBl !== 1 ? styles.tijianBg : item.zhuangtai === 2 ? styles.jiankangJl : styles.ruzhuBl}
                          onClick={() => {
                            onBanli(item);
                          }}
                        >
                          {item.ruzhuBl !== 1 && <JXRSIcon type="check" />}
                          {intl.get('Ruyuan.ruzhuBl')}
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          className={item.ruzhuPg !== -1 ? styles.tijianBg : item.zhuangtai === 2 ? styles.jiankangJl : styles.ruzhuBl}
                          onClick={() => {
                            onPinggu(item);
                          }}
                        >
                          {item.ruzhuPg !== -1 && <JXRSIcon type="check" />}
                          {intl.get('Ruyuan.ruzhuPg')}
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          className={item.tijianBg !== -1 ? styles.tijianBg : item.zhuangtai === 2 ? styles.jiankangJl : styles.ruzhuBl}
                          onClick={() => {
                            onTijian(item);
                          }}
                        >
                          {item.tijianBg !== -1 && <JXRSIcon type="check" />}
                          {intl.get('Ruyuan.tijianBg')}
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          className={item.jiankangJl !== -1 ? styles.tijianBg : item.zhuangtai === 2 ? styles.jiankangJl : styles.ruzhuBl}
                          onClick={() => {
                            onJiankang(item);
                          }}
                        >
                          {item.jiankangJl !== -1 && <JXRSIcon type="check" />}
                          {intl.get('Ruyuan.jiankangJl')}
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          className={styles.ruzhuBl}
                          onClick={() => {
                            onBangding(item);
                          }}
                          disabled={item.zhuangtai !== 2 && item.zhuangtai !== 3}
                        >
                          {item.chuang || item.chuangdian || item.duotizheng ? <JXRSIcon type="check" /> : ''}
                          {intl.get('Ruyuan.shebeiBd')}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              );
            })
          }
        </Iscroll>
      </div>
    );
  }
}


CardList.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
    app: state.app,
  };
}

export default injectIntl(connect((mapStateToProps))(CardList));
