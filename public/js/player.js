let audio        = $('audio')
let sound        = $('source')
let progress     = document.querySelector('div.inner_slider_bar')
let progress_num = $('progress_num')
let progress_max = $('progress_max')
let bg           = $('back_sp')

let bg_color     = '#000000' , line_width = 1, line_color = '#00ff00' 

files = files.split(',')
 
let current_file = 0

sound.src  = bird+files[current_file]

console.log(bird+files[current_file])

async function next(){
     if(current_file>files.length-1){
       current_file = 0
       alert("You finshed "+ bird)
     }
     else{
       current_file++ 
     }
     $('filename').innerText = files[current_file]
     sound.src  = bird+files[current_file]
     await play()
}

async function prev(){
   if((current_file-1)<0){
       current_file = files.length-1
       alert("You finshed "+ bird)
   }
   else{
     current_file-- 
   }
   $('filename').innerText = files[current_file]
   sound.src  = bird+files[current_file]
   await play()
}

async function play(){
   await audio.load(); 
   await audio.play(); 
   let max = audio.duration
   progress_max.innerText = `${max}`
   audio.addEventListener('timeupdate', function() {
        progress_num.innerText = `${audio.currentTime.toFixed(2)}`
        progress.style.width = `${audio.currentTime*100/max}%`;
    });
}
