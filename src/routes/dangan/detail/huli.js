import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import {Button, Col, Form, Row, Table} from 'antd';
import {JXRS} from 'components';
import styles from './index.less';
import Page from './page';

const JXRSIcon = JXRS.Icon;

const columns = [
  {
    title: '序号',
    key: 'xuhao',
    render: (record, row, index) => {
      return index + 1;
    },
  },
  {
    title: '项目名称',
    dataIndex: 'xiangmu',
  },
  {
    title: '开始时间',
    dataIndex: 'kaishiSj',
  },
  {
    title: '时长',
    dataIndex: 'shichang',
  },
  {
    title: '项目描述',
    dataIndex: 'miaoshu',
  },
  {
    title: '护理员',
    dataIndex: 'huliyuanXm',
    render: (record) => {
      return record || '-';
    },
  },
];

const Huli = (props) => {
  const {
    dispatch,
    huliISOpen,
    changeHuliIsOpen,
    huliJilu,
    huliJiluData,
    currentHuliIndex,
    onEdit,
    onPage,
    onChangeRiqi,
    ...tableProps
  } = props;

  const pageProps = {
    length: huliJilu.length,
    index: currentHuliIndex,
    onLeft() {
      let newCurrentHuliIndex = currentHuliIndex - 1;
      onPage(newCurrentHuliIndex);
    },
    onRight() {
      let newCurrentHuliIndex = currentHuliIndex + 1;
      onPage(newCurrentHuliIndex);
    },
    changgeTime(time) {
      let riqi = moment(time).format('YYYY-MM-DD');
      onChangeRiqi(riqi);
    },
    time: huliJilu && huliJilu[currentHuliIndex] ? moment(huliJilu[currentHuliIndex], 'YYYY-MM-DD') : undefined,
    isDisabled: true,
  };

  return (
    <div>
      <Form className="add-form">
        <Row className={styles.pgTitle} id="5">
          <Col span={8} className={styles.titleName}>护理记录 | 日常护理</Col>
          <Col span={5} push={10}>
            <Button
              className={styles.btn}
              onClick={() => {
                onEdit();
              }}
            ><JXRSIcon type="edit"/> 编辑表单</Button>
          </Col>
        </Row>
        <Page {...pageProps} />
        <div style={{marginBottom: 13}}>
          <Table
            {...tableProps}
            bordered
            columns={columns}
            simple
            rowKey={record => record.id}
          />
        </div>
      </Form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    dangan: state.dangan,
  };
}

export default injectIntl(connect(({dangan}) => ({dangan}))(Form.create()(Huli)));
