import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import Iscroll from 'iscroll-luo';
import {Layout} from 'components';
import {classnames, compareTime, getOption, chuangweiJoin} from 'utils';
import intl from 'react-intl-universal';
import {Form, Col, Row, Pagination, Icon} from 'antd';
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

const yuyueStatus = {
  1: '待处理',
  2: '已完成',
  3: '已作废',
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
      yuding: {scrollTop},
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
      type: 'yuding/updateScrollTop',
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
      onEdit,
      app: {
        allXingbie,
      },
      pagination,
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
                          <div className={CSS.bianhao}>{item.bianhao}</div>
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem style={{justifyContent: 'flex-end'}}>
                          <div className={styles.zhuangtai}>
                            {yuyueStatus[item.zhuangtai]}
                            {
                              item.zhuangtai === 1 && (compareTime(item.jiezhiSj, 0) || compareTime(item.jiezhiSj, 3)) && <Icon
                                style={{
                                  color: compareTime(item.jiezhiSj, 0) ? 'red' : 'yellow',
                                  marginLeft: 10,
                                }}
                                type="warning"
                              />
                            }
                          </div>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={intl.get('Yuyue.xingming.xingbie')}>
                          {`${item.xingming || '-'}/${getOption(item.xingbie, allXingbie) || '未选择'}`}
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
                        <FormItem {...formItemLayout} label="预定入住时间">
                          {item.ruzhuSj}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="预定截止时间" style={{justifyContent: 'flex-end'}}>
                          {item.jiezhiSj}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="联系人">
                          {item.lianxirenXm}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="联系人电话">
                          {item.lianxirenDh}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label="责任人" style={{justifyContent: 'flex-end'}}>
                          {item.zerenrenXm || '-'}
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
    yuding: state.yuding,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(CardList));
