const express          = require('express');
const {join}           = require('path');
const {readdir}        = require('fs').promises;
const fs               = require('fs')
const layouts          = require('express-ejs-layouts')
const images           = require('./scripts/images.json')

const app = express();

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
    let out = {
        'bird' : '/pics/bird/bird.png',
        files:files,
        images:images,
        'dd':'Bird',
        'current':'bird'
    }
    res.render('refs/player',{out});
});

app.get('/nobird', async(req, res) => {
    const files = await readdir('./files/nobird/')
    let out = {
        'bird' : '/pics/bird/nobird.jpg',
        files:files,
        images:images,
        'dd':'No Bird',
        'current':'nobird'
    }
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

const port = 3000; 

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
