import React, { useEffect, useState } from 'react'
import { Col, Row, Button } from "antd";
import { Card, Avatar } from "antd";
import { getDominantColor, RGBToHex, lightenColor } from '../utils/colorThief';


import styles from './index.less'
const spanSize = (titleLength) => {
  if (titleLength <= 9) {
    return 8;
  } else if (titleLength <= 23) {
    return 16;
  } else {
    return 24;
  }
};
export default (props) => {
  const {
    model,
    data
  } = props;
  //打开菜单层级记录堆栈
  const [storeMenu, setStoreMenu] = useState([{ menuList: data.menuList, name: data.name, icon: 'icons/pc/entrance/yxy_spflbz_48_48.png' }]);
  //当前菜单展示数据
  const [currentMenu, setCurrentMenu] = useState({ menuList: data.menuList, name: data.name, icon: 'icons/pc/entrance/yxy_spflbz_48_48.png' });
  //当前菜单层级
  const [deep, setDeep] = useState(0);
  //更新菜单视图
  useEffect(() => {
    setCurrentMenu(storeMenu[deep]);
  }, [storeMenu]);

  //获取当前点击菜单的数据id
  const findParentId = (element) => {
    if (element?.id !== null && element.id !== "") {
      return element.id
    } else {
      return findParentId(element.parentElement)
    }
  }

  //点击卡片 打开下一层/ 打开页面
  const openView = (event) => {
    const id = findParentId(event.target)
    //根据id查找数据
    const targetMenu = currentMenu.menuList.find(menu => menu.id === id);
    if (targetMenu?.menuList !== null) {
      setDeep((prev) => prev + 1);
      setStoreMenu(prevState => {
        const newState = [...prevState];
        newState[deep + 1] = { menuList: targetMenu.menuList, name: targetMenu.name, icon: targetMenu.imageUrl };
        return newState;
      });

    } else {
      model.invoke('openView', targetMenu);
    }
  }

  //点击返回处理
  const clickBack = (event) => {
    if (deep <= 0) {
      return;
    }
    setDeep((prev) => prev - 1);
    //更新堆栈数据，触发视图更新
    setStoreMenu((prev) => {
      const newState = [...prev];
      newState[deep] = null;
      return newState;
    });

  }
  const removeStart = (str) => {
    return str.startsWith('/') ? str.substring(1) : str;
  }



  const showMenu = (currentMenu2) => {
    return currentMenu2.map((item, idx) => (
      <Col key={idx} span={spanSize(item.name.length)}>
        <Card
          onClick={openView}
          hoverable={true}
          bordered={false}
          className={styles.card_style}
          id={item.id}
        >
          <div className={styles.card_content}>
            <Avatar
              size={72}
              src={removeStart(item.imageUrl)}
              onLoad={() => {
                getDominantColor(removeStart(item.imageUrl))
                  .then((color) => {
                    const { hex } = RGBToHex(color);
                    const rgbColor = lightenColor(hex);
                    document.getElementById(item.id).style.backgroundColor = rgbColor;
                  })
                  .catch((error) => {
                    console.error('Error getting dominant color:', error);
                  });
              }}
            />
            <div className={styles.menu_tile}>{item.name}</div>
          </div>
        </Card>
      </Col>
    ));
  };

  //
  return (
    <div className={styles.dicj_menu}>
      <div className={styles.title}>
        <div className={styles.title_left}>
          <div className={styles.pre_bolck}>
            <Avatar shape="square" size={52} src={removeStart(currentMenu.icon)}></Avatar>
          </div>
          <div className={styles.title_text}>{currentMenu.name}</div>
        </div>
        <div className={styles.title_right}>
          {deep !== 0 ? <Button size='large' style={{color: '#00735C',fontSize:'20px'}} type="text" onClick={clickBack}> 返回 </Button> : null}
        </div>
      </div>
      <div className={styles.row}>
        <Row gutter={[40, 40]}>
          {showMenu(currentMenu.menuList)}
        </Row>
      </div>
    </div>

  )
}