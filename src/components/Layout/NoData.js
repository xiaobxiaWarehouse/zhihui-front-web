import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import styles from './NoData.less';
import imgTableNoData80px from '../../public/table-nodata-80px.png';

const NoData = () => {
  return (
    <div className={styles.noData}>
      <img className={styles.imageNoData} alt={intl.get('Table.nodata')} src={imgTableNoData80px}/>
      <div className={styles.titleNoData}>{intl.get('Table.nodata')}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default injectIntl(connect(mapStateToProps)(NoData));
