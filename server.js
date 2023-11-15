const express          = require('express');
const {join}           = require('path');
const {
    readdir,
    mkdir
  }                    = require('fs').promises;
const fs               = require('fs')
const layouts          = require('express-ejs-layouts')
const images           = require('./scripts/images.json')
const { Server }       = require('socket.io');
const { createServer } = require('node:http');
const helpers          = require('./scripts/sockets.js')
let temp               = {
    'user_info':undefined
}

let  FILES = './files/'

let confusion          = {
    'True_Pos':0, //The model correctly predicted the positive class.
    'True_Neg':0, //The model correctly predicted the negative class.
    'False_Pos':0, //The model incorrectly predicted the positive class when the actual class was negative (Type I error).
    'False_Neg':0, //The model incorrectly predicted the negative class when the actual class was positive (Type II error).
}


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
    await helpers(socket,confusion,FILES,temp)
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

    console.log( req.ip)

    out['bird']    ='/pics/bird/bird.png'
   
    out['images']  = images
    out['dd']      = 'Bird'
    out['current'] = 'bird'

    
    const files = await readdir(FILES+out['current']+'/')
    out['files']   = files
    res.render('refs/player',{out});
});

app.get('/nobird', async(req, res) => {

    out['bird']    ='/pics/bird/nobird.jpg',
    out['images']  = images
    out['dd']      = 'No Bird'
    out['current'] = 'nobird'

    const files = await readdir(FILES+out['current']+'/')
    out['files']   = files

    res.render('refs/player',{out});
});

['bird','nobird'].forEach(n=>{
    app.get(`/play/${n}/:fileName`, (req, res) => {

        const fileName = req.params.fileName;
        const filePath = join(`./files/${n}/`, fileName);

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
})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

server.listen(PORT+1, () => console.log(`web sockets running on http://localhost:${PORT+1}`));
