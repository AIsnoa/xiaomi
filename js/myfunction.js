"use strict"

function debounce(callback,time,immediate){
    if (typeof callback != "function") throw new TypeError("callback must be an function")
    if (typeof time == "boolean"){
        time = 300
        immediate = time
    }
    if(typeof time != "number") time = 300
    if(typeof immediate != "boolean") immediate = false
    var timer=null;
    return function(){
            var runnow = !timer && immediate
                    params = [].slice.call(arguments)
                    self = this
            runnow ? callback.apply(self,params) :null
            if(timer != null){
                clearInterval(timer)
                timer = null
            }
            timer =  setTimeout(()=>{
                !immediate ? callback.apply(self,params): null
                timer = null
            },time)
            
    }
}

function throttle(callback,time){
    if (typeof callback != "function") throw new TypeError("callback must be an function")
    if(typeof time != "number") time = 300
    var timer = null;
    var perv = +new Date();

    return function(){
    var self = this
            params = [].slice.call(arguments)
    var  now = +new Date()
    var  remin = now - perv;
        if(remin > time){
            console.log(remin,'fist')
            perv = +new Date()
            callback.apply(self,params)
        }else if(timer == null){
            timer = setTimeout(()=>{
                console.log('time out ')
                timer = null
                callback.apply(self,params)
            },time-remin)
        }               
        return 
    }
}