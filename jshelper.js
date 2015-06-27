/**
 * the basic helper function is collected from Bartek Szopka impressjs
 * wait to be updated
 * 
 *  author:  Frand
 *  version: 0.0.1
 *  source:  https://github.com/ncuzp/jshelper
 */

(function(document, window){
	// it's just an empty function ... and a useless comment.
    var empty = function () { return false; };
    
    // `pfx` is a function that takes a standard CSS property name as a parameter
    // and returns it's prefixed version valid for current browser it runs in.
    // The code is heavily inspired by Modernizr http://www.modernizr.com/
    var pfx = (function () {
        
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
    var arrayify = function ( a ) {
        return [].slice.call( a );
    };
    
    // `css` function applies the styles given in `props` object to the element
    // given as `el`. It runs all property names through `pfx` function to make
    // sure proper prefixed version of the property is used.
    var css = function ( el, props ) {
        var key, pkey;
        for ( key in props ) {
            if ( props.hasOwnProperty(key) ) {
                pkey = pfx(key);
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
    var toNumber = function (numeric, fallback) {
        return isNaN(numeric) ? (fallback || 0) : Number(numeric);
    };
    
    // `byId` returns element with given `id` - you probably have guessed that ;)
    var byId = function ( id ) {
        return document.getElementById(id);
    };
    
    // `$` returns first element for given CSS `selector` in the `context` of
    // the given element or whole document.
    var $ = function ( selector, context ) {
        context = context || document;
        return context.querySelector(selector);
    };
    
    // `$$` return an array of elements for given CSS `selector` in the `context` of
    // the given element or whole document.
    var $$ = function ( selector, context ) {
        context = context || document;
        return arrayify( context.querySelectorAll(selector) );
    };
    
    // `triggerEvent` builds a custom DOM event with given `eventName` and `detail` data
    // and triggers it on element given as `el`.
    var triggerEvent = function (el, eventName, detail) {
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, detail);
        el.dispatchEvent(event);
    };
    
    // `computeWindowScale` counts the scale factor between window size and size
    // defined for the presentation in the config.
    var computeWindowScale = function ( config ) {
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
    var isInDiv = function(el, event){
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
    var objToArray = function(el){
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
    var throttle = function (fn, delay) {
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
    var deleteAllClass = function(el){
    	var classList = el.classList,
    		i = 0,
    		len = classList.length,
    		cls;

    	//forEach is not supported by firefox
    	for(i = 0; i < len; i ++){
    		classList.remove(classList[i]);
    	}
    };
    
    return window.jshelper = {
    	empty : empty,
    	compatCssProp : pfx,
    	compatCss : css,
    	arrayify : arrayify,
    	toNumber : toNumber,
    	byId : byId,
    	bySelector : $,
    	bySelectorAll : $$,
    	triggerCustomEvent : triggerEvent,
    	computeWindowScale : computeWindowScale,
    	isInDiv : isInDiv,
    	objToArray : objToArray,
    	throttle : throttle,
    	deleteAllClass : deleteAllClass
    };
})(document, window);