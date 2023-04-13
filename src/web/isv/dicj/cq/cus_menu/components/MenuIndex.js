import React, { useEffect, useState } from 'react'
import MenuList from './MenuList';
import styles from './index.less'

export default (props) => {
  const {
    model,
    data
  } = props;

  //
  return (
    // 根据qingStatus 状态控制加载不同组件
    <div className={styles.dicj_menu}>
      <div className={styles.title}>
        <div className={styles.pre_bolck}></div>
        <div className={styles.title_text}>{data.data.appName}</div>
      </div>
      <div className={styles.row}>
      <MenuList model={model} data={data.data} />
      </div>
    </div>

  )
}