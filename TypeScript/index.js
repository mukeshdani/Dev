
/* 
const http  = require('http');
const data = require('./source');
http.createServer((req , res) =>{
    res.writeHead(200 , {'Content-Type' : 'application\json',
                             'ADANI' : '1'});
    res.write(JSON.stringify(data));
    res.end();
}).listen(4000);

 */
/* 
const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, x-custom-header');
    next();
});

app.get('/random', (req, res) => {
    let randomNumber = Math.floor(Math.random() * 10);
    res.setHeader('ADANI', '1');
    res.json({ number: randomNumber });
});

app.post('/random', (req, res) => {
    let randomNumber = Math.floor(Math.random() * 10);
    res.setHeader('x-custom-header', 'my-custom-value');
    res.json({ number: randomNumber });
});

app.put('/random', (req, res) => {
    let randomNumber = Math.floor(Math.random() * 10);
    res.setHeader('x-custom-header', 'my-custom-value');
    res.json({ number: randomNumber });
});

app.delete('/random', (req, res) => {
    let randomNumber = Math.floor(Math.random() * 10);
    res.setHeader('x-custom-header', 'my-custom-value');
    res.json({ number: randomNumber });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
}); */

const http  = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('ADANI', '1');
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Hello World!' }));
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});