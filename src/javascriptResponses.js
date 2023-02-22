const fs = require('fs');

const appFooter = fs.readFileSync(`${__dirname}/./client/app-footer.js`);
const appHeader = fs.readFileSync(`${__dirname}/./client/app-header.js`);
const appNav = fs.readFileSync(`${__dirname}/./client/app-nav.js`);
const app = fs.readFileSync(`${__dirname}/./client/app.js`);
const favorites = fs.readFileSync(`${__dirname}/./client/favorites.js`);
const searchResult = fs.readFileSync(`${__dirname}/client/search-result.js`);
const storage = fs.readFileSync(`${__dirname}/client/storage.js`);

const getAppFooter = (request, response) => {
    response.writeHead(200, {'Content-Type':'application/javascript'});
    response.write(appFooter);
    response.end();
}

module.exports.getAppFooter = getAppFooter;