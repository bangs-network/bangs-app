/*! For license information please see 9691.5c632984.chunk.js.LICENSE.txt */
"use strict";(globalThis.webpackChunkbangs_app=globalThis.webpackChunkbangs_app||[]).push([[9691],{89691:(e,t,i)=>{i.r(t),i.d(t,{KEYBOARD_DID_CLOSE:()=>o,KEYBOARD_DID_OPEN:()=>n,copyVisualViewport:()=>y,keyboardDidClose:()=>g,keyboardDidOpen:()=>p,keyboardDidResize:()=>b,resetKeyboardAssist:()=>d,setKeyboardClose:()=>c,setKeyboardOpen:()=>f,startKeyboardAssist:()=>u,trackViewportChanges:()=>v});var n="ionKeyboardDidShow",o="ionKeyboardDidHide",a={},r={},s=!1,d=function(){a={},r={},s=!1},u=function(e){h(e),e.visualViewport&&(r=y(e.visualViewport),e.visualViewport.onresize=function(){v(e),p()||b(e)?f(e):g(e)&&c(e)})},h=function(e){e.addEventListener("keyboardDidShow",(function(t){return f(e,t)})),e.addEventListener("keyboardDidHide",(function(){return c(e)}))},f=function(e,t){w(e,t),s=!0},c=function(e){l(e),s=!1},p=function(){var e=(a.height-r.height)*r.scale;return!s&&a.width===r.width&&e>150},b=function(e){return s&&!g(e)},g=function(e){return s&&r.height===e.innerHeight},w=function(e,t){var i=t?t.keyboardHeight:e.innerHeight-r.height,o=new CustomEvent(n,{detail:{keyboardHeight:i}});e.dispatchEvent(o)},l=function(e){var t=new CustomEvent(o);e.dispatchEvent(t)},v=function(e){a=Object.assign({},r),r=y(e.visualViewport)},y=function(e){return{width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale}}}}]);
//# sourceMappingURL=9691.5c632984.chunk.js.map