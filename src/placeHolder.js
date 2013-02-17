// placeholder for all browsers. If browser support placeholder attribute, this will use the 
// default feature. Otherwise use focus and blur event to simulate the feature.
(function(){
    // if support placeholder attribute do nothing
    if( 'placeholder' in document.createElement('input') ) return;
    // hoder class, the style defined in other place
    var holderClass = 'on-holder';
    // hoder attribute name
    var holderAttr  = 'placeholder';
    // time regexp
    var trimExp     = /(^\s+)|(\s+$)/g;
    // remove dom class name
    var removeClass = function( dom , cname ){
        if( !dom.className ) return;
        dom.className = ( ' ' + dom.className + ' ' )
                    .replace(' ' + cname + ' ' , ' ')
                    .replace(trimExp,'');
    }
    // add class name to dom
    var addClass    = function( dom , cname ){
        if( !dom.className ){
            dom.className = cname;
        }
        else {
            removeClass( dom , cname );
            dom.className = dom.className + ' ' + cname;
        }
    }
    // event bind
    var bind = document.addEventListener ? function( dom , event , fn ){
            return dom.addEventListener( event , fn , false );
        } : function( dom , event , fn ){
            return dom.attachEvent( 'on' + event , fn );
        };
    // placehoder for element
    var bindPlaceHolder4Element = function( dom ){
        bind( dom , 'focus' , function(){
            var hText = this.getAttribute( holderAttr );
            if(this.value == hText){
                this.value = '';
                addClass( this , holderClass );
            }
        });
        bind( dom , 'blur' , function(){
            if(this.value == ''){
                this.value = this.getAttribute( holderAttr );
                removeClass( this , holderClass );
            }
        });

        // init first time
        if(dom.value == ''){
            dom.value = dom.getAttribute( holderAttr );
            addClass( dom , holderClass );
        }
    }
    // placehoder for tagname
    var bindElementTag    = function( tag ){
        var els = document.getElementsByTagName( tag );
        var tmp = null;
        for ( var i = 0 , len = els.length ; i < len ; i++ ){
            tmp = els[i];
            if( tmp.getAttribute( holderAttr ) ) {
                bindPlaceHolder4Element( tmp );
            }
        }
    };
    // after window load, init all the 'placeholder' element
    bind(window , 'load' , function(){
        bindElementTag( 'input' );
        bindElementTag( 'textarea' );
    });
})();