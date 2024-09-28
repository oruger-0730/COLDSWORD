const http = require('http');
const fs = require('fs');
const Database = require('./modules/db');
const UrlProcessor = require('./modules/url-processor');

// create a new instance of Database
const db = new Database();

// port number 80 is the default port for http
// If you want to use number < 1024, you may need to run the server as root
const port = fs.readFileSync('./.env', 'utf8').split('=')[1].trim() || 3000;

const server = http.createServer((req, res) => {
    let url = req.url.replace(/\?.*$/, '');
    let method = req.method;
    let ipadr = getIPAddress(req);
    fs.appendFile('./db/access.log', `Time: ${new Date().toISOString()} IPAddress: ${ipadr} Method: ${method} RequestedURL: ${url}\n`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    // rules of RESTful API
    // GET: read the resource
    // POST: create a new resource
    // PUT: update the resource
    // PATCH: partially update the resource
    // DELETE: delete the resource
    // OPTIONS: preflight request for CORS(allow oruger-0730.github.io)
    if (method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': 'https://oruger-0730.github.io',
            'Access-Control-Allow-Methods': 'DELETE, OPTIONS, PATCH, POST, PUT',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': 86400
        });
        res.end();
        return;
    }
    else if (method === ('POST' || 'PUT' || 'PATCH' || 'DELETE')) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = {};
            try {
                data = JSON.parse(body);
                let { status, resData } = UrlProcessor(url, method, data, ipadr);
                res.writeHead(status, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://oruger-0730.github.io'
                });
                res.end(JSON.stringify(resData));
            }
            catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
                return;
            }
        });
    }
});

// getIPAddress
function getIPAddress(req) {
    if (req.headers['x-forwarded-for']) {
        return req.headers['x-forwarded-for'].split(/\s*,\s*/)[0];
    } else if (req.connection.remoteAddress) {
        return req.connection.remoteAddress;
    } else {
        return req.socket.remoteAddress;
    }
}

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
