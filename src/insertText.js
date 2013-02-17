/*
 * @rely export.position,export.setPos
 * @desc insert text into textarea or input
 * @param textarea {HTMLElement} 
 * @param text {string} 
 * @param start {number} 
 * @param length {number} 
 */
export.insertText = function ( textarea ,text , start , length ) {
    if( start === undefined ) {
        var range = export.position( textarea );
        start = range.start;
        length = range.end - range.start;
    }
    length = length || 0;
    if( document.selection ) {
        var sR;
        export.setPos( textarea , start , length );
        sR = document.selection.createRange();
        sR.text = text;
        sR.setEndPoint( 'StartToEnd' , sR );
        sR.select();
    } else {
        var oValue, nValue, nStart, nEnd, st;
        export.setPos( textarea, start , length );
        oValue = textarea.value;
        nValue = oValue.substring(0, start) + text +
            oValue.substring(start + length);
        nStart = nEnd = start + text.length;
        st = textarea.scrollTop;
        textarea.value = nValue;
        if(textarea.scrollTop != st) {
            textarea.scrollTop = st;
        }
        textarea.setSelectionRange(nStart, nEnd);
    }
}