/**
 * Created by alphabeta on 17-12-16.
 */
// 使用json结构定义App和Icon之间的映射关系，App的Key全部使用小写
import menus from './menus.json';

const menusList = [];

function getMenusList(list) {
  list.forEach((item) => {
    menusList.push(item);
    if (item.children && item.children.length > 0) {
      getMenusList(item.children);
    }
  });
}

getMenusList(menus);

export { menus, menusList };
