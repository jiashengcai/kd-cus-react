import React from 'react';
import styles from '../css/sealitem.css';


const SealItem = (props) => {
  const { id, width, height, left, top, innerText, parentDiv } = props;
  const remvoeItem = () => {
    const element = document.getElementById(`content${id}`);
    element.remove();
  }
  return (
    <div id={id}
      className={styles.sealItem}
      style={{ width: width, height: height, left: left, top: top }}
    >
      {innerText}
      <div className={styles.fieldRemoveBtn}>
        <button onClick={remvoeItem} class="kd-btn kd-btn-second kd-btn-size-small kd-btn-shape-circle kd-btn-icon-only" type="button" click-animating-wave="false">
          <span class="kd-btn-iconWrapper-left">
            <i class="kdicon kdicon-close"></i>
          </span>
        </button>
        {/* 不能添加组件 <Button shape="circle" icon={<Icon type="close" />} ></Button> */}
      </div>
    </div>
  );
}

export default SealItem;
