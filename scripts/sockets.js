const {
    rename,
    writeFile,
    unlink 
}                    = require('fs').promises;

const neg = (bird) => bird == 'bird' ? 'nobird' : 'bird'

async function try_move(con,log,src,inp,file,err){
    try{
        await Promise.all([
            writeFile(`${src}log.txt`,`\nmoved ${src}${inp}/${file} to ${src}${neg(inp)}/`,{ flag: 'a+' }),
            writeFile(`${src}log.txt`,`\n${JSON.stringify(con)}/`,{ flag: 'a+' }),,
            rename(`${src}${inp}/${file}`,`${src}${neg(inp)}/${file}`)
        ])
        console.log(`\n${log} ${src}${inp}/${file} to ${src}${neg(inp)}/`)
    }
    catch(e){
        console.log(e)
        err()
    }
}

async function helpers(socket,confusion,FILES,temp){

    await socket.on('data',async(data)=>{
        if(data['bird']=='bird'){

            if(data['state']){
                confusion['True_Pos']++
            }
            else{
                confusion['False_Pos']++
                await try_move(confusion,"moved",FILES,'bird',data['file'],()=>{
                    socket.emit('file move err',`${FILES}/bird/${data['file']}`)
                })
            }
            socket.emit('confusion',confusion)
        }
        else{

            if(data['state']){
                confusion['True_Neg']++
            }
            else{
                confusion['False_Neg']++
                await try_move(confusion,"moved",FILES,'nobird',data['file'],()=>{
                    socket.emit('file move err',`${FILES}/nobird/${data['file']}`)
                })
            }
            socket.emit('confusion',confusion)
        }

    });

    await socket.on('undo',async(data)=>{
        await try_move(confusion,"undo move",FILES,neg(data['bird']),data['file'],()=>{
            socket.emit('file move err',`${FILES}/${neg(data['bird'])}/${data['file']}`)
        })
        
    });

    socket.on('log',async(data)=>{
        if(!temp['user_info']){
            try{
                await unlink(FILES+'log.txt')
            }
            catch{
                await writeFile(FILES+'log.txt',`user_info:${JSON.stringify(data)}`,{ flag: 'a+' })
            }
            temp['user_info'] = 'exists'
            console.log(`user_info:${JSON.stringify(data)}`,'\n','written')
        }
    })
}

module.exports = helpers