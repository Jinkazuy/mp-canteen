(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me_faceUpLoad/me_faceUpLoad"],{"0601":function(e,t,n){},"3c2c":function(e,t,n){"use strict";(function(e){n("261b"),n("921b");c(n("66fd"));var t=c(n("92b4"));function c(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"3dc8":function(e,t,n){"use strict";var c,o=function(){var e=this,t=e.$createElement,c=(e._self._c,n("baa2"));e.$mp.data=Object.assign({},{$root:{m0:c}})},r=[];n.d(t,"b",function(){return o}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return c})},5713:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=i(n("a34a")),o=n("2f62"),r=i(n("8434")),u=n("9b39");function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,c,o,r,u){try{var i=e[r](u),a=i.value}catch(s){return void n(s)}i.done?t(a):Promise.resolve(a).then(c,o)}function s(e){return function(){var t=this,n=arguments;return new Promise(function(c,o){var r=e.apply(t,n);function u(e){a(r,c,o,u,i,"next",e)}function i(e){a(r,c,o,u,i,"throw",e)}u(void 0)})}}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},c=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(c=c.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),c.forEach(function(t){f(e,t,n[t])})}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(){return n.e("components/ksp-image-cutter/ksp-image-cutter").then(n.bind(null,"0276"))},p={data:function(){return{picSrcUrl:"",isPicCut:!1,PicCutMod:!1,upLoadFileURL:"",isFaceVb:!1}},onShow:function(){this.picSrcUrl="",this.isPicCut=!1,""!==this.store_userFaceVbURL&&(this.isFaceVb=!0,console.log("用户已进行了人脸识别, 图片地址↓"),console.log(this.store_userFaceVbURL))},methods:l({selPic:function(){var t=this;e.chooseImage({count:1,success:function(e){"chooseImage:ok"==e.errMsg&&(t.picSrcUrl=e.tempFilePaths[0],t.PicCutMod=!0)},fail:function(e){console.log(e)}})},subPci:function(){var t=s(c.default.mark(function t(){var n;return c.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log(this.picSrcUrl),t.next=3,this.upLoadFild(this.picSrcUrl);case 3:n=t.sent,n?((0,r.default)("提交成功"),e.reLaunch({url:"../../pages/me_faceUpLoad_succ/me_faceUpLoad_succ",complete:function(e){console.log(e)}})):((0,r.default)("提交失败，请重新尝试"),this.picSrcUrl="",this.isPicCut=!1,this.PicCutMod=!1);case 5:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),onok:function(e){this.picSrcUrl=e.path,this.PicCutMod=!1,this.isPicCut=!0},oncancle:function(){this.picSrcUrl="",this.isPicCut=!1,this.PicCutMod=!1},upLoadFild:function(t){var n=this;return new Promise(function(){var o=s(c.default.mark(function o(r,i){return c.default.wrap(function(c){while(1)switch(c.prev=c.next){case 0:e.uploadFile({url:u.url_putUserFacePic,filePath:t,name:"file",header:{"content-type":"multipart/form-data"},success:function(e){if(console.log(e),200===e.statusCode){var t=JSON.parse(e.data);console.log("json转数组"),console.log(t),0==t.code?(n.upLoadFileURL="",n.upLoadFileURL=u.url_getHomeBannerListRes+t.filePath,n.setUserFaceVbURL(n.upLoadFileURL),console.log("图片预览地址↓"),console.log(n.store_userFaceVbURL),n.isFaceVb=!0,r(!0)):r(!1)}else r(!1)},fail:function(e){console.log(e),r(!1)}});case 1:case"end":return c.stop()}},o,this)}));return function(e,t){return o.apply(this,arguments)}}())}},(0,o.mapMutations)(["setUserFaceVbURL"])),components:{kpsImageCutter:d},computed:l({},(0,o.mapGetters)(["store_token","store_userFaceVbURL"]))};t.default=p}).call(this,n("543d")["default"])},5920:function(e,t,n){"use strict";var c=n("0601"),o=n.n(c);o.a},"92b4":function(e,t,n){"use strict";n.r(t);var c=n("3dc8"),o=n("fc46");for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);n("5920");var u,i=n("f0c5"),a=Object(i["a"])(o["default"],c["b"],c["c"],!1,null,null,null,!1,c["a"],u);t["default"]=a.exports},fc46:function(e,t,n){"use strict";n.r(t);var c=n("5713"),o=n.n(c);for(var r in c)"default"!==r&&function(e){n.d(t,e,function(){return c[e]})}(r);t["default"]=o.a}},[["3c2c","common/runtime","common/vendor"]]]);