const commander = require("commander")

class MyPlugin{
    constructor(options){
        this.options = options
    }
    handleInitial(compilation){
        console.log('my plugin')
    }
    apply(compiler){
        console.log(compiler)
        const hooks = compiler.hooks
        if(hooks){ //bind callback function to webpack emit event
            hooks.emit.tap('myplugin',compilation =>{
                this.handleInitial(compilation)
            })
        }else{
            compiler.plugin('emit',(compilation,callback)=>{
                try{
                    this.handleInitial(compilation)
                    callback()
                }catch(err){
                    callback(err)
                }
            })
        }
    }
}
module.exports = MyPlugin