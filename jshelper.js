/**
 * the basic helper function is collected from Bartek Szopka impressjs
 * need to be updated
 *
 *  author:  Frand
 *  version: 0.0.1
 *  source:  https://github.com/ncuzp/jshelper
 */

(function(document, window){
    //the exports object to public the toolkit functions
    var exports = {};

    // it's just an empty function ... and a useless comment.
    exports.emptyFn  = function () { return false; };

    // `pfx` is a function that takes a standard CSS property name as a parameter
    // and returns it's prefixed version valid for current browser it runs in.
    // The code is heavily inspired by Modernizr http://www.modernizr.com/
    exports.compatPrefix = (function () {

        var style = document.createElement('dummy').style,
            prefixes = 'Webkit Moz O ms Khtml'.split(' '),
            memory = {};

        return function ( prop ) {
            if ( typeof memory[ prop ] === "undefined" ) {

                var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),
                    props   = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');

                memory[ prop ] = null;
                for ( var i in props ) {
                    if ( style[ props[i] ] !== undefined ) {
                        memory[ prop ] = props[i];
                        break;
                    }
                }

            }

            return memory[ prop ];
        };

    })();

    // `arraify` takes an array-like object and turns it into real Array
    // to make all the Array.prototype goodness available.
    exports.arrayify = function ( a ) {
        return [].slice.call( a );
    };

    // `css` function applies the styles given in `props` object to the element
    // given as `el`. It runs all property names through `pfx` function to make
    // sure proper prefixed version of the property is used.
    exports.compatCss = function ( el, props ) {
        var key, pkey;
        for ( key in props ) {
            if ( props.hasOwnProperty(key) ) {
                pkey = exports.compatPrefix(key);
                if ( pkey !== null ) {
                    el.style[pkey] = props[key];
                }
            }
        }
        return el;
    };

    // `toNumber` takes a value given as `numeric` parameter and tries to turn
    // it into a number. If it is not possible it returns 0 (or other value
    // given as `fallback`).
    exports.toNumber = function (numeric, fallback) {
        return isNaN(numeric) ? (fallback || 0) : Number(numeric);
    };

    // `byId` returns element with given `id` - you probably have guessed that ;)
    exports.byId = function ( id ) {
        return document.getElementById(id);
    };

    // `$` returns first element for given CSS `selector` in the `context` of
    // the given element or whole document.
    exports.bySelector = function ( selector, context ) {
        context = context || document;
        return context.querySelector(selector);
    };

    // `$$` return an array of elements for given CSS `selector` in the `context` of
    // the given element or whole document.
    exports.bySelectorAll = function ( selector, context ) {
        context = context || document;
        return exports.arrayify( context.querySelectorAll(selector) );
    };

    // `triggerEvent` builds a custom DOM event with given `eventName` and `detail` data
    // and triggers it on element given as `el`.
    exports.triggerCustomEvent = function (el, eventName, detail) {
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, detail);
        el.dispatchEvent(event);
    };

    // `computeWindowScale` counts the scale factor between window size and size
    // defined for the presentation in the config.
    exports.computeWindowScale = function ( config ) {
        var hScale = window.innerHeight / config.height,
            wScale = window.innerWidth / config.width,
            scale = hScale > wScale ? wScale : hScale;

        if (config.maxScale && scale > config.maxScale) {
            scale = config.maxScale;
        }

        if (config.minScale && scale < config.minScale) {
            scale = config.minScale;
        }

        return scale;
    };

    //judge is the mouse pointer is in specify div element or a object which has left,top,right,bottom props
    exports.mouseInBox = function(el, event){
        var flag = false,
            x=event.clientX,
            y=event.clientY,
            elLeft = el.offsetLeft || el.left,
            elTop = el.offsetTop || el.top,
            elRight = el.offsetLeft + el.offsetWidth || el.right,
            elBottom = el.offsetTop + el.offsetHeight || el.bottom;

        if( x > elLeft && x < elRight && y > elTop && y < elBottom ){
            flag = true;
        }

        return flag;
    };

    //make the object who it's object prop is the same to array
    exports.objToArray = function(el){
        var arr = [], prop;

        for(prop in el){
            if(el.hasOwnProperty(prop)){
                if(null !== el[prop]){
                    arr.push(el[prop]);
                }
            }
        }

        return arr;
    };

    //through delay time to call fn
    exports.throttle = function (fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    };

    //delete all the class of the given el 
    exports.removeAllElClass = function(el, fn){
        var classList = el.classList,
            len = classList.length;

        //forEach is not supported by firefox
        for(var i = 0; i < len; i ++){
            //as the first class is deleted , and the second
            //class is become the first so
            //we shoud delete the first until loop len
            classList.remove(classList[0]);
        }

        //fn is a callback function
        if(!fn){return false;}

        //execute the fn
        fn();
    };

    //through the class name to get the element
    exports.getElByClass = function(sClass, oParent){
        var aEle=oParent.getElementsByTagName("*"),
            aResult=[];

        for(var i=0,tt=aEle.length; i < tt; i++){
            if(aEle[i].className.indexOf(sClass) >= 0){
                var arr_class=aEle[i].className.split(" ");

                for(var j=0,len=arr_class.length; j < len; j++){
                    if(arr_class[j] == sClass){
                        aResult.push(aEle[i]);
                    }
                }
            }
        }

        return aResult;
    };

    /*
     * ie : 表示IE浏览器标识
     * firefox : 表示火狐浏览器标识
     * chrome : 表示谷歌浏览器标识
     * opera : 表示opera标识
     * safari : 表示safari浏览器标识
     */
    exports.browserType = function(){
        var Sys = {},
            ua = navigator.userAgent.toLowerCase();

        if (window.ActiveXObject)
            Sys.ie = ua.match(/msie ([\d.]+)/)[1]
        else if (document.getBoxObjectFor)
            Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
        else if (window.MessageEvent && !document.getBoxObjectFor)
            Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
        else if (window.opera)
            Sys.opera = ua.match(/opera.([\d.]+)/)[1]
        else if (window.openDatabase)
            Sys.safari = ua.match(/version\/([\d.]+)/)[1];

        return Sys;
    };

    return window.jshelper = exports;
})(document, window);