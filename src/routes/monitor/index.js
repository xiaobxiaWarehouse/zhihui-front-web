import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { Form, Button, Select } from 'antd';
import Iscroll from 'iscroll-luo';
import { JXRS, Layout } from 'components';
import Filter from './Filter';
import ZncList from './zncList';
import ZncdList from './zncdList';
import DtzList from './dtzList';
import CardList from './CardList';
import styles from './index.less';

const { Header } = Layout;
const JXRSIcon = JXRS.Icon;
const { Option } = Select;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
    };
  }

  componentDidMount() {
    const {
      dispatch,
      monitor: {scrollTop},
      app,
    } = this.props;
    const {isHomeBack} = app;
    if (!scrollTop || isHomeBack) {
      this.getDateList(1);
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
      type: 'monitor/updateScrollTop',
      payload: this.card.myScroll.absStartY,
    });
  }

  onDown() {
    this.getDateList(1);
  }

  onUp() {
    const {monitor: {pagination}} = this.props;
    const {isLoad} = this.state;
    if (!isLoad) {
      this.setState({
        isLoad: true,
      });
      this.getDateList(pagination.current + 1);
      this.setState({
        isLoad: false,
      });
    }
  }

  getDateList(page, tabIndex, value) {
    const {location, dispatch} = this.props;
    const {search} = location;
    const query = queryString.parse(search);
    let index = tabIndex || (query && query.cunrrTabIndex);
    let params = value ? {...value} : {...query};
    if (index === '1') {
      // 智能床垫
      dispatch({
        type: 'monitor/getChuangdian',
        payload: {
          ...params,
          page,
        },
      });
    } else if (index === '2') {
      // 多体征设备
      dispatch({
        type: 'monitor/getDuotizheng',
        payload: {
          ...params,
          page,
        },
      });
    } else if (index === '3') {
      dispatch({
        type: 'monitor/query',
        payload: {
          ...params,
          page,
        },
      });
    } else {
      // 智能床
      dispatch({
        type: 'monitor/getChuang',
        payload: {
          ...params,
          page,
        },
      });
    }
  }

  render() {
    const {
      monitor,
      dispatch,
      location,
      app: {
        menu,
        isOpenNav,
      },
      form: {
        getFieldDecorator,
        setFieldsValue,
      },
    } = this.props;

    const { list, pagination, cunrrTabIndex } = monitor;
    const {current, pageSize, total} = pagination;
    const { pathname, search } = location;
    const query = queryString.parse(search);
    const self = this;

    const listProps = {
      dataSource: list,
      location,
      // 用于分页
      onEditItem(path, params) {
        dispatch(routerRedux.push({
          pathname: path,
          search: queryString.stringify({
            ...params,
          }),
        }));
      },
    };

    const changeTab = (index) => {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          id: query.id,
          cunrrTabIndex: index,
        }),
      }));
    };

    const filterProps = {
      filter: query,
      onClick() {
        dispatch(routerRedux.push({ pathname: '/role/add' }));
      },
      // changeTab,
      onFilterChange(value) {
        dispatch(routerRedux.push({
          pathname,
          search: queryString.stringify({
            ...value,
            page: 1,
          }),
        }));
        self.getDateList(1, query && query.cunrrTabIndex, value);
      },
    };

    const switchTab = (index) => {
      dispatch({
        type: 'monitor/updateFilterRefurbish',
        payload: false,
      });
      setFieldsValue({
        device: undefined,
      });
      dispatch({
        type: 'monitor/updateLoucengList',
        payload: [],
      });
      changeTab(index);
      this.getDateList(1, String(index), {});
    };

    const headerProps = {
      isOpenNav,
      title: '监测列表',
      menu,
      dispatch,
      navBtn: (
        <div style={{height: 36}}>
          <Form className={styles.deviceSelectFrom}>
            <Form.Item>
              {getFieldDecorator('device', {
                initialValue: cunrrTabIndex !== 3 ? cunrrTabIndex : undefined,
                rules: [],
              })(<Select
                style={{
                  marginRight: 10,
                  width: '150px',
                }}
                onChange={switchTab}
                placeholder="请选择设备"
              >
                <Option value={0}>智能床</Option>
                <Option value={1}>智能床垫</Option>
                <Option value={2}>多体征设备</Option>
              </Select>)}
            </Form.Item>
          </Form>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => { switchTab(3); }}
          >异常列表</Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch({
                type: 'app/changeIsHomeBack',
                payload: true,
              });
              dispatch(routerRedux.push({ pathname: '/home' }));
            }}
          >
            <JXRSIcon type="home" /> 首页
          </Button>
        </div>
      ),
      filter: <Filter {...filterProps} />,
      changeIsOpenNav() {
        dispatch({
          type: 'app/changeIsOpenNav',
          payload: !isOpenNav,
        });
      },
    };

    const cardProps = {
      pagination: {
        ...pagination,
      },
      dataSource: list,
      onChange(page) {
        dispatch(routerRedux.push({
          pathname,
          search: queryString.stringify({
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          }),
        }));
      },
    };

    const handleRoot = (node) => {
      this.card = node;
    };

    return (
      <div className="content-inner">
        <div className={styles.monitorRight}>
          <Header {...headerProps} />
          <div className={styles.card}>
            <Iscroll
              ref={handleRoot}
              noUp={current * pageSize >= total}
              onDown={() => { this.onDown(); }}
              onUp={() => { this.onUp(); }}
            >
              {!cunrrTabIndex && <ZncList {...listProps} />}
              {cunrrTabIndex === 1 && <ZncdList {...listProps} />}
              {cunrrTabIndex === 2 && <DtzList {...listProps} />}
              {cunrrTabIndex === 3 && <CardList {...cardProps} />}
            </Iscroll>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
