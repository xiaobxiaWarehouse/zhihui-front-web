import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import {Button, DatePicker, Form} from 'antd';
import {config} from 'utils';
import {JXRS, Layout} from 'components';
import styles from './index.less';

const JXRSIcon = JXRS.Icon;

const Page = (props) => {
  const {
    length,
    index,
    onLeft,
    onRight,
    time,
    isDisabled,
    changgeTime,
  } = props;

  return (
    <div>
      <div className={styles.pageBox}>
        <Button
          style={{marginRight: 10}}
          disabled={index === 0}
          onClick={() => {
            onLeft();
          }}
        ><JXRSIcon type="left" /></Button>
        <DatePicker
          onChange={(val) => { changgeTime(val); }}
          value={time}
          disabled
          format="YYYY-MM-DD"
          className={styles.pageDatePicker}
        />
        <Button
          disabled={Number(length - 1) === index}
          style={{marginLeft: 10}}
          onClick={() => {
            onRight();
          }}
        ><JXRSIcon type="right" /></Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    dangan: state.dangan,
  };
}

export default injectIntl(connect(({dangan}) => ({dangan}))(Form.create()(Page)));
