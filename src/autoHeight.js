/*
 * @rely jquery ??????????????????????????????????????????
 * @desc set textarea auto-height feature. If the content is heigher than textarea itself , the textarea will 
    reset it's height , so that there will not appear scroll bar of textarea.
 * @param textarea {HTMLElement}
 * @param min {number} the min line of text
 * @param max {number} the max line of text
 * @param cb {function} resize function
 */
export.autoHeight = function( textarea , min , max , cb ){
    min = min || 1 ;
    max = max || 100 ;
    max = 100 ;
    var $textarea = $(textarea),// jQuery对象
        textarea = $textarea[0],// DOM对象
        rowHeight = parseInt($textarea.css('line-height')) || 22, // 行高
        minHeight = min * rowHeight,
        maxHeight = max * rowHeight,
        resizeTextarea = function(dom) {
            var _rows = dom.rows, _height, _overflow,
                scrollTop = $(window).scrollTop();
            dom.style.height = 'auto';
            dom.rows = min;
            var _continue = false;
            // ie6-8需要这个来获取正确的scrollHeight
            dom.scrollHeight;
            var _scrollHeight = dom.scrollHeight;
            if (!_rows || _rows < min || !dom.value) { _rows = min; }
            while( true ) {
                _continue = false;
                if (( _rows * rowHeight > _scrollHeight + rowHeight / 2 || _rows > max ) && _rows > min){ 
                    _continue = true;
                    _rows -= 1;
                }
                if (( _rows * rowHeight < _scrollHeight - rowHeight / 2 || _rows < min ) && _rows < max) {
                    _continue = true;
                    _rows += 1;
                }
                //dom.setAttribute('rows' , _rows);
                if( !_continue ) break;
            }
            if (_rows >= min && _rows < max) {
                _height = _rows * rowHeight + 'px';
                _overflow = 'hidden';
            } else {
                _height = maxHeight + 'px';
                _overflow = 'auto';
            }
            $(dom).css({ 'height' : _height, 'overflow-y' : _overflow }).attr('rows', _rows);
            $(window).scrollTop(scrollTop);
            cb && cb();
        };
    
    $textarea.css({ 
        'height' : !$textarea.val()? minHeight : textarea.scrollHeight,
        'line-height': rowHeight + 'px'
        // fixbug set 0 to rows getting an exception in firefox
    }).attr('rows', Math.max(Math.ceil(textarea.scrollHeight/rowHeight) , 1));
    
    // bind self defined event
    $textarea.bind('autoheight' , function(){
        resizeTextarea(this);
    }).attr('auto-height' , true).trigger('autoheight'); // resize first

    GZ.input($textarea,function() {
        $textarea.trigger('autoheight');
    });
},