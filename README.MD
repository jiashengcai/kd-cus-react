# 自定义控件react脚手架

## 前提

需要本地安装node，以及可以从npm上下载package的网络环境

## 安装

命令终端进入react-stage，运行npm install。

## 配置

在src目录里，分为web端和mobile端，isv目录下默认有fdtest目录，根据自己的开发商标识，建立目录，比如：kingdee、fdtest。
在fdtest下，放置各个领域的目录（moudleId），比如：cq。
在cq目录下，放置各个控件的文件夹，文件夹命名使用schemaId。

在build目录里的custom.configInfo.js中，需要根据对应的需要修改client、isv、moduleId的值

在server.js里，配置允许跨域访问的域名、监听端口、静态资源文件夹（需要对nodejs有了解）

## 开发
前端项目开发流程：

1、用vscode 打开react_stage 文件夹，加载项目，新建终端运行命令：npm run dev

2、在新建另外一个终端运行命令：node server.js

3、浏览器访问：http://localhost:3001/ 可以看到test,和kingdee 则ok

4、苍穹调试自定义控件： http://localhost:8080/ierp/?formId=pc_main_console&kdcus_cdn=http://localhost:3001


## 打包

每个控件（schemaId）下，都必须要有main.js（webpack打包入口），脚手架里已经给出样例，可以参考
命令终端进入react-stage，运行npm run dev（开发模式）或者npm run build（生产模式）
如需要打成zip包，需手动将控件目录下的css目录、lang目录、index.js文件、index.js.map文件打在一个zip包里

## 启动服务

命令终端进入react-stage，运行nodemon server.js
此功能优化开发过程中出现频繁打zip包的过程

## KDE脚本插件测试

```javascript
var plugin = new FormPlugin({
  afterBindData : function(e){
    var customControl = this.getView().getControl('customcontrolap') // 这里的'customcontrolap'是自定义控件在设计器上的标识属性的值，填了什么这里就写什么，默认是customcontrolap
    var data = {
        list:[
            {"value":"ddd","done":false,"id":0,"isRemove":false},{"value":"ddd","done":false,"id":1,"isRemove":false},{"value":"dd","done":true,"id":2,"isRemove":false}
        ]
    }
    customControl.setData(data)
  },
  customEvent : function(e){
    var key  = e.getKey()
    var name  = e.getEventName()
    var args = e.getEventArgs()
    this.getView().showMessage(key  + name + args)
  }
});
```
