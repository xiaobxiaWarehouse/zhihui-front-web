import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import {JXRS, Layout} from 'components';
import moment from 'moment';
import {Button} from 'antd';

import Modal from './Modal';
import PdfModal from './pdfModal';
import Filter from './Filter';
import CardList from './CardList';

const {Header} = Layout;
const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    huli,
    app,
    dispatch,
    location,
  } = props;

  const {
    list,
    pagination,
    modalVisible,
    pdfModalVisible,
    isMotion,
    louhaoList,
    loucengList,
    filterValue,
    suoyinList,
  } = huli;

  const {
    menu,
    isOpenNav,
  } = app;

  const {pathname, search} = location;
  const query = queryString.parse(search);

  const modalProps = {
    width: 520,
    filterValue,
    visible: modalVisible,
    maskClosable: false,
    title: '更多查询',
    wrapClassName: 'vertical-center-modal',
    filter: {
      ...query,
    },
    onFilterChange (value) {
      let {riqi} = query;
      if (!riqi) {
        riqi = moment(new Date(), 'YYYYMMDD').format('YYYYMMDD');
      }
      dispatch(routerRedux.push({
        pathname: location.pathname,
        search: queryString.stringify({
          ...query,
          riqi,
          ...value,
          forceRefresh: undefined,
          page: 1,
        }),
      }));
      dispatch({
        type: 'huli/query',
        payload: {
          ...query,
          riqi,
          ...value,
          page: 1,
        },
      });
      dispatch({
        type: 'huli/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'huli/hideModal',
      });
    },
  };

  const pdfModalProps = {
    width: '90%',
    suoyinList,
    visible: pdfModalVisible,
    maskClosable: false,
    title: '查询护理记录',
    wrapClassName: 'vertical-center-modal',
    filter: {
      ...query,
    },
    onOk (item) {
      dispatch({
        type: 'huli/exportHulijilu',
        payload: {
          ...item,
        },
      });
      dispatch({
        type: 'huli/hidePdfModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'huli/hidePdfModal',
      });
    },
  };

  const filterProps = {
    louhaoList,
    filterValue,
    loucengList,
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      let {riqi} = query;
      if (!riqi) {
        riqi = moment(new Date(), 'YYYYMMDD').format('YYYYMMDD');
      }
      dispatch(routerRedux.push({
        pathname: location.pathname,
        search: queryString.stringify({
          riqi,
          ...value,
          page: 1,
        }),
      }));
      dispatch({
        type: 'huli/query',
        payload: {
          ...query,
          riqi,
          ...value,
          page: 1,
        },
      });
    },
    onAdd (path) {
      dispatch(routerRedux.push({pathname: path}));
    },
  };

  const showPdfModal = () => {
    dispatch({
      type: 'huli/getSuoyinList',
      payload: {
        zhuangtai: 4,
      },
      callback: () => {
        dispatch({
          type: 'huli/showPdfModal',
        });
      },
    });
  };

  const headerProps = {
    isOpenNav,
    title: '护理业务',
    menu,
    dispatch,
    navBtn: <div>
      {/* <Button
        type="primary"
        style={{marginRight: 10}}
        onClick={() => {
          dispatch({
            type: 'huli/showModal',
          });
        }}
      ><JXRSIcon type="search"/> 查询护理记录</Button> */}
      <Button
        type="primary"
        style={{marginRight: 10}}
        onClick={() => {
          showPdfModal();
        }}
      > 导出PDF</Button>
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            type: 'app/changeIsHomeBack',
            payload: true,
          });
          dispatch(routerRedux.push({pathname: '/home'}));
        }}
      ><JXRSIcon type="home"/> 首页</Button>
    </div>,
    changeIsOpenNav () {
      dispatch({
        type: 'app/changeIsOpenNav',
        payload: !isOpenNav,
      });
    },
    filter: <Filter {...filterProps} />,
  };

  const cardProps = {
    query,
    pagination: {
      ...pagination,
    },
    dataSource: list,
    onChange(page) {
      let {riqi} = query;
      if (!riqi) {
        riqi = moment(new Date(), 'YYYYMMDD').format('YYYYMMDD');
      }
      dispatch({
        type: 'huli/query',
        payload: {
          ...query,
          riqi,
          page,
        },
      });
    },
    onEdit(item) {
      let {riqi} = query;
      if (!riqi) {
        riqi = moment(new Date(), 'YYYYMMDD').format('YYYYMMDD');
      }
      dispatch({
        type: 'huli/updataListQuery',
        payload: query,
      });
      dispatch({
        type: 'huli/updateEditData',
        payload: item,
      });
      dispatch(routerRedux.push({
        pathname: '/huli/record',
        search: queryString.stringify({
          suoyin: item.id,
          from: 1,
          riqi,
        }),
      }));
    },
  };

  return (
    <div className="content-inner">
      <Header {...headerProps} />
      <CardList {...cardProps} />
      {modalVisible && <Modal {...modalProps}/>}
      {pdfModalVisible && <PdfModal {...pdfModalProps} />}
    </div>
  );
};

Index.propTypes = {
  userListProps: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    huli: state.huli,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
