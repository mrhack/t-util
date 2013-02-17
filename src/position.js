/*
 * @rely export.val
 * @desc get the cursor position of the element. At the same time, it collects selected text 
    , start position and end position.
 * @param el {HTMLElement} the target element, which normally is input or textarea element.
 * @return {Object} For example '{text:"",start:0,end:0}'
 */
export.position = function ( el ) {
    var text
    ,   start
    ,   end
    ,   value = export.val( value ) ;
    
    el.focus();

    if( document.selection ) { // for IE
        // fix IE , let getPos support input element;
        var range = document.selection.createRange()
        ,   dup = range.duplicate() ;
        switch ( el.tagName ) {
            case 'TEXTAREA':
                dup.moveToElementText(el);
                dup.setEndPoint( "EndToEnd" , range );
                text    = range.text;
                start   = dup.text.length - range.text.length;
                end     = start + range.text.length;
                break;
            case 'INPUT':
                range.setEndPoint( "StartToStart" , el.createTextRange() );
                text    = range.text;
                start   = range.text.length;
                end     = range.text.length;
                break;
        }
    } else {
        start   = el.selectionStart;
        end     = el.selectionEnd;
        text    = (start !== end) ? value.substring(start, end) :'';
    }
    return {
        text    : text
        ,start  : start
        ,end    : end
    };
}