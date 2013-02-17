/*
 * base js for input and textarea tool
 */

 ;(function(){
 	//  defined base function for every feature
 	var export = {};
 	var _placeHolderAttr = "place-holder";
 	var _browser  = (function() {
            var ua = navigator.userAgent.toLowerCase();
            // Useragent RegExp
            var rwebkit     = /(webkit)[ \/]([\w.]+)/
                , ropera    = /(opera)(?:.*version)?[ \/]([\w.]+)/
                , rmsie     = /(msie) ([\w.]+)/
                , rmozilla  = /(mozilla)(?:.*? rv:([\w.]+))?/;

            var match = rwebkit.exec( ua ) ||
                ropera.exec( ua ) ||
                rmsie.exec( ua ) ||
                ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
                [];
            var result = {};
            result[match[1] || ''] = 1;
            result.version = match[2] || "0";
            return result;
        })()
    , _addEvent = document.addEventListener ? function(dom , type , fn){
            return dom.addEventListener(type , fn , false);
        } : function(dom , type , fn){
            return dom.attachEvent('on' + type , fn);
        }
    // @data 2012/12/10
	// get value function
	// @param input {HTML element}
	// @return {string} if input value equal to it's attribute 'default-value' return empty string
	//                  else return input value;
	, _bindInput  = function( input , fn ){
	    if( _browser.msie && _browser.version < 9 ){
	        var unMatchKey = /^27|37|38/;
	        _addEvent( input , 'keyup' , function( ev ) {
	            switch( ev.keyCode ){
	                case 27:
	                case 37:
	                case 38:
	                case 39:
	                case 40:
	                    return;
	            }
	            fn.call( input , ev );
	        });
	    }else{
	        _addEvent( input , 'input' , fn )
	    }
	} ;
    // @include file=""
    // @include file=""
    // @include file=""
    // @include file=""
 })();