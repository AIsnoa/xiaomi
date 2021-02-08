let options = {
    threshold:[0.3]
}
let ob = new IntersectionObserver(changes=>{
    changes.forEach((item,index)=>{
            if(item.isIntersecting){
                data = item.target.getAttribute('data-index')
                item.target.setAttribute("src",data)
                item.target.style.opacity = 1
                ob.unobserve(item.target)
            }
            
    })
    console.log(changes)
},options)
console.log(ob)

let list = document.querySelector(".homepage-list")
let imagelist = list.querySelectorAll("img")

imagelist.forEach((item,index)=>{
        ob.observe(item)

})