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

// 链式调用
function lazyMan(name){
    if(!(this instanceof lazyMan)){
        return new lazyMan(name)
    }
    this.name = name
    this.queue = []
    this.default = function(){
        this.queue.push(()=>{
            console.log('Hi, my name is '+ name)
            this.next()
        })    
    }
    this.next = function(){
        let callback = this.queue.shift()
        callback && callback()
    }
    this.sleep = function(time){
        this.queue.push(()=>{
            let timer = setTimeout(()=>{
                console.log('after' + time +'s ...')
                this.next()
            },time*1000)
          
        })
        return this
    }
    this.eat = function(){
        this.queue.push(()=>{
            console.log('eat dinner')
            this.next()
        })
        return this
    }
    this.default()    
    setTimeout(() => {
            this.next()
    }, 0);
}
//自己实现 instanceof
function instance(A,B){
    if(typeof B !=='function'){
        throw new Error('secound params must be a callable')
    }
    let O = B.prototype
   A =  A.__proto__
    while(1){
        if (A == O){
            return true
        }
        if(A == null){
            return false
        }
        A = A.__proto__
    }
}

//对象深拷贝

var obj = {
    a: 'aaa',
    b: {
        c: 'ccc'
    },
    d: [1,2,'aaa'],
    
}
obj.obj = obj

function deepclone(target,treated){
   var result ;
   var treated = treated
   if(!Array.isArray(treated)) treated = []
   if(treated.indexOf(target)>-1){
       return target
   }
   treated.push(target)
   if(target.constructor === Array){
       result = []
       target.forEach(element => {
           if(typeof element === 'object'){
               let temp = deepclone(element,treated)              
               result.push(temp)
           }else {
               result.push(element)
           }
       });
       return result
  }else if(target.constructor === Object){
       result = {}
       for(i in target){
           if(typeof target[i] === 'object'){
              
               result[i] = deepclone(target[i],treated)
           }else {
               result[i] = target[i]
           }
       }
       return result
  }else{
       return target
  }
}

//自己实现promise
function myPromise(exector){
    let self = this
    if(!(this instanceof myPromise)) throw new Error('must New myPromise')
    if(typeof exector !== 'function') throw new Error('exector must be calable')
    this.state = "Pending"
    this.result
    this.onFulfilledcallbacks = []
    this.onRejectedcallbacks = []
    let change = function(state,result){
        if(self.state !== 'Pending') return
        self.state = state
        self.result = result

        let callbacks = state === 'fulfilled'? self.onFulfilledcallbacks :self.onRejectedcallbacks
        if(callbacks.length>0){
            setTimeout(()=>{
                callbacks.forEach((item,index)=>{
                    if(typeof item ==='function'){
                        item(result)
                    }
                })
            },0)
        }
    }

    try{
        exector(function reslove(result){
            change('fulfilled',result)
        },function reject(reason){
            change('rejected',reason)
        })
    }catch(err){
        change('rejected',err)
    }
    
}
myPromise.all = function all(promises){
    let reslult = []
    let n = 0
    if(!Array.isArray(promises)) throw new Errow('not array')
    let arr = promises.map(function(p){
        if(!(p instanceof myPromise)){
            return  new myPromise.reslove(p)
        }
        return p
    })
    let newPromise = new myPromise(function(reslove,reject){
            arr.forEach((item,index)=>{
                item.then((value)=>{
                    reslult[index] = value
                    n++
                    if(n == arr.length) reslove(reslult)
                }).catch((reason)=>{
                    reject(reason)
                })
            })
    })
    return newPromise
}
myPromise.reslove = function reslove(reslult){
    return new myPromise((reslove)=>{
        reslove('OK')
    })
} 
myPromise.reject = function reject(reason){
    return new myPromise((reslove,rejcet)=>{
        rejcet(reason)
    })
}
myPromise.prototype ={
    constructor: myPromise,
    then: function(onFulfilled,onRejected){
        let self = this
        let res
        let newPromise = new myPromise((onReslove,onReject)=>{
            switch(self.state){
                case 'fulfilled':
                   
                    setTimeout(() => {
                        try {
                            res = onFulfilled(self.result)
                            onReslove(res)
                        } catch (error) {
                            onReject(errpr)
                        }
                    }, 0);
                    break
                case 'rejected':
                    setTimeout(()=>{
                        try {
                            res = onRejected(self.result)
                            onReject(res)
                        } catch (error) {
                            onReject(error)
                        }
                    },0)
                    break
                default:
                    self.onFulfilledcallbacks.push(function(){
                        try {
                            let res = onFulfilled(self.result)
                            onReslove(res)
                        } catch (error) {
                            onReject(error)
                        }
                    })
                    self.onRejectedcallbacks.push(function(){
                        try {
                            let res = onRejected(self.result)
                            onReject(res)
                        } catch (error) {
                            onReject(error)
                        }
                     })
            }
        })
        return newPromise
        
    },
    catch: function(onReject){
        this.then(null,onReject)
    }
}
myPromise.prototype[Symbol.toStringTag] = "myPromise"

var myp = new myPromise(function(reslove,reject){
    reslove('OK')
})
myp2 = myp.then(function(reslult){
    return reslult
})
console.log(myp2)