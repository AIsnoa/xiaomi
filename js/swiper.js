

var wapper = document.querySelector('.wapper')
var pagination = document.querySelector('.swiper-pagination')
var paginlist = pagination.querySelectorAll('a')   
var left = document.querySelector('.swiper-button-left')
var right = document.querySelector('.swiper-button-right')
var timer,
        step = 0;
    console.log(debounce)
        left.onclick = throttle(()=>{
            step--
            if(step<0){
                step = 4
                wapper.style.transition = `left .0s`
                wapper.style.left =    `${-step*1226}px`
                wapper.scrollWidth
                step--
            }
            wapper.style.transition = `left .3s linear`
            wapper.style.left =    `${-step*1226}px`
            if(step == 3){
                paginlist[0].className = ""
                paginlist[step].className = "active"
            }else {
                paginlist[step +1].className = ""
                paginlist[step].className = "active"
            }
        },1000)

        right.onclick = function(){
            step++
            if(step == 5){
                step = 0
                wapper.style.transition = `left .0s`
                wapper.style.left =    `${-step*1226}px`
                wapper.scrollWidth
                step++
            }
            wapper.style.transition = `left .3s linear`
            wapper.style.left =    `${-step*1226}px`
            if(step == 4){
                paginlist[step -1].className = ""
                paginlist[0].className = "active"
            }else {
                paginlist[step -1].className = ""
                paginlist[step].className = "active"
            }
        }

paginlist.forEach((item,index)=>{
    item.onclick = function(){
        if(step > 3){
            step = 0
            wapper.style.transition = `left .0s`
            wapper.style.left =    `${-step*1226}px`
            wapper.clientWidth
        }else{
            step = index  
            wapper.style.transition = `left .3s linear`
            wapper.style.left =    `${-step*1226}px`
        }   
        paginlist.forEach((item,index)=>{
            item.className = ""
        })
        paginlist[step].className = "active"
    }
})
timer = setInterval(() =>{
    step++
    if(step == 5){
        step = 0
        wapper.style.transition = `left .0s`
        wapper.style.left =    `${-step*1226}px`
        wapper.scrollWidth
        step++
    }
    wapper.style.transition = `left .3s linear`
    wapper.style.left =    `${-step*1226}px`
    if(step == 4){
        console.log('4')
        paginlist[step -1].className = ""
        paginlist[0].className = "active"
    }else {
        paginlist[step -1].className = ""
        paginlist[step].className = "active"
    }
   
},3000)