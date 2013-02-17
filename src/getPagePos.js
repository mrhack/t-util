_getPagePos = (function(){
    // 克隆元素样式并返回类
    var _cloneStyle = function(elem, cache) {
        if (!cache && elem['${cloneName}'])
            return elem['${cloneName}'];
        var className, name, rstyle = /^(number|string)$/;
        var rname = /^(content|outline|outlineWidth)$/; //Opera: content; IE8:outline && outlineWidth
        var cssText = [], sStyle = elem.style;

        for (name in sStyle) {
            if (!rname.test(name)) {
                // fix firefox bug: if text input , the firefox focus the line-height 17px , get height style instead of line-height .what the fuck fuck fuck fuck fuck fuck ;
                /*
                 1111111  11     11   1111111   11    11
                 11       11     11  11      1  11   11
                 1111111  11     11  11         11 11
                 11       11     11  11      1  11   11
                 11        1111111    1111111   11    11
                */
                var tempName = name;
                if($.browser.mozilla && elem.tagName == "INPUT" && name == 'lineHeight'){
                    tempName = 'height';
                }
                var val = _getStyle(elem, tempName);
                if (val !== '' && rstyle.test(typeof val)) { // Firefox 4
                    name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
                    cssText.push(name);
                    cssText.push(':');
                    cssText.push(val);
                    cssText.push(';');
                }
            }
        }
        cssText = cssText.join('');
        elem['${cloneName}'] = className = 'clone' + (new Date).getTime();
        _addHeadStyle('.' + className + '{' + cssText + '}');
        return className;
    },

    // 向页头插入样式
    _addHeadStyle = function(content) {
        var style = _style[document];
        if (!style) {
            style = _style[document] = document.createElement('style');
            document.getElementsByTagName('head')[0].appendChild(style);
        }
        ;
        style.styleSheet && (style.styleSheet.cssText += content)
                || style.appendChild(document.createTextNode(content));
    },
    _style = {},

    // 获取最终样式
    _getStyle = 'getComputedStyle' in window ? function(elem, name) {
        return getComputedStyle(elem, null)[name];
    } : function(elem, name) {
        return elem.currentStyle[name];
    },

    // 获取元素在页面中位置
    _offset = function(elem) {
        var box = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement;
        var clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft
                || body.clientLeft || 0;
        var top = box.top + (self.pageYOffset || docElem.scrollTop)
                - clientTop, left = box.left
                + (self.pageXOffset || docElem.scrollLeft) - clientLeft;
        return {
            left : left,
            top : top,
            right : left + box.width,
            bottom : top + box.height
        };
    };
    /**
     * 获取输入光标在页面中的坐标
     *
     * @param {HTMLElement} 输入框元素
     * @return {left: xxx, top: xxx, bottom: xxx} 返回left和top,bottom。[left, top]为光标顶部坐标，[left, bottom]为光标底部坐标。
     */
   return function(elem , index) {
        if (document.selection) { //IE Support
            elem.focus();
            var currPos = _getPos(elem).start;
            _setPos(elem , index);
            var Sel = document.selection.createRange(),
                _top = Sel.boundingTop + elem.scrollTop + document.documentElement.scrollTop;
            _setPos(elem , currPos); // reset pos
            return {
                left : Sel.boundingLeft,
                top : _top,
                bottom : _top + Sel.boundingHeight
            };
        }
        index = index===null? _getPos(elem).start : index;
        var cloneDiv = '{$clone_div}', cloneLeft = '{$cloneLeft}', cloneFocus = '{$cloneFocus}', cloneRight = '{$cloneRight}';
        var none = '<span style="white-space:pre-wrap;"> </span>';
        var div = elem[cloneDiv] || document.createElement('div'), focus = elem[cloneFocus]
                || document.createElement('span');
        var text = elem[cloneLeft] || document.createElement('span');
        var offset = _offset(elem), focusOffset = {
            left : 0,
            top : 0
        };

        if (!elem[cloneDiv]) {
            elem[cloneDiv] = div, elem[cloneFocus] = focus;
            elem[cloneLeft] = text;
            div.appendChild(text);
            div.appendChild(focus);
            document.body.appendChild(div);
            focus.innerHTML = '@';
            focus.style.cssText = 'display:inline-block;overflow:hidden;z-index:-100;word-wrap:break-word;';
            div.className = _cloneStyle(elem);
            div.style.cssText = 'visibility:hidden;display:inline-block;position:absolute;z-index:-100;word-wrap:break-word;overflow:hidden;';
        }
        ;
        div.style.left = offset.left + "px";
        div.style.top = offset.top + "px";
        var regObj = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '\n': '<br/>',
            ' ': none
        }
        var strTmp = elem.value.substring(0, index).replace(/&/g, '&amp;').replace(new RegExp('[<>\\n\\s]' , 'g') , function($0){
            return regObj[$0];
        });
        text.innerHTML = strTmp;

        focus.style.display = 'inline-block';
        try {
            focusOffset = _offset(focus);
        } catch (e) {}
        ;
        focus.style.visibility = 'hidden';
        return {
            left : focusOffset.left,
            top : focusOffset.top - elem.scrollTop,
            bottom : focusOffset.bottom - elem.scrollTop
        };
    };
})();