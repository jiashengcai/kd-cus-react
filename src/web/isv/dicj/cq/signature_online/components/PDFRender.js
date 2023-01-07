import React, { useLayoutEffect, useState, useEffect } from "react";
import SealItem from './SealItem';
import { loadPDF } from '../common/canvas'
import styles from '../css/style.css';
import { Button, Spin, Icon, Tooltip, Message, Input, Form } from '@kdcloudjs/kdesign'; //第三方基本组件
import '@kdcloudjs/kdesign/dist/kdesign.css'




const PDFRender = (props) => {
  const sealWidth = 225
  const sealHeight = 85
  const {
    model,
    data: propsData
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [res, setRes] = useState()
  const [signatoryDialogData, setSignatoryDialogData] = useState([])


  useEffect(() => {
    if ('signPdf' === propsData.data.op) {
      if (true === propsData.data.success && propsData.data.loginEsignUrl !== '') {
        Message.success('绘制Pdf成功，准备签名')
        console.log(propsData.data.loginEsignUrl)
        const l=(screen.availWidth-800)/2;
        const t=(screen.availHeight-650)/2;
        window.parent.window.open(propsData.data.loginEsignUrl,'eSignCloud OAuth','width=800,height=650,top='+t+',left='+l+',toolbar=no,menubar=no,location=no,status=yes');
      } else {
        Message.error(propsData.data.error);
      }
    }
  }, [propsData])

  useLayoutEffect(() => {
    const fileSrc = propsData.data.pdfUrl;
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
        if (id.startsWith(propsData.data.userName)) {
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
      offsetLeft: sealWidth / 2,
      offsetTop: sealHeight / 2,
      width: sealWidth,
      height: sealHeight,
      innerText: `${text}签章`
    };
  }

  // 签章模式下 鼠标按下的回调
  const signatoryMouseDown = (obj) => {
    const canvasIndex = obj.i + 1
    if (!document.getElementById(`${propsData.data.userName}_${canvasIndex}`)) {
      let {
        offsetLeft, offsetTop, width, height, innerText
      } = getSealAttr();

      createDiv({
        id: `${propsData.data.userName}_${canvasIndex}`,
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
    let item = signatoryDialogData.find(o => o.pageIndex === canvasIndex);

    //let item = signatoryDialogData.get(canvasIndex)
    let isExist = item !== undefined && item !== null;

    if (isExist) { // 原先已经存在的
      //更新坐标
      const updateSignatoryDialogData = signatoryDialogData.map(item => {
        if (item.pageIndex === canvasIndex) {
          return {
            ...item, x: Math.round((Number(obj.x.substring(0, obj.x.length - 2)) + offsetLeft) / item.scale),
            y: Math.round((Number(obj.y.substring(0, obj.y.length - 2)) + offsetTop) / item.scale)
          };
        }
        return item;
      });
      setSignatoryDialogData(updateSignatoryDialogData);
    } else {
      //新建每页只放置1个签章，
      let index = 1;
      setSignatoryDialogData(signatoryDialogData.concat({
        x: Number(obj.x.substring(0, obj.x.length - 2)) + offsetLeft,
        y: Number(obj.y.substring(0, obj.y.length - 2)) + offsetTop,
        allPage: obj.res.allPage,
        scale: obj.res.scale,
        sealWidth: sealWidth,
        sealHeight: sealHeight,
        signatureFieldName: obj.elementd,
        innerText: `${innerText}${index}`,
        pageIndex: obj.i + 1
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
    innerDiv.id = `content${obj.id}`;
    obj.parentDiv.appendChild(innerDiv);
    ReactDOM.render(<SealItem {...obj} />, document.getElementById(`content${obj.id}`));
  }

  const signPdf = () => {
    if (signatoryDialogData.length == 0) {
      Message.warning('请先放置签名图形')
    } else {
      let result = {
        pdfUrl: propsData.data.pdfUrl,
        rate: window.devicePixelRatio,
        signPoint: signatoryDialogData,
        esignName: propsData.data.esignName,
        pageId: propsData.data.pageId
      }
      setIsLoading(true)
      model.invoke('signPdf', result)
    }

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
            {/* <Button size='large' >
              取消
            </Button> */}
            <Form
              layout="vertical">
              <Form.Item
                label="eSign用户名"
                name="username"
                required
                validateTrigger="onBlur">
                <Input defaultValue={propsData.data.esignName} />
              </Form.Item>
              <Button loading={isLoading} htmlType="submit" onClick={signPdf} style={{ width: '100%', marginLeft: '5px' }} type="primary" size='large'>
                确定签名
              </Button>
            </Form>
          </div>
        </div>
        <Spin name="Spin" type="page" spinning={isLoading}>
          <div className={styles.pdfBox} >
            <div className={styles.pdfCol} id='pdf-viewer' />
          </div>
        </Spin>

      </div>
    </div>

  );
};

export default PDFRender;