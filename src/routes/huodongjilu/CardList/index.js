import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import Iscroll from 'iscroll-luo';
import {classnames} from 'utils';
import {Form, Col, Row} from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
  },
  wrapperCol: {
  },
  style: {
  },
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
      huodongjilu: {scrollTop},
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
      type: 'huodongjilu/updateScrollTop',
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
                      <Col span={24}>
                        <FormItem>
                          <div className={styles.zhuti}>{item.zhuti}</div>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <FormItem {...formItemLayout} label="活动时间">
                          {(item.shijian && item.shijian.replace(/.{3}$/g, '')) || '-'}
                        </FormItem>
                      </Col>
                      <Col span={14}>
                        <FormItem {...formItemLayout} label="活动参加单位" className={styles.canjiaDw}>
                          {item.canjiaDw || '-'}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <FormItem {...formItemLayout} label="活动地点">
                          {item.didian}
                        </FormItem>
                      </Col>
                      <Col span={14}>
                        <FormItem {...formItemLayout} label="责任人">
                          {item.zerenrenXm}
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
    huodongjilu: state.huodongjilu,
    app: state.app,
  };
}
export default injectIntl(connect(mapStateToProps)(CardList));
