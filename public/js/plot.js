'use strict';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let canvas = document.getElementById('spectrogram');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let canvasCtx = canvas.getContext('2d');


let tempCanvas = document.createElement('canvas'),
tempCtx = tempCanvas.getContext('2d');
tempCanvas.width = WIDTH;
tempCanvas.height = HEIGHT;


let animationReq;

audio.addEventListener('play', function () {
  draw();
});
audio.addEventListener('ended', function () {
  window.cancelAnimationFrame(animationReq);
});
audio.addEventListener('pause', function () {
  window.cancelAnimationFrame(animationReq);
});


audio.addEventListener('change', function () {
  window.cancelAnimationFrame(animationReq);
  audio.src = window.URL.createObjectURL(bird+files[current_file]);
  draw();
});


let audioCtx = new AudioContext();
document.body.addEventListener('click', function () {
  audioCtx.resume();
});

let audioSrc = audioCtx.createMediaElementSource(audio);
let analyser = audioCtx.createAnalyser();
analyser.smoothingTimeConstant = 0;
audioSrc.connect(analyser);
analyser.connect(audioCtx.destination);

const bufferLength = analyser.fftSize;
const amplitudeData = new Uint8Array(bufferLength);

let start = new Date();

function draw() {
  if (audio.paused) {
    return;
  }

  animationReq = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(amplitudeData);


  let now = new Date();
  if (now < new Date(start.getTime() + 30)) {
    return;
  }
  start = now;

  tempCtx.drawImage(canvas, 0, 0, WIDTH, HEIGHT);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  canvasCtx.lineWidth        = line_width;
  canvasCtx.strokeStyle      = line_color
  bg.style.backgroundColor   = bg_color
  canvasCtx.beginPath();

  let sliceWidth = (WIDTH * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    let v = amplitudeData[i]/ 128.0;
    let y = (v * HEIGHT) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}
