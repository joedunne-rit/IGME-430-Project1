// Handles requests for building page in browser
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const app = fs.readFileSync(`${__dirname}/../client/app.html`);
const favorites = fs.readFileSync(`${__dirname}/../client/favorites.html`);
const documentation = fs.readFileSync(`${__dirname}/../client/documentation.html`);
const style = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const getPage = (request, response, page) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page);
  response.end();
};

const getIndex = (request, response) => {
  getPage(request, response, index);
};

const getApp = (request, response) => {
  getPage(request, response, app);
};

const getFavorites = (request, response) => {
  getPage(request, response, favorites);
};

const getDocumentation = (request, response) => {
  getPage(request, response, documentation);
};

const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

const notFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  const errorMessage = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  response.write(JSON.stringify(errorMessage));
  response.end();
};

const notFoundHead = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getApp = getApp;
module.exports.getFavorites = getFavorites;
module.exports.getDocumentation = getDocumentation;
module.exports.getStyle = getStyle;
module.exports.notFound = notFound;
module.exports.notFoundHead = notFoundHead;
