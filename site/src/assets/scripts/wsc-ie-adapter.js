/*! wsc Built on: 2020-09-03 */
window.console||(console={log:function(){},info:function(){},debug:function(){},warn:function(){},error:function(){}}),"function"!=typeof Date.prototype.now&&(Date.now=function(){return+new Date}),"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),"undefined"==typeof Error.prototype.stack&&(Error.prototype.stack="Error:\n\n\n\n\n");var browserIsIE=!1,IEversion=null;if(-1!=navigator.userAgent.indexOf("MSIE"))var ie_regexp=/MSIE (\d+\.\d+);/;else var ie_regexp=/Trident.*rv[ :]*(\d+\.\d+)/;ie_regexp.test(navigator.userAgent)&&(browserIsIE=!0,IEversion=new Number(RegExp.$1),console.log("Browser is IE, version "+IEversion)),browserIsIE&&9>=IEversion&&(baseconsole=console,9==IEversion&&(console={log:function(a){baseconsole.log(a)},info:function(a){baseconsole.info(a)},debug:function(a){baseconsole.log(a)},warn:function(a){baseconsole.warn(a)},error:function(a){baseconsole.error(a)},clear:function(a){baseconsole.clear(a)},assert:function(a){baseconsole.assert(a)},dir:function(a){baseconsole.dir(a)},profile:function(a){baseconsole.profile(a)},profileEnd:function(a){baseconsole.profileEnd(a)}}),8>=IEversion&&(console={log:function(a){baseconsole.log(a)},info:function(a){baseconsole.info(a)},debug:function(a){baseconsole.log(a)},warn:function(a){baseconsole.warn(a)},error:function(a){baseconsole.error(a)},clear:function(a){baseconsole.clear(a)},assert:function(a){baseconsole.assert(a)}}));