var wapper = document.querySelector('.wapper')
var timer,
        step = 0;

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
},3000)