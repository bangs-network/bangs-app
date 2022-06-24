/*! For license information please see 6181.23df76c1.chunk.js.LICENSE.txt */
"use strict";(globalThis.webpackChunkbangs_app=globalThis.webpackChunkbangs_app||[]).push([[6181,7368,8855],{7368:(t,e,i)=>{i.r(e),i.d(e,{a:()=>r,b:()=>a,c:()=>o,d:()=>c,h:()=>s});var n={getEngine:function(){var t=window;return t.TapticEngine||t.Capacitor&&t.Capacitor.isPluginAvailable("Haptics")&&t.Capacitor.Plugins.Haptics},available:function(){return!!this.getEngine()},isCordova:function(){return!!window.TapticEngine},isCapacitor:function(){return!!window.Capacitor},impact:function(t){var e=this.getEngine();if(e){var i=this.isCapacitor()?t.style.toUpperCase():t.style;e.impact({style:i})}},notification:function(t){var e=this.getEngine();if(e){var i=this.isCapacitor()?t.style.toUpperCase():t.style;e.notification({style:i})}},selection:function(){this.impact({style:"light"})},selectionStart:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},o=function(){n.selection()},r=function(){n.selectionStart()},a=function(){n.selectionChanged()},s=function(){n.selectionEnd()},c=function(t){n.impact(t)}},66181:(t,e,i)=>{i.r(e),i.d(e,{ion_picker_column_internal:()=>l});var n=i(29388),o=i(35785),r=i(17923),a=i(19069),s=i(7368),c=i(68855),l=function(){function t(t){var e=this;(0,o.r)(this,t),this.ionChange=(0,o.e)(this,"ionChange",7),this.hapticsStarted=!1,this.isColumnVisible=!1,this.isActive=!1,this.items=[],this.color="primary",this.numericInput=!1,this.centerPickerItemInView=function(t,i){void 0===i&&(i=!0);var n=e,o=n.el;if(n.isColumnVisible){var r=t.offsetTop-3*t.clientHeight+t.clientHeight/2;o.scrollTop!==r&&o.scroll({top:r,left:0,behavior:i?"smooth":void 0})}},this.inputModeChange=function(t){if(e.numericInput){var i=t.detail,n=i.useInputMode,o=i.inputModeColumn,r=void 0===o||o===e.el;e.isActive=!(!n||!r)}},this.initializeScrollListener=function(){var t,i=e.el,n=e.activeItem,o=function(){(0,a.r)((function(){t&&(clearTimeout(t),t=void 0),e.hapticsStarted||((0,s.a)(),e.hapticsStarted=!0);var o=i.getBoundingClientRect(),r=o.x+o.width/2,a=o.y+o.height/2,c=i.shadowRoot.elementFromPoint(r,a);null!==n&&n.classList.remove(p),c!==n&&(0,s.b)(),n=c,c.classList.add(p),t=setTimeout((function(){var t=c.getAttribute("data-index");if(null!==t){var i=parseInt(t,10),n=e.items[i];n.value!==e.value&&(e.setValue(n.value),(0,s.h)(),e.hapticsStarted=!1)}}),250)}))};(0,a.r)((function(){i.addEventListener("scroll",o),e.destroyScrollListener=function(){i.removeEventListener("scroll",o)}}))}}return t.prototype.valueChange=function(){this.isColumnVisible&&this.scrollActiveItemIntoView()},t.prototype.componentWillLoad=function(){var t=this;new IntersectionObserver((function(e){var i;if(e[0].isIntersecting){t.isColumnVisible=!0;var n=(0,a.g)(t.el).querySelector(".".concat(p));null===n||void 0===n||n.classList.remove(p),t.scrollActiveItemIntoView(),null===(i=t.activeItem)||void 0===i||i.classList.add(p),t.initializeScrollListener()}else t.isColumnVisible=!1,t.destroyScrollListener&&(t.destroyScrollListener(),t.destroyScrollListener=void 0)}),{threshold:.01}).observe(this.el);var e=this.el.closest("ion-picker-internal");null!==e&&e.addEventListener("ionInputModeChange",(function(e){return t.inputModeChange(e)}))},t.prototype.componentDidRender=function(){var t,e=this,i=e.activeItem,n=e.items,o=e.isColumnVisible,r=e.value;o&&(i?this.scrollActiveItemIntoView():(null===(t=n[0])||void 0===t?void 0:t.value)!==r&&this.setValue(n[0].value))},t.prototype.scrollActiveItemIntoView=function(){return(0,n.mG)(this,void 0,void 0,(function(){var t;return(0,n.Jh)(this,(function(e){return(t=this.activeItem)&&this.centerPickerItemInView(t,!1),[2]}))}))},t.prototype.setValue=function(t){var e=this.items;this.value=t;var i=e.find((function(e){return e.value===t}));i&&this.ionChange.emit(i)},Object.defineProperty(t.prototype,"activeItem",{get:function(){return(0,a.g)(this.el).querySelector('.picker-item[data-value="'.concat(this.value,'"]'))},enumerable:!1,configurable:!0}),t.prototype.render=function(){var t,e=this,i=this,n=i.items,a=i.color,s=i.isActive,l=i.numericInput,p=(0,r.b)(this);return(0,o.h)(o.H,{tabindex:0,class:(0,c.c)(a,(t={},t[p]=!0,t["picker-column-active"]=s,t["picker-column-numeric-input"]=l,t))},(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),n.map((function(t,i){return(0,o.h)("div",{class:"picker-item","data-value":t.value,"data-index":i,onClick:function(t){e.centerPickerItemInView(t.target)}},t.text)})),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"))},Object.defineProperty(t.prototype,"el",{get:function(){return(0,o.i)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{value:["valueChange"]}},enumerable:!1,configurable:!0}),t}(),p="picker-item-active";l.style={ios:":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{height:34px;line-height:34px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty{scroll-snap-align:none}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}",md:":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{height:34px;line-height:34px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty{scroll-snap-align:none}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}:host .picker-item-active{color:var(--ion-color-base)}"}},68855:(t,e,i)=>{i.r(e),i.d(e,{c:()=>r,g:()=>a,h:()=>o,o:()=>c});var n=i(29388),o=function(t,e){return null!==e.closest(t)},r=function(t,e){var i;return"string"===typeof t&&t.length>0?Object.assign(((i={"ion-color":!0})["ion-color-".concat(t)]=!0,i),e):e},a=function(t){var e={};return function(t){return void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter((function(t){return null!=t})).map((function(t){return t.trim()})).filter((function(t){return""!==t})):[]}(t).forEach((function(t){return e[t]=!0})),e},s=/^[a-z][a-z0-9+\-.]*:/,c=function(t,e,i,o){return(0,n.mG)(void 0,void 0,void 0,(function(){var r;return(0,n.Jh)(this,(function(n){return null!=t&&"#"!==t[0]&&!s.test(t)&&(r=document.querySelector("ion-router"))?(null!=e&&e.preventDefault(),[2,r.push(t,i,o)]):[2,!1]}))}))}}}]);
//# sourceMappingURL=6181.23df76c1.chunk.js.map