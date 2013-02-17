
/*
 * @rely export.val
 * @desc set the cursor position in the element
 * @param textarea {HTMLElement}
 * @param start {number} the start elemetn
 * @param textarea {HTMLElement}
 */
// 设置光标位置
export.setPos = function ( textarea , start , length ) {
    var value = export.val( textarea );
    start   = start === undefined ? value.length : start ;
    length  = length || 0;
    textarea.focus();
    if(textarea.createTextRange){
        var textRange = textarea.createTextRange();
        //textRange.moveStart("character" , -value.length);
        //textRange.moveEnd("character" , -value.length);
        textRange.collapse(true);
        textRange.moveStart("character", start);
        textRange.moveEnd("character" , length);
        textRange.select();
    }else{
        try{// TODO firefox bug , textarea.setSelectionRange === undefined  && textarea.__proto__.setSelectionRange === function
            textarea.setSelectionRange(start , start + length);
        }catch(e){}
    }
}
