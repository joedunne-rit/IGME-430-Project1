const fs = require('fs');

const appFooter = fs.readFileSync(`${__dirname}/./client/app-footer.js`);
const appHeader = fs.readFileSync(`${__dirname}/./client/app-header.js`);
const appNav = fs.readFileSync(`${__dirname}/./client/app-nav.js`);
const app = fs.readFileSync(`${__dirname}/./client/app.js`);
const favorites = fs.readFileSync(`${__dirname}/./client/favorites.js`);
const searchResult = fs.readFileSync(`${__dirname}/client/search-result.js`);
const storage = fs.readFileSync(`${__dirname}/client/storage.js`);
const firebase = fs.readFileSync(`${__dirname}/client/firebase.js`);

const getJavascript = (request, response, jsFile) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(jsFile);
  response.end();
};

const getAppFooter = (request, response) => {
  getJavascript(request, response, appFooter);
};

const getAppHeader = (request, response) => {
  getJavascript(request, response, appHeader);
};

const getAppNav = (request, response) => {
  getJavascript(request, response, appNav);
};

const getApp = (request, response) => {
  getJavascript(request, response, app);
};

const getFavorites = (request, response) => {
  getJavascript(request, response, favorites);
};

const getSearchResult = (request, response) => {
  getJavascript(request, response, searchResult);
};

const getStorage = (request, response) => {
  getJavascript(request, response, storage);
};

const getFirebase = (request, response) => {
  getJavascript(request, response, firebase);
};

module.exports.getAppFooter = getAppFooter;
module.exports.getAppHeader = getAppHeader;
module.exports.getApp = getApp;
module.exports.getAppNav = getAppNav;
module.exports.getFavorites = getFavorites;
module.exports.getSearchResult = getSearchResult;
module.exports.getStorage = getStorage;
module.exports.getFirebase = getFirebase;
