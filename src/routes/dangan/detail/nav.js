import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {JXRS} from 'components';
import intl from 'react-intl-universal';
import {Menu} from 'antd';
import styles from './index.less';

const {SubMenu} = Menu;
const JXRSIcon = JXRS.Icon;

const navPg = [{
  name: intl.get('Ruyuan.nav.pre01'),
  id: '6',
}, {
  name: intl.get('Ruyuan.nav.01'),
  id: '7',
}, {
  name: intl.get('Ruyuan.nav.02'),
  id: '8',
}, {
  name: intl.get('Ruyuan.nav.03'),
  id: '9',
}, {
  name: intl.get('Ruyuan.nav.04'),
  id: '10',
}, {
  name: intl.get('Ruyuan.nav.05'),
  id: '11',
}, {
  name: intl.get('Ruyuan.nav.06'),
  id: '12',
}, {
  name: intl.get('Ruyuan.nav.07'),
  id: '13',
}, {
  name: intl.get('Ruyuan.nav.08'),
  id: '14',
}, {
  name: intl.get('Ruyuan.nav.09'),
  id: '15',
}, {
  name: intl.get('Ruyuan.nav.10'),
  id: '16',
}, {
  name: intl.get('Ruyuan.nav.11'),
  id: '17',
}, {
  name: intl.get('Ruyuan.nav.12'),
  id: '18',
}, {
  name: intl.get('Ruyuan.nav.13'),
  id: '19',
}, {
  name: intl.get('Ruyuan.nav.14'),
  id: '20',
}, {
  name: intl.get('Ruyuan.nav.sup01'),
  id: '21',
}];

const navJk = [{
  name: '入住信息',
  id: '23',
}, {
  name: '基本信息',
  id: '24',
}, {
  name: '个人简历',
  id: '25',
}, {
  name: '特长性格兴趣',
  id: '26',
}, {
  name: '家庭成员',
  id: '27',
}, {
  name: '既往病史',
  id: '28',
}];

const Nav = (props) => {
  const {
    ruzhujiangkangjilu,
    yuyue,
    yuding,
    shenqing,
    huliJilu,
    ruzhupinggu,
    tijianbaogao,
    changeNav,
    shebei,
    currentNavIndex,
    dangan: {
      collapsed,
    },
  } = props;

  const scrollToAnchor = (anchorName, index) => {
    if (index === currentNavIndex && anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) { anchorElement.scrollIntoView(); }
    } else {
      changeNav(index, () => {
        if (anchorName) {
          // 找到锚点
          let anchorElement = document.getElementById(anchorName);
          // 如果对应id的锚点存在，就跳转到锚点
          if (anchorElement) { anchorElement.scrollIntoView(); }
        }
      });
    }
  };

  const isShowShebeiMenu = () => {
    let isShow = false;
    if (shebei) {
      isShow = Object.keys(shebei).some((item) => {
        return shebei[item];
      });
    }
    return isShow;
  };

  return (
    <div className={collapsed ? styles.collapsedMenu : styles.menu}>
      <Menu
        style={{ width: '100%', paddingTop: 13 }}
        mode="inline"
        forceSubMenuRender
        inlineCollapsed={collapsed}
        defaultOpenKeys={[]}
        triggerSubMenuAction="click"
      >
        <SubMenu
          key="sub6"
          title={
            <span>
              {collapsed && <JXRSIcon type="xinxi" className="icon-nav" />}
              {!collapsed && '入住信息'}
            </span>
          }
        >
          <Menu.Item className={currentNavIndex === 0 && styles.active} key="1" onClick={() => { changeNav(0); }}>入住信息</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub1"
          title={<span>
            {collapsed && <JXRSIcon type="form" className="icon-nav" />}
            {!collapsed && '业务表单'}
          </span>}
        >
          {
            yuyue && yuyue.length > 0 && <Menu.Item className={currentNavIndex === 1 && styles.active} key="2" onClick={() => { changeNav(1); }}>预约单</Menu.Item>
          }
          {
            yuding && yuding.length > 0 && <Menu.Item className={currentNavIndex === 2 && styles.active} key="3" onClick={() => { changeNav(2); }}>预定单</Menu.Item>
          }
          {
            shenqing && shenqing.length > 0 && <Menu.Item className={currentNavIndex === 3 && styles.active} key="4" onClick={() => { changeNav(3); }}>入院申请单</Menu.Item>
          }
        </SubMenu>
        {
          huliJilu && huliJilu.length > 0 && <SubMenu
            key="sub2"
            title={<span>
              {collapsed && <JXRSIcon type="huli" className="icon-nav" />}
              {!collapsed && '护理记录'}
            </span>}
          >
            <Menu.Item className={currentNavIndex === 4 && styles.active} key="5" onClick={() => { changeNav(4); }}>日常护理</Menu.Item>
          </SubMenu>
        }
        {
          ruzhupinggu && ruzhupinggu.length > 0 && <SubMenu
            className={currentNavIndex === 5 && styles.active}
            key="sub3"
            title={<span>
              {collapsed && <JXRSIcon type="pinggu" className="icon-nav" />}
              {!collapsed && '入住评估表'}
            </span>}
          >
            {
              navPg.map((item) => {
                return (
                  <Menu.Item key={item.id} onClick={() => { scrollToAnchor(item.id, 5); }}>
                    {item.name}
                  </Menu.Item>
                );
              })
            }
          </SubMenu>
        }
        {
          tijianbaogao && tijianbaogao.length > 0 && <SubMenu
            key="sub4"
            title={<span>
              {collapsed && <JXRSIcon type="tijian" className="icon-nav" />}
              {!collapsed && '体检报告'}
            </span>}
          >
            <Menu.Item className={currentNavIndex === 6 && styles.active} key="22" onClick={() => { changeNav(6); }}>体检报告</Menu.Item>
          </SubMenu>
        }
        {
          ruzhujiangkangjilu && ruzhujiangkangjilu.length > 0 && <SubMenu
            className={currentNavIndex === 7 && styles.active}
            key="sub5"
            title={<span>
              {collapsed && <JXRSIcon type="jiankang" className="icon-nav" />}
              {!collapsed && '入住健康记录'}
            </span>}
          >
            {
              navJk.map((item) => {
                return <Menu.Item key={item.id} onClick={() => { scrollToAnchor(item.id, 7); }}>{item.name}</Menu.Item>;
              })
            }
          </SubMenu>
        }
        {
          isShowShebeiMenu() && <SubMenu
            key="sub7"
            title={
              <span>
                {collapsed && <JXRSIcon type="monitor" className="icon-nav" />}
                {!collapsed && '监测详情'}
              </span>
            }
          >
            <Menu.Item className={currentNavIndex === 8 && styles.active} key="99" onClick={() => { changeNav(8); }}>监测详情</Menu.Item>
          </SubMenu>
        }
      </Menu>
    </div>
  );
};


Nav.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

export default injectIntl(connect(({dangan}) => ({dangan}))(Nav));
