!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.Github=e()}}(function(){var e;return function t(e,n,r){function o(s,u){if(!n[s]){if(!e[s]){var a="function"==typeof require&&require;if(!u&&a)return a(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[s]={exports:{}};e[s][0].call(f.exports,function(t){var n=e[s][1][t];return o(n?n:t)},f,f.exports,t,e,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,n){t.exports=e("./lib/axios")},{"./lib/axios":3}],2:[function(e,t,n){"use strict";var r=e("./../utils"),o=e("./../helpers/buildURL"),i=e("./../helpers/parseHeaders"),s=e("./../helpers/transformData"),u=e("./../helpers/isURLSameOrigin"),a=window.btoa||e("./../helpers/btoa");t.exports=function(t,n,c){var f=c.data,l=c.headers;r.isFormData(f)&&delete l["Content-Type"];var p=new XMLHttpRequest;if(!window.XDomainRequest||"withCredentials"in p||u(c.url)||(p=new window.XDomainRequest),c.auth){var h=c.auth.username||"",d=c.auth.password||"";l.Authorization="Basic "+a(h+":"+d)}if(p.open(c.method.toUpperCase(),o(c.url,c.params,c.paramsSerializer),!0),p.timeout=c.timeout,p.onload=function(){if(p){var e="getAllResponseHeaders"in p?i(p.getAllResponseHeaders()):null,r=-1!==["text",""].indexOf(c.responseType||"")?p.responseText:p.response,o={data:s(r,e,c.transformResponse),status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:e,config:c,request:p};(o.status>=200&&o.status<300||!("status"in p)&&o.responseText?t:n)(o),p=null}},p.onerror=function(){n(new Error("Network Error")),p=null},r.isStandardBrowserEnv()){var m=e("./../helpers/cookies"),g=c.withCredentials||u(c.url)?m.read(c.xsrfCookieName):void 0;g&&(l[c.xsrfHeaderName]=g)}if("setRequestHeader"in p&&r.forEach(l,function(e,t){"undefined"==typeof f&&"content-type"===t.toLowerCase()?delete l[t]:p.setRequestHeader(t,e)}),c.withCredentials&&(p.withCredentials=!0),c.responseType)try{p.responseType=c.responseType}catch(v){if("json"!==p.responseType)throw v}r.isArrayBuffer(f)&&(f=new DataView(f)),p.send(f)}},{"./../helpers/btoa":8,"./../helpers/buildURL":9,"./../helpers/cookies":11,"./../helpers/isURLSameOrigin":13,"./../helpers/parseHeaders":14,"./../helpers/transformData":16,"./../utils":17}],3:[function(e,t,n){"use strict";function r(e){this.defaults=i.merge({},e),this.interceptors={request:new u,response:new u}}var o=e("./defaults"),i=e("./utils"),s=e("./core/dispatchRequest"),u=e("./core/InterceptorManager"),a=e("./helpers/isAbsoluteURL"),c=e("./helpers/combineURLs"),f=e("./helpers/bind"),l=e("./helpers/transformData");r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,this.defaults,{method:"get"},e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.withCredentials=e.withCredentials||this.defaults.withCredentials,e.data=l(e.data,e.headers,e.transformRequest),e.headers=i.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),i.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n};var p=new r(o),h=t.exports=f(r.prototype.request,p);h.create=function(e){return new r(e)},h.defaults=p.defaults,h.all=function(e){return Promise.all(e)},h.spread=e("./helpers/spread"),h.interceptors=p.interceptors,i.forEach(["delete","get","head"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))},h[e]=f(r.prototype[e],p)}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))},h[e]=f(r.prototype[e],p)})},{"./core/InterceptorManager":4,"./core/dispatchRequest":5,"./defaults":6,"./helpers/bind":7,"./helpers/combineURLs":10,"./helpers/isAbsoluteURL":12,"./helpers/spread":15,"./helpers/transformData":16,"./utils":17}],4:[function(e,t,n){"use strict";function r(){this.handlers=[]}var o=e("./../utils");r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},t.exports=r},{"./../utils":17}],5:[function(e,t,n){(function(n){"use strict";t.exports=function(t){return new Promise(function(r,o){try{var i;"function"==typeof t.adapter?i=t.adapter:"undefined"!=typeof XMLHttpRequest?i=e("../adapters/xhr"):"undefined"!=typeof n&&(i=e("../adapters/http")),"function"==typeof i&&i(r,o,t)}catch(s){o(s)}})}}).call(this,e("_process"))},{"../adapters/http":2,"../adapters/xhr":2,_process:20}],6:[function(e,t,n){"use strict";var r=e("./utils"),o=/^\)\]\}',?\n/,i={"Content-Type":"application/x-www-form-urlencoded"};t.exports={transformRequest:[function(e,t){return r.isFormData(e)?e:r.isArrayBuffer(e)?e:r.isArrayBufferView(e)?e.buffer:!r.isObject(e)||r.isFile(e)||r.isBlob(e)?e:(r.isUndefined(t)||(r.forEach(t,function(e,n){"content-type"===n.toLowerCase()&&(t["Content-Type"]=e)}),r.isUndefined(t["Content-Type"])&&(t["Content-Type"]="application/json;charset=utf-8")),JSON.stringify(e))}],transformResponse:[function(e){if("string"==typeof e){e=e.replace(o,"");try{e=JSON.parse(e)}catch(t){}}return e}],headers:{common:{Accept:"application/json, text/plain, */*"},patch:r.merge(i),post:r.merge(i),put:r.merge(i)},timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"}},{"./utils":17}],7:[function(e,t,n){"use strict";t.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},{}],8:[function(e,t,n){"use strict";function r(e){this.message=e}function o(e){for(var t,n,o=String(e),s="",u=0,a=i;o.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if(n=o.charCodeAt(u+=.75),n>255)throw new r("INVALID_CHARACTER_ERR: DOM Exception 5");t=t<<8|n}return s}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",t.exports=o},{}],9:[function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=e("./../utils");t.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},{"./../utils":17}],10:[function(e,t,n){"use strict";t.exports=function(e,t){return e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}},{}],11:[function(e,t,n){"use strict";var r=e("./../utils");t.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),s===!0&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},{"./../utils":17}],12:[function(e,t,n){"use strict";t.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},{}],13:[function(e,t,n){"use strict";var r=e("./../utils");t.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},{"./../utils":17}],14:[function(e,t,n){"use strict";var r=e("./../utils");t.exports=function(e){var t,n,o,i={};return e?(r.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t&&(i[t]=i[t]?i[t]+", "+n:n)}),i):i}},{"./../utils":17}],15:[function(e,t,n){"use strict";t.exports=function(e){return function(t){return e.apply(null,t)}}},{}],16:[function(e,t,n){"use strict";var r=e("./../utils");t.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},{"./../utils":17}],17:[function(e,t,n){"use strict";function r(e){return"[object Array]"===y.call(e)}function o(e){return"[object ArrayBuffer]"===y.call(e)}function i(e){return"[object FormData]"===y.call(e)}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return"string"==typeof e}function a(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function l(e){return"[object Date]"===y.call(e)}function p(e){return"[object File]"===y.call(e)}function h(e){return"[object Blob]"===y.call(e)}function d(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function m(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function g(e,t){if(null!==e&&"undefined"!=typeof e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var n=0,o=e.length;o>n;n++)t.call(null,e[n],n,e);else for(var i in e)e.hasOwnProperty(i)&&t.call(null,e[i],i,e)}function v(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=v(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;r>n;n++)g(arguments[n],e);return t}var y=Object.prototype.toString;t.exports={isArray:r,isArrayBuffer:o,isFormData:i,isArrayBufferView:s,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:l,isFile:p,isBlob:h,isStandardBrowserEnv:m,forEach:g,merge:v,trim:d}},{}],18:[function(t,n,r){(function(t){!function(o){var i="object"==typeof r&&r,s="object"==typeof n&&n&&n.exports==i&&n,u="object"==typeof t&&t;(u.global===u||u.window===u)&&(o=u);var a=function(e){this.message=e};a.prototype=new Error,a.prototype.name="InvalidCharacterError";var c=function(e){throw new a(e)},f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l=/[\t\n\f\r ]/g,p=function(e){e=String(e).replace(l,"");var t=e.length;t%4==0&&(e=e.replace(/==?$/,""),t=e.length),(t%4==1||/[^+a-zA-Z0-9\/]/.test(e))&&c("Invalid character: the string to be decoded is not correctly encoded.");for(var n,r,o=0,i="",s=-1;++s<t;)r=f.indexOf(e.charAt(s)),n=o%4?64*n+r:r,o++%4&&(i+=String.fromCharCode(255&n>>(-2*o&6)));return i},h=function(e){e=String(e),/[^\0-\xFF]/.test(e)&&c("The string to be encoded contains characters outside of the Latin1 range.");for(var t,n,r,o,i=e.length%3,s="",u=-1,a=e.length-i;++u<a;)t=e.charCodeAt(u)<<16,n=e.charCodeAt(++u)<<8,r=e.charCodeAt(++u),o=t+n+r,s+=f.charAt(o>>18&63)+f.charAt(o>>12&63)+f.charAt(o>>6&63)+f.charAt(63&o);return 2==i?(t=e.charCodeAt(u)<<8,n=e.charCodeAt(++u),o=t+n,s+=f.charAt(o>>10)+f.charAt(o>>4&63)+f.charAt(o<<2&63)+"="):1==i&&(o=e.charCodeAt(u),s+=f.charAt(o>>2)+f.charAt(o<<4&63)+"=="),s},d={encode:h,decode:p,version:"0.1.0"};if("function"==typeof e&&"object"==typeof e.amd&&e.amd)e(function(){return d});else if(i&&!i.nodeType)if(s)s.exports=d;else for(var m in d)d.hasOwnProperty(m)&&(i[m]=d[m]);else o.base64=d}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],19:[function(t,n,r){(function(r,o){(function(){"use strict";function i(e){return"function"==typeof e||"object"==typeof e&&null!==e}function s(e){return"function"==typeof e}function u(e){V=e}function a(e){$=e}function c(){return function(){r.nextTick(d)}}function f(){return function(){z(d)}}function l(){var e=0,t=new Q(d),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function p(){var e=new MessageChannel;return e.port1.onmessage=d,function(){e.port2.postMessage(0)}}function h(){return function(){setTimeout(d,1)}}function d(){for(var e=0;Y>e;e+=2){var t=ne[e],n=ne[e+1];t(n),ne[e]=void 0,ne[e+1]=void 0}Y=0}function m(){try{var e=t,n=e("vertx");return z=n.runOnLoop||n.runOnContext,f()}catch(r){return h()}}function g(e,t){var n=this,r=n._state;if(r===se&&!e||r===ue&&!t)return this;var o=new this.constructor(y),i=n._result;if(r){var s=arguments[r-1];$(function(){P(r,o,s,i)})}else j(n,o,e,t);return o}function v(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var n=new t(y);return C(n,e),n}function y(){}function w(){return new TypeError("You cannot resolve a promise with itself")}function b(){return new TypeError("A promises callback cannot return that same promise.")}function E(e){try{return e.then}catch(t){return ae.error=t,ae}}function T(e,t,n,r){try{e.call(t,n,r)}catch(o){return o}}function R(e,t,n){$(function(e){var r=!1,o=T(n,t,function(n){r||(r=!0,t!==n?C(e,n):S(e,n))},function(t){r||(r=!0,U(e,t))},"Settle: "+(e._label||" unknown promise"));!r&&o&&(r=!0,U(e,o))},e)}function _(e,t){t._state===se?S(e,t._result):t._state===ue?U(e,t._result):j(t,void 0,function(t){C(e,t)},function(t){U(e,t)})}function A(e,t,n){t.constructor===e.constructor&&n===re&&constructor.resolve===oe?_(e,t):n===ae?U(e,ae.error):void 0===n?S(e,t):s(n)?R(e,t,n):S(e,t)}function C(e,t){e===t?U(e,w()):i(t)?A(e,t,E(t)):S(e,t)}function x(e){e._onerror&&e._onerror(e._result),I(e)}function S(e,t){e._state===ie&&(e._result=t,e._state=se,0!==e._subscribers.length&&$(I,e))}function U(e,t){e._state===ie&&(e._state=ue,e._result=t,$(x,e))}function j(e,t,n,r){var o=e._subscribers,i=o.length;e._onerror=null,o[i]=t,o[i+se]=n,o[i+ue]=r,0===i&&e._state&&$(I,e)}function I(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var r,o,i=e._result,s=0;s<t.length;s+=3)r=t[s],o=t[s+n],r?P(n,r,o,i):o(i);e._subscribers.length=0}}function O(){this.error=null}function G(e,t){try{return e(t)}catch(n){return ce.error=n,ce}}function P(e,t,n,r){var o,i,u,a,c=s(n);if(c){if(o=G(n,r),o===ce?(a=!0,i=o.error,o=null):u=!0,t===o)return void U(t,b())}else o=r,u=!0;t._state!==ie||(c&&u?C(t,o):a?U(t,i):e===se?S(t,o):e===ue&&U(t,o))}function D(e,t){try{t(function(t){C(e,t)},function(t){U(e,t)})}catch(n){U(e,n)}}function L(e){return new me(this,e).promise}function k(e){function t(e){C(o,e)}function n(e){U(o,e)}var r=this,o=new r(y);if(!K(e))return U(o,new TypeError("You must pass an array to race.")),o;for(var i=e.length,s=0;o._state===ie&&i>s;s++)j(r.resolve(e[s]),void 0,t,n);return o}function q(e){var t=this,n=new t(y);return U(n,e),n}function H(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function B(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function F(e){this._id=he++,this._state=void 0,this._result=void 0,this._subscribers=[],y!==e&&("function"!=typeof e&&H(),this instanceof F?D(this,e):B())}function N(e,t){this._instanceConstructor=e,this.promise=new e(y),Array.isArray(t)?(this._input=t,this.length=t.length,this._remaining=t.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):U(this.promise,this._validationError())}function M(){var e;if("undefined"!=typeof o)e=o;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=e.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(e.Promise=de)}var X;X=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var z,V,J,K=X,Y=0,$=function(e,t){ne[Y]=e,ne[Y+1]=t,Y+=2,2===Y&&(V?V(d):J())},W="undefined"!=typeof window?window:void 0,Z=W||{},Q=Z.MutationObserver||Z.WebKitMutationObserver,ee="undefined"!=typeof r&&"[object process]"==={}.toString.call(r),te="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,ne=new Array(1e3);J=ee?c():Q?l():te?p():void 0===W&&"function"==typeof t?m():h();var re=g,oe=v,ie=void 0,se=1,ue=2,ae=new O,ce=new O,fe=L,le=k,pe=q,he=0,de=F;F.all=fe,F.race=le,F.resolve=oe,F.reject=pe,F._setScheduler=u,F._setAsap=a,F._asap=$,F.prototype={constructor:F,then:re,"catch":function(e){return this.then(null,e)}};var me=N;N.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},N.prototype._enumerate=function(){for(var e=this.length,t=this._input,n=0;this._state===ie&&e>n;n++)this._eachEntry(t[n],n)},N.prototype._eachEntry=function(e,t){var n=this._instanceConstructor,r=n.resolve;if(r===oe){var o=E(e);if(o===re&&e._state!==ie)this._settledAt(e._state,t,e._result);else if("function"!=typeof o)this._remaining--,this._result[t]=e;else if(n===de){var i=new n(y);A(i,e,o),this._willSettleAt(i,t)}else this._willSettleAt(new n(function(t){t(e)}),t)}else this._willSettleAt(r(e),t)},N.prototype._settledAt=function(e,t,n){var r=this.promise;r._state===ie&&(this._remaining--,e===ue?U(r,n):this._result[t]=n),0===this._remaining&&S(r,this._result)},N.prototype._willSettleAt=function(e,t){var n=this;j(e,void 0,function(e){n._settledAt(se,t,e)},function(e){n._settledAt(ue,t,e)})};var ge=M,ve={Promise:de,polyfill:ge};"function"==typeof e&&e.amd?e(function(){return ve}):"undefined"!=typeof n&&n.exports?n.exports=ve:"undefined"!=typeof this&&(this.ES6Promise=ve),ge()}).call(this)}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:20}],20:[function(e,t,n){function r(){f=!1,u.length?c=u.concat(c):l=-1,c.length&&o()}function o(){if(!f){var e=setTimeout(r);f=!0;for(var t=c.length;t;){for(u=c,c=[];++l<t;)u&&u[l].run();l=-1,t=c.length}u=null,f=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function s(){}var u,a=t.exports={},c=[],f=!1,l=-1;a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new i(e,t)),1!==c.length||f||setTimeout(o,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=s,a.addListener=s,a.once=s,a.off=s,a.removeListener=s,a.removeAllListeners=s,a.emit=s,a.binding=function(e){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},{}],21:[function(t,n,r){(function(t){!function(o){function i(e){for(var t,n,r=[],o=0,i=e.length;i>o;)t=e.charCodeAt(o++),t>=55296&&56319>=t&&i>o?(n=e.charCodeAt(o++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),o--)):r.push(t);return r}function s(e){for(var t,n=e.length,r=-1,o="";++r<n;)t=e[r],t>65535&&(t-=65536,o+=b(t>>>10&1023|55296),t=56320|1023&t),o+=b(t);return o}function u(e){if(e>=55296&&57343>=e)throw Error("Lone surrogate U+"+e.toString(16).toUpperCase()+" is not a scalar value")}function a(e,t){return b(e>>t&63|128)}function c(e){if(0==(4294967168&e))return b(e);var t="";return 0==(4294965248&e)?t=b(e>>6&31|192):0==(4294901760&e)?(u(e),t=b(e>>12&15|224),t+=a(e,6)):0==(4292870144&e)&&(t=b(e>>18&7|240),t+=a(e,12),t+=a(e,6)),t+=b(63&e|128)}function f(e){for(var t,n=i(e),r=n.length,o=-1,s="";++o<r;)t=n[o],s+=c(t);return s}function l(){if(w>=y)throw Error("Invalid byte index");var e=255&v[w];if(w++,128==(192&e))return 63&e;throw Error("Invalid continuation byte")}function p(){var e,t,n,r,o;if(w>y)throw Error("Invalid byte index");if(w==y)return!1;if(e=255&v[w],w++,0==(128&e))return e;if(192==(224&e)){var t=l();if(o=(31&e)<<6|t,o>=128)return o;throw Error("Invalid continuation byte")}if(224==(240&e)){if(t=l(),n=l(),o=(15&e)<<12|t<<6|n,o>=2048)return u(o),o;throw Error("Invalid continuation byte")}if(240==(248&e)&&(t=l(),n=l(),r=l(),o=(15&e)<<18|t<<12|n<<6|r,o>=65536&&1114111>=o))return o;throw Error("Invalid UTF-8 detected")}function h(e){v=i(e),y=v.length,w=0;for(var t,n=[];(t=p())!==!1;)n.push(t);return s(n)}var d="object"==typeof r&&r,m="object"==typeof n&&n&&n.exports==d&&n,g="object"==typeof t&&t;(g.global===g||g.window===g)&&(o=g);var v,y,w,b=String.fromCharCode,E={version:"2.0.0",encode:f,decode:h};if("function"==typeof e&&"object"==typeof e.amd&&e.amd)e(function(){return E});else if(d&&!d.nodeType)if(m)m.exports=E;else{var T={},R=T.hasOwnProperty;for(var _ in E)R.call(E,_)&&(d[_]=E[_])}else o.utf8=E}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],22:[function(t,n,r){"use strict";!function(r,o){"function"==typeof e&&e.amd?e(["es6-promise","base-64","utf8","axios"],function(e,t,n,i){return r.Github=o(e,t,n,i)}):"object"==typeof n&&n.exports?n.exports=o(t("es6-promise"),t("base-64"),t("utf8"),t("axios")):r.Github=o(r.Promise,r.base64,r.utf8,r.axios)}(this,function(e,t,n,r){function o(e){return t.encode(n.encode(e))}e.polyfill&&e.polyfill();var i=function(e){e=e||{};var t=e.apiUrl||"https://api.github.com",n=i._request=function(n,i,s,u,a){function c(){var e=i.indexOf("//")>=0?i:t+i;if(e+=/\?/.test(e)?"&":"?",s&&"object"==typeof s&&["GET","HEAD","DELETE"].indexOf(n)>-1)for(var r in s)s.hasOwnProperty(r)&&(e+="&"+encodeURIComponent(r)+"="+encodeURIComponent(s[r]));return e.replace(/(&timestamp=\d+)/,"")+("undefined"!=typeof window?"&timestamp="+(new Date).getTime():"")}var f={headers:{Accept:a?"application/vnd.github.v3.raw+json":"application/vnd.github.v3+json","Content-Type":"application/json;charset=UTF-8"},method:n,data:s?s:{},url:c()};return(e.token||e.username&&e.password)&&(f.headers.Authorization=e.token?"token "+e.token:"Basic "+o(e.username+":"+e.password)),r(f).then(function(e){u(null,e.data||!0,e.request)},function(e){304===e.status?u(null,e.data||!0,e.request):u({path:i,request:e.request,error:e.status})})},s=i._requestAllPages=function(e,t){var r=[];!function o(){n("GET",e,null,function(n,i,s){if(n)return t(n);i instanceof Array||(i=[i]),r.push.apply(r,i);var u=(s.getResponseHeader("link")||"").split(",").filter(function(e){return/rel="next"/.test(e)}).map(function(e){return(/<(.*)>/.exec(e)||[])[1]}).pop();u?(e=u,o()):t(n,r,s)})}()};return i.User=function(){this.repos=function(e,t){"function"==typeof e&&(t=e,e={}),e=e||{};var n="/user/repos",r=[];r.push("type="+encodeURIComponent(e.type||"all")),r.push("sort="+encodeURIComponent(e.sort||"updated")),r.push("per_page="+encodeURIComponent(e.per_page||"100")),e.page&&r.push("page="+encodeURIComponent(e.page)),n+="?"+r.join("&"),s(n,t)},this.orgs=function(e){n("GET","/user/orgs",null,e)},this.gists=function(e){n("GET","/gists",null,e)},this.notifications=function(e,t){"function"==typeof e&&(t=e,e={}),e=e||{};var r="/notifications",o=[];if(e.all&&o.push("all=true"),e.participating&&o.push("participating=true"),e.since){var i=e.since;i.constructor===Date&&(i=i.toISOString()),o.push("since="+encodeURIComponent(i))}if(e.before){var s=e.before;s.constructor===Date&&(s=s.toISOString()),o.push("before="+encodeURIComponent(s))}e.page&&o.push("page="+encodeURIComponent(e.page)),o.length>0&&(r+="?"+o.join("&")),n("GET",r,null,t)},this.show=function(e,t){var r=e?"/users/"+e:"/user";n("GET",r,null,t)},this.userRepos=function(e,t,n){"function"==typeof t&&(n=t,t={});var r="/users/"+e+"/repos",o=[];o.push("type="+encodeURIComponent(t.type||"all")),o.push("sort="+encodeURIComponent(t.sort||"updated")),o.push("per_page="+encodeURIComponent(t.per_page||"100")),t.page&&o.push("page="+encodeURIComponent(t.page)),r+="?"+o.join("&"),s(r,n)},this.userStarred=function(e,t){s("/users/"+e+"/starred?type=all&per_page=100",t)},this.userGists=function(e,t){n("GET","/users/"+e+"/gists",null,t)},this.orgRepos=function(e,t){s("/orgs/"+e+"/repos?type=all&&page_num=1000&sort=updated&direction=desc",t)},this.follow=function(e,t){n("PUT","/user/following/"+e,null,t)},this.unfollow=function(e,t){n("DELETE","/user/following/"+e,null,t)},this.createRepo=function(e,t){n("POST","/user/repos",e,t)}},i.Repository=function(e){function t(e,t){return e===f.branch&&f.sha?t(null,f.sha):void c.getRef("heads/"+e,function(n,r){f.branch=e,f.sha=r,t(n,r)})}var r,s=e.name,u=e.user,a=e.fullname,c=this;r=a?"/repos/"+a:"/repos/"+u+"/"+s;var f={branch:null,sha:null};this.getRef=function(e,t){n("GET",r+"/git/refs/"+e,null,function(e,n,r){return e?t(e):void t(null,n.object.sha,r)})},this.createRef=function(e,t){n("POST",r+"/git/refs",e,t)},this.deleteRef=function(t,o){n("DELETE",r+"/git/refs/"+t,e,o)},this.deleteRepo=function(t){n("DELETE",r,e,t)},this.listTags=function(e){n("GET",r+"/tags",null,e)},this.listPulls=function(e,t){e=e||{};var o=r+"/pulls",i=[];"string"==typeof e?i.push("state="+e):(e.state&&i.push("state="+encodeURIComponent(e.state)),e.head&&i.push("head="+encodeURIComponent(e.head)),e.base&&i.push("base="+encodeURIComponent(e.base)),e.sort&&i.push("sort="+encodeURIComponent(e.sort)),e.direction&&i.push("direction="+encodeURIComponent(e.direction)),e.page&&i.push("page="+e.page),e.per_page&&i.push("per_page="+e.per_page)),i.length>0&&(o+="?"+i.join("&")),n("GET",o,null,t)},this.getPull=function(e,t){n("GET",r+"/pulls/"+e,null,t)},this.compare=function(e,t,o){n("GET",r+"/compare/"+e+"..."+t,null,o)},this.listBranches=function(e){n("GET",r+"/git/refs/heads",null,function(t,n,r){return t?e(t):(n=n.map(function(e){return e.ref.replace(/^refs\/heads\//,"")}),void e(null,n,r))})},this.getBlob=function(e,t){n("GET",r+"/git/blobs/"+e,null,t,"raw")},this.getCommit=function(e,t,o){n("GET",r+"/git/commits/"+t,null,o)},this.getSha=function(e,t,o){return t&&""!==t?void n("GET",r+"/contents/"+t+(e?"?ref="+e:""),null,function(e,t,n){return e?o(e):void o(null,t.sha,n)}):c.getRef("heads/"+e,o)},this.getStatuses=function(e,t){n("GET",r+"/statuses/"+e,null,t)},this.getTree=function(e,t){n("GET",r+"/git/trees/"+e,null,function(e,n,r){return e?t(e):void t(null,n.tree,r)})},this.postBlob=function(e,t){e="string"==typeof e?{content:e,encoding:"utf-8"}:{content:o(e),encoding:"base64"},n("POST",r+"/git/blobs",e,function(e,n,r){return e?t(e):void t(null,n.sha,r)})},this.updateTree=function(e,t,o,i){var s={base_tree:e,tree:[{path:t,mode:"100644",type:"blob",sha:o}]};n("POST",r+"/git/trees",s,function(e,t,n){return e?i(e):void i(null,t.sha,n)})},this.postTree=function(e,t){n("POST",r+"/git/trees",{tree:e},function(e,n,r){return e?t(e):void t(null,n.sha,r)})},this.commit=function(t,o,s,u){var a=new i.User;a.show(null,function(i,a){if(i)return u(i);var c={message:s,author:{name:e.user,email:a.email},parents:[t],tree:o};n("POST",r+"/git/commits",c,function(e,t,n){return e?u(e):(f.sha=t.sha,void u(null,t.sha,n))})})},this.updateHead=function(e,t,o){n("PATCH",r+"/git/refs/heads/"+e,{sha:t},o)},this.show=function(e){n("GET",r,null,e)},this.contributors=function(e,t){t=t||1e3;var o=this;n("GET",r+"/stats/contributors",null,function(n,r,i){return n?e(n):void(202===i.status?setTimeout(function(){o.contributors(e,t)},t):e(n,r,i))})},this.contents=function(e,t,o){t=encodeURI(t),n("GET",r+"/contents"+(t?"/"+t:""),{ref:e},o)},this.fork=function(e){n("POST",r+"/forks",null,e)},this.listForks=function(e){n("GET",r+"/forks",null,e)},this.branch=function(e,t,n){2===arguments.length&&"function"==typeof arguments[1]&&(n=t,t=e,e="master"),this.getRef("heads/"+e,function(e,r){return e&&n?n(e):void c.createRef({ref:"refs/heads/"+t,sha:r},n)})},this.createPullRequest=function(e,t){n("POST",r+"/pulls",e,t)},this.listHooks=function(e){n("GET",r+"/hooks",null,e)},this.getHook=function(e,t){n("GET",r+"/hooks/"+e,null,t)},this.createHook=function(e,t){n("POST",r+"/hooks",e,t)},this.editHook=function(e,t,o){n("PATCH",r+"/hooks/"+e,t,o)},this.deleteHook=function(e,t){n("DELETE",r+"/hooks/"+e,null,t)},this.read=function(e,t,o){n("GET",r+"/contents/"+encodeURI(t)+(e?"?ref="+e:""),null,o,!0)},this.remove=function(e,t,o){c.getSha(e,t,function(i,s){return i?o(i):void n("DELETE",r+"/contents/"+t,{message:t+" is removed",sha:s,branch:e},o)})},this["delete"]=this.remove,this.move=function(e,n,r,o){t(e,function(t,i){c.getTree(i+"?recursive=true",function(t,s){s.forEach(function(e){e.path===n&&(e.path=r),"tree"===e.type&&delete e.sha}),c.postTree(s,function(t,r){c.commit(i,r,"Deleted "+n,function(t,n){c.updateHead(e,n,o)})})})})},this.write=function(e,t,i,s,u,a){"function"==typeof u&&(a=u,u={}),c.getSha(e,encodeURI(t),function(c,f){var l={message:s,content:"undefined"==typeof u.encode||u.encode?o(i):i,branch:e,committer:u&&u.committer?u.committer:void 0,author:u&&u.author?u.author:void 0};c&&404!==c.error||(l.sha=f),n("PUT",r+"/contents/"+encodeURI(t),l,a)})},this.getCommits=function(e,t){e=e||{};var o=r+"/commits",i=[];if(e.sha&&i.push("sha="+encodeURIComponent(e.sha)),e.path&&i.push("path="+encodeURIComponent(e.path)),e.author&&i.push("author="+encodeURIComponent(e.author)),e.since){var s=e.since;s.constructor===Date&&(s=s.toISOString()),i.push("since="+encodeURIComponent(s))}if(e.until){var u=e.until;u.constructor===Date&&(u=u.toISOString()),i.push("until="+encodeURIComponent(u))}e.page&&i.push("page="+e.page),e.perpage&&i.push("per_page="+e.perpage),i.length>0&&(o+="?"+i.join("&")),n("GET",o,null,t)},this.isStarred=function(e,t,r){n("GET","/user/starred/"+e+"/"+t,null,r)},this.star=function(e,t,r){n("PUT","/user/starred/"+e+"/"+t,null,r)},this.unstar=function(e,t,r){n("DELETE","/user/starred/"+e+"/"+t,null,r)},this.createRelease=function(e,t){n("POST",r+"/releases",e,t)},this.editRelease=function(e,t,o){n("PATCH",r+"/releases/"+e,t,o)},this.getRelease=function(e,t){n("GET",r+"/releases/"+e,null,t)},this.deleteRelease=function(e,t){n("DELETE",r+"/releases/"+e,null,t)}},i.Gist=function(e){var t=e.id,r="/gists/"+t;this.read=function(e){n("GET",r,null,e)},this.create=function(e,t){n("POST","/gists",e,t)},this["delete"]=function(e){n("DELETE",r,null,e)},this.fork=function(e){n("POST",r+"/fork",null,e)},this.update=function(e,t){n("PATCH",r,e,t)},this.star=function(e){n("PUT",r+"/star",null,e)},this.unstar=function(e){n("DELETE",r+"/star",null,e)},this.isStarred=function(e){n("GET",r+"/star",null,e)}},i.Issue=function(e){var t="/repos/"+e.user+"/"+e.repo+"/issues";this.create=function(e,r){n("POST",t,e,r)},this.list=function(e,n){var r=[];for(var o in e)e.hasOwnProperty(o)&&r.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));s(t+"?"+r.join("&"),n)},this.comment=function(e,t,r){n("POST",e.comments_url,{body:t},r)},this.edit=function(e,r,o){n("PATCH",t+"/"+e,r,o)},this.get=function(e,r){n("GET",t+"/"+e,null,r)}},i.Search=function(e){var t="/search/",r="?q="+e.query;this.repositories=function(e,o){n("GET",t+"repositories"+r,e,o)},this.code=function(e,o){n("GET",t+"code"+r,e,o)},this.issues=function(e,o){n("GET",t+"issues"+r,e,o)},this.users=function(e,o){n("GET",t+"users"+r,e,o)}},i.RateLimit=function(){this.getRateLimit=function(e){n("GET","/rate_limit",null,e)}},i};return i.getIssues=function(e,t){return new i.Issue({user:e,repo:t})},i.getRepo=function(e,t){
return t?new i.Repository({user:e,name:t}):new i.Repository({fullname:e})},i.getUser=function(){return new i.User},i.getGist=function(e){return new i.Gist({id:e})},i.getSearch=function(e){return new i.Search({query:e})},i.getRateLimit=function(){return new i.RateLimit},i})},{axios:1,"base-64":18,"es6-promise":19,utf8:21}]},{},[22])(22)});