(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/stallsPage/goodsScroll"],{

/***/ 363:
/*!****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/components/stallsPage/goodsScroll.vue ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _goodsScroll_vue_vue_type_template_id_09ffd6aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./goodsScroll.vue?vue&type=template&id=09ffd6aa& */ 364);
/* harmony import */ var _goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goodsScroll.vue?vue&type=script&lang=js& */ 366);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _goodsScroll_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./goodsScroll.vue?vue&type=style&index=0&lang=stylus& */ 368);
/* harmony import */ var _L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _goodsScroll_vue_vue_type_template_id_09ffd6aa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _goodsScroll_vue_vue_type_template_id_09ffd6aa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _goodsScroll_vue_vue_type_template_id_09ffd6aa___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

/* hot reload */
if (false) { var api; }
component.options.__file = "J:/homeWorkFile/canteen-mp-new/components/stallsPage/goodsScroll.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 364:
/*!***********************************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/components/stallsPage/goodsScroll.vue?vue&type=template&id=09ffd6aa& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_template_id_09ffd6aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goodsScroll.vue?vue&type=template&id=09ffd6aa& */ 365);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_template_id_09ffd6aa___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_template_id_09ffd6aa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_template_id_09ffd6aa___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_template_id_09ffd6aa___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 365:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!J:/homeWorkFile/canteen-mp-new/components/stallsPage/goodsScroll.vue?vue&type=template&id=09ffd6aa& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 366:
/*!*****************************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/components/stallsPage/goodsScroll.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goodsScroll.vue?vue&type=script&lang=js& */ 367);
/* harmony import */ var _L_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_L_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _L_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _L_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_L_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 367:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!J:/homeWorkFile/canteen-mp-new/components/stallsPage/goodsScroll.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var goodsCardItems = function goodsCardItems() {return __webpack_require__.e(/*! import() | components/stallsPage/goodsScroll-Card */ "components/stallsPage/goodsScroll-Card").then(__webpack_require__.bind(null, /*! @/components/stallsPage/goodsScroll-Card.vue */ 398));};var _default =




































































{
  data: function data() {
    return {

      // Mock
      // 商品分类
      mockData: {
        goodsCategoryList: [
        {
          title: '折扣优惠折扣优惠折扣优惠折扣优惠',
          goodsInfoList: [
          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '暖心单人套餐暖心单人套餐暖心单人套餐暖心单人套餐',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '暖心单人套餐暖心单人套餐暖心单人套餐暖心单人套餐',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '暖心单人套餐暖心单人套餐暖心单人套餐暖心单人套餐',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '暖心单人套餐暖心单人套餐暖心单人套餐暖心单人套餐',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 }] },



        {
          title: '必点',
          goodsInfoList: [
          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '必点',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '必点',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 }] },



        {
          title: '套餐',
          goodsInfoList: [
          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '套餐',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 }] },



        {
          title: '主食',
          goodsInfoList: [
          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '主食',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '必点',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '主食',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '必点',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '主食',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '必点',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 }] },



        {
          title: '饮料',
          goodsInfoList: [
          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '饮料',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 }] },



        {
          title: '饮料',
          goodsInfoList: [
          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '饮料',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '饮料',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 },

          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '饮料',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 }] },



        {
          title: '饮料',
          goodsInfoList: [
          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '饮料',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 }] },



        {
          title: '饮料',
          goodsInfoList: [
          {
            goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
            goodsTitle: '饮料',
            goodsInfo: '拿铁1杯+香辣鸡翅2块',
            goodsSaleCount: 99,
            goodsPrice: 16.8 }] }] },






      // 用来计算左侧滚动类别按钮的索引和高度
      leftNenus: [
      {
        // 索引从1开始，第0个是 '全部' 这个按钮
        idx: 1,
        // 左侧DOM元素高度值，根据实际渲染的高度来获取，否则不同分辨率会出现偏差
        domHeight: 0,
        // 这个分类下，有几个商品
        // 单个商品卡片的高度是固定的(230rpx)，然后再加上一个分类的小横条(52rpx)
        // 就能计算出来右侧需要滚动到哪里了；
        goodsCount: 3

        // 那么，点击左侧的某个 分类按钮的时候，将
      }],


      // 右侧栏,每个分类的高度值
      RightCategoryBoxHeight: [],

      // 右侧栏每个分类栏的 绝对高度，如果是第2个那么就是 1分类+2分类 的高度，第3个就是1+2+3的高度
      allRightCategoryBoxHeight: [],

      // 当前被点击的左侧按钮的索引，用于熏染激活状态
      // 0-全部，1-第1个按钮(不包括全部)，以此类推
      currentLeftMenu: 0,


      // 设置左侧 scroll-view 的Y轴滚动位置
      leftScrollTop: 0,

      // 设置右侧 scroll-view 的Y轴滚动位置
      rightScrollTop: 0,

      // 右侧栏实时滚动位置
      rightScrollCurrentPosition: 0,


      scrollFlag: true };



  },
  // 熏染DOM后，可以获取DOM元素的属性
  // uni.createSelectorQuery()获取DOM元素属性
  // 那么在这里就可以获取 左边栏、右边栏初始的时候每个元素举例页面顶部的高度，
  // 然后需要滚动的时候，就减去上边其他的元素的高度，调用scroll-view设置滚动值的API即可；
  mounted: function mounted() {
    // 先获取右侧，再过去左侧，顺序别乱
    this.getRightMenuDatas();
    this.getLeftMenuDatas();
  },
  methods: {

    // 获取每个左侧栏标签按钮的索引和高度，关联起来
    getLeftMenuDatas: function getLeftMenuDatas() {var _this = this;

      // 先清空数据
      this.leftNenus = [];var _loop = function _loop(


      i) {

        // 每次循环的时候，先push一个对象，对象内容都是空的
        var objs = { idx: 0, domHeight: 0, goodsCount: 0 };
        _this.leftNenus.push(objs);

        var query = uni.createSelectorQuery().in(_this);
        // id的索引从1开始，所以i+1
        query.select('#menu-items-' + (i + 1)).boundingClientRect(function (data) {
          // console.log('左侧第 '+(i+1)+' 个按钮DOM↓')
          // console.log(data)
          _this.leftNenus[i].idx = i + 1;
          _this.leftNenus[i].domHeight = data.height; // 拿到左侧按钮的具体高度
          _this.leftNenus[i].goodsCount = _this.mockData.goodsCategoryList[i].goodsInfoList.length; // 拿到每个分类下商品数


          // console.log('左侧第-- ' + (i+1) + ' --个按钮计算的数据')
          // console.log(this.leftNenus[i])
          // console.log("得到布局位置信息" + JSON.stringify(data));
          // console.log("节点离页面顶部的距离为" + data.top);
        }).exec();};for (var i = 0; i < this.mockData.goodsCategoryList.length; i++) {_loop(i);
      }
    },

    // 获取右侧每个分类的高度值(分类标签+商品高度*商品个数) 和 绝对高度
    getRightMenuDatas: function getRightMenuDatas() {var _this2 = this;var _loop2 = function _loop2(
      i) {
        var query = uni.createSelectorQuery().in(_this2);
        // id的索引从1开始，所以i+1
        query.select('#category-items-' + (i + 1)).boundingClientRect(function (data) {

          _this2.RightCategoryBoxHeight[i] = data.height;
          // console.log("得到布局位置信息" + JSON.stringify(data));
          // console.log("节点离页面顶部的距离为" + data.top);
        }).exec();};for (var i = 0; i < this.mockData.goodsCategoryList.length; i++) {_loop2(i);
      }
      // console.log('右侧每个栏的高度↓')
      // console.log(this.RightCategoryBoxHeight)


      // 计算右侧每个栏的绝对高度
      clearTimeout(st);
      var st = setTimeout(function () {
        // 这里就来获取右侧每个栏的绝对高度
        // 如果是第2个那么就是 1分类+2分类 的高度，第3个就是1+2+3的高度
        // 所以这里循环相加
        for (var k = 0; k < _this2.RightCategoryBoxHeight.length; k++) {
          // 如果这里是0那么不会进入这个for
          // 如果是1，那么就应该用 1+0的值，
          // 那么此时1的值就是 1+0的和，那么2+1的话，就等于2+1+0的值了
          if (k === 0) {
            _this2.allRightCategoryBoxHeight[k] = _this2.RightCategoryBoxHeight[k];
          } else if (k >= 1) {
            _this2.allRightCategoryBoxHeight[k] = _this2.RightCategoryBoxHeight[k] + _this2.allRightCategoryBoxHeight[k - 1];
          }
        }

        // console.log('======右侧每个栏的决对高度↓===============')
        // console.log(this.allRightCategoryBoxHeight)
      }, 100);

    },

    // 点击左侧分类按钮，然后拿到在mounted钩子时获取到的左侧按钮计算后数据,
    // 使右侧栏滚动
    RightScrollTo: function RightScrollTo(idx) {var _this3 = this;

      // 先设置左侧按钮被点击的时的类，使其反白
      this.currentLeftMenu = idx;


      // 因为右侧滚动会影响左侧的激活类的反白渲染，所以这里在点击 1 秒后，再让右侧滚动影响左侧的开关打开
      this.scrollFlag = false;

      if (fst) {
        clearTimeout(fst);
      }
      var fst = setTimeout(function () {
        _this3.scrollFlag = true;
      }, 2000);




      // 这里的idx是从1开始的，左侧 '全部' 按钮，点击后是传过来 0

      // 那么这里拿到的就是被点击的按钮 经过计算 的属性，其中 this.leftNenus[idx].RightCategoryBoxHeight 就是右侧分类DOM的高度
      // 那么设置 <scroll-view> 的 scroll-top 属性即可
      // 这里还要除以2，因为是rpx渲染的

      // 滚动逻辑：
      if (idx === 0 || idx === 1) {
        // 如果是0，那么说明点击的是第一个分类或者、或者点击是全部按钮，那么直接将右侧列表滚动到顶部

        // 这里需要先错位1像素
        // 是因为：比如点击左侧第4个分类，然后右侧手动滑动，然后再点击第4个分类，rightScrollTop不会生效，因为rightScrollTop已经是那个值了
        this.rightScrollTop = this.rightScrollTop + 1;
        if (st) {
          clearTimeout(st);
        }
        var st = setTimeout(function () {
          _this3.rightScrollTop = 0;
          // console.log(this.rightScrollTop)
        }, 10);

      } else {
        // 因为传过来的idx是从1开始的，那么点击第2个按钮的时候，就该拿到右侧栏的第1个元素的绝对高度
        // console.log('绝对高度'+this.allRightCategoryBoxHeight[idx-2])

        // 这里需要先错位1像素
        // 是因为：比如点击左侧第4个分类，然后右侧手动滑动，然后再点击第4个分类，rightScrollTop不会生效，因为rightScrollTop已经是那个值了
        this.rightScrollTop = this.rightScrollTop + 1;
        // console.log(this.rightScrollTop)
        if (_st) {
          clearTimeout(_st);
        }
        var _st = setTimeout(function () {
          _this3.rightScrollTop = _this3.allRightCategoryBoxHeight[idx - 2];
          // console.log(this.rightScrollTop)
        }, 10);

      }
    },

    // 右侧栏滚动时 实时 触发，用于获取右侧栏实时滚动Y轴位置
    rightScrollCurrent: function rightScrollCurrent(e) {
      // 飞快滚动时，会有BUG，获取不到精准的滚动Y轴位置
      // console.log(e.detail)
      this.rightScrollCurrentPosition = e.detail.scrollTop;
      // 那么这里根据右侧滚动栏的Y轴位置计算，当Y轴值大于xx的时候，左侧按钮设置激活类，并且让左侧栏滚动到顶部
      // this.allRightCategoryBoxHeight.length


      // 这里注意 i 从1
      if (this.scrollFlag === true) {
        for (var i = 1; i <= this.allRightCategoryBoxHeight.length; i++) {
          // 这里反向查找，如果找到最大的就停止for循环
          if (e.detail.scrollTop + 100 > this.allRightCategoryBoxHeight[this.allRightCategoryBoxHeight.length - i]) {
            this.currentLeftMenu = this.allRightCategoryBoxHeight.length - i + 2;
            break;

            // 因为有TM的一个 '全部按钮' 所以这里必须判断一下
          } else if (e.detail.scrollTop < 50 && e.detail.scrollTop >= 10) {
            this.currentLeftMenu = 1;
          } else if (e.detail.scrollTop < 10) {
            this.currentLeftMenu = 0;
          }
        }
      }
    },

    // 滚动到底部触发
    scrolltolower: function scrolltolower() {var _this4 = this;
      // 因为右侧滚动会影响左侧的激活类的反白渲染，所以这里在点击 1 秒后，再让右侧滚动影响左侧的开关打开
      this.scrollFlag = false;

      if (fst) {
        clearTimeout(fst);
      }
      var fst = setTimeout(function () {
        _this4.scrollFlag = true;
      }, 1000);
      console.log('---------------');
      this.currentLeftMenu = this.leftNenus.length;
    },


    // 点击每个卡片时，该子组件传回来的商品数据
    // 那么因为当前这个组件是滚动组件，所以还得传给父级，档口详情页面 stallsPage.vue 
    ckGoodsCard: function ckGoodsCard(CurrentClickGoodsInfo) {
      this.$emit('showgoodsmod', CurrentClickGoodsInfo);
    } },


  watch: {
    // 监听左侧按钮当前被激活的索引值，尽可能的让左侧滚动栏滚动可见位置,
    // 这是因为左侧栏可能栏目很多，也需要滚动
    currentLeftMenu: function currentLeftMenu(newVal, oldVal) {var _this5 = this;
      // 因为左侧栏的数量不多，所以就直接在这里循环计算了
      console.log(this.leftNenus.length);
      console.log('当前左侧' + newVal);

      // 这个newVal就是当前被点击的左侧按钮,基本上是按顺序 12345这么排列的
      // 所以循环这个newVal
      var scrollNum = 0;
      if (newVal === 0 || newVal === 1) {
        this.leftScrollTop = 1;
        if (std) {
          clearTimeout(std);
        }
        var std = setTimeout(function () {
          _this5.leftScrollTop = 0;
        }, 10);

      } else {
        for (var i = 0; i < newVal; i++) {
          scrollNum += this.leftNenus[i].domHeight;
          console.log('---' + scrollNum);
        }
        this.leftScrollTop = scrollNum - 1;
        if (_std) {
          clearTimeout(_std);
        }
        var _std = setTimeout(function () {
          // 这里本来应该把该元素放到左侧顶部的，但是前一个标签就看不到了，所以加一些举例
          _this5.leftScrollTop = scrollNum - 80;
        }, 10);
      }


      // leftNenus: [
      // 	{
      // 		// 索引从1开始，第0个是 '全部' 这个按钮
      // 		idx: 1,
      // 		// 左侧DOM元素高度值，根据实际渲染的高度来获取，否则不同分辨率会出现偏差
      // 		domHeight: 0,
      // 		// 这个分类下，有几个商品
      // 		// 单个商品卡片的高度是固定的(230rpx)，然后再加上一个分类的小横条(52rpx)
      // 		// 就能计算出来右侧需要滚动到哪里了；
      // 		goodsCount: 3,

      // 		// 那么，点击左侧的某个 分类按钮的时候，将
      // 	}
      // ],

      console.log(newVal);
    } },

  components: {
    goodsCardItems: goodsCardItems } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 368:
/*!****************************************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/components/stallsPage/goodsScroll.vue?vue&type=style&index=0&lang=stylus& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_1_L_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_11_oneOf_1_2_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_L_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_L_HBuilderX_plugins_uniapp_cli_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_5_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--11-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-1-1!./node_modules/css-loader??ref--11-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--11-oneOf-1-3!./node_modules/stylus-loader??ref--11-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goodsScroll.vue?vue&type=style&index=0&lang=stylus& */ 369);
/* harmony import */ var _L_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_1_L_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_11_oneOf_1_2_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_L_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_L_HBuilderX_plugins_uniapp_cli_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_5_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_L_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_1_L_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_11_oneOf_1_2_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_L_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_L_HBuilderX_plugins_uniapp_cli_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_5_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _L_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_1_L_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_11_oneOf_1_2_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_L_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_L_HBuilderX_plugins_uniapp_cli_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_5_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _L_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_1_L_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_11_oneOf_1_2_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_L_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_L_HBuilderX_plugins_uniapp_cli_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_5_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_L_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_1_L_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_11_oneOf_1_2_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_L_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_L_HBuilderX_plugins_uniapp_cli_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_1_5_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_L_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goodsScroll_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 369:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--11-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-1-1!./node_modules/css-loader??ref--11-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--11-oneOf-1-3!./node_modules/stylus-loader??ref--11-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!J:/homeWorkFile/canteen-mp-new/components/stallsPage/goodsScroll.vue?vue&type=style&index=0&lang=stylus& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/stallsPage/goodsScroll.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/stallsPage/goodsScroll-create-component',
    {
        'components/stallsPage/goodsScroll-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(363))
        })
    },
    [['components/stallsPage/goodsScroll-create-component']]
]);
