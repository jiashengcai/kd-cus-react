import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import '../css/style.css'



/**
 * 加载PDF文件
 * @param el 页面中存放canvas的div的id或者类名
 * @param fileSrc 后端返回的PDF文件路径
 * @param scale PDF缩放的倍数
 * @param call 加载成功后的回调函数
 * @returns {Promise<void>}
 */
export async function loadPDF({
  el, fileSrc, rate
}, call) {
  let pdfCol = document.getElementById(el);

  // let loadingTask = await window.pdfjsLib.getDocument(fileSrc);
  //{url:fileSrc,cMapUrl:"https://unpkg.zhimg.com/pdfjs-dist@3.1.81/cmaps/",cMapPacked: true}
  let loadingTask = await pdfjsLib.getDocument({ url: fileSrc }); // 创建加载任务

  loadingTask.promise.then(function (pdf) { // 开始加载任务
    for (let i = 1; i <= pdf.numPages; i++) { // 遍历每一页PDF
      pdf.getPage(i).then(async function (page) {
        
        let viewPort = page.getViewport({ scale: 1 }); // 获取PDF尺寸
        let div = document.createElement("div"); // 用于存放canvas


        div.id = `canvasBox_${i}`;
        div.className = 'canvasBox';
        div.setAttribute('style', 'position: relative;');


        let canvas = document.createElement("canvas");  // 创建canvas
        let context = canvas.getContext("2d");


        // 将canvas的宽和高设置为与PDF视图一样大小
        // canvas.height = viewPort.height ;
        // canvas.width =  viewPort.width;
        canvas.width = Math.floor(viewPort.width * rate);
        canvas.height = Math.floor(viewPort.height * rate);
        canvas.style.width = Math.floor(viewPort.width) + 'px';
        canvas.style.height = Math.floor(viewPort.height) + 'px';
        // setTimeout(() => {
        //   // 画页码
        //   context.font = "14px orbitron";
        //   context.fillStyle = "#333";
        //   context.save();
        //   context.beginPath();
        //   context.line = 2;
        //   context.textAlign = "center";
        //   context.textBaseline = "middle";
        //   context.fillText(`${i}`, viewPort.width / 2, viewPort.height - 30);
        //   context.restore();
        //   context.closePath();
        // }, 500);
        let transform = rate !== 1
          ? [rate, 0, 0, rate, 0, 0]
          : null;

        let renderContext = {
          canvasContext: context,
          viewport: viewPort,
          transform: transform
        };

        // 该函数返回一个 当PDF页面成功渲染到界面上时解析的`promise`，我们可以使用成功回调来渲染文本图层。
        await page.render(renderContext); // 初始化文本图层
        //canvas.className = 'canvas';
        canvas.setAttribute('style', 'margin-bottom: 10px;');
        canvas.id = `canvas_${i}`;

        call({
          pdfCol: pdfCol,
          canvas: canvas,
          context: context,
          scale: rate,
          index: i,
          allPage: pdf.numPages
        });

        pdfCol.appendChild(div); // 将每一个div放到外面的大盒子中
        div.appendChild(canvas);
      });
    }
  });
}


/**
 * 获取canvas鼠标的点坐标
 * @param {*} canvas 
 * @param {*} event 
 * @returns 
 */
export function getMousePos(canvas, event) {
  let rect = canvas.getBoundingClientRect(); // 获取canvas元素的边界框来计算当前点击的位置相对于canvas的坐标

  let x = Math.round(event.clientX - rect.left);

  let y = Math.round(event.clientY - rect.top);

  return { x, y };
}

/**
 * 画矩形
 * @param {*} originPoint 起点
 * @param {*} point 终点
 * @param {*} context 
 * @param {*} strokeStyle 颜色
 * @param {*} lineWidth 线的宽度
 */
export function paintReact(originPoint, point, context, strokeStyle = "red", lineWidth = 2) {
  /** 
  * 由于鼠标是不定方向进行移动的，因此我们需要记录此时起始点和终点的x和y坐标之间的大小，取小的那个值，
  * 组成canvas绘制矩形的起始点，然后差的绝对值作为矩形的宽和高。
  */

  let w = Math.abs(point.x - originPoint.x);

  let h = Math.abs(point.y - originPoint.y);

  // let left = point.x > originPoint.x ? originPoint.x : point.x;
  let left = Math.min(point.x, originPoint.x);

  // let top = point.y > originPoint.y ? originPoint.y : point.y;
  let top = Math.min(point.y, originPoint.y);

  context.save();
  context.beginPath();
  context.lineWidth = lineWidth;
  context.strokeStyle = strokeStyle;
  context.rect(left, top, w, h);
  context.stroke();
  context.restore();
}

/**
 * 给画的矩形增加文字描述
 * @param {*} context 
 * @param {*} obj 每一个变量对象（矩形选中的）
 */
export function paintText(context, obj) {
  context.font = "14px orbitron"; // 设置字体样式

  // 黄色背景
  context.beginPath();
  context.moveTo(obj.originPoint.x * obj.scale + 2, obj.originPoint.y * obj.scale - 32);
  context.lineTo(obj.originPoint.x * obj.scale + 2 + context.measureText(obj.value).width, obj.originPoint.y * obj.scale - 32); // measureText()方法返回一个对象，该对象包含以像素计的指定字体宽度。
  context.lineTo(obj.originPoint.x * obj.scale + 2 + context.measureText(obj.value).width, obj.originPoint.y * obj.scale - 2);
  context.lineTo(obj.originPoint.x * obj.scale + 2, obj.originPoint.y * obj.scale - 2);
  context.closePath();
  context.fillStyle = "rgba(255, 255, 0, .5)";
  context.strokeStyle = "rgba(255, 255, 0, .5)";
  context.fill();
  context.stroke();

  // 文字
  context.fillStyle = "red";
  context.strokeStyle = "red";
  context.save();
  context.beginPath();
  context.line = 2;
  context.fillText(obj.value, obj.originPoint.x * obj.scale + 2, obj.originPoint.y * obj.scale - 10);
  context.restore();
  context.closePath();
}