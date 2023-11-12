let audio        = document.getElementById('audio')
let sound        = document.getElementById('source')
let progress     = document.querySelector('div.inner_slider_bar')
let progress_num = document.getElementById('progress_num')
let progress_max = document.getElementById('progress_max')

files = files.split(',')
 
let current_file = 0

sound.src  = bird+files[current_file]

console.log(bird+files[current_file])

async function next(){
     if(current_file>files.length-1){
       current_file = 0
     }
     else{
       current_file++ 
     }
     document.getElementById('filename').innerText = files[current_file]
     sound.src  = bird+files[current_file]
     await play()
}

async function prev(){
   if((current_file-1)<0){
       current_file = files.length-1
   }
   else{
     current_file-- 
   }
   document.getElementById('filename').innerText = files[current_file]
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
