import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Layout} from 'components';
import Iscroll from 'iscroll-luo';
import {classnames, getOption} from 'utils';
import {Form, Col, Row, Pagination} from 'antd';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
  },
  wrapperCol: {
  },
  style: {
  },
};

const danganStatus = {
  1: '新建',
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
      dangan: {
        scrollTop,
      },
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
      type: 'dangan/updateScrollTop',
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
      allHulidengji,
      allXingbie,
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
                  onClick={() => {
                    onEdit(item);
                  }}
                >
                  <Form>
                    <Row>
                      <Col span={12}>
                        <FormItem>
                          <div className={CSS.bianhao}>{item.shenqingBh}</div>
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem style={{justifyContent: 'flex-end'}}>
                          <div className={styles.zhuangtai}>{danganStatus[item.shenqingZhuangtai]}</div>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="休养员/性别">
                          <span className="xingmingLength">{`${item.xingming || '-'}`}</span><span className="xingbieLength">{`/${getOption(item.xingbie, allXingbie) || '未选择'}`}</span>
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="房间/床位">
                          <p className={styles.danganList}>{item.louhao && `${item.louhao}楼`}{item.louceng && `${item.louceng}层`}{item.fanghao && `${item.fanghao}房`}{item.chuanghao && `${item.chuanghao}床`}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="入院时间">
                          {item.shenqingShijiSj || '-'}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="护理等级">
                          {item.huliDj ? getOption(item.huliDj, allHulidengji) : '-'}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="护理员">
                          {item.huliyuanXm}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="责任医师">
                          {item.zerenyishiXm}
                        </FormItem>
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
    dangan: state.dangan,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(CardList));
