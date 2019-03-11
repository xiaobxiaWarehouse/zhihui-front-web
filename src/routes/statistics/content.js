import React from 'react';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Row, Col } from 'antd';
import { JXRS, Layout } from 'components';
import styles from './index.less';

const Index = (props) => {
  const JXRSIcon = JXRS.Icon;
  const {
    statistics: {
      statistics: {
        huli,
        huodong,
        ruzhu,
        yuding,
        yuyue,
        zaiyuan,
      },
    },
  } = props;

  return (
    <div className={styles.content}>
      <Row type="flex" justify="space-around">
        <Col className={styles.col1} span={7}>
          <p><JXRSIcon type="smyuyue" className={styles.tit_icon} /><span className={styles.tit}>预约</span></p>
          <p>待处理数量<span className={styles.shuju}>{yuyue ? yuyue.daichuli : ''}</span></p>
          <p>新增数量<span className={styles.shuju}>{yuyue ? yuyue.xinzeng : ''}</span></p>
          <p>完成数量<span className={styles.shuju}>{yuyue ? yuyue.wancheng : ''}</span></p>
        </Col>
        <Col className={styles.col1} span={7}>
          <p><JXRSIcon type="smyuding" className={styles.tit_icon} /><span className={styles.tit}>预定</span></p>
          <p>待处理数量<span className={styles.shuju}>{yuding ? yuding.daichuli : ''}</span></p>
          <p>新增数量<span className={styles.shuju}>{yuding ? yuding.xinzeng : ''}</span></p>
          <p>完成数量<span className={styles.shuju}>{yuding ? yuding.wancheng : ''}</span></p>
        </Col>
        <Col className={styles.col1} span={7}>
          <p><JXRSIcon type="smruzhu" className={styles.tit_icon} /><span className={styles.tit}>入住</span></p>
          <p>待处理数量<span className={styles.shuju}>{ruzhu ? ruzhu.daichuli : ''}</span></p>
          <p>新增数量<span className={styles.shuju}>{ruzhu ? ruzhu.xinzeng : ''}</span></p>
          <p>入院数量<span className={styles.shuju}>{ruzhu ? ruzhu.ruyuan : ''}</span></p>
          <p>出院数量<span className={styles.shuju}>{ruzhu ? ruzhu.chuyuan : ''}</span></p>
        </Col>
        <Col className={styles.col2} span={11}>
          <p><JXRSIcon type="smzhaohu" className={styles.tit_icon} /><span className={styles.tit}>照护</span></p>
          <p>待照护数量<span className={styles.shuju}>{huli ? huli.daihuliZs : ''}</span></p>
          <p>已照护数量<span className={styles.shuju}>{huli ? huli.yihuliTrc : ''}</span></p>
          <p>照护工作数量<span className={styles.shuju}>{huli ? huli.hulijiluZs : ''}</span></p>
          <p>娱乐活动数量<span className={styles.shuju}>{huodong ? huodong.zs : ''}</span></p>
        </Col>
        <Col className={styles.col2} span={11}>
          <p><JXRSIcon type="smzaiyuan" className={styles.tit_icon} /><span className={styles.tit}>在院情况</span></p>
          <p>
            <span className={styles.half_left}>
              总人数
              <span className={styles.shuju}>{zaiyuan ? zaiyuan.renyuan.zs : ''}</span>
            </span>
            <span className={styles.half_right}>
              总床位数
              <span className={styles.shuju}>{zaiyuan ? zaiyuan.chuangwei.zs : ''}</span>
            </span>
          </p>
          <p style={{ fontWeight: 'bold' }}>护理级别分类统计：{zaiyuan && zaiyuan.huliDj && `(${zaiyuan.huliDj[0].zhongwen}${zaiyuan.huliDj[0].zs})`}</p>
          <p style={{marginTop: '-8px'}}>
            <span className={styles.half_left}>
              {zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[1].zhongwen}
              <span className={styles.shuju}>{zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[1].zs}</span>
            </span>
            <span className={styles.half_right}>
              {zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[2].zhongwen}
              <span className={styles.shuju}>{zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[2].zs}</span>
            </span>
          </p>
          <p style={{marginTop: '-8px'}}>
            <span className={styles.half_left}>
              {zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[3].zhongwen}
              <span className={styles.shuju}>{zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[3].zs}</span>
            </span>
            <span className={styles.half_right}>
              {zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[4].zhongwen}
              <span className={styles.shuju}>{zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[4].zs}</span>
            </span>
          </p>
          <p style={{marginTop: '-8px'}}>
            <span className={styles.half_left}>
              {zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[5].zhongwen}
              <span className={styles.shuju}>{zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[5].zs}</span>
            </span>
            <span className={styles.half_right}>
              {zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[6].zhongwen}
              <span className={styles.shuju}>{zaiyuan && zaiyuan.huliDj && zaiyuan.huliDj[6].zs}</span>
            </span>
          </p>
          <p style={{ fontWeight: 'bold' }}>绑定设备数量</p>
          <p style={{marginTop: '-8px'}}>
            <span className={styles.half_left}>
              智能床
              <span className={styles.shuju}>{zaiyuan && zaiyuan.shebei && zaiyuan.shebei.chuang}</span>
            </span>
            <span className={styles.half_right}>
              智能床垫
              <span className={styles.shuju}>{zaiyuan && zaiyuan.shebei && zaiyuan.shebei.chuangdian}</span>
            </span>
          </p>
          <p style={{marginTop: '-8px'}}>
            多体征设备
            <span className={styles.shuju}>{zaiyuan && zaiyuan.shebei && zaiyuan.shebei.duotizheng}</span>
          </p>
        </Col>
      </Row>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    statistics: state.statistics,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
