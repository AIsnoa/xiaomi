"use strict"

function debounce(callback,time){
    console.log("in debounce")
   var timer=null;
    return function(){
            if(timer != null){
                clearInterval(timer)
                timer = null
            }
            timer =  setTimeout(()=>{
                callback()
                timer = null
            },time)
    }
}

function throttle(callback,time){
    var timer = null;
    var perv = +new Date();

    return function(){

    var  now = +new Date()
    var  remin = now - perv;
        if(remin > time){
            console.log(remin,'fist')
            perv = +new Date()
            callback()
        }else if(timer == null){
            timer = setTimeout(()=>{
                console.log('time out ')
                timer = null
                callback()
            },time-remin)
        }               
        return 
    }
}