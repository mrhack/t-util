//_errorTimer = null,
        __errorRunningNum = 0 ,
        _error = function(textarea , needFocus /* or cb*/){
            if(!textarea || textarea.getAttribute('_error_timer_')) return;
            var bg = textarea.style.background,
                colors = ['#FFF' ,'#FEE','#FDD','#FCC','#FBB','#FAA','#FBB','#FCC','#FDD','#FEE','#FFF',
                '#FEE','#FDD','#FCC','#FBB','#FAA','#FBB','#FCC','#FDD','#FEE',bg],
                _index = 0,
                _errorTimer = null,
                runTimer = function(){
                    // fix for textarea is hidden ,and focus error
                    _errorTimer = setInterval(function(){
                        if(_index >= colors.length){
                            clearInterval(_errorTimer);
                            __errorRunningNum--;
                            _errorTimer = null;
                            //if(__errorRunningNum == 0){
                                if(GJ.isFunction(needFocus)){ // cb
                                    needFocus();
                                }
                                if(needFocus === undefined || needFocus === true){
                                    try{textarea.focus();}catch(e){};//
                                }
                            //}
                            if($.browser.msie){
                                // fuck IE
                                GJ.mix(textarea.style , {
                                    'background-image': '',
                                    'background-attachment': '',
                                    'background-repeat': '',
                                    'background-position-x': '',
                                    'background-position-y': '',
                                    'background-color': ''
                                } , true);
                            }
                            textarea.removeAttribute('_error_timer_');
                            return;
                        }
                        textarea.style.background = colors[_index];
                        _index++;
                    },40);
                };
            //if(_errorTimer) return;
            textarea.setAttribute('_error_timer_' , 1);
            
            // fix input or textarea first time
            if(__errorRunningNum == 0){
                __errorRunningNum ++;
                //GZ.fixPos($(textarea) , function(){
                    runTimer();
                //});
            }else{
                __errorRunningNum ++;
                runTimer();
            }
        },