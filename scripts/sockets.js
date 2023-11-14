const {
    rename,
    writeFile,
    unlink 
}                    = require('fs').promises;

async function helpers(socket,confusion,FILES,temp){

    const neg = (bird) => bird == 'bird' ? 'nobird' : 'bird'

    await socket.on('data',async(data)=>{
        if(data['bird']=='bird'){

            socket.emit('confusion',confusion)

            if(data['state']){
                confusion['True_Pos']++
            }
            else{
                confusion['False_Pos']++
                await rename(
                    FILES+'bird/'+data['file'],
                    FILES+'nobird/'+data['file'],
                )
                console.log(
                    FILES+'bird/'+data['file'],
                    FILES+'nobird/'+data['file'],
                )
                
                await writeFile(FILES+'log.txt',`\nmoved ${FILES}bird/${data['file']} to ${FILES}nobird/`,{ flag: 'a+' })
                console.log(`moved ${FILES}bird/${data['file']} to ${FILES}/nobird/`)
            }
            
        }
        else{

            socket.emit('confusion',confusion)
            
            if(data['state']){
                confusion['True_Neg']++
            }
            else{
                confusion['False_Neg']++
                await rename(
                    FILES+'nobird/'+data['file'],
                    FILES+'bird/'+data['file'],
                )
                await writeFile(FILES+'log.txt',`\nmoved ${FILES}nobird/${data['file']} to ${FILES}bird/`,{ flag: 'a+' })
                console.log(`moved ${FILES}nobird/${data['file']} to ${FILES}bird/`)
            }
        }

    });

    await socket.on('undo',async(data)=>{
        await rename(
            FILES+neg(data['bird'])+'/'+data['file'],
            FILES+data['bird']+'/'+data['file'],
        )
        await writeFile(FILES+'log.txt',`\nundo moved ${FILES}/${neg(data['bird'])}/${data['file']} to ${FILES}/${data['bird']}/`,{ flag: 'a+' })
        console.log(`undo moved ${FILES}/${neg(data['bird'])}/${data['file']} to ${FILES}/${data['bird']}/`)
    });

    socket.on('log',async(data)=>{
        if(!temp['user_info']){
            await unlink(FILES+'log.txt')
            await writeFile(FILES+'log.txt',`user_info:${JSON.stringify(data)}`,{ flag: 'a+' })
            temp['user_info'] = 'exists'
            console.log(`user_info:${JSON.stringify(data)}`,'\n','written')
        }
    })
}

module.exports = helpers