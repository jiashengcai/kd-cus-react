import React from 'react';
import styles from '../css/sealitem.css';


const SealItem = (props) => {
  const { id, width, height, left, top, innerText, parentDiv } = props;
  //  let innerDiv = document.createElement("div");
  //   innerDiv.className = "seal-item";
  //   innerDiv.setAttribute(
  //     'style',
  //     'position: absolute;display: flex;align-items: center;justify-content: center;color: #666;font-size: 14px;border: 1px dashed #666;background-color: rgba(235, 247, 254, .8);cursor: move;text-align: center;',
  //   );
  //   innerDiv.id = id;
  //   innerDiv.style.width = width;
  //   innerDiv.style.height = height;
  //   innerDiv.style.left = left;
  //   innerDiv.style.top = top;
  //   innerDiv.innerText = innerText;
  //   parentDiv.appendChild(innerDiv);
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
