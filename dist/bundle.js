(()=>{"use strict";var e={426:(e,t,n)=>{n.d(t,{Z:()=>h});var r=n(81),o=n.n(r),i=n(645),a=n.n(i),c=n(667),s=n.n(c),l=new URL(n(164),n.b),d=new URL(n(509),n.b),u=new URL(n(873),n.b),p=a()(o()),f=s()(l),g=s()(d),m=s()(u);p.push([e.id,":root {\n  --background: #fbfefb;\n  --grid-background: #cacaca;\n  --grid-lines: #4b1a50;\n  --label-background: #00ff00;\n  --font-on-background: #010203;\n  --font-on-label: #010203;\n  --hit: #e25822;\n}\n\nbody,\nhtml {\n  background-color: var(--background);\n}\nh1 {\n  margin-bottom: 20px;\n}\n\n.container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.player {\n  display: flex;\n  justify-content: center;\n}\n.box {\n  height: 20px;\n  width: 20px;\n  border: 1px solid var(--grid-lines);\n  text-align: center;\n}\n\n.grid {\n  grid-area: 2 / 2 / 3 / 3;\n  display: flex;\n  flex-wrap: wrap;\n  position: relative;\n  width: 264px;\n  margin-left: auto;\n  margin-top: auto;\n  background-color: var(--grid-background);\n}\n\n.board {\n  display: grid;\n  grid-template-columns: 1fr 13fr;\n  grid-template-rows: 1fr 13fr;\n  background-color: var(--label-background);\n  width: 284px;\n  height: 284px;\n  border: 1px solid var(--grid-lines);\n}\n\n.gridlabeltop {\n  grid-area: 1/2/2/3;\n  display: flex;\n  grid-template-rows: repeat(12, 1fr);\n}\n\n.gridlabeltop > .box,\n.gridlabelleft > .box {\n  border: 1px dashed var(--grid-lines);\n}\n\n.gridlabelleft {\n  grid-area: 2/1/3/2;\n  display: flex;\n  flex-direction: column;\n  grid-template-rows: repeat(12, 1fr);\n}\n\n.occupiedalive {\n  background-color: var(--grid-lines);\n  background-image: url("+f+");\n}\n\n.occupiedhit {\n  background-color: var(--hit);\n  background: url("+g+");\n  background-size: contain;\n}\n\n.occupiedsunk {\n  background-color: var(--font-on-background);\n}\n\n.miss {\n  background: url("+m+");\n}\n\n#gamecontainer {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  gap: 50px;\n}\n\n#optioncontainer {\n  width: fit-content;\n  max-width: 250px;\n  padding: 25px;\n  background-color: var(--grid-background);\n}\n\n#bowcoords {\n  text-align: center;\n  margin: auto;\n}\n\n#explanation {\n  border: 1px solid var(--grid-lines);\n  padding-bottom: 15px;\n  margin-bottom: 10px;\n}\n\n#explanation ol {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n",""]);const h=p},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(a[s]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);r&&a[d[0]]||(void 0!==i&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=i),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),t.push(d))}},t}},667:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]|(%20)/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},a=[],c=0;c<e.length;c++){var s=e[c],l=r.base?s[0]+r.base:s[0],d=i[l]||0,u="".concat(l," ").concat(d);i[l]=d+1;var p=n(u),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)t[p].references++,t[p].updater(f);else{var g=o(f,r);r.byIndex=c,t.splice(c,0,{identifier:u,updater:g,references:1})}a.push(u)}return a}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var c=n(i[a]);t[c].references--}for(var s=r(e,o),l=0;l<i.length;l++){var d=n(i[l]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}i=s}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},164:(e,t,n)=>{e.exports=n.p+"32fe253d891610196fc7.svg"},509:(e,t,n)=>{e.exports=n.p+"c2321c4517bb9460d242.svg"},873:(e,t,n)=>{e.exports=n.p+"f5457199865cf8c177ab.svg"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.b=document.baseURI||self.location.href,n.nc=void 0,(()=>{var e=n(379),t=n.n(e),r=n(795),o=n.n(r),i=n(569),a=n.n(i),c=n(565),s=n.n(c),l=n(216),d=n.n(l),u=n(589),p=n.n(u),f=n(426),g={};g.styleTagTransform=p(),g.setAttributes=s(),g.insert=a().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=d(),t()(f.Z,g),f.Z&&f.Z.locals&&f.Z.locals;const m=function(){function e(e){let t,n;return e<12&&(t=e,n=0),e>=12&&e<24&&(n=1,t=e-12),e>=24&&e<36&&(n=2,t=e-24),e>=36&&e<48&&(n=3,t=e-36),e>=48&&e<60&&(n=4,t=e-48),e>=60&&e<72&&(n=5,t=e-60),e>=72&&e<84&&(n=6,t=e-72),e>=84&&e<96&&(n=7,t=e-84),e>=96&&e<108&&(n=8,t=e-96),e>=108&&e<120&&(n=9,t=e-108),e>=120&&e<132&&(n=10,t=e-120),e>=132&&e<144&&(n=11,t=e-132),[t,n]}function t(t){for(let n=0;n<144;n++){let o=document.createElement("div");o.classList.add("box");let i=e(n);o.id=`[${i[0]}-${i[1]}]`,"playergrid"===t.id&&(o.onclick=r),"enemygrid"===t.id&&o.addEventListener("click",(()=>{o.classList.contains("enemyoccupied")?o.classList.add("occupiedhit"):o.classList.add("miss")})),t.append(o)}}function n(e,t){for(let n=0;n<12;n++){let r=document.createElement("div");r.classList.add("box"),0==t&&(r.innerText=String.fromCharCode(65+n)),1==t&&(r.innerText=n+1),e.append(r)}}function r(e){let t=this.id.split("-").join(", ");return console.log(t),document.getElementById("bowcoords").innerText=t,t}const o=document.getElementById("enemygrid"),i=document.getElementById("enemylabeltop"),a=document.getElementById("enemylabelleft");return{displayGrid:t,displayLabels:n,makeEnemyBoard:function(){t(o),n(i,0),n(a,1)},makePlayerBoard:function(){const e=document.getElementById("playergrid"),t=document.getElementById("playerlabeltop"),n=document.getElementById("playerlabelleft");m.displayGrid(e),m.displayLabels(t,0),m.displayLabels(n,1)}}}(),h=m;function y(){this.grid=Array(12).fill(null).map((()=>Array(12).fill(0))),this.occupiedList={carrier:[],battleship:[],destroyer:[],submarine:[],patrolboat:[]},this.hitList={carrier:[],battleship:[],destroyer:[],submarine:[],patrolboat:[]},this.missList=[],this.positionBoats=function(e,t,n){let r,o=[],i=!1;const a="Error: Off the map",c="Error: Overlapping boats";switch(e){case"carrier":r=5;break;case"battleship":r=4;break;case"destroyer":case"submarine":r=3;break;case"patrolboat":r=2}if("vertical"===n){if(t[1]+r>12)return[a,!0];for(let e=0;e<r;e++){if(!0===this.checkCoord([t[0],t[1]+e])[1])return i=!0,[c,i];o.push([t[0],t[1]+e])}}if("horizontal"===n){if(t[0]+r>12)return[a,i];for(let e=0;e<r;e++){if(!0===this.checkCoord([t[0]+e,t[1]])[1])return i=!0,[c,i];o.push([t[0]+e,t[1]])}}if(i)return this.occupiedList[e]=[],!1;this.occupiedList[e]=o},this.checkCoord=function(e){let t=JSON.stringify(e);for(let n in this.occupiedList)if(-1!=JSON.stringify(this.occupiedList[n]).indexOf(t))return[e,!0,n];return[e,!1]},this.recieveAttack=function(e,t){let n=JSON.stringify(e),r=JSON.stringify(this.occupiedList[t]),o=JSON.stringify(this.hitList[t]).indexOf(n),i=r.indexOf(n);return-1==o&&(-1!=i?(console.log("Hit"),this.hitList[t].push(e),!0):(this.missList.push(e),!1))},this.hpCheck=function(e){return this.occupiedList[e].length===this.hitList[e].length},this.boardStatus=function(){return JSON.stringify(this.hitList)===JSON.stringify(this.occupiedList)},this.report=function(){return[this.occupiedList,this.hitList]}}const b=function(){return new y},v=(()=>{const e=b();function t(){let e=Math.random();return e<.5?(console.log("vertical"),"vertical"):e>=.5?(console.log("horizontal"),"horizontal"):void 0}const n=b();return document.getElementById("enemygrid").addEventListener("click",(()=>{e.boardStatus()})),{playerboard:n,enemyboard:e,activateEnemyCells:function(){let t=e.occupiedList,n=[];for(let e in t)for(let r=0;r<t[e].length;r++)n.push(JSON.stringify(t[e][r]).split(",").join("-"));for(let e=0;e<n.length;e++)document.getElementById(n[e]).classList.add("enemyoccupied")},startGame:function(){!function(){for(let n in e.occupiedList)for(;0==e.occupiedList[n].length;)e.positionBoats(n,[Math.floor(11*Math.random()),Math.floor(11*Math.random())],t())}()},resetGame:function(){for(let t in e.occupiedList)e.occupiedList[t]=[]}}})(),x=v,L=(()=>{function e(e){e.classList.add("occupiedalive")}return{colorBoard:function(t){const n=document.querySelectorAll("#playergrid .box");for(let r=0;r<n.length;r++){let o=n[r].id.split("-").join(",");for(let i=0;i<5;i++)o==JSON.stringify(t[i])&&e(n[r])}},getShipType:function(){return document.getElementById("ships").value},getCoordinates:function(){return JSON.parse(document.getElementById("bowcoords").innerHTML)},getOrientation:function(){return document.querySelector("input[name='orientation']:checked").value},occupy:e}})();h.makePlayerBoard();const k=x.enemyboard,E=x.playerboard,w=document.getElementById("start"),B=document.getElementById("enemygrid"),S=document.getElementById("enemylabeltop"),I=document.getElementById("enemylabelleft");w.addEventListener("click",(()=>{x.resetGame(),B.replaceChildren(),S.replaceChildren(),I.replaceChildren(),h.makeEnemyBoard(),x.startGame(),x.activateEnemyCells(),console.log(k.report()[0])}));const C=document.getElementById("submit"),O=document.getElementById("ships");C.addEventListener("click",(()=>{let e=L.getShipType(),t=L.getOrientation(),n=L.getCoordinates();if(E.positionBoats(e,n,t))return!1;E.positionBoats(e,n,t),console.log(E.occupiedList),L.colorBoard(E.report()[0][e]),O[O.selectedIndex].remove()}))})()})();