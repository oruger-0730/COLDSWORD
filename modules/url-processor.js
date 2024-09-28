const POSTer = require('./post/index.js');
const PUTer = require('./put/index.js');
const PATCHer = require('./patch/index.js');
const DELETEer = require('./delete/index.js');
function UrlProcessor(url, method, data) {
    // method not contains OPTIONS and GET, but POST, PUT, PATCH and DELETE
    // data has been parsed as JSON object
    switch (method) {
        case 'POST':{
            // logic here
            let resData = POSTer(url, data);
            return { status: resData.status, resData: JSON.stringify(resData.data) };
        }
        case 'PUT': {
            // logic here
            let resData = PUTer(url, data);
            return { status: resData.status, resData: JSON.stringify(resData.data) };
        }
        case 'PATCH':{
            // logic here
            let resData = PATCHer(url, data);
            return { status: resData.status, resData: JSON.stringify(resData.data) };
        }
        case 'DELETE':{
            // logic here
            let resData = DELETEer(url, data);
            return { status: resData.status, resData: JSON.stringify(resData.data) };
        }
        default:
            return { status: 405, resData: JSON.stringify({ message: 'Invalid method' }) };
    }
}

module.exports = UrlProcessor;
