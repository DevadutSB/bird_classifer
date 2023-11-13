const express          = require('express');
const {join}           = require('path');
const {readdir}        = require('fs').promises;
const fs               = require('fs')
const layouts          = require('express-ejs-layouts')
const images           = require('./scripts/images.json')
const { Server }       = require('socket.io');
const { createServer } = require('node:http');

let confusion          = {
    'True_Postive':0,
    'True_Negtive':0,
    'False_Postive':0,
    'True_Negtive':0,
}

const sockets          = require('./scripts/sockets.js')

const PORT   = 3000

const app    = express();

const server = createServer(app);

let out = {'port':PORT}

const io = new Server(server,{
    cors:{
        origin:'*'
    }
});

io.on('connection', async(socket) => {
    console.log('a user connected ','server')

    socket.emit('data',(data)=>{
        console.log(data)
    });
});

app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(layouts)

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('refs/main');
});

app.get('/bird', async(req, res) => {
    const files = await readdir('./files/bird/')
    out['bird']    ='/pics/bird/bird.png',
    out['files']   = files
    out['images']  = images
    out['dd']      = 'Bird'
    out['current'] = 'bird'
    res.render('refs/player',{out});
});

app.get('/nobird', async(req, res) => {
    const files    = await readdir('./files/nobird/')
    out['bird']    ='/pics/bird/nobird.jpg',
    out['files']   = files
    out['images']  = images
    out['dd']      = 'No Bird'
    out['current'] = 'nobird'
    res.render('refs/player',{out});
});


app.get('/play/bird/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = join('./files/bird/', fileName);

    fs.exists(filePath, (exists) => {
        if (exists) {
            const stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'audio/wav',
                'Content-Length': stat.size
            });
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        } else {
            res.status(404).send('File not found!');
        }
    });
});

app.get('/play/nobird/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = join('./files/nobird/', fileName);

    fs.exists(filePath, (exists) => {
        if (exists) {
            const stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'audio/wav',
                'Content-Length': stat.size
            });
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        } else {
            res.status(404).send('File not found!');
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

server.listen(PORT+1, () => console.log(`web sockets running on http://localhost:${PORT+1}`));
