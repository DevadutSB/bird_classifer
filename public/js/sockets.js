
const $ = (a) => document.getElementById(a);

let socket = null

let data = {
    "bird":bird,
    "file":files[current_file]
}

function yes(){
    data['state'] = true
    socket.emit('data',data);
}

function no(){
    data['state'] =  false  
    socket.emit('data',data);
}

function undo(){

}

let url = '';

let loc = window.location;
url = `${loc.protocol}//${loc.hostname}`;

const script = document.createElement('script');
script.src = `${url}/socket.io/socket.io.js`;


document.head.appendChild(script);

script.onload = () => {
    socket = io(url);
};
