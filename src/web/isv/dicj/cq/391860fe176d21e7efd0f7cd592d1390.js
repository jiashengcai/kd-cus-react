function _typeof2(obj){"@babel/helpers - typeof";return _typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj;}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;},_typeof2(obj);}/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2021 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */(function webpackUniversalModuleDefinition(root,factory){if((typeof exports==="undefined"?"undefined":_typeof2(exports))==='object'&&(typeof module==="undefined"?"undefined":_typeof2(module))==='object')module.exports=factory();else if(typeof define==='function'&&define.amd)define("pdfjs-dist/build/pdf.worker",[],factory);else if((typeof exports==="undefined"?"undefined":_typeof2(exports))==='object')exports["pdfjs-dist/build/pdf.worker"]=factory();else root["pdfjs-dist/build/pdf.worker"]=root.pdfjsWorker=factory();})(this,function(){return(/******/function(){// webpackBootstrap
/******/var __webpack_module_cache__={};/******/ /******/ // The require function
/******/function __w_pdfjs_require__(moduleId){/******/ // Check if module is in cache
/******/var cachedModule=__webpack_module_cache__[moduleId];/******/if(cachedModule!==undefined){/******/return cachedModule.exports;/******/}/******/ // Create a new module (and put it into the cache)
/******/var module=__webpack_module_cache__[moduleId]={/******/id:moduleId,/******/loaded:false,/******/exports:{}/******/};/******/ /******/ // Execute the module function
/******/__webpack_modules__[moduleId].call(module.exports,module,module.exports,__w_pdfjs_require__);/******/ /******/ // Flag the module as loaded
/******/module.loaded=true;/******/ /******/ // Return the exports of the module
/******/return module.exports;/******/}/******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/(function(){/******/ // define getter functions for harmony exports
/******/__w_pdfjs_require__.d=function(exports,definition){/******/for(var key in definition){/******/if(__w_pdfjs_require__.o(definition,key)&&!__w_pdfjs_require__.o(exports,key)){/******/Object.defineProperty(exports,key,{enumerable:true,get:definition[key]});/******/}/******/}/******/};/******/})();/******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/(function(){/******/__w_pdfjs_require__.o=function(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);};/******/})();/******/ /******/ /* webpack/runtime/make namespace object */ /******/(function(){/******/ // define __esModule on exports
/******/__w_pdfjs_require__.r=function(exports){/******/if(typeof Symbol!=='undefined'&&Symbol.toStringTag){/******/Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});/******/}/******/Object.defineProperty(exports,'__esModule',{value:true});/******/};/******/})();/******/ /******/ /* webpack/runtime/node module decorator */ /******/(function(){/******/__w_pdfjs_require__.nmd=function(module){/******/module.paths=[];/******/if(!module.children)module.children=[];/******/return module;/******/};/******/})();/******/ /************************************************************************/var __webpack_exports__={};// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(function(){"use strict";var exports=__webpack_exports__;Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"WorkerMessageHandler",{enumerable:true,get:function get(){return _worker.WorkerMessageHandler;}});var _worker=__w_pdfjs_require__(1);var pdfjsVersion='2.10.377';var pdfjsBuild='156762c48';})();/******/return __webpack_exports__;/******/}());});