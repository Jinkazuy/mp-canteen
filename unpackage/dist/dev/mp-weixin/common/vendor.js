(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = {
    multipleSlots: true,
    addGlobalClass: true };


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    } else {
      console.error(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/pages.json ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 5 */
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@alpha","_id":"@dcloudio/uni-stat@2.0.0-alpha-25120200103005","_inBundle":false,"_integrity":"sha512-nYoIrRV2e5o/vzr6foSdWi3Rl2p0GuO+LPY3JctyY6uTKgPnuH99d7aL/QQdJ1SacQjBWO+QGK1qankN7oyrWw==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@alpha","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"alpha","saveSpec":null,"fetchSpec":"alpha"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-alpha-25120200103005.tgz","_shasum":"a77a63481f36474f3e86686868051219d1bb12df","_spec":"@dcloudio/uni-stat@alpha","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"6be187a3dfe15f95dd6146d9fec08e1f81100987","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-alpha-25120200103005"};

/***/ }),
/* 7 */
/*!******************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/pages.json?{"type":"style"} ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "智慧食堂", "enablePullDownRefresh": true, "onReachBottomDistance": 50 }, "pages/order/order": { "navigationBarTitleText": "订单", "enablePullDownRefresh": true, "onReachBottomDistance": 50 }, "pages/order_detail/order_detail": { "navigationBarTitleText": "订单详情" }, "pages/order_evaluate/order_evaluate": { "navigationBarTitleText": "评价" }, "pages/me/me": { "navigationBarTitleText": "我的" }, "pages/me_balance/me_balance": { "navigationBarTitleText": "余额" }, "pages/me_cash_withdrawal/me_cash_withdrawal": { "navigationBarTitleText": "提现" }, "pages/me_cash_withdrawal_process/me_cash_withdrawal_process": { "navigationBarTitleText": "提现" }, "pages/me_recharge/me_recharge": { "navigationBarTitleText": "充值" }, "pages/me_recharge_record/me_recharge_record": { "navigationBarTitleText": "充值记录" }, "pages/me_userInfo/me_userInfo": { "navigationBarTitleText": "个人信息" }, "pages/me_userInfo_editIdentity/me_userInfo_editIdentity": { "navigationBarTitleText": "选择人员类别" }, "pages/me_userInfo_editUserIdCard/me_userInfo_editUserIdCard": { "navigationBarTitleText": "填写员工编号" }, "pages/me_userAddrs/me_userAddrs": { "navigationBarTitleText": "我的地址" }, "pages/me_userAddrs_edit/me_userAddrs_edit": { "navigationBarTitleText": "修改地址" }, "pages/me_feedback/me_feedback": { "navigationBarTitleText": "我的地址" }, "pages/me_editUserPhone/me_editUserPhone": { "navigationBarTitleText": "我的地址" }, "pages/search/search": { "navigationBarTitleText": "搜索" }, "pages/location/location": { "navigationBarTitleText": "定位" }, "pages/banner-detail/banner-detail": { "navigationBarTitleText": "banner详情页" }, "pages/notice-detail/notice-detail": { "navigationBarTitleText": "公告详情页" }, "pages/canteen-list-page/canteen-list-page": { "navigationBarTitleText": "档口列表" }, "pages/stallsPage/stallsPage": { "navigationBarTitleText": "档口详情", "disableScroll": true }, "pages/confirmationOrder/confirmationOrder": { "navigationBarTitleText": "确认订单", "disableScroll": true }, "pages/succOrder/succOrder": { "navigationBarTitleText": "支付成功" }, "pages/login/login": { "navigationBarTitleText": "登录" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#fff", "backgroundColor": "#fff" } };exports.default = _default;

/***/ }),
/* 8 */
/*!*****************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/pages.json?{"type":"stat"} ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__B9432F8" };exports.default = _default;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    options.components = Object.assign(components, options.components || {})
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 15 */
/*!*****************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/store/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 16));



var actions = _interopRequireWildcard(__webpack_require__(/*! ./actions */ 17));


var getters = _interopRequireWildcard(__webpack_require__(/*! ./getters */ 18));


var _state = _interopRequireDefault(__webpack_require__(/*! ./state */ 19));


var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations */ 20));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 其他文件，最终都是引入到这个文件当中，然后这个文件在main.js中引入，相当于store.js；
// 载入Vuex，记得安装；
// 这个文件的作用是，如果需要对mutations.js中进行多次、复杂等操作时，
// 就将函数封装到actions.js文件中，而不是在mutation.js封装方法；
// 对外提供数据
// 定义数据
// 修改state中的数据，只能通过mutations中的函数修改
// 修改日志，记录了每次修改state中数据的记录
// import createLogger from 'vuex/dist/logger'
// 挂载
_vue.default.use(_vuex.default); // 用于报错的设置；会占用内容，在生产环境时候将其注释掉
// 开发模式下可以打开，用于检查bug
var debug = "development" !== 'production';var _default = new _vuex.default.Store({
  // 将引入的文件都挂载
  actions: actions,
  getters: getters,
  state: _state.default,
  mutations: _mutations.default,
  strict: debug
  // plugins: debug ? [createLogger()] : []
});exports.default = _default;

/***/ }),
/* 16 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 17 */
/*!*******************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/store/actions.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.setUserInfo = void 0; // 这个actions.js文件作用，是在多次操作mutation中的函数时用到；
// 涉及到复杂操作的时候，都用这个文件中写逻辑，操作mutations.js中的函数，从而修改state.js中的内容；

// 参数1对象中的 第1个变量，接收的是mutations中的函数
// 参数1对象中的 第2个变量，接收的是state中的数据，因为最终都有store/index.js引入所有文件
// 所以这个action.js中的变量也能够直接拿到state.js、mutations.js等文件中的函数、数据等；

// 参数2对象中的 第1个变量，接收的是调用这个方法时传进来的参数
// 参数2对象中的 第2个变量，接收的是嗲用这个方法时传进来的参数
// 示例↓
var setUserInfo = function setUserInfo(_ref, _ref2) {var commit = _ref.commit,state = _ref.state;var list = _ref2.list,index = _ref2.index;
  // 因为最终都汇总到了store/index.js中，所以actions.js和mutations.js是可以相互访问的，
  // 所以这个commit就是调用mutations.js中的方法，第一个参数是方法名，
  // 就类似于在其他.vue文件中使用this.$store.commit.xxx(fnName, xx)
  // 方法名还是用mutation-types中的字符串来命名，得到统一性，
  // 第二个参数就是mutations.js中某个方法的形参，具体还得看mutations.js中该方法需要传入的是什么；

  // 调用mutations.js中的SET_SEQUENCE_LIST方法，将歌曲列表传入；
  // 第一个参数是mutations下的函数名，第二个则是传给第一个参数的一些数值；
  commit(types.SET_SEQUENCE_LIST, list);
  // 判断播放模式，如果当前播放模式等于随机播放，也就是2 的时候；
  if (state.mode === playMode.random) {
    // 那么调用洗牌函数，得到随机播放列表；
    var randomList = shuffle(list);
    // 并且将随机播放列表设置为当前播放列表
    commit(types.SET_PLAYLIST, randomList);
    // 然后调用 找到在随机播放列中，当前歌曲的索引 的函数；
    index = findIndex(randomList, list[index]);
  } else {
    // 顺序播放
    commit(types.SET_PLAYLIST, list);
  }
  // 设置当前歌曲索引
  commit(types.SET_CURRENT_INDEX, index);
  // 打开播放器：打开
  commit(types.SET_FULL_SCREEN, true);
  // 播放器状态：播放
  commit(types.SET_PLAYING_STATE, true);
};exports.setUserInfo = setUserInfo;

/***/ }),
/* 18 */
/*!*******************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/store/getters.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.store_ttt = exports.store_ballXY = exports.store_orderData = exports.store_homeCanteenList = exports.store_homeNotiInfo = exports.store_homeBannerList = exports.store_userIdentity = exports.store_tokenExpiration = exports.store_token = exports.store_UserPhone = exports.store_UserInfoData = exports.store_UserInfo = void 0; // 这里的 getters， 只负责 将state中的数据，对外提供展示数据，
// 向外导出数据，只能展示不能修改；

// 用户信息(不含敏感信息)
var store_UserInfo = function store_UserInfo(state) {return state.store_UserInfo;};

// 用户详细数据,包后台数据表中的数据;
exports.store_UserInfo = store_UserInfo;var store_UserInfoData = function store_UserInfoData(state) {return state.store_UserInfoData;};

// 手机号
exports.store_UserInfoData = store_UserInfoData;var store_UserPhone = function store_UserPhone(state) {return state.store_UserPhone;};

// token
exports.store_UserPhone = store_UserPhone;var store_token = function store_token(state) {return state.store_token;};
// token 过期时间
exports.store_token = store_token;var store_tokenExpiration = function store_tokenExpiration(state) {return state.store_tokenExpiration;};

// token 过期时间
exports.store_tokenExpiration = store_tokenExpiration;var store_userIdentity = function store_userIdentity(state) {return state.store_UserInfoData.identity;};

// 首页banner列表
exports.store_userIdentity = store_userIdentity;var store_homeBannerList = function store_homeBannerList(state) {return state.store_homeBannerList;};

// 首页公告
exports.store_homeBannerList = store_homeBannerList;var store_homeNotiInfo = function store_homeNotiInfo(state) {return state.store_homeNotiInfo;};

// 首页餐厅列表
exports.store_homeNotiInfo = store_homeNotiInfo;var store_homeCanteenList = function store_homeCanteenList(state) {return state.store_homeCanteenList;};

// 订单数据
exports.store_homeCanteenList = store_homeCanteenList;var store_orderData = function store_orderData(state) {return state.store_orderData;};


// 小功能:点击购物车的加号,将加号的XY左边传递给购物车bar，购物车bar先设置好几个固定的小球隐藏起来
exports.store_orderData = store_orderData;var store_ballXY = function store_ballXY(state) {return state.store_ballXY;};


// 暂时模拟购物车添加
exports.store_ballXY = store_ballXY;var store_ttt = function store_ttt(state) {return state.ttt;};exports.store_ttt = store_ttt;

/***/ }),
/* 19 */
/*!*****************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/store/state.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  // 用户基本数据,不包含敏感信息;
  store_UserInfo: {
    avatarUrl: null,
    city: null,
    country: null,
    gender: null,
    language: null,
    nickName: null,
    province: null },

  // 用户详细数据,包后台数据表中的数据;
  store_UserInfoData: {
    address: '123', // 用户地址
    avatarUrl: null, // 头像imgURL
    birth: null, // 生日
    city: null, // 城市
    country: null, // 国家
    createTime: null, // 注册时间
    dataSort: null, // 数据排序
    email: null, // 邮箱
    gender: null, // 性别 1 | 0
    id: null, // 用户ID
    idCard: '123', // 当用户选择内部员工时必填
    isDelete: null, // 逻辑删除: 0:未删除 1:已删除
    language: null, // 语言
    mobile: null, // 手机号
    nickName: null, // 昵称
    openId: null, // string
    passwd: null, // 登录密码
    province: null, // 省份
    sessionKey: null, // 
    status: null, // 数据状态 0:正常  1:锁定
    unionId: null, // 
    updateTime: null, // 更新时间: 2020-11-11 00:00:00
    userType: null // 用户类型 0:内部 1:外部 当外部用户时, 不需要绑定员工号
  },
  // 用户登录后,后台返回的token值,用于每次发送请求时判断用户是否属于后台真的登录状态;
  store_token: '', // token过期时间由后台订, 在http_login_setToken时获取过期时间,然后在util的isLogin中判断是否过期
  store_tokenExpiration: '', // 过期时间

  // 首页banner
  store_homeBannerList: {},

  // 首页公告
  store_homeNotiInfo: {},

  // 首页餐厅列表
  store_homeCanteenList: [],

  // 订单数据
  store_orderData: [],

  // 小功能:点击购物车的加号,将加号的XY左边传递给购物车bar，购物车bar先设置好几个固定的小球隐藏起来
  store_ballXY: { x: 0, y: 0 },

  // 暂时模拟购物车添加
  ttt: 0,

  // ========= 立魏发来的数据字段(订单) ===========
  orderDatas: [// 这个orderDatas是JK起的
  // 每个订单是一个对象
  {
    // 订单ID
    orderId: null, // string
    // 档口ID
    staid: null, // string
    // 食堂ID
    cafId: null, // string
    // 餐别ID
    cid: null, // string
    // 菜品名称
    cname: null, // string
    // 菜品数量
    number: null, // string
    // 菜品总数量
    count: null, // string
    // 菜品总价
    total: null, // string
    // 下单时间
    ordertime: null, // bigDecimal
    // 取餐码
    mealcode: null, // string
    // 订单状态
    code: 0, // string
    // 订单状态中文
    codename: '' // string
  }] };var _default =






state;exports.default = _default;

/***/ }),
/* 20 */
/*!*********************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/store/mutations.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // matutaions负责修改state中的数据
// 如果是复杂的操作，那么就需要用actions.js来操作 matutaions 中的函数，
// 但是，不能在 actions.js 直接操作 state ，
// 只能由actions操作matutaions，从而操作state中的数据
var matutaions = {
  // 设置用户信息(不包含敏感数据)
  setUserInfo: function setUserInfo(state, userInfo) {
    state.store_UserInfo = userInfo;
  },
  // 设置用户手机号
  setUserPhone: function setUserPhone(state, userPhone) {
    state.store_UserInfoData.mobile = userPhone;
  },
  // 设置token
  setToken: function setToken(state, storeToken) {
    state.store_token = storeToken;
  },
  // 设置用户详细数据
  setUserInfoData: function setUserInfoData(state, data) {
    state.store_UserInfoData = data;
  },
  // 设置token过期时间(毫秒数)
  setTokenExpiration: function setTokenExpiration(state, expiration) {
    state.store_tokenExpiration = expiration;
  },
  // 设置首页banner列表
  setHomeBannerList: function setHomeBannerList(state, bannerList) {
    state.store_homeBannerList = bannerList;
  },
  // 设置首页公告
  setHomeNotiInfo: function setHomeNotiInfo(state, notiInfo) {
    state.store_homeNotiInfo = notiInfo;
  },
  // 设置首页餐厅列表
  setHomeCanteenList: function setHomeCanteenList(state, canteenList) {
    state.store_homeCanteenList = canteenList;
  },
  // 设置用户身份
  setUserIdentity: function setUserIdentity(state, identity) {
    state.store_UserInfoData.userType = identity;
  },
  // 设置 订单数据
  setOrderData: function setOrderData(state, orderData) {
    state.store_orderData = orderData;
  },
  // 小功能:点击购物车的加号,将加号的XY左边传递给购物车bar，购物车bar先设置好几个固定的小球隐藏起来
  setballXY: function setballXY(state, xyObj) {
    state.store_ballXY = xyObj;
  },
  // 暂时模拟购物车添加
  testAdd: function testAdd(state) {
    state.ttt += 1;
  },
  // 暂时模拟购物车添加
  testSub: function testSub(state) {
    if (state.ttt > 0) {
      state.ttt -= 1;
    }
  },
  // 暂时模拟清空购物车
  testClear: function testClear(state) {
    state.ttt = 0;
  } };



// 将 matutaions 导出，在store/index.js引入
var _default = matutaions;exports.default = _default;

/***/ }),
/* 21 */
/*!**************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/promise.prototype.finally/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! function-bind */ 22);
var define = __webpack_require__(/*! define-properties */ 24);

var implementation = __webpack_require__(/*! ./implementation */ 27);
var getPolyfill = __webpack_require__(/*! ./polyfill */ 38);
var shim = __webpack_require__(/*! ./shim */ 39);

var bound = bind.call(Function.call, getPolyfill());

define(bound, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim });


module.exports = bound;

/***/ }),
/* 22 */
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ 23);

module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 23 */
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),
/* 24 */
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(/*! object-keys */ 25);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),
/* 25 */
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ 26);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$applicationCache: true,
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 26 */
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 27 */
/*!***********************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/promise.prototype.finally/implementation.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requirePromise = __webpack_require__(/*! ./requirePromise */ 28);

requirePromise();

var IsCallable = __webpack_require__(/*! es-abstract/2018/IsCallable */ 29);
var SpeciesConstructor = __webpack_require__(/*! es-abstract/2018/SpeciesConstructor */ 31);
var Type = __webpack_require__(/*! es-abstract/2018/Type */ 36);

var promiseResolve = function PromiseResolve(C, value) {
  return new C(function (resolve) {
    resolve(value);
  });
};

var OriginalPromise = Promise;

var createThenFinally = function CreateThenFinally(C, onFinally) {
  return function (value) {
    var result = onFinally();
    var promise = promiseResolve(C, result);
    var valueThunk = function valueThunk() {
      return value;
    };
    return promise.then(valueThunk);
  };
};

var createCatchFinally = function CreateCatchFinally(C, onFinally) {
  return function (reason) {
    var result = onFinally();
    var promise = promiseResolve(C, result);
    var thrower = function thrower() {
      throw reason;
    };
    return promise.then(thrower);
  };
};

var promiseFinally = function finally_(onFinally) {
  /* eslint no-invalid-this: 0 */

  var promise = this;

  if (Type(promise) !== 'Object') {
    throw new TypeError('receiver is not an Object');
  }

  var C = SpeciesConstructor(promise, OriginalPromise); // may throw

  var thenFinally = onFinally;
  var catchFinally = onFinally;
  if (IsCallable(onFinally)) {
    thenFinally = createThenFinally(C, onFinally);
    catchFinally = createCatchFinally(C, onFinally);
  }

  return promise.then(thenFinally, catchFinally);
};

if (Object.getOwnPropertyDescriptor) {
  var descriptor = Object.getOwnPropertyDescriptor(promiseFinally, 'name');
  if (descriptor && descriptor.configurable) {
    Object.defineProperty(promiseFinally, 'name', { configurable: true, value: 'finally' });
  }
}

module.exports = promiseFinally;

/***/ }),
/* 28 */
/*!***********************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/promise.prototype.finally/requirePromise.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function requirePromise() {
  if (typeof Promise !== 'function') {
    throw new TypeError('`Promise.prototype.finally` requires a global `Promise` be available.');
  }
};

/***/ }),
/* 29 */
/*!**********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/es-abstract/2018/IsCallable.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://www.ecma-international.org/ecma-262/5.1/#sec-9.11

module.exports = __webpack_require__(/*! is-callable */ 30);

/***/ }),
/* 30 */
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};


/***/ }),
/* 31 */
/*!******************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/es-abstract/2018/SpeciesConstructor.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ 32);

var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var IsConstructor = __webpack_require__(/*! ./IsConstructor */ 35);
var Type = __webpack_require__(/*! ./Type */ 36);

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

module.exports = function SpeciesConstructor(O, defaultConstructor) {
  if (Type(O) !== 'Object') {
    throw new $TypeError('Assertion failed: Type(O) is not Object');
  }
  var C = O.constructor;
  if (typeof C === 'undefined') {
    return defaultConstructor;
  }
  if (Type(C) !== 'Object') {
    throw new $TypeError('O.constructor is not an Object');
  }
  var S = $species ? C[$species] : void 0;
  if (S == null) {
    return defaultConstructor;
  }
  if (IsConstructor(S)) {
    return S;
  }
  throw new $TypeError('no constructor found');
};

/***/ }),
/* 32 */
/*!*******************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/es-abstract/GetIntrinsic.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals
              	Atomics,
              	SharedArrayBuffer,
              */

var undefined;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
  try {
    $gOPD({}, '');
  } catch (e) {
    $gOPD = null; // this is IE 8, which has a broken gOPD
  }
}

var throwTypeError = function throwTypeError() {throw new $TypeError();};
var ThrowTypeError = $gOPD ?
function () {
  try {
    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
    arguments.callee; // IE 8 does not throw here
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
      return $gOPD(arguments, 'callee').get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() :
throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ 33)();

var getProto = Object.getPrototypeOf || function (x) {return x.__proto__;}; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
  '%Array%': Array,
  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
  '%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
  '%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
  '%ArrayPrototype%': Array.prototype,
  '%ArrayProto_entries%': Array.prototype.entries,
  '%ArrayProto_forEach%': Array.prototype.forEach,
  '%ArrayProto_keys%': Array.prototype.keys,
  '%ArrayProto_values%': Array.prototype.values,
  '%AsyncFromSyncIteratorPrototype%': undefined,
  '%AsyncFunction%': asyncFunction,
  '%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
  '%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
  '%AsyncGeneratorFunction%': asyncGenFunction,
  '%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
  '%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
  '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
  '%Boolean%': Boolean,
  '%BooleanPrototype%': Boolean.prototype,
  '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
  '%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
  '%Date%': Date,
  '%DatePrototype%': Date.prototype,
  '%decodeURI%': decodeURI,
  '%decodeURIComponent%': decodeURIComponent,
  '%encodeURI%': encodeURI,
  '%encodeURIComponent%': encodeURIComponent,
  '%Error%': Error,
  '%ErrorPrototype%': Error.prototype,
  '%eval%': eval, // eslint-disable-line no-eval
  '%EvalError%': EvalError,
  '%EvalErrorPrototype%': EvalError.prototype,
  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
  '%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
  '%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
  '%Function%': Function,
  '%FunctionPrototype%': Function.prototype,
  '%Generator%': generator ? getProto(generator()) : undefined,
  '%GeneratorFunction%': generatorFunction,
  '%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
  '%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
  '%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
  '%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
  '%isFinite%': isFinite,
  '%isNaN%': isNaN,
  '%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
  '%JSON%': typeof JSON === 'object' ? JSON : undefined,
  '%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,
  '%Map%': typeof Map === 'undefined' ? undefined : Map,
  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
  '%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
  '%Math%': Math,
  '%Number%': Number,
  '%NumberPrototype%': Number.prototype,
  '%Object%': Object,
  '%ObjectPrototype%': Object.prototype,
  '%ObjProto_toString%': Object.prototype.toString,
  '%ObjProto_valueOf%': Object.prototype.valueOf,
  '%parseFloat%': parseFloat,
  '%parseInt%': parseInt,
  '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
  '%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
  '%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
  '%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
  '%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
  '%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
  '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
  '%RangeError%': RangeError,
  '%RangeErrorPrototype%': RangeError.prototype,
  '%ReferenceError%': ReferenceError,
  '%ReferenceErrorPrototype%': ReferenceError.prototype,
  '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
  '%RegExp%': RegExp,
  '%RegExpPrototype%': RegExp.prototype,
  '%Set%': typeof Set === 'undefined' ? undefined : Set,
  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
  '%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
  '%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
  '%String%': String,
  '%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
  '%StringPrototype%': String.prototype,
  '%Symbol%': hasSymbols ? Symbol : undefined,
  '%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
  '%SyntaxError%': SyntaxError,
  '%SyntaxErrorPrototype%': SyntaxError.prototype,
  '%ThrowTypeError%': ThrowTypeError,
  '%TypedArray%': TypedArray,
  '%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
  '%TypeError%': $TypeError,
  '%TypeErrorPrototype%': $TypeError.prototype,
  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
  '%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
  '%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
  '%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
  '%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
  '%URIError%': URIError,
  '%URIErrorPrototype%': URIError.prototype,
  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
  '%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
  '%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype };


var bind = __webpack_require__(/*! function-bind */ 22);
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
  var result = [];
  $replace(string, rePropName, function (match, number, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
  });
  return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  if (!(name in INTRINSICS)) {
    throw new SyntaxError('intrinsic ' + name + ' does not exist!');
  }

  // istanbul ignore if // hopefully this is impossible to test :-)
  if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
    throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
  }

  return INTRINSICS[name];
};

module.exports = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('intrinsic name must be a non-empty string');
  }
  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    throw new TypeError('"allowMissing" argument must be a boolean');
  }

  var parts = stringToPath(name);

  var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
  for (var i = 1; i < parts.length; i += 1) {
    if (value != null) {
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, parts[i]);
        if (!allowMissing && !(parts[i] in value)) {
          throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
        }
        value = desc ? desc.get || desc.value : value[parts[i]];
      } else {
        value = value[parts[i]];
      }
    }
  }
  return value;
};

/***/ }),
/* 33 */
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var origSymbol = global.Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ 34);

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),
/* 34 */
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 17], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),
/* 35 */
/*!*************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/es-abstract/2018/IsConstructor.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://www.ecma-international.org/ecma-262/6.0/#sec-isconstructor

module.exports = function IsConstructor(argument) {
  return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
};

/***/ }),
/* 36 */
/*!****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/es-abstract/2018/Type.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES5Type = __webpack_require__(/*! ../5/Type */ 37);

// https://www.ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function Type(x) {
  if (typeof x === 'symbol') {
    return 'Symbol';
  }
  return ES5Type(x);
};

/***/ }),
/* 37 */
/*!*************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/es-abstract/5/Type.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://www.ecma-international.org/ecma-262/5.1/#sec-8

module.exports = function Type(x) {
  if (x === null) {
    return 'Null';
  }
  if (typeof x === 'undefined') {
    return 'Undefined';
  }
  if (typeof x === 'function' || typeof x === 'object') {
    return 'Object';
  }
  if (typeof x === 'number') {
    return 'Number';
  }
  if (typeof x === 'boolean') {
    return 'Boolean';
  }
  if (typeof x === 'string') {
    return 'String';
  }
};

/***/ }),
/* 38 */
/*!*****************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/promise.prototype.finally/polyfill.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requirePromise = __webpack_require__(/*! ./requirePromise */ 28);

var implementation = __webpack_require__(/*! ./implementation */ 27);

module.exports = function getPolyfill() {
  requirePromise();
  return typeof Promise.prototype['finally'] === 'function' ? Promise.prototype['finally'] : implementation;
};

/***/ }),
/* 39 */
/*!*************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/promise.prototype.finally/shim.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requirePromise = __webpack_require__(/*! ./requirePromise */ 28);

var getPolyfill = __webpack_require__(/*! ./polyfill */ 38);
var define = __webpack_require__(/*! define-properties */ 24);

module.exports = function shimPromiseFinally() {
  requirePromise();

  var polyfill = getPolyfill();
  define(Promise.prototype, { 'finally': polyfill }, {
    'finally': function testFinally() {
      return Promise.prototype['finally'] !== polyfill;
    } });

  return polyfill;
};

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 47);


/***/ }),
/* 47 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 48);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 48 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 49 */
/*!***************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_getHomeBannerList.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http_getHomeBannerList = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 46));

var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));

var _http = _interopRequireDefault(__webpack_require__(/*! @/utils/http/http.js */ 50));

var _http_req_list = __webpack_require__(/*! @/utils/http/http_req_list.js */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

// 获取首页banner列表
// 返回 OBJ
var http_getHomeBannerList = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var dddata;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:

            // bannerMock
            dddata = [
            {
              picture: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png',
              path: '../../pages/banner-detail/banner-detail?id=11' },
            {
              picture: 'http://image.mishi.cn/r/yry_h5_test/detail/2_1535359240426.png',
              path: '../../pages/banner-detail/banner-detail?id=11' },
            {
              picture: 'http://image.mishi.cn/r/yry_h5_test/detail/1_1535359204228.png',
              path: '../../pages/banner-detail/banner-detail?id=11' },
            {
              picture: 'http://image.mishi.cn/r/yry_h5_test/detail/4_1535359327213.png',
              path: '../../pages/banner-detail/banner-detail?id=11' }];_context2.next = 3;return (



              new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:

                          _http.default.get(_http_req_list.url_getHomeBannerList).then(function (res) {

                            console.log(res);
                            if (res.data.code === 0) {
                              console.log('=============banenrs================');
                              console.log(res);
                              if (res.data.list.length === 0) {
                                console.log('得到的banner列表是空,启动模拟');
                                _index.default.commit('setHomeBannerList', dddata);
                              } else {
                                _index.default.commit('setHomeBannerList', res.data.list);
                              }
                              resolve(true);
                            } else {
                              resolve(false);
                            }

                          }).catch(function (error) {
                            resolve(false);
                          }).finally(function () {

                          });case 1:case "end":return _context.stop();}}}, _callee, this);}));return function (_x, _x2) {return _ref2.apply(this, arguments);};}()).

              catch(function (error) {

                resolve(false);

              }).finally(function () {
              }));case 3:return _context2.abrupt("return", _context2.sent);case 4:case "end":return _context2.stop();}}}, _callee2, this);}));return function http_getHomeBannerList() {return _ref.apply(this, arguments);};}();exports.http_getHomeBannerList = http_getHomeBannerList;

/***/ }),
/* 50 */
/*!*********************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


var _index = _interopRequireDefault(__webpack_require__(/*! @/js_sdk/gangdiedao-uni-axios/index.js */ 51));





var _index2 = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));


var _http_req_list = __webpack_require__(/*! @/utils/http/http_req_list.js */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 使用第三方插件, 基于uniapp的axios, https://ext.dcloud.net.cn/plugin?id=558 
// 在网站下载使用或者在网站上点击导入HBuilder,会自动成js_sdk文件夹,否则手动创建
// 并且在项目中安装 axios  npm install --save axios
// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
/**
 * 请求接口日志记录
 */function _reqlog(req) {if (true) {
    console.log("请求地址：" + req.url, req.data || req.params);
  }
  //TODO 调接口异步写入日志数据库
}


/**
   * 响应接口日志记录
   */
function _reslog(res) {
  if (true) {
    console.log("".concat(res.config.url, "\u54CD\u5E94\u7ED3\u679C\uFF1A"), res);
  }
}


// 创建自定义接口服务实例
var http = _index.default.create({

  // 路由前缀,如果请求地址经常变化,可以不设置
  // baseURL: baseUrl,

  timeout: 6000, // 不可超过 manifest.json 中配置 networkTimeout的超时时间



  headers: {
    'Content-Type': 'application/json; charset=utf-8' } });



/**
                                                             * 请求拦截, 设置请求头 & 允许单独读设置请求头 & 带上token请求头
                                                             */
http.interceptors.request.use(function (config) {


  // 解决使用get请求无法设置请求头为题
  // if (config.method == 'get') {
  //     config.data = 'true'
  // }

  // 每次请求附加token值,用于后台监测当前用户是否属于登录状态;
  config.headers['token'] = _index2.default.getters.store_token || '';
  return config;
}, function (error) {
  return Promise.reject(error);
});var _default =

http;exports.default = _default;

/***/ }),
/* 51 */
/*!***************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/js_sdk/gangdiedao-uni-axios/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _uniAxios = __webpack_require__(/*! ./uni-axios */ 52);var _default =
_uniAxios.axios;exports.default = _default;

/***/ }),
/* 52 */
/*!*******************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/js_sdk/gangdiedao-uni-axios/uni-axios.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _exportNames = { axios: true };Object.defineProperty(exports, "axios", { enumerable: true, get: function get() {return _axios.default;} });var _axios = _interopRequireWildcard(__webpack_require__(/*! axios */ 53));









































Object.keys(_axios).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;Object.defineProperty(exports, key, { enumerable: true, get: function get() {return _axios[key];} });});var _utils = _interopRequireDefault(__webpack_require__(/*! axios/lib/utils */ 55));var _adapter = __webpack_require__(/*! ./adapter */ 81);var _normalizeHeaderName = _interopRequireDefault(__webpack_require__(/*! axios/lib/helpers/normalizeHeaderName */ 66));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function setContentTypeIfUnset(headers, value) {if (!_utils.default.isUndefined(headers) && _utils.default.isUndefined(headers['Content-Type'])) {headers['Content-Type'] = value;}}_axios.default.defaults.transformRequest = [function transformRequest(data, headers) {(0, _normalizeHeaderName.default)(headers, 'Accept');(0, _normalizeHeaderName.default)(headers, 'Content-Type');if (_utils.default.isFormData(data) || _utils.default.isArrayBuffer(data) || _utils.default.isBuffer(data) || _utils.default.isStream(data) || _utils.default.isFile(data) || _utils.default.isBlob(data)) {return data;}if (_utils.default.isArrayBufferView(data)) {return data.buffer;}if (_utils.default.isURLSearchParams(data)) {setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');return data.toString();}if (_utils.default.isObject(data)) {setContentTypeIfUnset(headers, 'application/json;charset=utf-8');return JSON.stringify(data);}return data;}];_axios.default.defaults.adapter = _adapter.adapter;

/***/ }),
/* 53 */
/*!******************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__(/*! ./lib/axios */ 54);

/***/ }),
/* 54 */
/*!**********************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/axios.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 55);
var bind = __webpack_require__(/*! ./helpers/bind */ 56);
var Axios = __webpack_require__(/*! ./core/Axios */ 57);
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ 77);
var defaults = __webpack_require__(/*! ./defaults */ 63);

/**
                                       * Create an instance of Axios
                                       *
                                       * @param {Object} defaultConfig The default config for the instance
                                       * @return {Axios} A new instance of Axios
                                       */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ 78);
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ 79);
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ 62);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ 80);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),
/* 55 */
/*!**********************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/utils.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ 56);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) &&
  typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
function isString(val) {
  return typeof val === 'string';
}

/**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
function isNumber(val) {
  return typeof val === 'number';
}

/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
  navigator.product === 'NativeScript' ||
  navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined');

}

/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim };

/***/ }),
/* 56 */
/*!*****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/helpers/bind.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/***/ }),
/* 57 */
/*!***************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/core/Axios.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 55);
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ 58);
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ 59);
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ 60);
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ 77);

/**
                                             * Create a new instance of Axios
                                             *
                                             * @param {Object} instanceConfig The default config for the instance
                                             */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager() };

}

/**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url }));

  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data }));

  };
});

module.exports = Axios;

/***/ }),
/* 58 */
/*!*********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/helpers/buildURL.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 55);

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),
/* 59 */
/*!****************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/core/InterceptorManager.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 55);

function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),
/* 60 */
/*!*************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/core/dispatchRequest.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 55);
var transformData = __webpack_require__(/*! ./transformData */ 61);
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ 62);
var defaults = __webpack_require__(/*! ../defaults */ 63);

/**
                                        * Throws a `Cancel` if cancellation has been requested.
                                        */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
  config.data,
  config.headers,
  config.transformRequest);


  // Flatten headers
  config.headers = utils.merge(
  config.headers.common || {},
  config.headers[config.method] || {},
  config.headers);


  utils.forEach(
  ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
  function cleanHeaderConfig(method) {
    delete config.headers[method];
  });


  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
    response.data,
    response.headers,
    config.transformResponse);


    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
        reason.response.data,
        reason.response.headers,
        config.transformResponse);

      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),
/* 61 */
/*!***********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/core/transformData.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 55);

/**
                                    * Transform the data for a request or a response
                                    *
                                    * @param {Object|String} data The data to be transformed
                                    * @param {Array} headers The headers for the request or response
                                    * @param {Array|Function} fns A single function or Array of functions
                                    * @returns {*} The resulting transformed data
                                    */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

/***/ }),
/* 62 */
/*!********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/cancel/isCancel.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),
/* 63 */
/*!*************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/defaults.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ 55);
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ 66);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded' };


function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ 67);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ 67);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
    utils.isArrayBuffer(data) ||
    utils.isBuffer(data) ||
    utils.isStream(data) ||
    utils.isFile(data) ||
    utils.isBlob(data))
    {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {/* Ignore */}
    }
    return data;
  }],

  /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };


defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*' } };



utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 64)))

/***/ }),
/* 64 */
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
	setTimeout(fn, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 65);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),
/* 65 */
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 64)))

/***/ }),
/* 66 */
/*!********************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 55);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),
/* 67 */
/*!*****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/adapters/xhr.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 55);
var settle = __webpack_require__(/*! ./../core/settle */ 68);
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ 58);
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ 71);
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ 74);
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ 75);
var createError = __webpack_require__(/*! ../core/createError */ 69);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request };


      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
      request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ 76);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
      cookies.read(config.xsrfCookieName) :
      undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/***/ }),
/* 68 */
/*!****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/core/settle.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ 69);

/**
                                             * Resolve or reject a Promise based on response status.
                                             *
                                             * @param {Function} resolve A function that resolves the promise.
                                             * @param {Function} reject A function that rejects the promise.
                                             * @param {object} response The response.
                                             */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
    'Request failed with status code ' + response.status,
    response.config,
    null,
    response.request,
    response));

  }
};

/***/ }),
/* 69 */
/*!*********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/core/createError.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ 70);

/**
                                               * Create an Error with the specified message, config, error code, request and response.
                                               *
                                               * @param {string} message The error message.
                                               * @param {Object} config The config.
                                               * @param {string} [code] The error code (for example, 'ECONNABORTED').
                                               * @param {Object} [request] The request.
                                               * @param {Object} [response] The response.
                                               * @returns {Error} The created error.
                                               */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),
/* 70 */
/*!**********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/core/enhanceError.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Update an Error with the specified config, error code, and response.
               *
               * @param {Error} error The error to update.
               * @param {Object} config The config.
               * @param {string} [code] The error code (for example, 'ECONNABORTED').
               * @param {Object} [request] The request.
               * @param {Object} [response] The response.
               * @returns {Error} The error.
               */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code };

  };
  return error;
};

/***/ }),
/* 71 */
/*!***********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/core/buildFullPath.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ 72);
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ 73);

/**
                                                      * Creates a new URL by combining the baseURL with the requestedURL,
                                                      * only when the requestedURL is not already an absolute URL.
                                                      * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                      *
                                                      * @param {string} baseURL The base URL
                                                      * @param {string} requestedURL Absolute or relative URL to combine
                                                      * @returns {string} The combined full path
                                                      */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

/***/ }),
/* 72 */
/*!**************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),
/* 73 */
/*!************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/helpers/combineURLs.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
};

/***/ }),
/* 74 */
/*!*************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/helpers/parseHeaders.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 55);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
'age', 'authorization', 'content-length', 'content-type', 'etag',
'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
'last-modified', 'location', 'max-forwards', 'proxy-authorization',
'referer', 'retry-after', 'user-agent'];


/**
                                          * Parse headers into an object
                                          *
                                          * ```
                                          * Date: Wed, 27 Aug 2014 08:58:49 GMT
                                          * Content-Type: application/json
                                          * Connection: keep-alive
                                          * Transfer-Encoding: chunked
                                          * ```
                                          *
                                          * @param {String} headers Headers needing to be parsed
                                          * @returns {Object} Headers parsed into an object
                                          */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {return parsed;}

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

/***/ }),
/* 75 */
/*!****************************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 55);

module.exports =
utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
                 * Parse a URL to discover it's components
                 *
                 * @param {String} url The URL to be parsed
                 * @returns {Object}
                 */
  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ?
      urlParsingNode.pathname :
      '/' + urlParsingNode.pathname };

  }

  originURL = resolveURL(window.location.href);

  /**
                                                * Determine if a URL shares the same origin as the current location
                                                *
                                                * @param {String} requestURL The URL to test
                                                * @returns {boolean} True if URL shares the same origin, otherwise false
                                                */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol &&
    parsed.host === originURL.host;
  };
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),
/* 76 */
/*!********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/helpers/cookies.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 55);

module.exports =
utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },

    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },

    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    } };

}() :

// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {return null;},
    remove: function remove() {} };

}();

/***/ }),
/* 77 */
/*!*********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/core/mergeConfig.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 55);

/**
                                  * Config-specific merge-function which creates a new config-object
                                  * by merging two configuration objects together.
                                  *
                                  * @param {Object} config1
                                  * @param {Object} config2
                                  * @returns {Object} New object resulting from merging config2 to config1
                                  */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
  'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
  'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
  'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
  'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
  'httpsAgent', 'cancelToken', 'socketPath'];


  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys.
  concat(mergeDeepPropertiesKeys).
  concat(defaultToConfig2Keys);

  var otherKeys = Object.
  keys(config2).
  filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

/***/ }),
/* 78 */
/*!******************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/cancel/Cancel.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * A `Cancel` is an object that is thrown when an operation is canceled.
               *
               * @class
               * @param {string=} message The message.
               */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

/***/ }),
/* 79 */
/*!***********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/cancel/CancelToken.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ 78);

/**
                                   * A `CancelToken` is an object that can be used to request cancellation of an operation.
                                   *
                                   * @class
                                   * @param {Function} executor The executor function.
                                   */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
   * Throws a `Cancel` if cancellation has been requested.
   */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
    * Returns an object that contains a new `CancelToken` and a function that, when called,
    * cancels the `CancelToken`.
    */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel };

};

module.exports = CancelToken;

/***/ }),
/* 80 */
/*!*******************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/node_modules/axios/lib/helpers/spread.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Syntactic sugar for invoking a function and expanding an array for arguments.
               *
               * Common use case would be to use `Function.prototype.apply`.
               *
               *  ```js
               *  function f(x, y, z) {}
               *  var args = [1, 2, 3];
               *  f.apply(null, args);
               *  ```
               *
               * With `spread` this example can be re-written.
               *
               *  ```js
               *  spread(function(x, y, z) {})([1, 2, 3]);
               *  ```
               *
               * @param {Function} callback
               * @returns {Function}
               */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),
/* 81 */
/*!*****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/js_sdk/gangdiedao-uni-axios/adapter.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.adapter = void 0;var _utils = __webpack_require__(/*! axios/lib/utils */ 55);




var _createError = _interopRequireDefault(__webpack_require__(/*! axios/lib/core/createError */ 69));
var _buildURL = _interopRequireDefault(__webpack_require__(/*! axios/lib/helpers/buildURL */ 58));
var _settle = _interopRequireDefault(__webpack_require__(/*! axios/lib/core/settle */ 68));
var _awaitTimeout = _interopRequireDefault(__webpack_require__(/*! ./await-timeout */ 82));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var timer = new _awaitTimeout.default();

var adapter = function adapter(config) {
  return new Promise(function (resolve, reject) {
    var requestMethod = ((0, _utils.isString)(config.method) ? config.method : 'GET').toUpperCase();
    var requestUrl = (0, _buildURL.default)(config.url, config.params, config.paramsSerializer);
    var requestHeaders = (0, _utils.isObject)(config.headers) ? config.headers : {};

    // 请求数据
    var requestData = config.data;

    var request = uni.request({
      method: requestMethod,
      url: requestUrl,
      header: requestHeaders,
      data: requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'PATCH' ? requestData : '',
      responseType: config.responseType === 'arraybuffer' ? 'arraybuffer' : 'text',
      dataType: config.responseType === 'json' ? 'json' : config.responseType,
      success: function success(res) {
        (0, _settle.default)(resolve, reject, {
          data: res.data,
          status: res.statusCode,
          statusText: '',
          headers: res.header,
          config: config,
          request: request });

      },
      fail: function fail() {
        var error = (0, _createError.default)('网络错误', config, undefined, request);
        reject(error);
      },
      complete: function complete() {
        timer.clear();
      } });


    // 支持超时处理
    if (config.timeout) {
      timer.set(config.timeout).then(function () {
        reject(new Error('请求超时'));
        request.abort();
      });
    }
  });
};exports.adapter = adapter;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 82 */
/*!***********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/js_sdk/gangdiedao-uni-axios/await-timeout.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // await-timeout v0.5.0 by Vitaliy Potapov
(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
})(void 0, function () {'use strict';

  function promiseFinally(promise, fn) {
    var success = function success(result) {
      fn();
      return result;
    };
    var error = function error(e) {
      fn();
      return Promise.reject(e);
    };
    return Promise.resolve(promise).then(success, error);
  }

  /**
     * Converts any value to Error.
     * @param {*} value
     * @returns {Error}
     */
  function toError(value) {
    value = typeof value === 'function' ? value() : value;
    return typeof value === 'string' ? new Error(value) : value;
  }

  /**
     * Promise-based replacement for setTimeout / clearTimeout.
     */var

  Timeout = /*#__PURE__*/function () {
    function Timeout() {_classCallCheck(this, Timeout);
      this._id = null;
      this._delay = null;
    }_createClass(Timeout, [{ key: "set", value: function set(









      delay) {var _this = this;var rejectReason = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        return new Promise(function (resolve, reject) {
          _this.clear();
          var fn = rejectReason ? function () {return reject(toError(rejectReason));} : resolve;
          _this._id = setTimeout(fn, delay);
          _this._delay = delay;
        });
      } }, { key: "wrap", value: function wrap(

      promise, delay) {var _this2 = this;var rejectReason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var wrappedPromise = promiseFinally(promise, function () {return _this2.clear();});
        var timer = this.set(delay, rejectReason);
        return Promise.race([wrappedPromise, timer]);
      } }, { key: "clear", value: function clear()

      {
        if (this._id) {
          clearTimeout(this._id);
        }
      } }, { key: "id", get: function get() {return this._id;} }, { key: "delay", get: function get() {return this._delay;} }]);return Timeout;}();


  Timeout.set = function (delay, rejectReason) {
    return new Timeout().set(delay, rejectReason);
  };

  Timeout.wrap = function (promise, delay, rejectReason) {
    return new Timeout().wrap(promise, delay, rejectReason);
  };

  return Timeout;

});

/***/ }),
/* 83 */
/*!******************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_req_list.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.url_getOrderPay = exports.url_getGoodsList = exports.url_getOrderData = exports.url_getHomeNearbyCanteenList = exports.url_getHomeNotiInfo = exports.url_getHomeBannerList = exports.url_getPhone = exports.url_setUserInfo = exports.url_getUserInfo = exports.url_login_getToken = exports.baseUrl = void 0;
// URL汇总

// # 路由前缀
// export const baseUrl = 'http://39.106.32.178:8020'
var baseUrl = 'https://test.api.chinaunicloud.com';


// # 首次登录 & 获取token
exports.baseUrl = baseUrl;var url_login_getToken = baseUrl + '/app/wx/login';

// # 获取当前用户信息
exports.url_login_getToken = url_login_getToken;var url_getUserInfo = baseUrl + '/app/user/info';

// # 设置当前用户信息
exports.url_getUserInfo = url_getUserInfo;var url_setUserInfo = baseUrl + '/app/save/info';

// # 获取手机号
exports.url_setUserInfo = url_setUserInfo;var url_getPhone = baseUrl + '/app/wx/phoneNumber';


// # 获取首页banner列表
exports.url_getPhone = url_getPhone;var url_getHomeBannerList = baseUrl + '/app/home/publishedBanner/list';

// # 获取首页公告
exports.url_getHomeBannerList = url_getHomeBannerList;var url_getHomeNotiInfo = baseUrl + '/app/home/publishedAnnouncement/list';

// # 获取首页餐厅列表
exports.url_getHomeNotiInfo = url_getHomeNotiInfo;var url_getHomeNearbyCanteenList = baseUrl + '/xxxxxxxx';


// # 获取订单页数据
exports.url_getHomeNearbyCanteenList = url_getHomeNearbyCanteenList;var url_getOrderData = baseUrl + '/x';

// # 获取档口的食品列表
exports.url_getOrderData = url_getOrderData;var url_getGoodsList = baseUrl + '/x';

// # 发送订单数据,获取支付数据
exports.url_getGoodsList = url_getGoodsList;var url_getOrderPay = baseUrl + '/x';exports.url_getOrderPay = url_getOrderPay;

/***/ }),
/* 84 */
/*!*************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_getHomeNotiInfo.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http_getHomeNotiInfo = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 46));

var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));

var _http = _interopRequireDefault(__webpack_require__(/*! @/utils/http/http.js */ 50));

var _http_req_list = __webpack_require__(/*! @/utils/http/http_req_list.js */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

// 获取首页banner列表
// 返回 OBJ
var http_getHomeNotiInfo = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var notiInfoddda;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:


            // 公告Mock
            notiInfoddda = [
            {
              info: '1疫情期间，第一食堂暂不营业，请见谅！1',
              path: '../../pages/notice-detail/notice-detail?id=11' },
            {
              info: '2疫情期间，第一食堂暂不营业，请见谅！2',
              path: '../../pages/notice-detail/notice-detail?id=11' },
            {
              info: '3疫情期间，第一食堂暂不营业，请见谅！3',
              path: '../../pages/notice-detail/notice-detail?id=11' }];_context2.next = 3;return (



              new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:

                          _http.default.get(_http_req_list.url_getHomeNotiInfo).then(function (res) {

                            console.log(res);
                            if (res.data.code === 0) {
                              console.log('=============公告↓================');
                              console.log(res);
                              if (res.data.list.length === 0) {
                                console.log('得到的公告列表是空,启动模拟');
                                _index.default.commit('setHomeNotiInfo', notiInfoddda);
                              } else {
                                _index.default.commit('setHomeNotiInfo', res.data.list);
                              }
                              resolve(true);
                            } else {
                              resolve(false);
                            }

                          }).catch(function (error) {
                            resolve(false);
                          }).finally(function () {

                          });case 1:case "end":return _context.stop();}}}, _callee, this);}));return function (_x, _x2) {return _ref2.apply(this, arguments);};}()).

              catch(function (error) {

                resolve(false);

              }).finally(function () {
              }));case 3:return _context2.abrupt("return", _context2.sent);case 4:case "end":return _context2.stop();}}}, _callee2, this);}));return function http_getHomeNotiInfo() {return _ref.apply(this, arguments);};}();exports.http_getHomeNotiInfo = http_getHomeNotiInfo;

/***/ }),
/* 85 */
/*!**********************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_getHomeNearbyCanteenList.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http_getHomeNearbyCanteenList = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 46));

var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));

var _http = _interopRequireDefault(__webpack_require__(/*! @/utils/http/http.js */ 50));

var _http_req_list = __webpack_require__(/*! @/utils/http/http_req_list.js */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

// 获取首页banner列表
// 返回 OBJ
var http_getHomeNearbyCanteenList = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var nearbyCanteenListdddddd;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:


            // 首页 - 附近餐厅列表
            nearbyCanteenListdddddd = [
            {
              pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
              Tile: '第一食堂（东校区）',
              score: 3.3,
              saleCount: 60,
              labels: [
              '好吃',
              '便宜',
              '取餐快'],

              distance: '110',
              canteenlistId: 1 },

            {
              pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
              Tile: '第一食堂（东校区）',
              score: 4.6,
              saleCount: 60,
              labels: [
              '好吃',
              '便宜',
              '取餐快'],

              distance: '110',
              canteenlistId: 1 },

            {
              pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
              Tile: '第一食堂（东校区）',
              score: 2.5,
              saleCount: 60,
              labels: [
              '好吃',
              '便宜',
              '取餐快'],

              distance: '110',
              canteenlistId: 1 }];


            _index.default.commit('setHomeCanteenList', nearbyCanteenListdddddd);return _context.abrupt("return",
            true);case 3:case "end":return _context.stop();}}}, _callee, this);}));return function http_getHomeNearbyCanteenList() {return _ref.apply(this, arguments);};}();exports.http_getHomeNearbyCanteenList = http_getHomeNearbyCanteenList;

/***/ }),
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/*!************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/order/order-err.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 93 */
/*!****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/order/ToBeEvaluated.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 94 */
/*!*************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/order/pendingPay.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 95 */
/*!**************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/order/WaitGetMeal.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/WaitGetMeal.38c8dced.png";

/***/ }),
/* 96 */
/*!****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/order/refundOrCanle.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 97 */,
/* 98 */,
/* 99 */
/*!*****************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/utils.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isLogin = exports.formatDate = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


// 日期格式化 TODO：未封装	
var formatDate = function formatDate(d) {
  //如果date不是日期对象，返回
  if (!date instanceof Date) {
    return;
  }
  var year = d.getFullYear(),
  month = d.getMonth() + 1,
  date = d.getDate(),
  hour = d.getHours(),
  minute = d.getMinutes(),
  second = d.getSeconds();
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
};

// 是否已登录
// 检测本地store数据中,是否已有用户数据;
exports.formatDate = formatDate;var isLogin = function isLogin() {
  if (_index.default.getters.store_token === null) {
    // 判断是否有token
    return false;
  } else if (_index.default.getters.store_tokenExpiration === null) {
    // 判断是否有token的过期时间
    return false;
  } else if (new Date().getTime() >= _index.default.getters.store_tokenExpiration) {
    // 判断当前时间毫秒数 是否 大于 token过期时间
    console.log('token超时');
    return false;
  } else if (_index.default.getters.store_UserInfoData.mobile === null) {
    // 判断当前时间毫秒数 是否 大于 token过期时间
    console.log('手机号为空');
    return false;
  } else if (_index.default.getters.store_UserInfoData.nickName === null) {
    // 判断当前时间毫秒数 是否 大于 token过期时间
    console.log('用户名为空');
    return false;
  }
  console.log('登陆成功,登录过期时间 => ' + formatDate(new Date(_index.default.getters.store_tokenExpiration)));
  return true;
};exports.isLogin = isLogin;

/***/ }),
/* 100 */
/*!**********************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_getOrderData.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http_getOrderData = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 46));

var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));

var _http = _interopRequireDefault(__webpack_require__(/*! @/utils/http/http.js */ 50));

var _http_req_list = __webpack_require__(/*! @/utils/http/http_req_list.js */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}


var http_getOrderData = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var data;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:


            // mock订单数据
            data = [
            {
              // 订单类型
              // 1 待付款
              // 2 待取餐
              // 3 待评价
              // 4 退款/取消
              // 5 已完成
              'orderType': 5,

              // 餐厅图片
              'restaurantImg': 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',

              // 餐厅名称
              'restaurantTitle': 'C17档口（第一食堂）',

              // 餐厅名称
              'orderState': '订单已完成',

              // 订单内的食品
              'foodList': [
              {
                'foodName': '广式云吞',
                'foodCount': '1' },

              {
                'foodName': '鲜肉烧麦',
                'foodCount': '5' }],



              // 下单时间
              'reserveTime': '2020-01-30 11:48',

              // 取餐码
              getFoodNumber: 12 },

            {
              // 订单类型
              // 1 待付款
              // 2 待取餐
              // 3 待评价
              // 4 退款/取消
              // 5 已完成
              'orderType': 2,

              // 餐厅图片
              'restaurantImg': 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',

              // 餐厅名称
              'restaurantTitle': 'C17档口（第一食堂）',

              // 餐厅名称
              'orderState': '订单已完成',

              // 订单内的食品
              'foodList': [
              {
                'foodName': '广式云吞',
                'foodCount': '1' },

              {
                'foodName': '鲜肉烧麦',
                'foodCount': '5' }],



              // 下单时间
              'reserveTime': '2020-01-30 11:48',

              // 取餐码
              getFoodNumber: 12 },

            {
              // 订单类型
              // 1 待付款
              // 2 待取餐
              // 3 待评价
              // 4 退款/取消
              // 5 已完成
              'orderType': 1,

              // 餐厅图片
              'restaurantImg': 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',

              // 餐厅名称
              'restaurantTitle': 'C17档口（第一食堂）',

              // 餐厅名称
              'orderState': '订单已完成',

              // 订单内的食品
              'foodList': [
              {
                'foodName': '广式云吞',
                'foodCount': '1' },

              {
                'foodName': '鲜肉烧麦',
                'foodCount': '5' }],



              // 下单时间
              'reserveTime': '2020-01-30 11:48',

              // 取餐码
              getFoodNumber: 12 }];





            // 模拟换取成功
            console.log('获取订单数据');_context2.next = 4;return (
              new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:

                          _index.default.commit('setOrderData', data);
                          resolve(true);case 2:case "end":return _context.stop();}}}, _callee, this);}));return function (_x, _x2) {return _ref2.apply(this, arguments);};}()).

              catch(function (error) {

                resolve(false);

              }).finally(function () {
              }));case 4:return _context2.abrupt("return", _context2.sent);case 5:case "end":return _context2.stop();}}}, _callee2, this);}));return function http_getOrderData() {return _ref.apply(this, arguments);};}();exports.http_getOrderData = http_getOrderData;

/***/ }),
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */
/*!*****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/wxcomponents/weapp/dist/toast/toast.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../common/utils */ 118);
var defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  zIndex: 1000,
  duration: 2000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#van-toast' };

var queue = [];
var currentOptions = Object.assign({}, defaultOptions);
function parseOptions(message) {
  return (0, _utils.isObj)(message) ? message : { message: message };
}
function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}
function Toast(toastOptions) {
  var options = Object.assign(Object.assign({}, currentOptions), parseOptions(toastOptions));
  var context = options.context || getContext();
  var toast = context.selectComponent(options.selector);
  if (!toast) {
    console.warn('未找到 van-toast 节点，请确认 selector 及 context 是否正确');
    return;
  }
  delete options.context;
  delete options.selector;
  toast.clear = function () {
    toast.setData({ show: false });
    if (options.onClose) {
      options.onClose();
    }
  };
  queue.push(toast);
  toast.setData(options);
  clearTimeout(toast.timer);
  if (options.duration > 0) {
    toast.timer = setTimeout(function () {
      toast.clear();
      queue = queue.filter(function (item) {return item !== toast;});
    }, options.duration);
  }
  return toast;
}
var createMethod = function createMethod(type) {return function (options) {return Toast(Object.assign({ type: type }, parseOptions(options)));};};
Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');
Toast.clear = function () {
  queue.forEach(function (toast) {
    toast.clear();
  });
  queue = [];
};
Toast.setDefaultOptions = function (options) {
  Object.assign(currentOptions, options);
};
Toast.resetDefaultOptions = function () {
  currentOptions = Object.assign({}, defaultOptions);
};var _default =
Toast;exports.default = _default;

/***/ }),
/* 118 */
/*!******************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/wxcomponents/weapp/dist/common/utils.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isDef = isDef;exports.isObj = isObj;exports.isNumber = isNumber;exports.range = range;exports.nextTick = nextTick;exports.getSystemInfoSync = getSystemInfoSync;exports.addUnit = addUnit;function isDef(value) {
  return value !== undefined && value !== null;
}
function isObj(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}
function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}
function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function nextTick(fn) {
  setTimeout(function () {
    fn();
  }, 1000 / 30);
}
var systemInfo = null;
function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }
  return systemInfo;
}
function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }
  value = String(value);
  return isNumber(value) ? "".concat(value, "px") : value;
}

/***/ }),
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */
/*!*****************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/me/money.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */
/*!****************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/me/time.svg ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/time.12e96edc.svg";

/***/ }),
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */
/*!********************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/identity/in.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/in.a4afc387.png";

/***/ }),
/* 184 */
/*!*********************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/identity/out.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/out.645f5520.png";

/***/ }),
/* 185 */,
/* 186 */,
/* 187 */
/*!*************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_setUserInfoData.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http_setUserInfoData = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 46));

var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));

var _http = _interopRequireDefault(__webpack_require__(/*! ./http.js */ 50));

var _http_req_list = __webpack_require__(/*! ./http_req_list.js */ 83);

var _http_getUserInfoData = __webpack_require__(/*! ./http_getUserInfoData.js */ 188);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

// login后,将code发送给后台,换取token,将token存储到本地
// 同时获取用户详细信息, 包括用户在后台数据表中的ID

var http_setUserInfoData = function http_setUserInfoData(dataObj) {

  // 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;

  // 由于想要在get请求时修改请求头,所以参数2是设置请求头,如果要传参就直接加到URL里
  // 测试get请求
  // let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
  // http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
  // await http.post(url_login_getToken, {code, encryptedData, iv}).then(res => {
  // 	//  拿到服务器返回的token,存储到本地
  // 	store.commit('setToken', res.data.token)
  // }).catch(error => {
  // }).finally(() => {
  // })

  // console.log(store)

  // 测试post请求
  // 如果是post请求,参数1是URL,那么参数2是数据,参数3个设置请求头;
  // http.post(URL, [data], {potion}).then(res => {
  // }).catch(error => {
  // }).finally(() => {
  // })

  // get 请求示例(记得放在promise中返回)
  // let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
  // http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
  // 		console.log(res)
  // })

  // dataObj内容
  // "address": "string",
  // "birth": "日期: 2010-01-01 00:00:00",
  // "email": "string",
  // "gender": "性别  0:女 1:男",
  // "idCard": "当用户选择内部员工时必填",
  // "mobile": "手机号: 15132582555",
  // "passwd": "登录密码",
  // "userType": "0:内部 1:外部 当外部用户时, 不需要绑定员工号"


  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve, reject) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _http.default.post(_http_req_list.url_setUserInfo, dataObj).then( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(res) {var _res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:

                            console.log(res);if (!(
                            res.data.code === 0)) {_context.next = 8;break;}_context.next = 4;return (


                              (0, _http_getUserInfoData.http_getUserInfoData)());case 4:_res = _context.sent;
                            if (_res) {
                              resolve(true);
                            } else {
                              resolve(true);
                            }_context.next = 9;break;case 8:

                            // 其他错误
                            resolve(false);case 9:case "end":return _context.stop();}}}, _callee, this);}));return function (_x3) {return _ref2.apply(this, arguments);};}()).


                catch(function (error) {
                  resolve(false);
                  console.log(error);
                }).finally(function () {}));case 2:case "end":return _context2.stop();}}}, _callee2, this);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


};exports.http_setUserInfoData = http_setUserInfoData;

/***/ }),
/* 188 */
/*!*************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_getUserInfoData.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http_getUserInfoData = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 46));
var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));

var _http = _interopRequireDefault(__webpack_require__(/*! ./http.js */ 50));

var _http_req_list = __webpack_require__(/*! ./http_req_list.js */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}



var http_getUserInfoData = function http_getUserInfoData() {

  // 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;

  // 由于想要在get请求时修改请求头,所以参数2是设置请求头,如果要传参就直接加到URL里
  // 测试get请求
  // let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
  // http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
  // await http.post(url_login_getToken, {code, encryptedData, iv}).then(res => {
  // 	//  拿到服务器返回的token,存储到本地
  // 	store.commit('setToken', res.data.token)
  // }).catch(error => {
  // }).finally(() => {
  // })

  // console.log(store)

  // 测试post请求
  // 如果是post请求,参数1是URL,那么参数2是数据,参数3个设置请求头;
  // http.post(URL, [data], {potion}).then(res => {
  // }).catch(error => {
  // }).finally(() => {
  // })

  // get 请求示例(记得放在promise中返回)
  // let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
  // http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
  // 		console.log(res)
  // })


  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _http.default.get(_http_req_list.url_getUserInfo).then(function (res) {

                  if (res.data.code === 0) {

                    _index.default.commit('setUserInfoData', res.data.user);
                    console.log('用户详细数据↓');
                    console.log(_index.default.getters.store_UserInfoData);
                    resolve(true);
                  } else {
                    // 其他错误
                    resolve(false);
                  }

                }).catch(function (error) {
                  resolve(false);
                  console.log(error);
                }).finally(function () {}));case 2:case "end":return _context.stop();}}}, _callee, this);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


};exports.http_getUserInfoData = http_getUserInfoData;

/***/ }),
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */
/*!******************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/location/err-location.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */
/*!*********************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_getOrderPay.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http_getOrderPay = void 0;

var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));

var _http = _interopRequireDefault(__webpack_require__(/*! ./http.js */ 50));

var _http_req_list = __webpack_require__(/*! ./http_req_list.js */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
// login后,将code发送给后台,换取token,将token存储到本地
// 同时获取用户详细信息, 包括用户在后台数据表中的ID

var http_getOrderPay = function http_getOrderPay() {

  // return new Promise(async (resolve, reject) => {
  // 	await http.post(url_getOrderPay, {
  // 		x
  // 	}).then(res => {


  // 		if (res.data.code === 0) {

  // 			console.log(res.data.data)



  // 			resolve(res.data.data)
  // 		}  else {
  // 			// 其他错误
  // 			resolve(false)
  // 		}

  // 	}).catch(error => {
  // 		resolve(false)
  // 		console.log(error)
  // 	}).finally(() => {})
  // })
};exports.http_getOrderPay = http_getOrderPay;

/***/ }),
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */
/*!*******************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/login/logo.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 296 */,
/* 297 */,
/* 298 */
/*!************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_login_setToken.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http_login_setToken = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 46));

var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));

var _http = _interopRequireDefault(__webpack_require__(/*! ./http.js */ 50));

var _utils = __webpack_require__(/*! ../utils.js */ 99);

var _http_req_list = __webpack_require__(/*! ./http_req_list.js */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}




// login后,将code发送给后台,换取token,将token存储到本地
// 同时获取用户详细信息, 包括用户在后台数据表中的ID

var http_login_setToken = function http_login_setToken(code, encryptedData, iv) {

  // console.log('================code↓==================')
  // console.log(code)
  // console.log('==================enc↓================')
  // console.log(encryptedData)
  // console.log('==================iv↓================')
  // console.log(iv)

  // 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;

  // 由于想要在get请求时修改请求头,所以参数2是设置请求头,如果要传参就直接加到URL里
  // 测试get请求
  // let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
  // http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
  // await http.post(url_login_getToken, {code, encryptedData, iv}).then(res => {
  // 	//  拿到服务器返回的token,存储到本地
  // 	store.commit('setToken', res.data.token)
  // }).catch(error => {
  // }).finally(() => {
  // })

  // console.log(store)

  // 测试post请求
  // 如果是post请求,参数1是URL,那么参数2是数据,参数3个设置请求头;
  // http.post(URL, [data], {potion}).then(res => {
  // }).catch(error => {
  // }).finally(() => {
  // })

  // get 请求示例(记得放在promise中返回)
  // let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
  // http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
  // 		console.log(res)
  // })


  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _http.default.post(_http_req_list.url_login_getToken, {
                  code: code,
                  encryptedData: encryptedData,
                  iv: iv }).
                then(function (res) {

                  // 由于不是vue组件,所以不能拿到this的vue实例,
                  // 所以这里操作store就用原始的方法,直接操作文件;
                  // 其他vue文件还是用...mutations映射方法操作
                  if (res.data.code === 0) {
                    // 设置token,用于以后每次发送请求,请求头都必须带上
                    _index.default.commit('setToken', res.data.token);
                    // token过期时间,由后太配置,用当前时间加上这个事件,然后储存在store中,然后再在util中的isLogin中判断是否过期expiration
                    // res.data.expire为秒数 , 需 * 1000
                    // 默认是7天
                    var expiration = new Date().getTime() + res.data.expire * 1000;
                    console.log('=====token过期时间↓=========');
                    _index.default.commit('setTokenExpiration', expiration);
                    console.log('当前时间 => ' + (0, _utils.formatDate)(new Date(new Date().getTime())));
                    console.log('登陆(token)过期时间 => ' + (0, _utils.formatDate)(new Date(_index.default.getters.store_tokenExpiration)));
                    resolve(true);
                  } else if (res.data.code === 888) {

                    resolve(888);
                  } else {
                    // 其他错误
                    resolve(false);
                  }

                }).catch(function (error) {
                  resolve(false);
                  console.log(error);
                }).finally(function () {}));case 2:case "end":return _context.stop();}}}, _callee, this);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


};exports.http_login_setToken = http_login_setToken;

/***/ }),
/* 299 */
/*!******************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/utils/http/http_getPhone.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http_getPhone = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 46));

var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 15));

var _http = _interopRequireDefault(__webpack_require__(/*! @/utils/http/http.js */ 50));

var _http_req_list = __webpack_require__(/*! @/utils/http/http_req_list.js */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}


var http_getPhone = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(encryptedData, iv) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:

            console.log('手机号加密数据enc => ' + encryptedData);
            console.log('手机号加密数据iv => ' + iv);

            // 模拟换取成功
            // store.commit('setUserPhone', '18801228710')

            // 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;
            _context2.next = 4;return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        _http.default.get(_http_req_list.url_getPhone, { params: {
                            encryptedData: encryptedData,
                            iv: iv } }).
                        then(function (res) {
                          // http.get(url_getPhone,{headers: {'Content-Type': 'application/text'}}).then(res => {

                          // 直接在getURL资源路径中添加请求体参数axios会出错,所以还是用params:{data}		
                          // http.get(url_getPhone+`?encryptedData=${encryptedData}&iv=${iv}`).then(res => {

                          // 由于不是vue组件,所以不能拿到this的vue实例,
                          // 所以这里操作store就用原始的方法,直接操作文件;
                          // 其他vue文件还是用...mutations映射方法操作
                          // console.log('换取用户手机号↓')
                          // console.log(res)

                          // store.commit('setUserPhone', '18801228710')
                          console.log(res);
                          if (res.data.code === 0) {
                            _index.default.commit('setUserPhone', res.data.data.phoneNumber);
                            resolve(true);
                          } else {
                            resolve(false);
                          }


                        }).catch(function (error) {
                          resolve(false);
                        }).finally(function () {
                        });case 1:case "end":return _context.stop();}}}, _callee, this);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());case 4:return _context2.abrupt("return", _context2.sent);case 5:case "end":return _context2.stop();}}}, _callee2, this);}));return function http_getPhone(_x, _x2) {return _ref.apply(this, arguments);};}();exports.http_getPhone = http_getPhone;

/***/ }),
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */
/*!*******************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/index/food.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 327 */
/*!*********************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/index/market.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACSCAYAAADPY7HMAAAN20lEQVR4nO2dfZAT5R3Hw4vUolazB4h0N0Rkpjqo1dHafQLodcTXgloVS0WrFW3LaPbuFBltHc1Qtbbuk0PekWp9l0GK1CrSllGyOQ5kqEXMHm8qaq0vQ0UsVBG5+/aPM0XL5Xlyl80+T5LfZ+b797PP7/dJ8svuZhOJEMT/gTXDvwHPmgPP+hgZE6HEM9uRMVuRsU5XvX9CQ4D6vp2ChCTkAYJae+GZZ6iuA6EZyFo/Uibl/rSqrgOhGfBijykX0zPbVdeB0AxkrHeUi5kxd6uuA6ERaDWHayAl4JmPqK4FoRHwzGuVS5kxN2LVMYNU14LQCHjWQok0q+FZS8uUhcjGHLxy4iGq60BoBjLW+0IxV8fjqo+RqDHQGj9WMve9qfoYiRoEnvVzsZjWQ6qPkahBpPOlZ12t+hiJGoTmS0I7aL4ktASeNbli50uWxgm2i6TNcT/j+DNz0WpzrKeUL4zDYxx/YmlMt9O4iqXxzXL0Fp65WHz+MnZVOdbtMfWzcajtYirj2Gq7AEWDcGRZGpengN5B9BhAL2TM7UIx1ww3g1irZAD0SnBcZ7v4l/JGUArFH5nG6JJ7vco6XvIx/loQTpVMfTOOsF0s06DwFFk4OmyOOwH06mm/4Zk3CMXMWr8L0q8eMXoGBjIXryovOKVbYRyPj1+EPj3puXS+9GJXBO1Ztzj7ERxic6xXXWRKz5LgWNDdnlfEfMk4HlZdXErJcl7dnZ5rP18m0jhbdVEppYdxfJSYi6LvZYRnJrWeLxnHS6qLSglIThe/Lbbv8KylkvsvJ5bTOyEjOWzVxaQEKCbHR+fNwNdkfQdSveFZO4Riro0PDsPBLmEc96ouJiVwOcfK+o5V8ZMk18c3heFfQWyO1aoLSQk2iTTukvUdXqxRMl/OC8O/gjAXO1QXkhJsGMcSWd+l86VnTQjDv4KoLiKlLGKuFPVc+/kyEiExqzFSMXWfLyMR+iivxjCORaKew7OatJ4vI5FIhHF4qgtJCTYJjpSo5/DMZ4VitsQuC0m/wjAXadWFpASbkRznF+o3ML6P9LmX3vCBYTrYJQmOS1QXkhJo2sfMx+GF+o0W61TJt/FcmP4VZHQzjtKgmJTgsk7Ub2SsKZL5clZY7kmxXbyhQUEpwcQV9Vo6X3qxS8PyTkqC4zENCkoJIKLLkRUzX+ZJcExWXVBKIKmO+TLP6Ok4MewiXjgPuPlp4GdPAqPS5VvnyoeAqU8DE39fvjVGp4HJC4EpS4Cxc5WKKZ4vPfPmipkvI5FIZPwi9GEu/h1G8UalgSV/Bzqwn/d2dgoatPgb/omvsO4t4Pw5wa5z/SJg+679a7R3AAvXAQmuREzJfGktF5+/HHpxWM4Vjc3xlzCK99hL6JJde4BxAb3bJDiw+YOu11n/DsAC2sslC4BP93a9zv3Z8MUUz5f1fZExdwsuQ3ag1TTCdK4obI47yl2405sLNzLIZiafKrwGAFz7eHlfZACw85PgXgBFRjJfxm3J9fH1YfpWNGH87ufi+8XCLMsFsw5fIV5n2rJg1slsFa9z1sxQxZScv4zdIhQzY04Py7VuMfIBHGa7aC9n8S5ZIG7k834w68x4UbzO3cuDWSf7mlZiljZfetZFYbnWbcr9u3ISs3ypyvkyj80xh8SsSDGrc77MY7uYSGJWpJiS85fWLypyvsxz+kwcTWJWpJiy6+MrxOcvrQvCcqzH2C7eIzErS0zhfOmP6AfP+kTwMd6OdcMKjgHawFw8RWJWkJgcHfXNOKJQP9ESGyX5Ni4cA7QhwXEjiVlRYgq/uCBj3SaeLy3hGKANo6bjuyRm5YjJ0hB+cZHOl9mY9KkdWvDT+TiIufiUxKwQMV0UPDFeNfNlnnL9cpLEDDgcHSyNgifGq2a+zGNz3ENiVoSY4vnSM2+vivkyj53GOBJTfzHl86W1UnL/ZcGf+WpJvYsBJGYFiCmaL7fFD0bG2iMQcx/8EYeG6VUgMBebSEyNxZTNl9l4veT6+JowfQoM28WDJKbWYkrOX8ZSkuvj94TlUqCwNCaRmPqKWfJ8mTXPDculQDm9GceRmBqLWYvzZSTS+edEjONDElNDMWt1vsxjczxHYmoppuT8pTWtKufLPIzjVhJTPzGLmC9bxOcvY2eF5VBZYGmcQWJqKKZovlx3Sn941l7BZci9WHdK/zA9Cpxx89GfuficxNRITOl8GRsjuT7eEqZDZYO5WEti6iMm49gg6hcy1p2S6+N3huVOWWEczSSmVmIKH3wlnS+zsTFhuVNW7DQuIzH1ETPRjIIPVq2J+TLPyJkYQmLqI+boGSj4YNWamS/zMI63SEz1YjIO4YNV4Vl318R8mYdxPEFiaiGmZL4010juv/xeWM6EAuO4nsRUL6ZwvvRHHIqMuU/wbrkH2+IHh+lN2WEcJ5OY6sUUz5fmuZL5cmWIyoTD+EXoY7vYTWKqE1M6X2bMe8TzZSwVki7hwjhWkJhKxSxtvszG60NSJVwYx7RKEfO+F6pPTJovC8BcnFNqcc+c0fmvDoVYuC6YJv7yGbEwjYuDWeeZDYXX2Luv85nzQYlJ82UBxszH4TZHR6kFbn29cDODemj/mBmdD+fvig93A2dMD2adGxYV3suKTcFJWcT5y3trcr7Mwzg2lFrkcXOBt3Yc2MhZK4NrpO0CTYsP/IeMXXs6/ygqyHUebD1wL69vB86bHaiYsuvj68TnL63RYTmiBMYxL4hC108Hfr2884+oHl4DXP1osLLkc8E8YF4WeHo9MCcDjA34z6fymfQ48OhLnev8almwH+G2K7s+PuxweGa74GP8E/gj+oXpSegkmnFlORpLEUdyfXyseL40V4TpiBISM3CM6ibVWuTnLy1Xcn38trD8UApz8YHqZtVUOOaI+iGfL2OjwnJDKYxjifJm1VASaUwo1AuaL78E45iiulm1lPrZGFyoFzRffolEM5jqZtVKmItNol7As5ppvvyC8YvQj3HsUd20WgjjmCfqBTxzvVDMVUNZWF5oAeNYpbpptRDhfNlqGvDMDoGYu4H6vmF6oZwEx29UN60WIpwvPesiyfXx5WE6oQWJNC5U3bRqj3S+zJjTJdfHbwnLB21IzMUg1Y2r9pQ8X7bE7bB80ArbxRbVzavm0HzZQ5iL+aqbV7Xh6EjMxaBCtaf5UkAQNw5Tug7j8ES1h2fNpPmyACmgN3PxmuomVmNGcvxQVHt4Vk5y/+WpYXmgJYk0JqhuYhXmlRTQu1DN4Q0fKPkY/xgY3ydMD7TEdrFMg2ZWRZiLz1kap4nqDS92qeT6+LNh9V5rzpyFOsbxuuqmVkNYGjfI6o2sNUtyfXxKGH2vCFgaw22Ot1U3tpKTSKOoGy5ovuwmo5txFHPRqrrBlRbGsYelMamYGtN82UPqX0Rf5uIWO4DHydRCmIsMc3FssfWl+bJEEnMxKJHGXbaL91Q3X8O0M47nmYtzultXeNZcmi8DYPwi9Ek0gzEXtzCOJxjHKptjfS2Fcbxsu1hmc9zH0rhc9ItHGfDMTeL7L+MnBdk/gpCCtfHBkvlyB5AqeP6TIMoCPGuCRMylqo+RqEGQteaJxYw1qj5Gogah+ZLQDpovCS2h+fJLoOVbh8GL3QrP+is8ayVFZcy3aL6M5G/dt3zxyVyKNlllHa/amVCA9Bd4FI2yHUAv1c6EAjzrdQ0KTikmnrlYtS+hAc98W3nBKcWKKb2Hs2qAZz6ivOCUYqRsRzY2TLUvoYHV8Tgy5nblhaeIkzV/rdqV0EFm6NHwzEeRsd5BxtpJ0SYfwbP+hqz1E9WOEARBEARBEARBEARBEARBEARRDdSn0LeuyT9tQNKfaCT9awzHv8xo8keoPq5KZ0TK72c4GxN1Df4VRtK/xmjYeMnAJn+46uPSnkENbxxpOG3paDK3I5rM4YA4/rZoQ9vN8dS2g1UfayVx1E1tQw3Hn28k/V1d1dVI+pujybbJ9SnU5nPVRdQ5bT+IJv2dXQp5QPytAxt9+tVeEXzxifNJcXXNrad30C9hNLRNKrJw+1/ljv9xXZMvfAhprRN12qZ2t65Rx99e17jlONXHrhyjcSOLOrnPu13ATjnfHZzc2uNn9VQz0ca27/ekpvlPpCOnvH+I6j0oA0CvaNLf0PMC5mA4/nzV+9CNESm/XzTpv1lKXaOOf7fqfSjDaNh4TknF68xeetf8KnUNbT8uta6G439sNv3j66r3ogTDyS0IQEwYSf8a1XvRiajjLw2irgMaNo5VvRclRB3/5SAKGHXaZqnei04YydzbgbzgHT+lei9KKHkO+l8Bc7XzE9MiiDr+Z/SCL4Fo0n8jmI/ytidU70UnCp1I73ZdG3LNqveihKiTeyGQV3bSv0v1XnSi1DMd+z+J2hpU70UJRtK/PZh3zI1nq96LTkSd3Owg6jow6Z+sei9KOLJpy7Co47eXJmXubbrG+1XqGjZ/p/R3S/9V1ftQiuH4D5Q4B12neg86Ek36fyylrnWOf6HqPSgl3rjtCMPxt/SogE7umZp5Elk3GTB10xDDyb3fw3fLB1UfvxYMbPKHd/cbuuH4K4ak3u2v+th1Jtq08YTuymkkc38YkfL7qT52bTCbfMNwck/K3yX9zwynbdop83GQ6mOuBDrfOf3n5C/03G6jwb8plSr8X+Y1zaAbN3876vgzDCfXlr/ryEjm/mM4ubWG499hJLeaqo+xEjGSbbaR9Od13hTs7+usq7/LSOZa6hz/1iE3bR6g+hjD5L/eInqc7JErdQAAAABJRU5ErkJggg=="

/***/ }),
/* 328 */
/*!********************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/index/drink.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 329 */
/*!*********************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/index/fruits.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */
/*!****************************************************************************!*\
  !*** J:/homeWorkFile/canteen-mp-new/common/images/layout/foooter-miao.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAF4CAIAAACEqOteAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOTVFODRFNjRDQ0QxMUVBQkEzRERGQUQ1NTE1MjZDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOTVFODRFNzRDQ0QxMUVBQkEzRERGQUQ1NTE1MjZDMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NUU4NEU0NENDRDExRUFCQTNEREZBRDU1MTUyNkMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM5NUU4NEU1NENDRDExRUFCQTNEREZBRDU1MTUyNkMxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+wQ1RmgAAOGtJREFUeNrs3Xl7E0e2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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map