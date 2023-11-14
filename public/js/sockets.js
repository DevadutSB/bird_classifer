
const $ = (a) => document.getElementById(a);

let socket = null

let bb = bird.split('/')[2]


function yes(){
    let data = {
        "bird":bb,
        "file":files[current_file],
        'state':true
    }
    socket.emit('data',data);
}

function no(){
    let data = {
        "bird":bb,
        "file":files[current_file],
        'state':false  
    }
    socket.emit('data',data);
}

function undo(){
    let data = {
        "bird":bb,
        "file":files[current_file-1] ? files[current_file-1] : files[files.length-1],  
    }
    socket.emit('undo',data);
}

let url = '';

let loc = window.location;
url = `${loc.protocol}//${loc.hostname}:${parseInt(loc.port)+1}`;

const script = document.createElement('script');
script.src = `${url}/socket.io/socket.io.js`;


document.head.appendChild(script);

script.onload = () => {
    socket = io(url);
    sendlogs(socket)
    socket.on('confusion',(data)=>{
        const metrics = calculateMetrics(data)
    
         let table1 = (`
        <table class="table-auto m-10">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left border-b border-gray-600 text-white">Metric</th>
                    <th class="px-4 py-2 text-left border-b border-gray-600 text-white">Value</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(metrics).map(([metric, value]) => `
                    <tr class="hover:bg-gray-700">
                        <td class="px-4 py-2 border-b border-gray-600">${metric}</td>
                        <td class="px-4 py-2 border-b border-gray-600">${value.toFixed(4)}</td>
                    </tr>`).join('')}
            </tbody>
        </table>
      `);

      let table2 = (`
      <table class="table-auto m-10">
          <thead>
              <tr>
                  <th class="px-4 py-2 text-left border-b border-gray-600 text-white">Metric</th>
                  <th class="px-4 py-2 text-left border-b border-gray-600 text-white">Value</th>
              </tr>
          </thead>
          <tbody>
              ${Object.entries(data).map(([metric, value]) => `
                  <tr class="hover:bg-gray-700">
                      <td class="px-4 py-2 border-b border-gray-600">${metric}</td>
                      <td class="px-4 py-2 border-b border-gray-600">${value.toFixed(4)}</td>
                  </tr>`).join('')}
          </tbody>
      </table>
    `);

      $('table').innerHTML = table1+table2
    })
};
