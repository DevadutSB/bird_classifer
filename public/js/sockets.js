
const $ = (a) => document.getElementById(a);

let url = '';

let loc = window.location;
url = `${loc.protocol}//${loc.hostname}:${parseInt(loc.port) + 1}`;
console.log(url);


const script = document.createElement('script');
script.src = `${url}/socket.io/socket.io.js`;
document.head.appendChild(script);

script.onload = () => {
    const socket = io(url);
};
