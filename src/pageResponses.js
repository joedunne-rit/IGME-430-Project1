// Handles requests for building page in browser
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
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
module.exports.getStyle = getStyle;
module.exports.notFound = notFound;
module.exports.notFoundHead = notFoundHead;
