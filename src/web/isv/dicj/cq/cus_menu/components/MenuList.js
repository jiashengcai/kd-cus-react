import React,{ useEffect, useState,useMemo  }  from 'react'
import { Card, Col, Row } from "antd";
import DicjCard from './DicjCard';
const spanSize = (titleLength) => {
  if (titleLength <= 5) {
    return 4;
  } else if (titleLength <= 10) {
    return 6;
  } else if (titleLength <= 15) {
    return 8;
  } else if (titleLength <= 20) {
    return 10;
  } else {
    return 12;
  }
};


export default (props) => {
  const {
    model,
    data
  } = props;
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    setMenuList(data.menuList)
  }, []);


  const showMenu = () => {
    return menuList.map((item, idx) => (
      <Col key={idx} span={spanSize(item.name.length)}>
        <DicjCard model={model} data={item} />
      </Col>
    ));
  };

  //
  return (
    <Row gutter={[19, 30]}>
      {showMenu()}
    </Row>
  )
}