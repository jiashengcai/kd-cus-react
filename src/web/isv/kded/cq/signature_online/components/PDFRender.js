import React, { useLayoutEffect, useState, useEffect } from "react";
import SealItem from './SealItem';
import { loadPDF } from '../common/canvas'
import styles from '../css/style.css';
import { Button, Spin, Icon, Tooltip } from '@kdcloudjs/kdesign'; //第三方基本组件
import '@kdcloudjs/kdesign/dist/kdesign.css'




const PDFRender = () => {
  const map = new Map();
  const [isLoading, setIsLoading] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [res, setRes] = useState()
  const [signatoryDialogData, setSignatoryDialogData] = useState(map)


  useLayoutEffect(() => {
    const fileSrc = 'http://172.20.182.97/ierp/attachment/preview.do?path=http%3A%2F%2F172.20.182.97%2Fierp%2Ftempfile%2Fdownload.do%3FconfigKey%3Dredis.serversForCache%26id%3Dtempfile-9eb28016-cc6a-4660-8d32-246cfedad459&isFromCache=true&appId=kded_metadata&fId=kded_pdf_viewer&pageId=84d44a9bfcf54170a21b08e5d858c6e0&kd_cs_ticket=YVxH7VtXa18kI9bcMoxX2GEMpnS6Ap0G#toolbar=0';
    setIsLoading(true)
    loadPDF({ el: "pdf-viewer", fileSrc: fileSrc }, res => {
      setIsLoading(false)
      if (Number(res.allPage) === Number(res.index)) { // 最后一张PDF渲染完成
        setRes(res)
      }
    })
  }, []);
  useEffect(() => {
    // 获取canvas的父级div盒子，在盒子上进行签章的绘制
    let divList = document.getElementsByClassName("canvasBox");
    for (let i = 0; i <= divList.length - 1; i++) {
      let div = divList[i];

      div.addEventListener("mousedown", ev => {
        let id = "";
        let offsetX = ev.offsetX; // 距离div左边界的X轴距离
        let offsetY = ev.offsetY; // 距离div上边界的y轴距离
        if (navigator.userAgent.indexOf("Firefox") > -1) { // 兼容火狐浏览器
          id = ev.originalTarget.id;
          offsetX = ev.layerX;
          offsetY = ev.layerY;
        } else {
          id = ev.toElement.id;
        }

        if (id === `canvas_${i + 1}`) { // 在div上的
          signatoryMouseDown({
            x: offsetX,
            y: offsetY,
            parentDiv: div,
            i
          });
        }
        setIsMove(true);
        div.addEventListener("mousemove", innerDivMouseDownAndMove); // 开始移动鼠标了
      })

      div.addEventListener("mouseup", ev => {
        let id = navigator.userAgent.indexOf("Firefox") > -1 ? ev.originalTarget.id : ev.toElement.id;
        if(id.startsWith('sealItem')){
          signatoryMouseUp({
            x: document.getElementById(id).style.left,
            y: document.getElementById(id).style.top,
            elementd: id,
            res,
            i
          });
        }
        setIsMove(false);
        div.removeEventListener("mousemove", innerDivMouseDownAndMove);
      })
    }
  }, [res, isMove]);


  const addSeal = (val, sigIndex) => {
    //选择了签名模式 默认已经是签名模式
  }
  // 获取签章的大小
  const getSealAttr = () => {
    let text = "个人";
    return {
      offsetLeft: 113,
      offsetTop: 43,
      width: 225,
      height: 85,
      innerText: `${text}签章`
    };
  }

  // 签章模式下 鼠标按下的回调
  const signatoryMouseDown = (obj) => {
    const canvasIndex = obj.i + 1
    if (!document.getElementById(`sealItem_${canvasIndex}`)) {
      let {
        offsetLeft, offsetTop, width, height, innerText
      } = getSealAttr();

      createDiv({
        id: `sealItem_${canvasIndex}`,
        width: `${width}px`,
        height: `${height}px`,
        left: `${obj.x - offsetLeft}px`,
        top: `${obj.y - offsetTop}px`,
        innerText: `${innerText}${canvasIndex}`,
        parentDiv: obj.parentDiv,
        canvasIndex: canvasIndex
      });
    }
  }
  // 签章模式下 鼠标松开的回调
  const signatoryMouseUp = (obj) => {
    let {
      offsetLeft, offsetTop, innerText
    } = getSealAttr();
    const canvasIndex = obj.i + 1
    let item = signatoryDialogData.get(canvasIndex)
    let isExist = item !== undefined && item !== null;

    if (isExist) { // 原先已经存在的
      //更新坐标
      item['point'] = {
        x: Math.round((Number(obj.x.substring(0, obj.x.length - 2)) + offsetLeft) / item.scale),
        y: Math.round((Number(obj.y.substring(0, obj.y.length - 2)) + offsetTop) / item.scale)
      }
      setSignatoryDialogData(signatoryDialogData.set(canvasIndex, item));
    } else {
      //新建每页只放置1个签章，
      let index = 1;
      setSignatoryDialogData(signatoryDialogData.set(obj.canvasIndex, {
        point: {
          x: Number(obj.x.substring(0, obj.x.length - 2)) + offsetLeft,
          y: Number(obj.y.substring(0, obj.y.length - 2)) + offsetTop
        },
        allPage: obj.res.allPage,
        scale: obj.res.scale,
        innerDivId: obj.elementd,
        innerText: `${innerText}${index}`,
        canvasIndex: obj.i + 1
      }));
    }
  }
  const innerDivMouseDownAndMove = (ev) => {
    let id = "";
    if (navigator.userAgent.indexOf("Firefox") > -1) { // 火狐浏览器
      id = ev.originalTarget.id;
    } else {
      id = ev.toElement.id;
    }
    if (document.getElementById(id) && isMove) {
      let innerDiv = document.getElementById(id);
      let parentDiv = document.getElementById(`canvasBox_${id.split("_")[1]}`);
      let range = parentDiv.getBoundingClientRect();
      innerDiv.style.left = `${Math.round(ev.clientX - innerDiv.offsetWidth / 2 - range.left)}px`;
      innerDiv.style.top = `${Math.round(ev.clientY - innerDiv.offsetHeight / 2 - range.top)}px`;

      if (innerDiv.offsetLeft <= 0) {
        innerDiv.style.left = "0px";
      }

      if (innerDiv.offsetTop <= 0) {
        innerDiv.style.top = "0px";
      }

      if (innerDiv.offsetLeft >= parentDiv.clientWidth - innerDiv.clientWidth) {
        innerDiv.style.left = `${parentDiv.clientWidth - innerDiv.clientWidth}px`;
      }

      if (innerDiv.offsetTop >= parentDiv.clientHeight - innerDiv.clientHeight - 15) {
        innerDiv.style.top = `${parentDiv.clientHeight - innerDiv.clientHeight - 15}px`;
      }
    }
  }

  const createDiv = (obj) => {
     let innerDiv = document.createElement("div");
    // innerDiv.className = "seal-item";
    // innerDiv.setAttribute('style', 'position: absolute;display: flex;align-items: center;justify-content: center;color: #666;font-size: 14px;border: 1px dashed #666;background-color: rgba(235, 247, 254, .8);cursor: move;text-align: center;');
    innerDiv.id = `content${obj.id}`;
    // innerDiv.style.width = obj.width;
    // innerDiv.style.height = obj.height;
    // innerDiv.style.left = obj.left;
    // innerDiv.style.top = obj.top;
    // innerDiv.innerText = obj.innerText;
    obj.parentDiv.appendChild(innerDiv);
    ReactDOM.render(<SealItem {...obj} />, document.getElementById(`content${obj.id}`));
  }

  const createSignatory = (obj) => {

  }

  return (
    <div className="App">
      <div className={styles.adminPage}  >
        <div className={styles.leftBox}  >
          <h3>控件</h3>
          <div onClick={() => addSeal('persionSeal', 0)} className={styles.fieldsItem}>
            <Tooltip tip='直接在Pdf内容中点击放置，或者拖动已有签名栏' >
              <div className={styles.fieldTitle}>
                <Icon type="graffiti">放置签名</Icon>
                <Button size='large' shape="circle" icon={<Icon type="add" />} ></Button>
              </div>
            </Tooltip>
          </div>
          <div className={styles.btnWrapper}>
            <Button size='large' >
              取消
            </Button>
            <Button style={{width: '100%', marginLeft: '5px'}}  type="primary" size='large'>
              确定签名
            </Button>
          </div>
        </div>
        <Spin name="Spin" type="container" spinning={isLoading}>
          <div className={styles.pdfBox} >
            <div className={styles.pdfCol} id='pdf-viewer' />
          </div>
        </Spin>

      </div>
    </div>

  );
};

export default PDFRender;