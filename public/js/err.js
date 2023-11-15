function err_handle(){
    socket.on('file move err',(err)=>{
        console.log(err)
    })
}