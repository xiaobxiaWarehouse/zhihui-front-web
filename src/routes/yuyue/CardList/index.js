import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import Iscroll from 'iscroll-luo';
import {Layout} from 'components';
import {classnames, getOption} from 'utils';
import intl from 'react-intl-universal';
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

const yuyueStatus = {
  1: intl.get('Yuyue.status1'),
  2: intl.get('Yuyue.status2'),
  3: intl.get('Yuyue.status3'),
  4: intl.get('Yuyue.status4'),
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
      yuyue: {scrollTop},
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
      type: 'yuyue/updateScrollTop',
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
              let keyId = cardIndex;
              return (
                <div
                  key={keyId}
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
                          <div className={styles.zhuangtai}>{yuyueStatus[item.zhuangtai]}</div>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <FormItem {...formItemLayout} label={intl.get('Yuyue.xingming.xingbie')}>
                          <span className="xingmingLength">{`${item.xingming || '-'}`}</span><span className="xingbieLength">{`/${getOption(item.xingbie, allXingbie) || '未选择'}`}</span>
                        </FormItem>
                      </Col>
                      <Col span={14}>
                        <FormItem {...formItemLayout} label={intl.get('Yuyue.canguanSj')}>
                          {item.canguanSj || '-'}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <FormItem {...formItemLayout} label={intl.get('Yuyue.lianxirenXm')}>
                          {item.lianxirenXm}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} label={intl.get('Yuyue.lianxirenDh')}>
                          {item.lianxirenDh}
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label={intl.get('Yuyue.zerenrenXm')} style={{justifyContent: 'flex-end'}}>
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
    yuyue: state.yuyue,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(CardList));
