//retrieves required modules
const http = require('http');
const fs = require("fs");
const url = require("url");
const path = require("path");

//sets host and port
const hostname = "127.0.0.1";
const port = 8080;

//creates server
const server = http.createServer((req, res) => {

    const myURL = url.parse(req.url, true);//gets url from request
    const myPath = myURL.pathname;//gets path from url
    const myFile = ".." + myPath;//adds relative location to path

    const extname = String(path.extname(myPath)).toLowerCase();//turns path extension to lowercase
    //sets up key value pair for different extensions
    const mimeType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    //sets variable for extention retrieved
    const contentType = mimeType[extname] || 'application/octet-stream';

    //retrieves file sent in request from folder
    fs.readFile(myFile, null, function(error, data) {
        //if error let user know if its 404 and file doesn't exist, or 500 and a server issu
        if(error){
            if(error.code === 'ENOENT'){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('File Does Not Exist!');
            } else {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('Sorry, check with the site admin for error: ' + error)
            }
            //if file does exist then set headers based on extension requested and send data
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    })
});

//tells server where to listen and lets user know where
server.listen(port, hostname, () => {                      
    console.log(`Server running at http://${hostname}:${port}/`);
  });