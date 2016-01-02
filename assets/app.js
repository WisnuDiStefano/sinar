var PDFObject=function(y){if(!y||!y.url){return false;}var w="1.2",b=y.id||false,i=y.width||"100%",z=y.height||"100%",r=y.pdfOpenParams,a,x;var v=function(){var c=null;if(window.ActiveXObject){c=new ActiveXObject("AcroPDF.PDF");if(!c){c=new ActiveXObject("PDF.PdfCtrl");}if(c!==null){return true;}}return false;};var u=function(){var c,f=navigator.plugins,d=f.length,e=/Adobe Reader|Adobe PDF|Acrobat/gi;for(c=0;c<d;c++){if(e.test(f[c].name)){return true;}}return false;};var t=function(){var c=navigator.mimeTypes["application/pdf"];return(c&&c.enabledPlugin);};var s=function(){var c=null;if(u()||v()){c="Adobe";}else{if(t()){c="generic";}}return c;};var q=function(){var e=document.getElementsByTagName("html");if(!e){return false;}var c=e[0].style,d=document.body.style;c.height="100%";c.overflow="hidden";d.margin="0";d.padding="0";d.height="100%";d.overflow="hidden";};var p=function(d){var c="",e;if(!d){return c;}for(e in d){if(d.hasOwnProperty(e)){c+=e+"=";if(e==="search"){c+=encodeURI(d[e]);}else{c+=d[e];}c+="&";}}return c.slice(0,c.length-1);};var o=function(d){var c=null;switch(d){case"url":c=a;break;case"id":c=b;break;case"width":c=i;break;case"height":c=z;break;case"pdfOpenParams":c=r;break;case"pluginTypeFound":c=x;break;case"pdfobjectversion":c=w;break;}return c;};var n=function(d){if(!x){return false;}var c=null;if(d){c=(d.nodeType&&d.nodeType===1)?d:document.getElementById(d);if(!c){return false;}}else{c=document.body;q();i="100%";z="100%";}c.innerHTML='<object	data="'+a+'" type="application/pdf" width="'+i+'" height="'+z+'"></object>';return c.getElementsByTagName("object")[0];};a=encodeURI(y.url)+"#"+p(r);x=s();this.get=function(c){return o(c);};this.embed=function(c){return n(c);};return this;};


/*!
 * accounting.js v0.3.2, copyright 2011 Joss Crowcroft, MIT license, http://josscrowcroft.github.com/accounting.js
 */
(function(p,z){function q(a){return!!(""===a||a&&a.charCodeAt&&a.substr)}function m(a){return u?u(a):"[object Array]"===v.call(a)}function r(a){return"[object Object]"===v.call(a)}function s(a,b){var d,a=a||{},b=b||{};for(d in b)b.hasOwnProperty(d)&&null==a[d]&&(a[d]=b[d]);return a}function j(a,b,d){var c=[],e,h;if(!a)return c;if(w&&a.map===w)return a.map(b,d);for(e=0,h=a.length;e<h;e++)c[e]=b.call(d,a[e],e,a);return c}function n(a,b){a=Math.round(Math.abs(a));return isNaN(a)?b:a}function x(a){var b=c.settings.currency.format;"function"===typeof a&&(a=a());return q(a)&&a.match("%v")?{pos:a,neg:a.replace("-","").replace("%v","-%v"),zero:a}:!a||!a.pos||!a.pos.match("%v")?!q(b)?b:c.settings.currency.format={pos:b,neg:b.replace("%v","-%v"),zero:b}:a}var c={version:"0.3.2",settings:{currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}}},w=Array.prototype.map,u=Array.isArray,v=Object.prototype.toString,o=c.unformat=c.parse=function(a,b){if(m(a))return j(a,function(a){return o(a,b)});a=a||0;if("number"===typeof a)return a;var b=b||".",c=RegExp("[^0-9-"+b+"]",["g"]),c=parseFloat((""+a).replace(/\((.*)\)/,"-$1").replace(c,"").replace(b,"."));return!isNaN(c)?c:0},y=c.toFixed=function(a,b){var b=n(b,c.settings.number.precision),d=Math.pow(10,b);return(Math.round(c.unformat(a)*d)/d).toFixed(b)},t=c.formatNumber=function(a,b,d,i){if(m(a))return j(a,function(a){return t(a,b,d,i)});var a=o(a),e=s(r(b)?b:{precision:b,thousand:d,decimal:i},c.settings.number),h=n(e.precision),f=0>a?"-":"",g=parseInt(y(Math.abs(a||0),h),10)+"",l=3<g.length?g.length%3:0;return f+(l?g.substr(0,l)+e.thousand:"")+g.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+e.thousand)+(h?e.decimal+y(Math.abs(a),h).split(".")[1]:"")},A=c.formatMoney=function(a,b,d,i,e,h){if(m(a))return j(a,function(a){return A(a,b,d,i,e,h)});var a=o(a),f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format);return(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal))};c.formatColumn=function(a,b,d,i,e,h){if(!a)return[];var f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format),l=g.pos.indexOf("%s")<g.pos.indexOf("%v")?!0:!1,k=0,a=j(a,function(a){if(m(a))return c.formatColumn(a,f);a=o(a);a=(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal));if(a.length>k)k=a.length;return a});return j(a,function(a){return q(a)&&a.length<k?l?a.replace(f.symbol,f.symbol+Array(k-a.length+1).join(" ")):Array(k-a.length+1).join(" ")+a:a})};if("undefined"!==typeof exports){if("undefined"!==typeof module&&module.exports)exports=module.exports=c;exports.accounting=c}else"function"===typeof define&&define.amd?define([],function(){return c}):(c.noConflict=function(a){return function(){p.accounting=a;c.noConflict=z;return c}}(p.accounting),p.accounting=c)})(this);

