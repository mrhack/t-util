// type 是字还是字符
export.count = function(textarea , numDom , num , callback , type){
    type = !!type;
    function counts(){
        var value = _getValue(textarea),
            len = _length(value , type);
        if(num - len >= 0 ){
            numDom.innerHTML = '还可以输入<em>' + (num - len) + '</em>字';
        }else{
            numDom.innerHTML = '已经超出<em style="color:red;">' + (len - num) + '</em>字';
        }
        callback && callback(num - len , len);
    }
    $(textarea).bind('countwords' , function(){
        counts();
    });
    if($.browser.msie && $.browser.version < 7){
        // set width fix for ie6
        var $textarea = $(textarea),
            width = $textarea.width();
        if(width > 0)
        $textarea.css('width' , width);
    }
    _input($(textarea) ,function(){
        $(this).trigger('countwords');
    });

    // run first time
    $(textarea).trigger('countwords');
}